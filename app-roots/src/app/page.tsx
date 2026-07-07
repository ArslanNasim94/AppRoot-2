import { FounderPipeline } from "@/components/layout/FounderPipeline";
import { Hero } from "@/components/sections/Hero";
import { IdeaSection } from "@/components/sections/IdeaSection";
import { Services } from "@/components/sections/Services";
import { AiForStartups } from "@/components/sections/AiForStartups";
import { WhyUs } from "@/components/sections/WhyUs";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <FounderPipeline />
      <Hero />
      <IdeaSection />
      <Services />
      <AiForStartups />
      <WhyUs />
      <Industries />
      <Process />
      <FinalCTA />
    </>
  );
}
