"use client";

import { SignIn, useUser } from "@stackframe/stack";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TrendingUp, Users, Zap, Shield, ArrowRight } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Boost Conversions",
    description: "AI-powered lead scoring increases conversion rates by up to 40%",
  },
  {
    icon: Users,
    title: "Smart Lead Management",
    description: "Automatically organize and prioritize your leads",
  },
  {
    icon: Zap,
    title: "Instant Integrations",
    description: "Connect with Meta, Google, and 50+ platforms",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption for all your data",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "2M+", label: "Leads Processed" },
  { value: "99.9%", label: "Uptime" },
];

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useUser();
  const afterAuthReturnTo = searchParams.get("after_auth_return_to");

  // Redirect to custom URL after sign in if specified
  useEffect(() => {
    if (user && afterAuthReturnTo) {
      router.replace(afterAuthReturnTo);
    }
  }, [user, afterAuthReturnTo, router]);

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950" />
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/20 blur-[128px]" />
          <div
            className="absolute right-0 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full bg-blue-500/15 blur-[128px]"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-[300px] w-[300px] animate-pulse rounded-full bg-cyan-500/10 blur-[100px]"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/wetryleadflow-logo-trans-bg.webp"
                alt="LeadFlow"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <span className="text-2xl font-bold text-white">
                Lead<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Flow</span>
              </span>
            </Link>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold leading-tight text-white">
                Turn Every Lead Into{" "}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Revenue
                </span>
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                Join thousands of businesses using AI-powered lead management to
                close more deals faster.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <feature.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-zinc-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="flex w-full items-center justify-center bg-background px-6 lg:w-1/2 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center justify-center gap-3">
              <Image
                src="/logo/wetryleadflow-logo-trans-bg.webp"
                alt="LeadFlow"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">
                Lead<span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Flow</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Stack Auth Sign In Component */}
          <div className="flex justify-center">
            <SignIn />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href={afterAuthReturnTo ? `/handler/sign-up?after_auth_return_to=${encodeURIComponent(afterAuthReturnTo)}` : "/handler/sign-up"}
                className="font-medium text-purple-500 hover:text-purple-400"
              >
                Sign up for free
                <ArrowRight className="ml-1 inline h-3 w-3" />
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-zinc-400">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-zinc-400">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
