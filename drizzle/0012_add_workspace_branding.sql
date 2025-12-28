-- Add workspace-level branding fields to invoice_settings
ALTER TABLE "invoice_settings" ADD COLUMN "branding_app_name" varchar(100);
ALTER TABLE "invoice_settings" ADD COLUMN "branding_primary_color" varchar(7);
ALTER TABLE "invoice_settings" ADD COLUMN "branding_secondary_color" varchar(7);
