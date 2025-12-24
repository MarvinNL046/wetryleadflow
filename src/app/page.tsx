import {
  LandingHeader,
  LandingFooter,
  HeroSection,
  LogoCloud,
  FeaturesSection,
  DashboardPreview,
  HowItWorks,
  TestimonialsSection,
  PricingSection,
  FinalCTASection,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <LogoCloud />
        <FeaturesSection />
        <DashboardPreview />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
