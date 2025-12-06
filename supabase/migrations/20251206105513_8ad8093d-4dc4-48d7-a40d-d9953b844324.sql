-- Fix function search_path for check_message_limit
CREATE OR REPLACE FUNCTION public.check_message_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
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
$function$;

-- Fix function search_path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix function search_path for handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, company_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'company_name', '')
  );
  RETURN NEW;
END;
$function$;