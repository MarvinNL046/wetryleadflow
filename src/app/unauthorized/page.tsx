import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        You don&apos;t have permission to access this page.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Go back home
      </Link>
    </div>
  );
}
