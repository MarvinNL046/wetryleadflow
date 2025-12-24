import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const cronJobs = [
  {
    job_name: "process-meta-leads",
    schedule: "*/5 * * * *",
    description: "Verwerkt nieuwe leads van Meta (Facebook/Instagram) elke 5 minuten",
    is_enabled: true,
  },
  {
    job_name: "send-invoice-reminders",
    schedule: "0 9 * * *",
    description: "Verstuurt herinneringen voor openstaande facturen (dagelijks om 9:00)",
    is_enabled: true,
  },
  {
    job_name: "generate-recurring-invoices",
    schedule: "0 0 1 * *",
    description: "Genereert terugkerende facturen (1e van elke maand)",
    is_enabled: true,
  },
  {
    job_name: "generate-follow-up-reminders",
    schedule: "0 8 * * 1-5",
    description: "Genereert follow-up herinneringen voor sales (werkdagen om 8:00)",
    is_enabled: true,
  },
];

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL not found in environment");
  }

  const sql = neon(databaseUrl);

  console.log("Seeding cron job configs...");

  for (const job of cronJobs) {
    try {
      await sql.query(
        `INSERT INTO cron_job_configs (job_name, schedule, description, is_enabled, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         ON CONFLICT (job_name) DO UPDATE SET
           schedule = EXCLUDED.schedule,
           description = EXCLUDED.description,
           updated_at = NOW()`,
        [job.job_name, job.schedule, job.description, job.is_enabled],
        {}
      );
      console.log(`✅ ${job.job_name}`);
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error(`❌ ${job.job_name}: ${err.message}`);
    }
  }

  console.log("\n✅ Cron job configs seeded!");
}

main().catch(console.error);
