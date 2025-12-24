"use client";

import { SignUp, useUser } from "@stackframe/stack";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TrendingUp, Users, Shield, Check } from "lucide-react";

const benefits = [
  "AI-powered lead scoring and prioritization",
  "Seamless Meta & Google Ads integration",
  "Automated follow-up sequences",
  "Real-time pipeline analytics",
  "Team collaboration tools",
  "14-day free trial, no credit card required",
];

const testimonial = {
  quote:
    "LeadFlow transformed our sales process. We've seen a 40% increase in conversions since switching.",
  author: "Sarah Johnson",
  role: "Sales Director",
  company: "TechCorp",
};

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useUser();
  const afterAuthReturnTo = searchParams.get("after_auth_return_to");

  // Redirect to custom URL after sign up if specified
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
        <div className="absolute inset-0">
          <div className="absolute right-1/4 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/20 blur-[128px]" />
          <div
            className="absolute left-0 top-1/2 h-[400px] w-[400px] animate-pulse rounded-full bg-purple-500/15 blur-[128px]"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-0 right-1/3 h-[300px] w-[300px] animate-pulse rounded-full bg-cyan-500/10 blur-[100px]"
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
                Start Growing Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Business Today
                </span>
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                Join thousands of sales teams who trust LeadFlow to manage their
                pipeline and close more deals.
              </p>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  </div>
                  <span className="text-zinc-300">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <p className="text-lg italic text-zinc-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-zinc-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center gap-6 text-sm text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>256-bit SSL</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
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
            <h2 className="text-2xl font-bold tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Get started with your 14-day free trial
            </p>
          </div>

          {/* Stack Auth Sign Up Component */}
          <div className="flex justify-center">
            <SignUp />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href={afterAuthReturnTo ? `/handler/sign-in?after_auth_return_to=${encodeURIComponent(afterAuthReturnTo)}` : "/handler/sign-in"}
                className="font-medium text-purple-500 hover:text-purple-400"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
            By creating an account, you agree to our{" "}
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
