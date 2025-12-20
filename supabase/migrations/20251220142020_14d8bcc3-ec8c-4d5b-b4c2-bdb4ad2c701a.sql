-- Create rate limit tracking table for catering orders
CREATE TABLE public.catering_order_rate_limit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS (no policies needed - managed by SECURITY DEFINER trigger only)
ALTER TABLE public.catering_order_rate_limit ENABLE ROW LEVEL SECURITY;

-- Create rate limiting function for catering orders
CREATE OR REPLACE FUNCTION public.check_catering_order_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- Count orders created in the last minute
  SELECT COUNT(*) INTO recent_count
  FROM public.catering_order_rate_limit
  WHERE created_at > now() - interval '1 minute';
  
  -- If more than 5 orders in the last minute, reject
  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again in a moment.';
  END IF;
  
  -- Log this attempt
  INSERT INTO public.catering_order_rate_limit (created_at) VALUES (now());
  
  -- Clean up old entries (older than 5 minutes)
  DELETE FROM public.catering_order_rate_limit 
  WHERE created_at < now() - interval '5 minutes';
  
  RETURN NEW;
END;
$$;

-- Create trigger for rate limiting on catering_orders
CREATE TRIGGER check_catering_order_rate_limit_trigger
BEFORE INSERT ON public.catering_orders
FOR EACH ROW
EXECUTE FUNCTION public.check_catering_order_rate_limit();