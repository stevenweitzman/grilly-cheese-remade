-- Fix conversations table PII exposure by restricting SELECT policy
-- The current "Allow reading conversation for message count" policy allows anyone to read all PII

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Allow reading conversation for message count" ON public.conversations;

-- Create an RPC function to safely get message count without exposing PII
-- This uses SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.get_conversation_message_count(conv_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT message_count FROM public.conversations WHERE id = conv_id
$$;

-- Create a restrictive SELECT policy - only allow reading your own conversation if you're the visitor
-- Since conversations don't have auth.uid(), we need to allow the edge functions (via service role) to read
-- For client-side, they should use the RPC function instead
-- No SELECT policy needed for anonymous users - they use the RPC function