export default function Loading() {
  // Global loading state with animated logo/spinner
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        {/* Animated gradient spinner */}
        <div className="relative">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-violet-500 dark:border-zinc-800 dark:border-t-violet-400" />
        </div>
        {/* Brand name */}
        <div className="text-lg font-bold">
          Lead<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Flow</span>
        </div>
      </div>
    </div>
  );
}
