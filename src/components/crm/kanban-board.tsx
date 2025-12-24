"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { moveOpportunityStage } from "@/lib/actions/crm";
import { OpportunityDrawer } from "./opportunity-drawer";
import { CreateOpportunityDialog } from "./create-opportunity-dialog";
import type { Contact } from "@/lib/db/schema";
import { GripVertical, Plus, DollarSign, User, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnrichedContact extends Contact {
  leadSource: string | null;
  metaFormName: string | null;
}

interface Stage {
  id: number;
  name: string;
  color: string | null;
  order: number;
  opportunities: Array<{
    id: number;
    title: string;
    value: string | null;
    contact: EnrichedContact | null;
  }>;
}

interface KanbanBoardProps {
  pipelineId: number;
  pipelineName: string;
  stages: Stage[];
  contacts: Contact[];
}

// Stage color mapping for gradients
const stageColorMap: Record<string, { gradient: string; badge: string; glow: string }> = {
  "#3b82f6": { gradient: "from-blue-500/20 to-cyan-500/20", badge: "bg-blue-500/20 text-blue-600 dark:text-blue-400", glow: "rgba(59, 130, 246, 0.2)" },
  "#8b5cf6": { gradient: "from-violet-500/20 to-purple-500/20", badge: "bg-violet-500/20 text-violet-600 dark:text-violet-400", glow: "rgba(139, 92, 246, 0.2)" },
  "#f59e0b": { gradient: "from-amber-500/20 to-yellow-500/20", badge: "bg-amber-500/20 text-amber-600 dark:text-amber-400", glow: "rgba(245, 158, 11, 0.2)" },
  "#22c55e": { gradient: "from-green-500/20 to-emerald-500/20", badge: "bg-green-500/20 text-green-600 dark:text-green-400", glow: "rgba(34, 197, 94, 0.2)" },
  "#ef4444": { gradient: "from-red-500/20 to-rose-500/20", badge: "bg-red-500/20 text-red-600 dark:text-red-400", glow: "rgba(239, 68, 68, 0.2)" },
  "#6366f1": { gradient: "from-indigo-500/20 to-violet-500/20", badge: "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400", glow: "rgba(99, 102, 241, 0.2)" },
};

const getStageColors = (color: string | null) => {
  const defaultColors = stageColorMap["#6366f1"];
  if (!color) return defaultColors;
  return stageColorMap[color] || defaultColors;
};

export function KanbanBoard({
  pipelineId,
  pipelineName,
  stages,
  contacts,
}: KanbanBoardProps) {
  const [draggingOpportunityId, setDraggingOpportunityId] = useState<number | null>(null);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<number | null>(null);
  const [dropTargetStageId, setDropTargetStageId] = useState<number | null>(null);

  function handleDragStart(e: React.DragEvent, opportunityId: number) {
    setDraggingOpportunityId(opportunityId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent, stageId: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTargetStageId(stageId);
  }

  function handleDragLeave() {
    setDropTargetStageId(null);
  }

  async function handleDrop(e: React.DragEvent, stageId: number) {
    e.preventDefault();
    if (draggingOpportunityId) {
      await moveOpportunityStage(draggingOpportunityId, stageId);
      setDraggingOpportunityId(null);
      setDropTargetStageId(null);
    }
  }

  function handleDragEnd() {
    setDraggingOpportunityId(null);
    setDropTargetStageId(null);
  }

  const formatCurrency = (value: string) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(parseFloat(value));

  // Calculate total pipeline value
  const totalValue = stages.reduce((sum, stage) =>
    sum + stage.opportunities.reduce((stageSum, opp) =>
      stageSum + (opp.value ? parseFloat(opp.value) : 0), 0), 0);

  return (
    <>
      {/* Kanban Board */}
      <div className="flex h-full gap-4 overflow-x-auto p-6">
        {stages.map((stage, stageIndex) => {
          const colors = getStageColors(stage.color);
          const isDropTarget = dropTargetStageId === stage.id;
          const stageValue = stage.opportunities.reduce(
            (sum, opp) => sum + (opp.value ? parseFloat(opp.value) : 0),
            0
          );

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
              className={cn(
                "flex w-80 flex-shrink-0 flex-col rounded-xl border bg-white/80 backdrop-blur-sm transition-all dark:bg-zinc-900/80",
                isDropTarget
                  ? "border-violet-500/50 ring-2 ring-violet-500/20"
                  : "border-zinc-200/50 dark:border-zinc-800/50"
              )}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
              style={{
                boxShadow: isDropTarget ? `0 0 30px ${colors.glow}` : undefined,
              }}
            >
              {/* Stage Header */}
              <div className="relative overflow-hidden rounded-t-xl border-b border-zinc-200/50 p-4 dark:border-zinc-800/50">
                {/* Background gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-50",
                    colors.gradient
                  )}
                />

                {/* Top color accent */}
                <div
                  className="absolute left-0 right-0 top-0 h-1"
                  style={{ backgroundColor: stage.color ?? "#6366f1" }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stage.name}</span>
                    <Badge
                      className={cn(
                        "border-0 text-xs font-medium",
                        colors.badge
                      )}
                    >
                      {stage.opportunities.length}
                    </Badge>
                  </div>
                  <CreateOpportunityDialog
                    pipelineId={pipelineId}
                    stageId={stage.id}
                    contacts={contacts}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>

                {/* Stage value */}
                {stageValue > 0 && (
                  <p className="relative mt-1 text-xs text-zinc-500">
                    {formatCurrency(String(stageValue))}
                  </p>
                )}
              </div>

              {/* Opportunities List */}
              <div className="flex-1 space-y-3 overflow-y-auto p-3">
                <AnimatePresence>
                  {stage.opportunities.map((opportunity, oppIndex) => {
                    const contactName = opportunity.contact
                      ? [opportunity.contact.firstName, opportunity.contact.lastName]
                          .filter(Boolean)
                          .join(" ")
                      : null;
                    const contactInitial =
                      opportunity.contact?.firstName?.[0] ??
                      opportunity.contact?.email?.[0]?.toUpperCase() ??
                      "?";

                    return (
                      <motion.div
                        key={opportunity.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: oppIndex * 0.05 }}
                        layout
                      >
                        <Card
                          className={cn(
                            "group cursor-pointer border-zinc-200/50 bg-white transition-all hover:border-violet-500/30 hover:shadow-lg dark:border-zinc-800/50 dark:bg-zinc-900 dark:hover:border-violet-500/30",
                            draggingOpportunityId === opportunity.id && "opacity-50 ring-2 ring-violet-500"
                          )}
                          draggable
                          onDragStart={(e) => handleDragStart(e, opportunity.id)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setSelectedOpportunityId(opportunity.id)}
                        >
                          <CardHeader className="p-3 pb-2">
                            <div className="flex items-start gap-2">
                              <GripVertical className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-grab text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-zinc-600" />
                              <div className="flex-1">
                                <CardTitle className="text-sm font-medium leading-tight">
                                  {opportunity.title}
                                </CardTitle>
                                {/* Form source badge */}
                                {opportunity.contact?.metaFormName && (
                                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                    <Megaphone className="h-2.5 w-2.5" />
                                    {opportunity.contact.metaFormName}
                                  </span>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <div className="flex items-center justify-between">
                              {/* Contact */}
                              {opportunity.contact ? (
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] text-white">
                                      {contactInitial}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {contactName}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                  <User className="h-3 w-3" />
                                  No contact
                                </div>
                              )}

                              {/* Value */}
                              {opportunity.value && (
                                <div className="flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5">
                                  <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
                                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                    {formatCurrency(opportunity.value)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Empty state */}
                {stage.opportunities.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 py-8 dark:border-zinc-800">
                    <p className="text-sm text-zinc-400">No opportunities</p>
                    <CreateOpportunityDialog
                      pipelineId={pipelineId}
                      stageId={stage.id}
                      contacts={contacts}
                      trigger={
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Plus className="mr-1 h-3 w-3" />
                          Add one
                        </Button>
                      }
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <OpportunityDrawer
        opportunityId={selectedOpportunityId}
        open={selectedOpportunityId !== null}
        onClose={() => setSelectedOpportunityId(null)}
      />
    </>
  );
}
