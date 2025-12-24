"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Lock, AlertCircle, RefreshCw } from "lucide-react";
import { LeadPriorityCard } from "./lead-priority-card";
import type { LeadPriorityInsight } from "@/lib/ai";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface InsightsData {
  available: boolean;
  reason?: string;
  requiredTier?: string;
  insights?: {
    leadPriority: LeadPriorityInsight | null;
    leadPriorityCached: boolean;
    leadPriorityGenerating: boolean;
    pipelineHealth: null;
    nextActions: null;
    performance: null;
  };
}

interface AIInsightsPanelProps {
  className?: string;
}

export function AIInsightsPanel({ className }: AIInsightsPanelProps) {
  const router = useRouter();
  const [data, setData] = useState<InsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    try {
      const response = await fetch("/api/ai/insights");
      if (!response.ok) {
        throw new Error("Failed to fetch insights");
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/ai/insights/lead-priority", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to refresh insights");
      }
      // Refetch all insights
      await fetchInsights();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh");
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchInsights]);

  const handleLeadClick = useCallback(
    (leadId: number) => {
      router.push(`/crm/contacts/${leadId}`);
    },
    [router]
  );

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  // Loading state
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-20 w-full mb-2" />
          <Skeleton className="h-20 w-full mb-2" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className={cn(className, "border-destructive/50")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchInsights}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Opnieuw proberen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Not available (tier restriction)
  if (data && !data.available) {
    return (
      <Card className={cn(className, "bg-muted/30")}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-muted-foreground" />
              AI Insights
            </CardTitle>
            <Badge variant="secondary">
              <Lock className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Lock className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <h4 className="font-medium mb-1">Upgrade naar Pro</h4>
            <p className="text-sm text-muted-foreground mb-4 max-w-[300px]">
              Ontgrendel AI-powered inzichten voor betere lead prioritering,
              pipeline analyse en meer.
            </p>
            <Button size="sm" onClick={() => router.push("/settings")}>
              Bekijk instellingen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Not configured (no API key)
  if (data?.reason === "AI_NOT_CONFIGURED") {
    return (
      <Card className={cn(className, "bg-muted/30")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertCircle className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">
              AI Insights zijn momenteel niet beschikbaar.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show insights
  return (
    <LeadPriorityCard
      className={className}
      insight={data?.insights?.leadPriority ?? null}
      isLoading={data?.insights?.leadPriorityGenerating}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      onLeadClick={handleLeadClick}
    />
  );
}

export default AIInsightsPanel;
