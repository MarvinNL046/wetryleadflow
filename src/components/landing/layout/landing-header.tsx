"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, Brain, Target, Megaphone, Gauge, Users, BarChart3, Zap, Building, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { GlowButton } from "../ui/glow-button";

const resourceCategories = [
  {
    title: "Lead Generation",
    description: "Capture high-quality leads",
    icon: Target,
    href: "/resources/lead-generation",
    color: "from-blue-500 to-cyan-500",
    items: [
      { title: "Lead Magnets", href: "/resources/lead-generation/lead-magnets" },
      { title: "Landing Pages", href: "/resources/lead-generation/landing-pages" },
      { title: "Form Optimization", href: "/resources/lead-generation/form-optimization" },
      { title: "Lead Capture Tools", href: "/resources/lead-generation/lead-capture-tools" },
      { title: "Traffic Sources", href: "/resources/lead-generation/traffic-sources" },
    ],
  },
  {
    title: "AI & Automation",
    description: "AI-powered sales tools",
    icon: Brain,
    href: "/resources/ai-automation",
    color: "from-purple-500 to-pink-500",
    items: [
      { title: "AI Lead Scoring", href: "/resources/ai-automation/ai-lead-scoring" },
      { title: "Predictive Analytics", href: "/resources/ai-automation/predictive-analytics" },
      { title: "Smart Lead Routing", href: "/resources/ai-automation/smart-lead-routing" },
      { title: "Automation Workflows", href: "/resources/ai-automation/automation-workflows" },
      { title: "Machine Learning CRM", href: "/resources/ai-automation/machine-learning-crm" },
    ],
  },
  {
    title: "CRM Best Practices",
    description: "Optimize your CRM",
    icon: BookOpen,
    href: "/resources/crm-best-practices",
    color: "from-green-500 to-emerald-500",
    items: [
      { title: "Pipeline Setup", href: "/resources/crm-best-practices/pipeline-setup" },
      { title: "Deal Tracking", href: "/resources/crm-best-practices/deal-tracking" },
      { title: "CRM Migration", href: "/resources/crm-best-practices/crm-migration" },
      { title: "CRM Customization", href: "/resources/crm-best-practices/crm-customization" },
      { title: "Data Hygiene", href: "/resources/crm-best-practices/data-hygiene" },
    ],
  },
  {
    title: "Meta Ads",
    description: "Facebook & Instagram leads",
    icon: Megaphone,
    href: "/resources/meta-ads",
    color: "from-blue-600 to-indigo-600",
    items: [
      { title: "Facebook Lead Ads", href: "/resources/meta-ads/facebook-lead-ads" },
      { title: "Instagram Leads", href: "/resources/meta-ads/instagram-lead-generation" },
      { title: "Meta Lead Forms", href: "/resources/meta-ads/meta-lead-forms" },
      { title: "Ad Optimization", href: "/resources/meta-ads/ad-optimization" },
      { title: "Audience Targeting", href: "/resources/meta-ads/audience-targeting" },
    ],
  },
  {
    title: "Sales Automation",
    description: "Automate your workflow",
    icon: Zap,
    href: "/resources/sales-automation",
    color: "from-yellow-500 to-orange-500",
    items: [
      { title: "Email Sequences", href: "/resources/sales-automation/email-sequences" },
      { title: "Follow-up Automation", href: "/resources/sales-automation/follow-up-automation" },
      { title: "Task Automation", href: "/resources/sales-automation/task-automation" },
      { title: "Appointment Scheduling", href: "/resources/sales-automation/appointment-scheduling" },
      { title: "Smart Notifications", href: "/resources/sales-automation/smart-notifications" },
    ],
  },
];

const moreResources = [
  { title: "Pipeline Management", href: "/resources/pipeline-management", icon: Gauge },
  { title: "Contact Management", href: "/resources/contact-management", icon: Users },
  { title: "Sales Analytics", href: "/resources/sales-analytics", icon: BarChart3 },
  { title: "Team Collaboration", href: "/resources/team-collaboration", icon: Users },
  { title: "Industry Solutions", href: "/resources/industry-solutions", icon: Building },
];

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "For Agencies", href: "/agency-signup", highlight: true },
];

function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg bg-muted/50 animate-pulse" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-9 w-9 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        )}
      />
    </button>
  );
}

function ResourcesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        Resources
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] p-6 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-3 gap-6">
              {/* Main Categories */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {resourceCategories.map((category) => (
                  <Link
                    key={category.title}
                    href={category.href}
                    className="group p-3 rounded-xl hover:bg-accent/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("p-2 rounded-lg bg-gradient-to-br", category.color)}>
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {category.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* More Resources Sidebar */}
              <div className="border-l border-border pl-6">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  More Resources
                </h4>
                <div className="space-y-1">
                  {moreResources.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center gap-2 p-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    href="/resources"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-sm font-medium text-primary hover:from-purple-500/20 hover:to-blue-500/20 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Resources
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        hasScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/wetryleadflow-logo-trans-bg.webp"
              alt="LeadFlow"
              width={40}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="text-xl font-bold">
              Lead<span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Flow</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  item.highlight
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <ResourcesMegaMenu />
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitch />
            <Link
              href="/handler/sign-in"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link href="/get-started">
              <GlowButton size="sm">Start Free</GlowButton>
            </Link>
          </div>

          {/* Mobile: Theme + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeSwitch />
            <button
              className="p-2 rounded-lg hover:bg-accent"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <div className="py-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors py-2 px-2 rounded-lg hover:bg-accent",
                      item.highlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile Resources Dropdown */}
                <div>
                  <button
                    className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-2 rounded-lg hover:bg-accent"
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  >
                    Resources
                    <ChevronDown className={cn("w-4 h-4 transition-transform", mobileResourcesOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {mobileResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-2 space-y-1">
                          {[...resourceCategories, ...moreResources.map(r => ({ title: r.title, href: r.href }))].map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="block text-sm text-muted-foreground hover:text-foreground py-1.5 px-2 rounded-lg hover:bg-accent"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileResourcesOpen(false);
                              }}
                            >
                              {item.title}
                            </Link>
                          ))}
                          <Link
                            href="/resources"
                            className="block text-sm font-medium text-primary py-1.5 px-2"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileResourcesOpen(false);
                            }}
                          >
                            View All →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                  <Link
                    href="/handler/sign-in"
                    className="text-sm font-medium text-center py-2 rounded-lg hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                    <GlowButton size="sm" className="w-full">
                      Start Free
                    </GlowButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
