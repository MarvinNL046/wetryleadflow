import { Skeleton } from "@/components/ui/skeleton";

export default function PipelinesLoading() {
  return (
    <div className="p-6 space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Pipeline tabs */}
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>

      {/* Kanban columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, col) => (
          <div key={col} className="w-72 flex-shrink-0">
            <div className="rounded-xl border bg-card">
              {/* Column header */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-6 w-8 rounded-full" />
                </div>
              </div>
              {/* Cards */}
              <div className="p-3 space-y-3">
                {[...Array(3)].map((_, card) => (
                  <div key={card} className="rounded-lg border bg-white p-4 dark:bg-zinc-900">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
