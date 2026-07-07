import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";

const Manifesto = dynamic(
  () => import("@/components/sections/Manifesto").then((m) => m.Manifesto),
  { ssr: false }
);
const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => m.Services)
);
const AiForStartups = dynamic(
  () => import("@/components/sections/AiForStartups").then((m) => m.AiForStartups)
);
const AiAgents = dynamic(
  () => import("@/components/sections/AiAgents").then((m) => m.AiAgents)
);
const WhyUs = dynamic(
  () => import("@/components/sections/WhyUs").then((m) => m.WhyUs)
);
const Industries = dynamic(
  () => import("@/components/sections/Industries").then((m) => m.Industries)
);
const Work = dynamic(
  () => import("@/components/sections/Work").then((m) => m.Work)
);
const Metrics = dynamic(
  () => import("@/components/sections/Metrics").then((m) => m.Metrics)
);
const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => m.Process)
);
const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA)
);

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
