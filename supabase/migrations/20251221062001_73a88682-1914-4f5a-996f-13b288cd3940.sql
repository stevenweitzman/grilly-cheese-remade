-- Remove the guest_count check constraint to allow orders with only extras (0 entrées)
ALTER TABLE public.catering_orders DROP CONSTRAINT IF EXISTS catering_orders_guest_count_check;