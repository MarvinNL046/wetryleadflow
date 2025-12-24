"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createAgency, checkSlugAvailable } from "@/lib/actions/agency";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import {
  Building2,
  Palette,
  Rocket,
  Users,
  Check,
  X,
  Loader2,
  ArrowRight,
  Zap,
  CreditCard,
  Sparkles,
  Crown,
  TrendingUp,
  Globe,
  Shield,
  BarChart3,
  Settings,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Calculator,
  Target,
  Layers,
  Clock,
  HeadphonesIcon,
  Workflow,
  PiggyBank,
  Receipt,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const PRICING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: 97,
    description: "Perfect voor kleine agencies die net beginnen",
    maxOrgs: 3,
    saasEnabled: false,
    popular: false,
    features: [
      "3 sub-accounts (klanten)",
      "Basis whitelabel branding",
      "Email support",
      "Volledige CRM features",
      "Meta Lead Ads integratie",
      "Pipeline management",
      "Offertes & Facturen module",
      "Terugkerende facturen",
    ],
    notIncluded: [
      "Onbeperkt sub-accounts",
      "Automatische klant-facturatie",
      "Stripe Connect",
      "Klant self-signup",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 297,
    description: "Voor groeiende agencies met meerdere klanten",
    maxOrgs: -1,
    saasEnabled: false,
    popular: true,
    features: [
      "Onbeperkt sub-accounts",
      "Volledig whitelabel branding",
      "Priority support",
      "Team management",
      "Geavanceerde analytics",
      "API toegang",
      "Custom domain support",
      "Offertes, Facturen & Creditnota's",
      "Terugkerende facturen",
    ],
    notIncluded: [
      "Automatische klant-facturatie",
      "Stripe Connect",
      "Klant self-signup",
    ],
  },
  {
    id: "saas_pro",
    name: "SaaS Pro",
    price: 497,
    description: "Bouw je eigen SaaS business op LeadFlow",
    maxOrgs: -1,
    saasEnabled: true,
    popular: false,
    features: [
      "Alles van Unlimited",
      "Stripe Connect integratie",
      "Maak eigen prijsplannen",
      "Klant self-signup portal",
      "Automatische klant-facturatie",
      "Revenue dashboard",
      "Dedicated support",
      "Geen platform fees",
    ],
    notIncluded: [],
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Account Aanmaken",
    description: "Start je 14-daagse trial en stel je agency branding in. Kies je subdomain en upload je logo.",
    icon: UserPlus,
    color: "violet",
  },
  {
    step: 2,
    title: "Klanten Toevoegen",
    description: "Nodig klanten uit of laat ze zelf aanmelden. Elk krijgt hun eigen workspace met jouw branding.",
    icon: Users,
    color: "blue",
  },
  {
    step: 3,
    title: "CRM Configureren",
    description: "Configureer pipelines, formulieren en Meta Lead Ads integraties voor elke klant.",
    icon: Settings,
    color: "purple",
  },
  {
    step: 4,
    title: "Groei & Verdien",
    description: "Met SaaS Pro factureer je klanten direct via Stripe en bouw je recurring revenue.",
    icon: TrendingUp,
    color: "green",
  },
];

