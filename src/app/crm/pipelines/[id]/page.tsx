import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/crm/kanban-board";
import { PipelineSettingsDialog } from "@/components/crm/pipeline-settings-dialog";
import { getPipelineWithOpportunities, getContacts } from "@/lib/actions/crm";
import { ArrowLeft, TrendingUp, Target, DollarSign, Users, CheckCircle2, XCircle } from "lucide-react";

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
    getPipelineWithOpportunities(pipelineId),
    getContacts(),
  ]);

  if (!pipeline) {
    notFound();
  }

  // Calculate pipeline stats
  const allOpportunities = pipeline.stages.flatMap(s => s.opportunities);
  const totalOpportunities = allOpportunities.length;
  const totalValue = allOpportunities.reduce(
    (sum, opp) => sum + (opp.value ? parseFloat(opp.value) : 0),
    0
  );

  // Find won/lost stages by common naming patterns
  const wonStages = pipeline.stages.filter(s =>
    s.name.toLowerCase().includes("won") ||
    s.name.toLowerCase().includes("closed won") ||
    s.name.toLowerCase().includes("gewonnen")
  );
  const lostStages = pipeline.stages.filter(s =>
    s.name.toLowerCase().includes("lost") ||
    s.name.toLowerCase().includes("closed lost") ||
    s.name.toLowerCase().includes("verloren")
  );

  const wonOpportunities = wonStages.flatMap(s => s.opportunities);
  const lostOpportunities = lostStages.flatMap(s => s.opportunities);

  const wonCount = wonOpportunities.length;
  const lostCount = lostOpportunities.length;
  const wonValue = wonOpportunities.reduce(
    (sum, opp) => sum + (opp.value ? parseFloat(opp.value) : 0),
    0
  );

  // Active = not won and not lost
  const activeCount = totalOpportunities - wonCount - lostCount;

  // Win rate calculation
  const closedCount = wonCount + lostCount;
  const winRate = closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-950/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-lg">
              <Link href="/crm/pipelines">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">{pipeline.name}</h1>
              <p className="text-sm text-zinc-500">
                {pipeline.stages.length} stages · {totalOpportunities} opportunities
              </p>
            </div>
          </div>
          <PipelineSettingsDialog
            pipelineId={pipeline.id}
            pipelineName={pipeline.name}
            stages={pipeline.stages}
          />
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-3 border-t border-zinc-200/50 p-4 dark:border-zinc-800/50 sm:grid-cols-3 lg:grid-cols-6">
          {/* Total Value */}
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100/50 p-3 dark:bg-zinc-900/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20">
              <DollarSign className="h-4 w-4 text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Total Value</p>
              <p className="font-semibold">{formatCurrency(totalValue)}</p>
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100/50 p-3 dark:bg-zinc-900/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Active</p>
              <p className="font-semibold">{activeCount}</p>
            </div>
          </div>

          {/* Won */}
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100/50 p-3 dark:bg-zinc-900/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Won</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{wonCount}</p>
            </div>
          </div>

          {/* Lost */}
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100/50 p-3 dark:bg-zinc-900/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500/20 to-rose-500/20">
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Lost</p>
              <p className="font-semibold text-red-600 dark:text-red-400">{lostCount}</p>
            </div>
          </div>

          {/* Won Value */}
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100/50 p-3 dark:bg-zinc-900/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Won Value</p>
              <p className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(wonValue)}</p>
            </div>
          </div>

          {/* Win Rate */}
          <div className="flex items-center gap-3 rounded-lg bg-zinc-100/50 p-3 dark:bg-zinc-900/50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20">
              <Users className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Win Rate</p>
              <p className="font-semibold">
                {winRate}%
                {closedCount === 0 && <span className="ml-1 text-xs font-normal text-zinc-400">N/A</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
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
