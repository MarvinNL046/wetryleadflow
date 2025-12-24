-- Add Address Fields to Contacts

ALTER TABLE "contacts"
ADD COLUMN IF NOT EXISTS "street" varchar(255),
ADD COLUMN IF NOT EXISTS "house_number" varchar(20),
ADD COLUMN IF NOT EXISTS "house_number_addition" varchar(10),
ADD COLUMN IF NOT EXISTS "postal_code" varchar(20),
ADD COLUMN IF NOT EXISTS "city" varchar(255),
ADD COLUMN IF NOT EXISTS "province" varchar(255),
ADD COLUMN IF NOT EXISTS "country" varchar(100) DEFAULT 'Nederland';
