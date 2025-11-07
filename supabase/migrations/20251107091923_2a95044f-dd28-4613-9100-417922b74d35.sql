-- Fix PUBLIC_DATA_EXPOSURE: Remove public read access to chat messages
-- The chat-assistant edge function uses service_role and can still read messages
-- The frontend maintains messages in React state and doesn't query the database

DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;

-- Messages can still be inserted by anonymous users (for the chat to work)
-- But only the backend (service_role) can read them for AI context