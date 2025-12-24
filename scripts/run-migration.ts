import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function run() {
  console.log("Starting invoicing migration...");

  // Create enums
  try {
    await sql`
      DO $$ BEGIN
        CREATE TYPE quotation_status AS ENUM ('draft', 'sent', 'accepted', 'rejected', 'expired');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `;
    console.log("✓ Created quotation_status enum");
  } catch (e: any) {
    console.log("- quotation_status enum already exists");
  }

  try {
    await sql`
      DO $$ BEGIN
        CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `;
    console.log("✓ Created invoice_status enum");
  } catch (e: any) {
    console.log("- invoice_status enum already exists");
  }

  // Create products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      sku VARCHAR(100),
      unit_price DECIMAL(12, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
      unit VARCHAR(50) NOT NULL DEFAULT 'stuk',
      tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 21.00,
      is_active BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✓ Created products table");

  await sql`CREATE INDEX IF NOT EXISTS product_workspace_idx ON products(workspace_id)`;
  await sql`CREATE INDEX IF NOT EXISTS product_active_idx ON products(is_active)`;

  // Create quotations table
  await sql`
    CREATE TABLE IF NOT EXISTS quotations (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
      contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
      opportunity_id INTEGER REFERENCES opportunities(id) ON DELETE SET NULL,
      quotation_number VARCHAR(50) NOT NULL UNIQUE,
      status quotation_status NOT NULL DEFAULT 'draft',
      subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
      tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
      discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
      total DECIMAL(12, 2) NOT NULL DEFAULT 0,
      currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
      discount_type VARCHAR(10),
      discount_value DECIMAL(12, 2),
      issue_date TIMESTAMP NOT NULL,
      valid_until TIMESTAMP,
      title VARCHAR(255),
      introduction TEXT,
      terms TEXT,
      notes TEXT,
      sent_at TIMESTAMP,
      viewed_at TIMESTAMP,
      accepted_at TIMESTAMP,
      rejected_at TIMESTAMP,
      converted_to_invoice_id INTEGER,
      pdf_url VARCHAR(500),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✓ Created quotations table");

  await sql`CREATE INDEX IF NOT EXISTS quotation_workspace_idx ON quotations(workspace_id)`;
  await sql`CREATE INDEX IF NOT EXISTS quotation_contact_idx ON quotations(contact_id)`;
  await sql`CREATE INDEX IF NOT EXISTS quotation_status_idx ON quotations(status)`;

  // Create invoices table
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
      contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
      opportunity_id INTEGER REFERENCES opportunities(id) ON DELETE SET NULL,
      quotation_id INTEGER REFERENCES quotations(id) ON DELETE SET NULL,
      invoice_number VARCHAR(50) NOT NULL UNIQUE,
      status invoice_status NOT NULL DEFAULT 'draft',
      subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
      tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
      discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
      total DECIMAL(12, 2) NOT NULL DEFAULT 0,
      amount_paid DECIMAL(12, 2) NOT NULL DEFAULT 0,
      amount_due DECIMAL(12, 2) NOT NULL DEFAULT 0,
      currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
      discount_type VARCHAR(10),
      discount_value DECIMAL(12, 2),
      issue_date TIMESTAMP NOT NULL,
      due_date TIMESTAMP NOT NULL,
      title VARCHAR(255),
      introduction TEXT,
      terms TEXT,
      notes TEXT,
      payment_terms INTEGER NOT NULL DEFAULT 14,
      payment_method VARCHAR(50),
      payment_reference VARCHAR(255),
      stripe_payment_link_id VARCHAR(255),
      stripe_payment_link_url VARCHAR(500),
      sent_at TIMESTAMP,
      viewed_at TIMESTAMP,
      paid_at TIMESTAMP,
      last_reminder_at TIMESTAMP,
      reminder_count INTEGER NOT NULL DEFAULT 0,
      pdf_url VARCHAR(500),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✓ Created invoices table");

  await sql`CREATE INDEX IF NOT EXISTS invoice_workspace_idx ON invoices(workspace_id)`;
  await sql`CREATE INDEX IF NOT EXISTS invoice_contact_idx ON invoices(contact_id)`;
  await sql`CREATE INDEX IF NOT EXISTS invoice_status_idx ON invoices(status)`;
  await sql`CREATE INDEX IF NOT EXISTS invoice_due_date_idx ON invoices(due_date)`;

  // Create line_items table
  await sql`
    CREATE TABLE IF NOT EXISTS line_items (
      id SERIAL PRIMARY KEY,
      quotation_id INTEGER REFERENCES quotations(id) ON DELETE CASCADE,
      invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
      product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
      description VARCHAR(500) NOT NULL,
      quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
      unit VARCHAR(50) NOT NULL DEFAULT 'stuk',
      unit_price DECIMAL(12, 2) NOT NULL,
      tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 21.00,
      tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
      discount_percent DECIMAL(5, 2) NOT NULL DEFAULT 0,
      subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
      total DECIMAL(12, 2) NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✓ Created line_items table");

  await sql`CREATE INDEX IF NOT EXISTS line_item_quotation_idx ON line_items(quotation_id)`;
  await sql`CREATE INDEX IF NOT EXISTS line_item_invoice_idx ON line_items(invoice_id)`;

  // Create payments table
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
      amount DECIMAL(12, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
      payment_date TIMESTAMP NOT NULL,
      payment_method VARCHAR(50),
      reference VARCHAR(255),
      notes TEXT,
      stripe_payment_intent_id VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✓ Created payments table");

  await sql`CREATE INDEX IF NOT EXISTS payment_invoice_idx ON payments(invoice_id)`;

  // Create invoice_settings table
  await sql`
    CREATE TABLE IF NOT EXISTS invoice_settings (
      id SERIAL PRIMARY KEY,
      workspace_id INTEGER NOT NULL UNIQUE REFERENCES workspaces(id) ON DELETE CASCADE,
      quotation_prefix VARCHAR(20) NOT NULL DEFAULT 'OFF',
      quotation_next_number INTEGER NOT NULL DEFAULT 1,
      invoice_prefix VARCHAR(20) NOT NULL DEFAULT 'FAC',
      invoice_next_number INTEGER NOT NULL DEFAULT 1,
      default_payment_terms INTEGER NOT NULL DEFAULT 14,
      default_tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 21.00,
      default_currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
      company_name VARCHAR(255),
      company_address TEXT,
      company_email VARCHAR(255),
      company_phone VARCHAR(50),
      company_website VARCHAR(255),
      company_logo VARCHAR(500),
      kvk_number VARCHAR(20),
      vat_number VARCHAR(30),
      iban VARCHAR(50),
      bic VARCHAR(20),
      default_introduction TEXT,
      default_terms TEXT,
      default_footer TEXT,
      enable_reminders BOOLEAN NOT NULL DEFAULT true,
      reminder_days JSONB NOT NULL DEFAULT '[7, 14, 30]',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
  console.log("✓ Created invoice_settings table");

  await sql`CREATE INDEX IF NOT EXISTS invoice_settings_workspace_idx ON invoice_settings(workspace_id)`;

  console.log("\n✅ Migration completed successfully!");
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
