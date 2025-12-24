CREATE TYPE "public"."email_status" AS ENUM('pending', 'sent', 'delivered', 'bounced', 'failed');--> statement-breakpoint
CREATE TYPE "public"."lead_source" AS ENUM('meta', 'manual', 'api', 'import');--> statement-breakpoint
CREATE TYPE "public"."note_type" AS ENUM('contact', 'deal');--> statement-breakpoint
CREATE TYPE "public"."outbox_event_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('owner', 'admin', 'member');--> statement-breakpoint
CREATE TYPE "public"."webhook_event_status" AS ENUM('received', 'processing', 'processed', 'failed', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."webhook_provider" AS ENUM('meta', 'stripe', 'other');--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer,
	"workspace_id" integer,
	"user_id" integer,
	"user_email" varchar(255),
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" integer,
	"metadata" jsonb,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"email" varchar(255),
	"phone" varchar(50),
	"company" varchar(255),
	"position" varchar(255),
	"created_by_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deal_stage_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"deal_id" integer NOT NULL,
	"from_stage_id" integer,
	"to_stage_id" integer NOT NULL,
	"moved_by_id" integer,
	"moved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deals" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"pipeline_id" integer NOT NULL,
	"stage_id" integer NOT NULL,
	"contact_id" integer,
	"title" varchar(255) NOT NULL,
	"value" numeric(12, 2),
	"currency" varchar(3) DEFAULT 'EUR',
	"expected_close_date" timestamp,
	"assigned_to_id" integer,
	"created_by_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer,
	"workspace_id" integer,
	"template_name" varchar(100) NOT NULL,
	"to" varchar(255) NOT NULL,
	"from" varchar(255) NOT NULL,
	"subject" varchar(500) NOT NULL,
	"status" "email_status" DEFAULT 'pending' NOT NULL,
	"resend_id" varchar(100),
	"error_message" text,
	"metadata" jsonb,
	"related_entity_type" varchar(50),
	"related_entity_id" integer,
	"sent_at" timestamp,
	"delivered_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_attribution" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_id" integer NOT NULL,
	"source" "lead_source" NOT NULL,
	"meta_page_id" varchar(100),
	"meta_form_id" varchar(100),
	"meta_leadgen_id" varchar(100),
	"meta_ad_id" varchar(100),
	"meta_campaign_id" varchar(100),
	"meta_adset_id" varchar(100),
	"utm_source" varchar(255),
	"utm_medium" varchar(255),
	"utm_campaign" varchar(255),
	"utm_content" varchar(255),
	"utm_term" varchar(255),
	"raw_payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_field_mappings" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_id" integer NOT NULL,
	"source_field_key" varchar(255) NOT NULL,
	"source_field_label" varchar(255),
	"target_field" varchar(100) NOT NULL,
	"transform" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_ingest_routes" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"source" "lead_source" NOT NULL,
	"meta_page_id" integer,
	"meta_form_id" integer,
	"workspace_id" integer NOT NULL,
	"pipeline_id" integer NOT NULL,
	"stage_id" integer NOT NULL,
	"assign_to_user_id" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "memberships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"org_id" integer NOT NULL,
	"role" "role" DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meta_connections" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"meta_user_id" varchar(100) NOT NULL,
	"meta_user_name" varchar(255),
	"access_token_encrypted" text NOT NULL,
	"token_expires_at" timestamp,
	"scopes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_sync_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meta_forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"page_id" integer NOT NULL,
	"form_id" varchar(100) NOT NULL,
	"form_name" varchar(255),
	"form_fields" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_sync_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meta_pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"connection_id" integer NOT NULL,
	"page_id" varchar(100) NOT NULL,
	"page_name" varchar(255) NOT NULL,
	"page_access_token_encrypted" text NOT NULL,
	"subscribed_to_leadgen" boolean DEFAULT false NOT NULL,
	"webhook_subscribed_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"type" "note_type" NOT NULL,
	"contact_id" integer,
	"deal_id" integer,
	"content" text NOT NULL,
	"created_by_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orgs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "outbox_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"workspace_id" integer NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" integer NOT NULL,
	"payload" jsonb NOT NULL,
	"status" "outbox_event_status" DEFAULT 'pending' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"max_attempts" integer DEFAULT 3 NOT NULL,
	"last_error" text,
	"scheduled_for" timestamp DEFAULT now() NOT NULL,
	"processed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pipeline_stages" (
	"id" serial PRIMARY KEY NOT NULL,
	"pipeline_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"color" varchar(7) DEFAULT '#6366f1',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pipelines" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_external_id_unique" UNIQUE("external_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" "webhook_provider" NOT NULL,
	"external_event_id" varchar(255) NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"payload" jsonb NOT NULL,
	"status" "webhook_event_status" DEFAULT 'received' NOT NULL,
	"processed_at" timestamp,
	"error_message" text,
	"attempts" integer DEFAULT 0 NOT NULL,
	"result_entity_type" varchar(50),
	"result_entity_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deal_stage_history" ADD CONSTRAINT "deal_stage_history_deal_id_deals_id_fk" FOREIGN KEY ("deal_id") REFERENCES "public"."deals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deal_stage_history" ADD CONSTRAINT "deal_stage_history_from_stage_id_pipeline_stages_id_fk" FOREIGN KEY ("from_stage_id") REFERENCES "public"."pipeline_stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deal_stage_history" ADD CONSTRAINT "deal_stage_history_to_stage_id_pipeline_stages_id_fk" FOREIGN KEY ("to_stage_id") REFERENCES "public"."pipeline_stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deal_stage_history" ADD CONSTRAINT "deal_stage_history_moved_by_id_users_id_fk" FOREIGN KEY ("moved_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_pipeline_id_pipelines_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."pipelines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_stage_id_pipeline_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."pipeline_stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_assigned_to_id_users_id_fk" FOREIGN KEY ("assigned_to_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_attribution" ADD CONSTRAINT "lead_attribution_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_field_mappings" ADD CONSTRAINT "lead_field_mappings_route_id_lead_ingest_routes_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."lead_ingest_routes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_meta_page_id_meta_pages_id_fk" FOREIGN KEY ("meta_page_id") REFERENCES "public"."meta_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_meta_form_id_meta_forms_id_fk" FOREIGN KEY ("meta_form_id") REFERENCES "public"."meta_forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_pipeline_id_pipelines_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."pipelines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_stage_id_pipeline_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."pipeline_stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_ingest_routes" ADD CONSTRAINT "lead_ingest_routes_assign_to_user_id_users_id_fk" FOREIGN KEY ("assign_to_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_connections" ADD CONSTRAINT "meta_connections_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_forms" ADD CONSTRAINT "meta_forms_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_forms" ADD CONSTRAINT "meta_forms_page_id_meta_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."meta_pages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_pages" ADD CONSTRAINT "meta_pages_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meta_pages" ADD CONSTRAINT "meta_pages_connection_id_meta_connections_id_fk" FOREIGN KEY ("connection_id") REFERENCES "public"."meta_connections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_deal_id_deals_id_fk" FOREIGN KEY ("deal_id") REFERENCES "public"."deals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outbox_events" ADD CONSTRAINT "outbox_events_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outbox_events" ADD CONSTRAINT "outbox_events_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pipeline_stages" ADD CONSTRAINT "pipeline_stages_pipeline_id_pipelines_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."pipelines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pipelines" ADD CONSTRAINT "pipelines_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_org_id_orgs_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_org_idx" ON "audit_log" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "audit_workspace_idx" ON "audit_log" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "audit_user_idx" ON "audit_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_action_idx" ON "audit_log" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_entity_idx" ON "audit_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "audit_created_at_idx" ON "audit_log" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "contact_workspace_idx" ON "contacts" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "contact_email_idx" ON "contacts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "history_deal_idx" ON "deal_stage_history" USING btree ("deal_id");--> statement-breakpoint
CREATE INDEX "history_moved_at_idx" ON "deal_stage_history" USING btree ("moved_at");--> statement-breakpoint
CREATE INDEX "deal_workspace_idx" ON "deals" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "deal_pipeline_idx" ON "deals" USING btree ("pipeline_id");--> statement-breakpoint
CREATE INDEX "deal_stage_idx" ON "deals" USING btree ("stage_id");--> statement-breakpoint
CREATE INDEX "deal_contact_idx" ON "deals" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "email_log_org_idx" ON "email_log" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "email_log_status_idx" ON "email_log" USING btree ("status");--> statement-breakpoint
CREATE INDEX "email_log_template_idx" ON "email_log" USING btree ("template_name");--> statement-breakpoint
CREATE INDEX "email_log_to_idx" ON "email_log" USING btree ("to");--> statement-breakpoint
CREATE INDEX "email_log_created_at_idx" ON "email_log" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "lead_attr_contact_idx" ON "lead_attribution" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "lead_attr_source_idx" ON "lead_attribution" USING btree ("source");--> statement-breakpoint
CREATE INDEX "lead_attr_meta_leadgen_idx" ON "lead_attribution" USING btree ("meta_leadgen_id");--> statement-breakpoint
CREATE INDEX "field_mapping_route_idx" ON "lead_field_mappings" USING btree ("route_id");--> statement-breakpoint
CREATE UNIQUE INDEX "field_mapping_route_source_idx" ON "lead_field_mappings" USING btree ("route_id","source_field_key");--> statement-breakpoint
CREATE INDEX "ingest_route_org_idx" ON "lead_ingest_routes" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "ingest_route_source_idx" ON "lead_ingest_routes" USING btree ("source");--> statement-breakpoint
CREATE UNIQUE INDEX "ingest_route_meta_unique_idx" ON "lead_ingest_routes" USING btree ("meta_page_id","meta_form_id");--> statement-breakpoint
CREATE UNIQUE INDEX "membership_user_org_idx" ON "memberships" USING btree ("user_id","org_id");--> statement-breakpoint
CREATE INDEX "meta_conn_org_idx" ON "meta_connections" USING btree ("org_id");--> statement-breakpoint
CREATE UNIQUE INDEX "meta_conn_org_user_idx" ON "meta_connections" USING btree ("org_id","meta_user_id");--> statement-breakpoint
CREATE INDEX "meta_form_org_idx" ON "meta_forms" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "meta_form_page_idx" ON "meta_forms" USING btree ("page_id");--> statement-breakpoint
CREATE UNIQUE INDEX "meta_form_page_form_idx" ON "meta_forms" USING btree ("page_id","form_id");--> statement-breakpoint
CREATE INDEX "meta_page_org_idx" ON "meta_pages" USING btree ("org_id");--> statement-breakpoint
CREATE UNIQUE INDEX "meta_page_org_page_idx" ON "meta_pages" USING btree ("org_id","page_id");--> statement-breakpoint
CREATE INDEX "note_workspace_idx" ON "notes" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "note_contact_idx" ON "notes" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "note_deal_idx" ON "notes" USING btree ("deal_id");--> statement-breakpoint
CREATE INDEX "outbox_status_idx" ON "outbox_events" USING btree ("status");--> statement-breakpoint
CREATE INDEX "outbox_scheduled_idx" ON "outbox_events" USING btree ("scheduled_for");--> statement-breakpoint
CREATE INDEX "outbox_org_idx" ON "outbox_events" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "outbox_workspace_idx" ON "outbox_events" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "outbox_event_type_idx" ON "outbox_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "stage_pipeline_idx" ON "pipeline_stages" USING btree ("pipeline_id");--> statement-breakpoint
CREATE INDEX "stage_order_idx" ON "pipeline_stages" USING btree ("pipeline_id","order");--> statement-breakpoint
CREATE INDEX "pipeline_workspace_idx" ON "pipelines" USING btree ("workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX "webhook_event_idempotency_idx" ON "webhook_events" USING btree ("provider","external_event_id");--> statement-breakpoint
CREATE INDEX "webhook_event_status_idx" ON "webhook_events" USING btree ("status");--> statement-breakpoint
CREATE INDEX "webhook_event_created_idx" ON "webhook_events" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_org_slug_idx" ON "workspaces" USING btree ("org_id","slug");