const SAAS_FEATURES = [
  {
    icon: LinkIcon,
    title: "Stripe Connect",
    description: "Koppel je eigen Stripe account en ontvang betalingen direct op jouw rekening. Geen tussenpersonen.",
  },
  {
    icon: Receipt,
    title: "Automatische Facturatie",
    description: "Subscriptions worden automatisch gefactureerd. Maandelijks of jaarlijks, jij bepaalt.",
  },
  {
    icon: Calculator,
    title: "Eigen Prijsplannen",
    description: "Maak onbeperkt prijsplannen met custom features, limieten en prijzen. Van €29 tot €999.",
  },
  {
    icon: Globe,
    title: "Self-Signup Portal",
    description: "Klanten kunnen zelf aanmelden via jouw branded signup pagina. Geen handmatig werk.",
  },
  {
    icon: BarChart3,
    title: "Revenue Dashboard",
    description: "Real-time inzicht in MRR, churn, nieuwe klanten en groei. Alles in één overzicht.",
  },
  {
    icon: PiggyBank,
    title: "Geen Platform Fees",
    description: "Jij betaalt €497/maand, ongeacht hoeveel klanten of omzet. 100% van de opbrengst is voor jou.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Wat is het verschil tussen Unlimited en SaaS Pro?",
    answer: "Met Unlimited beheer je onbeperkt klanten, maar factureer je ze zelf (via facturen, iDEAL, etc.). Met SaaS Pro koppel je Stripe Connect en worden klanten automatisch maandelijks gefactureerd. Ze kunnen ook zelf aanmelden via jouw signup pagina.",
  },
  {
    question: "Hoeveel kan ik verdienen met SaaS Pro?",
    answer: "Dat hangt af van je prijzen en aantal klanten. Veel agencies vragen €99-299/maand per klant. Met 20 klanten à €149 heb je €2.980 MRR. Na aftrek van €497 LeadFlow kosten is dat €2.483 winst per maand.",
  },
  {
    question: "Betaal ik transactiekosten?",
    answer: "LeadFlow rekent geen extra fees. Je betaalt alleen de standaard Stripe kosten (1.5% + €0.25 per transactie in EU). Alle overige opbrengst is voor jou.",
  },
  {
    question: "Kan ik later upgraden naar SaaS Pro?",
    answer: "Ja! Je kunt op elk moment upgraden. Je bestaande klanten blijven behouden en je kunt ze daarna toevoegen aan een pricing plan zodat ze automatisch gefactureerd worden.",
  },
  {
    question: "Wat gebeurt er als ik downgrade of stop?",
    answer: "Bij downgrade blijven je klant-accounts actief maar wordt automatische billing stopgezet. Je kunt ze dan handmatig blijven factureren. Bij volledige stop krijg je 30 dagen om data te exporteren.",
  },
  {
    question: "Hoe werkt de whitelabel branding?",
    answer: "Je uploadt je logo, kiest je kleuren en krijgt een subdomain (jouwbedrijf.leadflow.com). Je klanten zien alleen jouw branding, niet LeadFlow.",
  },
  {
    question: "Kan ik mijn eigen domein gebruiken?",
    answer: "Ja, met Unlimited en SaaS Pro kun je een custom domain instellen (crm.jouwbedrijf.nl). We regelen het SSL certificaat automatisch.",
  },
  {
    question: "Hoe snel kan ik starten?",
    answer: "Direct! Na aanmelden kun je meteen je eerste klant toevoegen. Stripe Connect setup duurt ongeveer 10 minuten (incl. verificatie). Dezelfde dag nog live.",
  },
];

const COMPARISON_FEATURES = [
  { feature: "Sub-accounts (klanten)", starter: "3", unlimited: "Onbeperkt", saas_pro: "Onbeperkt" },
  { feature: "Whitelabel branding", starter: "Basis", unlimited: "Volledig", saas_pro: "Volledig" },
  { feature: "Custom domain", starter: false, unlimited: true, saas_pro: true },
  { feature: "Team members", starter: "2", unlimited: "Onbeperkt", saas_pro: "Onbeperkt" },
  { feature: "Meta Lead Ads", starter: true, unlimited: true, saas_pro: true },
  { feature: "Pipeline management", starter: true, unlimited: true, saas_pro: true },
  { feature: "Contact management", starter: true, unlimited: true, saas_pro: true },
  { feature: "Offertes & Facturen", starter: true, unlimited: true, saas_pro: true },
  { feature: "Creditnota's", starter: true, unlimited: true, saas_pro: true },
  { feature: "Terugkerende facturen", starter: true, unlimited: true, saas_pro: true },
  { feature: "Email automation", starter: true, unlimited: true, saas_pro: true },
  { feature: "API toegang", starter: false, unlimited: true, saas_pro: true },
  { feature: "Analytics dashboard", starter: "Basis", unlimited: "Geavanceerd", saas_pro: "Geavanceerd + Revenue" },
  { feature: "Support", starter: "Email", unlimited: "Priority", saas_pro: "Dedicated" },
  { feature: "Stripe Connect", starter: false, unlimited: false, saas_pro: true },
  { feature: "Eigen prijsplannen", starter: true, unlimited: true, saas_pro: true },
  { feature: "Klant self-signup", starter: false, unlimited: false, saas_pro: true },
  { feature: "Automatische klant-facturatie", starter: false, unlimited: false, saas_pro: true },
  { feature: "Revenue dashboard", starter: false, unlimited: false, saas_pro: true },
];

