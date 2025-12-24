import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContacts, getPipelines, getOpportunities, getNewLeads } from "@/lib/actions/crm";
import { getCrmSettings } from "@/lib/actions/crm-settings";
import {
  Users,
  Kanban,
  DollarSign,
  Plus,
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  Activity,
} from "lucide-react";
import { CRMDashboard } from "./dashboard-content";

export default async function CRMPage() {
  const [contacts, pipelines, opportunities, newLeads, crmSettings] = await Promise.all([
    getContacts(),
    getPipelines(),
    getOpportunities(),
    getNewLeads(),
    getCrmSettings(),
  ]);

  const totalValue = opportunities.reduce((sum, opportunity) => {
    return sum + (opportunity.value ? parseFloat(opportunity.value) : 0);
  }, 0);

  // Calculate some mock trends (in real app, compare with previous period)
  // Check for "won" stage by looking at stage name
  const wonOpportunities = opportunities.filter(o =>
    o.stage?.name?.toLowerCase() === "won" ||
    o.stage?.name?.toLowerCase() === "closed won"
  );

  const stats = {
    contacts: contacts.length,
    opportunities: opportunities.length,
    totalValue,
    pipelines: pipelines.length,
    conversionRate: opportunities.length > 0
      ? Math.round((wonOpportunities.length / opportunities.length) * 100)
      : 0,
  };

  return (
    <CRMDashboard
      stats={stats}
      hasPipelines={pipelines.length > 0}
      pipelines={pipelines.map(p => ({ id: p.id, name: p.name }))}
      recentContacts={contacts.slice(0, 5)}
      recentOpportunities={opportunities.slice(0, 5)}
      newLeads={newLeads}
      callbackPeriods={crmSettings.callbackPeriods}
      maxCallAttempts={crmSettings.maxCallAttempts}
    />
  );
}
