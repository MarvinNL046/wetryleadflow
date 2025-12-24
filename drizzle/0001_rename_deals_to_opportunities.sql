-- Rename deals table to opportunities
ALTER TABLE "deals" RENAME TO "opportunities";--> statement-breakpoint

-- Rename deal_stage_history table to opportunity_stage_history
ALTER TABLE "deal_stage_history" RENAME TO "opportunity_stage_history";--> statement-breakpoint

-- Rename deal_id column to opportunity_id in the stage history table
ALTER TABLE "opportunity_stage_history" RENAME COLUMN "deal_id" TO "opportunity_id";--> statement-breakpoint

-- Update note_type enum: rename 'deal' value to 'opportunity'
ALTER TYPE "note_type" RENAME VALUE 'deal' TO 'opportunity';--> statement-breakpoint

-- Rename indexes for consistency
ALTER INDEX "deal_workspace_idx" RENAME TO "opportunity_workspace_idx";--> statement-breakpoint
ALTER INDEX "deal_pipeline_idx" RENAME TO "opportunity_pipeline_idx";--> statement-breakpoint
ALTER INDEX "deal_stage_idx" RENAME TO "opportunity_stage_idx";--> statement-breakpoint
ALTER INDEX "deal_contact_idx" RENAME TO "opportunity_contact_idx";--> statement-breakpoint
ALTER INDEX "history_deal_idx" RENAME TO "opportunity_history_idx";--> statement-breakpoint
ALTER INDEX "history_moved_at_idx" RENAME TO "opportunity_history_moved_at_idx";--> statement-breakpoint

-- Rename primary keys
ALTER INDEX "deals_pkey" RENAME TO "opportunities_pkey";--> statement-breakpoint
ALTER INDEX "deal_stage_history_pkey" RENAME TO "opportunity_stage_history_pkey";
