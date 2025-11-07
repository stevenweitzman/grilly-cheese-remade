-- Remove overly permissive RLS policies on conversations table
-- This addresses the anonymous access warning

-- Drop the existing policies that allow unrestricted access
DROP POLICY IF EXISTS "Anyone can update conversations" ON public.conversations;
DROP POLICY IF EXISTS "Anyone can view conversations" ON public.conversations;

-- Keep INSERT policy for visitors to create conversations
-- But restrict UPDATE and SELECT to prevent data exposure

-- Note: The edge functions will use service role to bypass RLS when needed
-- No additional policies needed as edge functions handle conversation management