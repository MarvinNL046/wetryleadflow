import Link from "next/link";
import { stackServerApp } from "@/stack/server";

export default async function Home() {
  const user = await stackServerApp.getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">LeadFlow</h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          AI-powered lead generation platform
        </p>

        <div className="flex gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/handler/sign-out"
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/handler/sign-in"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Sign In
              </Link>
              <Link
                href="/handler/sign-up"
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
