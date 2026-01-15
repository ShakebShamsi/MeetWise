import { CTASection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { IntegrationSection } from "@/components/landing/integration-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import Image from "next/image";

export default function Home() {
   return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
         <LandingHeader />
         <HeroSection />
         <FeaturesSection />
         <HowItWorksSection />
         <IntegrationSection />
         <CTASection />
         {/* <LandingFooter /> */}

      </div>
   );
}
