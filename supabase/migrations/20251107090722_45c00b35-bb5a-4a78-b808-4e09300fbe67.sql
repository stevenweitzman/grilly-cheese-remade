-- Add rate limiting for conversations table to prevent flooding
-- Create a table to track conversation creation attempts
CREATE TABLE IF NOT EXISTS public.conversation_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on rate limit table
ALTER TABLE public.conversation_rate_limit ENABLE ROW LEVEL SECURITY;

-- Create index for efficient cleanup
CREATE INDEX IF NOT EXISTS idx_conversation_rate_limit_created_at 
ON public.conversation_rate_limit(created_at);

-- Create function to check rate limit (max 10 conversations per minute globally)
CREATE OR REPLACE FUNCTION public.check_conversation_rate_limit()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to enforce rate limiting on conversations INSERT
DROP TRIGGER IF EXISTS enforce_conversation_rate_limit ON public.conversations;
CREATE TRIGGER enforce_conversation_rate_limit
  BEFORE INSERT ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.check_conversation_rate_limit();

-- Add a limit to messages per conversation to prevent abuse
ALTER TABLE public.conversations 
ADD COLUMN IF NOT EXISTS message_count integer DEFAULT 0 NOT NULL;

-- Create function to track and limit message count
CREATE OR REPLACE FUNCTION public.check_message_limit()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to enforce message limits
DROP TRIGGER IF EXISTS enforce_message_limit ON public.chat_messages;
CREATE TRIGGER enforce_message_limit
  BEFORE INSERT ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.check_message_limit();

-- Allow SELECT on conversations for message count validation
CREATE POLICY "Allow reading conversation for message count" 
ON public.conversations 
FOR SELECT 
USING (true);

-- Allow UPDATE on conversations for message count tracking
CREATE POLICY "Allow updating message count" 
ON public.conversations 
FOR UPDATE 
USING (true);