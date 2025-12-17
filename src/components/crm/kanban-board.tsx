"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { moveDealStage } from "@/lib/actions/crm";
import { DealDrawer } from "./deal-drawer";
import { CreateDealDialog } from "./create-deal-dialog";
import type { Contact } from "@/lib/db/schema";
import { GripVertical, Plus } from "lucide-react";

interface Stage {
  id: number;
  name: string;
  color: string | null;
  order: number;
  deals: Array<{
    id: number;
    title: string;
    value: string | null;
    contact: Contact | null;
  }>;
}

interface KanbanBoardProps {
  pipelineId: number;
  pipelineName: string;
  stages: Stage[];
  contacts: Contact[];
}

export function KanbanBoard({
  pipelineId,
  pipelineName,
  stages,
  contacts,
}: KanbanBoardProps) {
  const [draggingDealId, setDraggingDealId] = useState<number | null>(null);
  const [selectedDealId, setSelectedDealId] = useState<number | null>(null);

  function handleDragStart(e: React.DragEvent, dealId: number) {
    setDraggingDealId(dealId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  async function handleDrop(e: React.DragEvent, stageId: number) {
    e.preventDefault();
    if (draggingDealId) {
      await moveDealStage(draggingDealId, stageId);
      setDraggingDealId(null);
    }
  }

  function handleDragEnd() {
    setDraggingDealId(null);
  }

  return (
    <>
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="flex w-72 flex-shrink-0 flex-col rounded-lg bg-zinc-100 dark:bg-zinc-900"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div
              className="flex items-center justify-between rounded-t-lg p-3"
              style={{ borderTop: `3px solid ${stage.color ?? "#6366f1"}` }}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{stage.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {stage.deals.length}
                </Badge>
              </div>
              <CreateDealDialog
                pipelineId={pipelineId}
                stageId={stage.id}
                contacts={contacts}
                trigger={
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                }
              />
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-2">
              {stage.deals.map((deal) => (
                <Card
                  key={deal.id}
                  className={`cursor-pointer transition-shadow hover:shadow-md ${
                    draggingDealId === deal.id ? "opacity-50" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedDealId(deal.id)}
                >
                  <CardHeader className="p-3 pb-1">
                    <div className="flex items-start gap-2">
                      <GripVertical className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-grab text-zinc-400" />
                      <CardTitle className="text-sm font-medium leading-tight">
                        {deal.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    {deal.contact && (
                      <p className="text-xs text-zinc-500">
                        {[deal.contact.firstName, deal.contact.lastName]
                          .filter(Boolean)
                          .join(" ")}
                      </p>
                    )}
                    {deal.value && (
                      <p className="mt-1 text-sm font-semibold">
                        {new Intl.NumberFormat("nl-NL", {
                          style: "currency",
                          currency: "EUR",
                        }).format(parseFloat(deal.value))}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <DealDrawer
        dealId={selectedDealId}
        open={selectedDealId !== null}
        onClose={() => setSelectedDealId(null)}
      />
    </>
  );
}