export default function AgencySignupPage() {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Slug validation
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculator state
  const [clientCount, setClientCount] = useState(10);
  const [pricePerClient, setPricePerClient] = useState(149);

  // User type selection
  const [userType, setUserType] = useState<"agency" | "solo" | null>(null);

  // Set default email from user
  useEffect(() => {
    if (user?.primaryEmail) {
      setEmail(user.primaryEmail);
    }
  }, [user]);

  // Auto-scroll to signup form when arriving with #signup hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#signup") {
      // Wait a bit for the page to render
      setTimeout(() => {
        const signupElement = document.getElementById("signup");
        if (signupElement) {
          signupElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [user]);

  // Auto-generate slug from name
  useEffect(() => {
    if (name && !slug) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  }, [name, slug]);

  // Check slug availability with debounce
  useEffect(() => {
    if (!slug || slug.length < 2) {
      setSlugAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingSlug(true);
      try {
        const available = await checkSlugAvailable(slug);
        setSlugAvailable(available);
      } catch {
        setSlugAvailable(null);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await createAgency({
      name,
      slug,
      email,
      website: website || undefined,
    });

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    // Redirect to agency onboarding with full page reload
    // Using window.location ensures proper session propagation
    window.location.href = "/agency/onboarding";
  }

  const isFormValid =
    name.trim() &&
    slug.trim() &&
    email.trim() &&
    slugAvailable === true &&
    !isCheckingSlug;

  // Calculate potential revenue
  const monthlyRevenue = clientCount * pricePerClient;
  const yearlyRevenue = monthlyRevenue * 12;
  const netProfit = monthlyRevenue - 497; // After LeadFlow costs

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <LandingHeader />

      <main className="mx-auto max-w-7xl px-4 pt-32 pb-16">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm text-violet-700 dark:border-violet-800 dark:bg-violet-900/50 dark:text-violet-300">
            <Zap className="h-4 w-4" />
            Agency Partner Program
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Whitelabel LeadFlow voor{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Jouw Agency
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
            Bied jouw klanten een professioneel CRM-platform aan onder je eigen merk.
            Van eenvoudige whitelabel tot een volledig SaaS-platform met eigen billing.
          </p>

          {/* Quick stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-violet-500" />
              <span>Setup in 5 minuten</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>14 dagen gratis trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-blue-500" />
              <span>Geen creditcard nodig</span>
            </div>
          </div>

          {/* Hero CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="#signup">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-blue-600 px-8">
                Start Gratis Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="px-8">
                Bekijk Prijzen
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20 grid gap-4 md:grid-cols-5">
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-5 text-center backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Custom Branding</h3>
            <p className="text-sm text-zinc-500">Jouw logo, kleuren & domein</p>
          </div>
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-5 text-center backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Complete CRM</h3>
            <p className="text-sm text-zinc-500">Meta Leads, Pipelines & meer</p>
          </div>
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-5 text-center backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
              <Receipt className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Facturatie</h3>
            <p className="text-sm text-zinc-500">Offertes, Facturen & BTW</p>
          </div>
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-5 text-center backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">Multi-Tenant</h3>
            <p className="text-sm text-zinc-500">Elk klant een eigen workspace</p>
          </div>
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-5 text-center backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">SaaS Mode</h3>
            <p className="text-sm text-zinc-500">Factureer je eigen klanten</p>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Hoe Werkt Het?</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              In 4 simpele stappen naar je eigen whitelabel CRM platform
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-zinc-200 to-transparent md:block dark:from-zinc-700" />
                )}
                <div className="rounded-xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${step.color}-100 text-${step.color}-600 dark:bg-${step.color}-900/50 dark:text-${step.color}-400`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 text-sm font-medium text-zinc-500">Stap {step.step}</div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after How it works */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-zinc-600 dark:text-zinc-400">
              Klaar om te starten? Kies het plan dat bij jou past.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="#signup">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-blue-600 px-8">
                  Start Gratis Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button size="lg" variant="ghost" className="text-violet-600 hover:text-violet-700">
                  Vergelijk Plannen
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-20" id="pricing">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Kies Jouw Plan</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Start met 14 dagen gratis. Upgrade of downgrade wanneer je wilt.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <Card
                key={tier.id}
                className={`relative border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all hover:shadow-lg dark:border-zinc-800/50 dark:bg-zinc-900/80 ${
                  tier.popular
                    ? "ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-zinc-950"
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-blue-600 text-white">
                      Meest Populair
                    </Badge>
                  </div>
                )}
                {tier.saasEnabled && (
                  <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="border-violet-300 text-violet-600">
                      <Sparkles className="mr-1 h-3 w-3" />
                      SaaS
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4 pt-6">
                  <CardTitle className="flex items-center gap-2">
                    {tier.id === "saas_pro" ? (
                      <Crown className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Building2 className="h-5 w-5 text-violet-500" />
                    )}
                    {tier.name}
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">&euro;{tier.price}</span>
                    <span className="text-zinc-500">/maand</span>
                  </div>
                  <div className="mb-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                    <span className="text-sm font-medium">
                      {tier.maxOrgs === -1
                        ? "Onbeperkt klanten"
                        : `${tier.maxOrgs} klanten`}
                    </span>
                  </div>
                  <ul className="mb-4 space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {tier.notIncluded.length > 0 && (
                    <ul className="space-y-2">
                      {tier.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                          <X className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SaaS Pro Deep Dive */}
        <div className="mb-20" id="saas">
          <div className="overflow-hidden rounded-2xl border border-violet-200/50 bg-gradient-to-r from-violet-50 to-purple-50 dark:border-violet-800/50 dark:from-violet-950/30 dark:to-purple-950/30">
            <div className="p-8 md:p-12">
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                  <Crown className="h-4 w-4" />
                  SaaS Pro - Uitgelicht
                </div>
                <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                  Bouw Je Eigen SaaS Business
                </h3>
                <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
                  Met SaaS Pro transformeer je LeadFlow in jouw eigen softwareproduct.
                  Bepaal je eigen prijzen, laat klanten zelf aanmelden, en ontvang betalingen direct op je rekening.
                </p>
              </div>

              <div className="mb-12 grid gap-6 md:grid-cols-3">
                {SAAS_FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-violet-200/50 bg-white/80 p-6 dark:border-violet-700/50 dark:bg-zinc-800/50"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2 font-semibold">{feature.title}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Revenue Calculator */}
              <div className="rounded-xl border border-violet-200/50 bg-white p-6 dark:border-violet-700/50 dark:bg-zinc-800 md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Revenue Calculator</h4>
                    <p className="text-sm text-zinc-500">Bereken je potentiële omzet</p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Aantal klanten</Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={clientCount}
                          onChange={(e) => setClientCount(Number(e.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-violet-600 dark:bg-zinc-700"
                        />
                        <span className="w-12 text-right font-semibold">{clientCount}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Prijs per klant (€/maand)</Label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="29"
                          max="499"
                          step="10"
                          value={pricePerClient}
                          onChange={(e) => setPricePerClient(Number(e.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-violet-600 dark:bg-zinc-700"
                        />
                        <span className="w-16 text-right font-semibold">€{pricePerClient}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-700/50">
                      <p className="mb-1 text-sm text-zinc-500">Maandelijkse omzet</p>
                      <p className="text-2xl font-bold">€{monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-700/50">
                      <p className="mb-1 text-sm text-zinc-500">Jaarlijkse omzet</p>
                      <p className="text-2xl font-bold">€{yearlyRevenue.toLocaleString()}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-700/50">
                      <p className="mb-1 text-sm text-zinc-500">LeadFlow kosten</p>
                      <p className="text-2xl font-bold text-zinc-600">€497</p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/30">
                      <p className="mb-1 text-sm text-green-600 dark:text-green-400">Netto winst/maand</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        €{netProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-zinc-500">
                  * Exclusief Stripe transactiekosten (±1.5% + €0.25 per transactie)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Vergelijk Alle Plannen</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Bekijk alle features per plan in detail
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Starter
                    <div className="text-sm font-normal text-zinc-500">€97/mo</div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="inline-flex items-center gap-1">
                      Unlimited
                      <Badge className="ml-1 bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">Populair</Badge>
                    </div>
                    <div className="text-sm font-normal text-zinc-500">€297/mo</div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="inline-flex items-center gap-1">
                      SaaS Pro
                      <Crown className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="text-sm font-normal text-zinc-500">€497/mo</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-800/30" : ""}
                  >
                    <td className="px-6 py-3 text-sm">{row.feature}</td>
                    <td className="px-6 py-3 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-zinc-300" />
                        )
                      ) : (
                        <span className="text-sm">{row.starter}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof row.unlimited === "boolean" ? (
                        row.unlimited ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-zinc-300" />
                        )
                      ) : (
                        <span className="text-sm">{row.unlimited}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {typeof row.saas_pro === "boolean" ? (
                        row.saas_pro ? (
                          <Check className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-zinc-300" />
                        )
                      ) : (
                        <span className="text-sm">{row.saas_pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold">Veelgestelde Vragen</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Alles wat je moet weten over het Agency Partner Program
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-medium">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="border-t border-zinc-200 px-5 pb-5 pt-3 dark:border-zinc-700">
                    <p className="text-zinc-600 dark:text-zinc-400">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <div className="mx-auto max-w-lg" id="signup">
          <Card className="border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Start Vandaag Nog</CardTitle>
              <CardDescription>
                Begin met 14 dagen gratis op het Starter plan. Geen creditcard nodig.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-zinc-500">
                    Log in om je agency aan te maken
                  </p>
                  <Link href="/handler/sign-in?after_auth_return_to=/agency-signup">
                    <Button className="bg-gradient-to-r from-violet-600 to-blue-600">
                      Inloggen om door te gaan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Agency Naam</Label>
                    <Input
                      id="name"
                      placeholder="Marketing Bureau XYZ"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-500">leadflow.com/</span>
                      <div className="relative flex-1">
                        <Input
                          id="slug"
                          placeholder="marketing-xyz"
                          value={slug}
                          onChange={(e) =>
                            setSlug(
                              e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-]/g, "")
                            )
                          }
                          className={
                            slugAvailable === true
                              ? "border-green-500 pr-8"
                              : slugAvailable === false
                              ? "border-red-500 pr-8"
                              : ""
                          }
                          required
                        />
                        {slug.length >= 2 && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {isCheckingSlug ? (
                              <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                            ) : slugAvailable === true ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : slugAvailable === false ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : null}
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-zinc-500">/crm</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Alleen letters, cijfers en koppeltekens
                    </p>
                    {slugAvailable === false && (
                      <p className="text-xs text-red-500">
                        Deze slug is al in gebruik
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (optioneel)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://jouwwebsite.nl"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600"
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Bezig met aanmaken...
                      </>
                    ) : (
                      <>
                        Agency Aanmaken & Trial Starten
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-zinc-500">
                    Door een agency aan te maken ga je akkoord met onze{" "}
                    <Link href="/terms" className="underline hover:text-zinc-700">
                      Algemene Voorwaarden
                    </Link>{" "}
                    en{" "}
                    <Link href="/privacy" className="underline hover:text-zinc-700">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="mb-8 inline-flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <HeadphonesIcon className="h-4 w-4 text-violet-500" />
              <span>Support via email & chat</span>
            </div>
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-500" />
              <span>30 dagen geld-terug garantie</span>
            </div>
          </div>
          <p className="text-zinc-500">
            Vragen over het agency programma?{" "}
            <a href="mailto:hello@wetryleadflow.com" className="text-violet-600 underline hover:text-violet-700">
              Neem contact op
            </a>
          </p>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
