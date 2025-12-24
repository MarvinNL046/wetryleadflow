import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgencyBySlug } from "@/lib/actions/agency-saas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

interface Props {
  params: Promise<{ agencySlug: string }>;
  searchParams: Promise<{ org?: string }>;
}

export default async function SignupSuccessPage({ params, searchParams }: Props) {
  const { agencySlug } = await params;
  const { org: orgSlug } = await searchParams;

  // Get agency
  const agency = await getAgencyBySlug(agencySlug);

  if (!agency) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"
      style={{
        "--primary-color": agency.primaryColor || "#8b5cf6",
      } as React.CSSProperties}
    >
      <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
        <Card className="w-full border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Welcome Aboard!</CardTitle>
            <CardDescription className="text-base">
              Your account has been created successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
              <h3 className="font-medium">What&apos;s Next?</h3>
              <ul className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    1
                  </div>
                  <span>
                    Check your email for login instructions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    2
                  </div>
                  <span>
                    Set up your workspace and invite team members
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    3
                  </div>
                  <span>
                    Connect your lead sources and start closing deals
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Check Your Inbox
                  </p>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    We&apos;ve sent you an email with instructions to set up
                    your password and access your new account.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
              <Link href={`/${agencySlug}/crm`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
