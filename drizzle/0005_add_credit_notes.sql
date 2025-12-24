-- Add Credit Notes Support

-- Credit Note Status Enum
CREATE TYPE "credit_note_status" AS ENUM ('draft', 'issued', 'applied', 'refunded', 'cancelled');

-- Credit Notes Table
CREATE TABLE IF NOT EXISTS "credit_notes" (
  "id" serial PRIMARY KEY NOT NULL,
  "workspace_id" integer NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "contact_id" integer NOT NULL REFERENCES "contacts"("id") ON DELETE CASCADE,
  "invoice_id" integer REFERENCES "invoices"("id") ON DELETE SET NULL,
  "credit_note_number" varchar(50) NOT NULL UNIQUE,
  "status" "credit_note_status" DEFAULT 'draft' NOT NULL,
  "subtotal" numeric(12, 2) DEFAULT '0' NOT NULL,
  "tax_amount" numeric(12, 2) DEFAULT '0' NOT NULL,
  "total" numeric(12, 2) DEFAULT '0' NOT NULL,
  "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
  "reason" text,
  "notes" text,
  "issue_date" timestamp NOT NULL,
  "sent_at" timestamp,
  "applied_at" timestamp,
  "refunded_at" timestamp,
  "pdf_url" varchar(500),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Credit Note Line Items Table
CREATE TABLE IF NOT EXISTS "credit_note_line_items" (
  "id" serial PRIMARY KEY NOT NULL,
  "credit_note_id" integer NOT NULL REFERENCES "credit_notes"("id") ON DELETE CASCADE,
  "product_id" integer REFERENCES "products"("id") ON DELETE SET NULL,
  "description" varchar(500) NOT NULL,
  "quantity" numeric(10, 3) NOT NULL,
  "unit" varchar(20) DEFAULT 'stuk' NOT NULL,
  "unit_price" numeric(12, 2) NOT NULL,
  "tax_rate" numeric(5, 2) DEFAULT '21' NOT NULL,
  "subtotal" numeric(12, 2) NOT NULL,
  "tax_amount" numeric(12, 2) NOT NULL,
  "total" numeric(12, 2) NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);

-- Add credit note numbering to invoice settings
ALTER TABLE "invoice_settings"
ADD COLUMN IF NOT EXISTS "credit_note_prefix" varchar(20) DEFAULT 'CN' NOT NULL,
ADD COLUMN IF NOT EXISTS "credit_note_next_number" integer DEFAULT 1 NOT NULL;

-- Create indexes
CREATE INDEX IF NOT EXISTS "credit_note_workspace_idx" ON "credit_notes" ("workspace_id");
CREATE INDEX IF NOT EXISTS "credit_note_contact_idx" ON "credit_notes" ("contact_id");
CREATE INDEX IF NOT EXISTS "credit_note_invoice_idx" ON "credit_notes" ("invoice_id");
CREATE INDEX IF NOT EXISTS "credit_note_status_idx" ON "credit_notes" ("status");
CREATE INDEX IF NOT EXISTS "credit_note_line_items_credit_note_idx" ON "credit_note_line_items" ("credit_note_id");
