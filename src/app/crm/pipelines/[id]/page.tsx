import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/crm/kanban-board";
import { getPipelineWithDeals, getContacts } from "@/lib/actions/crm";
import { ArrowLeft } from "lucide-react";

export default async function PipelineKanbanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pipelineId = parseInt(id, 10);

  if (isNaN(pipelineId)) {
    notFound();
  }

  const [pipeline, contacts] = await Promise.all([
    getPipelineWithDeals(pipelineId),
    getContacts(),
  ]);

  if (!pipeline) {
    notFound();
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center gap-4 border-b border-zinc-200 p-4 dark:border-zinc-800">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/crm/pipelines">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold">{pipeline.name}</h1>
          <p className="text-sm text-zinc-500">
            {pipeline.stages.reduce((sum, s) => sum + s.deals.length, 0)} deals
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          pipelineId={pipeline.id}
          pipelineName={pipeline.name}
          stages={pipeline.stages}
          contacts={contacts}
        />
      </div>
    </div>
  );
}
