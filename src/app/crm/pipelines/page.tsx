import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreatePipelineDialog } from "@/components/crm/create-pipeline-dialog";
import { getPipelines } from "@/lib/actions/crm";
import { Kanban } from "lucide-react";

export default async function PipelinesPage() {
  const pipelines = await getPipelines();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pipelines</h1>
          <p className="text-zinc-500">
            {pipelines.length} pipeline{pipelines.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreatePipelineDialog />
      </div>

      {pipelines.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 py-12 dark:border-zinc-700">
          <Kanban className="mb-4 h-12 w-12 text-zinc-400" />
          <p className="mb-4 text-zinc-500">No pipelines yet</p>
          <CreatePipelineDialog />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pipelines.map((pipeline) => (
            <Link key={pipeline.id} href={`/crm/pipelines/${pipeline.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{pipeline.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {pipeline.stages.map((stage) => (
                      <Badge
                        key={stage.id}
                        variant="secondary"
                        style={{
                          backgroundColor: (stage.color ?? "#6366f1") + "20",
                          color: stage.color ?? "#6366f1"
                        }}
                      >
                        {stage.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
