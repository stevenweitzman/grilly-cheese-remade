-- Fix search_path for security functions
CREATE OR REPLACE FUNCTION public.check_conversation_rate_limit()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- Count conversations created in the last minute
  SELECT COUNT(*) INTO recent_count
  FROM public.conversation_rate_limit
  WHERE created_at > now() - interval '1 minute';
  
  -- If more than 10 conversations in the last minute, reject
  IF recent_count >= 10 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again in a moment.';
  END IF;
  
  -- Log this attempt
  INSERT INTO public.conversation_rate_limit (created_at) VALUES (now());
  
  -- Clean up old entries (older than 5 minutes)
  DELETE FROM public.conversation_rate_limit 
  WHERE created_at < now() - interval '5 minutes';
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_message_limit()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
BEGIN
  -- Get current message count for this conversation
  SELECT message_count INTO current_count
  FROM public.conversations
  WHERE id = NEW.conversation_id;
  
  -- Limit to 50 messages per conversation
  IF current_count >= 50 THEN
    RAISE EXCEPTION 'Message limit reached for this conversation.';
  END IF;
  
  -- Increment message count
  UPDATE public.conversations
  SET message_count = message_count + 1
  WHERE id = NEW.conversation_id;
  
  RETURN NEW;
END;
$$;