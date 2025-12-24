-- AI Insights Tables Migration
-- Run this manually if db:push has issues with interactive prompts

-- Create enums
DO $$ BEGIN
    CREATE TYPE ai_insight_type AS ENUM ('lead_priority', 'pipeline_health', 'next_actions', 'performance');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_insight_status AS ENUM ('valid', 'stale', 'generating', 'error');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_insight_feedback_type AS ENUM ('acted', 'dismissed', 'helpful', 'not_helpful');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create ai_insights_cache table
CREATE TABLE IF NOT EXISTS ai_insights_cache (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    insight_type ai_insight_type NOT NULL,
    data JSONB NOT NULL,
    generated_at TIMESTAMP DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    input_tokens INTEGER,
    output_tokens INTEGER,
    status ai_insight_status DEFAULT 'valid' NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for ai_insights_cache
CREATE INDEX IF NOT EXISTS ai_insights_workspace_idx ON ai_insights_cache(workspace_id);
CREATE INDEX IF NOT EXISTS ai_insights_type_idx ON ai_insights_cache(insight_type);
CREATE INDEX IF NOT EXISTS ai_insights_status_idx ON ai_insights_cache(status);
CREATE INDEX IF NOT EXISTS ai_insights_expires_idx ON ai_insights_cache(expires_at);

-- Create ai_insight_feedback table
CREATE TABLE IF NOT EXISTS ai_insight_feedback (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    insight_type ai_insight_type NOT NULL,
    feedback_type ai_insight_feedback_type NOT NULL,
    insight_cache_id INTEGER REFERENCES ai_insights_cache(id) ON DELETE SET NULL,
    entity_type VARCHAR(50),
    entity_id INTEGER,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for ai_insight_feedback
CREATE INDEX IF NOT EXISTS ai_feedback_workspace_idx ON ai_insight_feedback(workspace_id);
CREATE INDEX IF NOT EXISTS ai_feedback_type_idx ON ai_insight_feedback(insight_type);
CREATE INDEX IF NOT EXISTS ai_feedback_created_idx ON ai_insight_feedback(created_at);

-- Done!
SELECT 'AI tables migration completed successfully!' as status;
