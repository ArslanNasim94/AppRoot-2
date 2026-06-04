import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Guarantee } from "@/components/sections/Guarantee";
import { Work } from "@/components/sections/Work";
import { Metrics } from "@/components/sections/Metrics";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { Insights } from "@/components/sections/Insights";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <Guarantee />
      <Work />
      <Metrics />
      <Industries />
      <Process />
      <Testimonials />
      <Team />
      <Insights />
      <FinalCTA />
    </>
  );
}
