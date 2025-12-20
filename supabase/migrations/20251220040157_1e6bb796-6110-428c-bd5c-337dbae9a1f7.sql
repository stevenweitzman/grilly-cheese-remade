-- Add new columns for item-based drop-off pricing
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS cart_items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS entree_subtotal numeric DEFAULT 0;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS bulk_discount_percent numeric DEFAULT 0;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS bulk_discount_amount numeric DEFAULT 0;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS extras_subtotal numeric DEFAULT 0;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS food_subtotal numeric DEFAULT 0;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS delivery_fee numeric DEFAULT 0;
ALTER TABLE catering_orders ADD COLUMN IF NOT EXISTS delivery_miles_over_free numeric DEFAULT 0;

-- Make old package-based columns nullable for backward compatibility
ALTER TABLE catering_orders ALTER COLUMN package_type DROP NOT NULL;
ALTER TABLE catering_orders ALTER COLUMN guest_count DROP NOT NULL;
ALTER TABLE catering_orders ALTER COLUMN price_per_person DROP NOT NULL;
ALTER TABLE catering_orders ALTER COLUMN base_subtotal DROP NOT NULL;
ALTER TABLE catering_orders ALTER COLUMN gratuity DROP NOT NULL;
ALTER TABLE catering_orders ALTER COLUMN total_amount DROP NOT NULL;
ALTER TABLE catering_orders ALTER COLUMN amount_charged DROP NOT NULL;