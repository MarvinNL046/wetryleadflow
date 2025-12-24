"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Phone,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import type { LeadPriorityInsight, PriorityLead, WarningLead } from "@/lib/ai";
import { cn } from "@/lib/utils";

interface LeadPriorityCardProps {
  insight: LeadPriorityInsight | null;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onLeadClick?: (leadId: number) => void;
  className?: string;
}

const urgencyConfig = {
  critical: { color: "bg-red-500", text: "Kritiek", icon: AlertTriangle },
  high: { color: "bg-orange-500", text: "Hoog", icon: TrendingUp },
  medium: { color: "bg-yellow-500", text: "Medium", icon: Clock },
  low: { color: "bg-gray-500", text: "Laag", icon: Clock },
} as const;

function PriorityLeadItem({
  lead,
  onLeadClick,
}: {
  lead: PriorityLead;
  onLeadClick?: (leadId: number) => void;
}) {
  const config = urgencyConfig[lead.urgency];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "group flex items-start gap-3 p-3 rounded-lg border border-border/50",
        "hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
      )}
      onClick={() => onLeadClick?.(lead.leadId)}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
          config.color
        )}
      >
        {lead.priorityRank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-1.5 py-0",
              lead.urgency === "critical" && "border-red-500 text-red-600",
              lead.urgency === "high" && "border-orange-500 text-orange-600"
            )}
          >
            <Icon className="w-3 h-3 mr-1" />
            {config.text}
          </Badge>
          {lead.estimatedValue && (
            <span className="text-xs text-muted-foreground">
              €{lead.estimatedValue.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-sm font-medium truncate">{lead.reason}</p>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {lead.recommendedAction}
        </p>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function WarningLeadItem({
  lead,
  onLeadClick,
}: {
  lead: WarningLead;
  onLeadClick?: (leadId: number) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 p-2 rounded-md bg-amber-50 dark:bg-amber-950/30",
        "border border-amber-200 dark:border-amber-800/50 cursor-pointer",
        "hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
      )}
      onClick={() => onLeadClick?.(lead.leadId)}
    >
      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-amber-800 dark:text-amber-200">{lead.warning}</p>
        {lead.daysInactive && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
            {lead.daysInactive} dagen inactief
          </p>
        )}
      </div>
    </div>
  );
}

export function LeadPriorityCard({
  insight,
  isLoading,
  isRefreshing,
  onRefresh,
  onLeadClick,
  className,
}: LeadPriorityCardProps) {
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!insight) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Lead Prioriteit
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Sparkles className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              AI inzichten worden gegenereerd...
            </p>
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="mt-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Genereren
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const topPriorityLeads = insight.priorityLeads.slice(0, 5);
  const topWarnings = insight.warningLeads.slice(0, 3);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Lead Prioriteit
          </CardTitle>
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 w-8"
            >
              <RefreshCw
                className={cn("w-4 h-4", isRefreshing && "animate-spin")}
              />
            </Button>
          )}
        </div>
        {insight.insightsSummary && (
          <p className="text-sm text-muted-foreground mt-1">
            {insight.insightsSummary}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Priority Leads */}
        {topPriorityLeads.length > 0 ? (
          <div className="space-y-2">
            {topPriorityLeads.map((lead) => (
              <PriorityLeadItem
                key={lead.leadId}
                lead={lead}
                onLeadClick={onLeadClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Geen prioritaire leads gevonden
          </p>
        )}

        {/* Warning Leads */}
        {topWarnings.length > 0 && (
          <div className="pt-2 border-t">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Aandachtspunten
            </h4>
            <div className="space-y-2">
              {topWarnings.map((lead) => (
                <WarningLeadItem
                  key={lead.leadId}
                  lead={lead}
                  onLeadClick={onLeadClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Meta info */}
        <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{insight.dataPoints} leads geanalyseerd</span>
          <span>
            {new Date(insight.generatedAt).toLocaleTimeString("nl-NL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default LeadPriorityCard;
