-- Create enum for catering order status
CREATE TYPE public.catering_order_status AS ENUM (
  'pending_payment',
  'pending_review',
  'confirmed',
  'in_prep',
  'ready_for_delivery',
  'delivered',
  'completed',
  'cancelled',
  'refunded'
);

-- Create enum for package type
CREATE TYPE public.catering_package_type AS ENUM (
  'simple',
  'full'
);

-- Create catering_orders table
CREATE TABLE public.catering_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Package info
  package_type catering_package_type NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  price_per_person NUMERIC(10,2) NOT NULL,
  
  -- Event details
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME WITHOUT TIME ZONE NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  
  -- Delivery address
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  
  -- Menu selections (stored as JSONB for flexibility)
  selected_sandwiches JSONB NOT NULL DEFAULT '[]',
  selected_hotdogs JSONB DEFAULT '[]',
  gluten_free_count INTEGER DEFAULT 0,
  vegan_count INTEGER DEFAULT 0,
  special_notes TEXT,
  
  -- Add-ons
  include_desserts BOOLEAN DEFAULT FALSE,
  dessert_price_per_person NUMERIC(10,2) DEFAULT 4.00,
  
  -- Pricing breakdown
  base_subtotal NUMERIC(10,2) NOT NULL,
  minimum_charge_applied BOOLEAN DEFAULT FALSE,
  addons_total NUMERIC(10,2) DEFAULT 0,
  travel_distance_miles NUMERIC(10,2) DEFAULT 0,
  travel_fee NUMERIC(10,2) DEFAULT 150,
  gratuity NUMERIC(10,2) NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  
  -- Payment info
  payment_type TEXT DEFAULT 'full', -- 'full' or 'deposit'
  deposit_percentage NUMERIC(5,2) DEFAULT 100, -- Configurable, e.g. 50 for 50%
  amount_charged NUMERIC(10,2) NOT NULL,
  paypal_transaction_id TEXT,
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  paid_at TIMESTAMP WITH TIME ZONE,
  
  -- Order status
  status catering_order_status NOT NULL DEFAULT 'pending_payment',
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.catering_orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for catering_orders
-- Clients can view their own orders
CREATE POLICY "Clients can view own orders"
ON public.catering_orders
FOR SELECT
USING (auth.uid() = client_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
ON public.catering_orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert orders (for guest checkout that gets associated later)
CREATE POLICY "Admins can insert orders"
ON public.catering_orders
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Clients can insert their own orders
CREATE POLICY "Clients can insert own orders"
ON public.catering_orders
FOR INSERT
WITH CHECK (auth.uid() = client_id);

-- Public can insert orders (for guest checkout)
CREATE POLICY "Anyone can create orders"
ON public.catering_orders
FOR INSERT
WITH CHECK (true);

-- Admins can update all orders
CREATE POLICY "Admins can update orders"
ON public.catering_orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Clients can update their pending orders (before payment)
CREATE POLICY "Clients can update pending orders"
ON public.catering_orders
FOR UPDATE
USING (auth.uid() = client_id AND status = 'pending_payment');

-- Admins can delete orders
CREATE POLICY "Admins can delete orders"
ON public.catering_orders
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_catering_orders_updated_at
BEFORE UPDATE ON public.catering_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for common queries
CREATE INDEX idx_catering_orders_client_id ON public.catering_orders(client_id);
CREATE INDEX idx_catering_orders_status ON public.catering_orders(status);
CREATE INDEX idx_catering_orders_event_date ON public.catering_orders(event_date);