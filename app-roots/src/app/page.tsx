import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { AiForStartups } from "@/components/sections/AiForStartups";
import { AiAgents } from "@/components/sections/AiAgents";
import { WhyUs } from "@/components/sections/WhyUs";
import { Industries } from "@/components/sections/Industries";
import { Work } from "@/components/sections/Work";
import { Metrics } from "@/components/sections/Metrics";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <AiForStartups />
      <AiAgents />
      <WhyUs />
      <Industries />
      <Work />
      <Metrics />
      <Process />
      <FinalCTA />
    </>
  );
}
