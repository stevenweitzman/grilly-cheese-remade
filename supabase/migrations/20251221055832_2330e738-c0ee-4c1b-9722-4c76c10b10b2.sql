-- Drop the conflicting policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.catering_orders;
DROP POLICY IF EXISTS "Clients can insert own orders" ON public.catering_orders;

-- Create a single, clear INSERT policy that handles both logged-in users and guests
CREATE POLICY "Anyone can create catering orders" 
ON public.catering_orders 
FOR INSERT 
WITH CHECK (
  -- Allow if: user is setting their own client_id, OR client_id is null (guest order)
  (auth.uid() = client_id) OR (client_id IS NULL)
);