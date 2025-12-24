# Generate SEO Pages

Generate 50 SEO-optimized landing pages for LeadFlow using parallel agents.

## Workflow

Follow the SEO Page Generator Orchestrator workflow in `.claude/CLAUDE.md`:

1. **Discovery**: Analyze LeadFlow's existing pages, components, and design system
2. **Strategy**: Generate 10 pillar topics and 50 subpillar topics
3. **Brief Agents**: Prepare design system and content requirements
4. **Spawn Parallel Agents**: Use Task tool to spawn 10 seo-designer agents simultaneously
5. **Collect Output**: Verify all 50 pages generated correctly
6. **Update Navigation**: Add new pages to sitemap and navigation

## Quick Start

To generate SEO pages:
1. Read the existing landing page components in `/src/components/landing/`
2. Analyze the design patterns (colors, typography, animations)
3. Generate pillar/subpillar topic strategy
4. Spawn 10 agents in parallel using the Task tool
5. Each agent creates 5 pages following the seo-designer agent spec

## Example Pillars for LeadFlow

1. Lead Generation Strategies
2. CRM Best Practices
3. AI in Sales
4. Meta Ads Integration
5. Sales Automation
6. Pipeline Management
7. Contact Management
8. Sales Analytics
9. Team Collaboration
10. Industry Solutions

Start the workflow now!
