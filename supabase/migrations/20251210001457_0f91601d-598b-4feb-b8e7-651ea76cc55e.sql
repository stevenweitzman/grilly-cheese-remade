-- Add admin-only SELECT policy for conversations table
-- This allows admins to view chat conversations for support purposes
-- while keeping PII protected from unauthorized access
CREATE POLICY "Admins can view all conversations"
ON public.conversations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));