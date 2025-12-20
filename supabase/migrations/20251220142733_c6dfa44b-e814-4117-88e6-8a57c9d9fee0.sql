-- Create a dedicated table for guest quote submissions (not tied to auth.users)
CREATE TABLE public.guest_quote_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS (no direct access - only via SECURITY DEFINER function)
ALTER TABLE public.guest_quote_submissions ENABLE ROW LEVEL SECURITY;

-- Create a SECURITY DEFINER function to create guest submissions safely
CREATE OR REPLACE FUNCTION public.create_guest_quote_submission(
    p_full_name text,
    p_email text,
    p_phone text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_id uuid;
BEGIN
    -- Validate inputs
    IF p_full_name IS NULL OR trim(p_full_name) = '' THEN
        RAISE EXCEPTION 'Full name is required';
    END IF;
    
    IF p_email IS NULL OR trim(p_email) = '' THEN
        RAISE EXCEPTION 'Email is required';
    END IF;
    
    -- Basic email format validation
    IF p_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    
    -- Insert the guest submission
    INSERT INTO public.guest_quote_submissions (full_name, email, phone)
    VALUES (trim(p_full_name), lower(trim(p_email)), trim(p_phone))
    RETURNING id INTO new_id;
    
    RETURN new_id;
END;
$$;

-- Update quote_requests to allow guest_quote_submission_id as alternative to client_id
ALTER TABLE public.quote_requests 
ADD COLUMN guest_submission_id uuid REFERENCES public.guest_quote_submissions(id);

-- Make client_id nullable (since guests won't have one)
ALTER TABLE public.quote_requests 
ALTER COLUMN client_id DROP NOT NULL;

-- Add check constraint: must have either client_id OR guest_submission_id
ALTER TABLE public.quote_requests
ADD CONSTRAINT quote_requests_client_or_guest_check
CHECK (client_id IS NOT NULL OR guest_submission_id IS NOT NULL);

-- Grant execute on the function to anon (for edge functions)
GRANT EXECUTE ON FUNCTION public.create_guest_quote_submission TO anon;

-- Admin-only read policy for guest submissions
CREATE POLICY "Admins can view guest submissions"
ON public.guest_quote_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));