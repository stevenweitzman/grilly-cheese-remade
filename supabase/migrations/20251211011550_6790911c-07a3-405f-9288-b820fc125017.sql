-- Remove the overly permissive UPDATE policy on conversations table
-- The message_count is already updated by the check_message_limit() SECURITY DEFINER trigger
-- The transcript_sent and ended_at are updated by edge functions using service role (which bypasses RLS)
DROP POLICY IF EXISTS "Allow updating message count" ON public.conversations;