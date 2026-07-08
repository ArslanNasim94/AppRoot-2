"use client";

import { useEffect, useRef } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  PedestalCard,
  animatePedestalEntrance,
} from "@/components/animations/PedestalCard";
import {
  SectionBodyCol,
  SectionHeadingCol,
  SectionShell,
  SectionSplit,
} from "@/components/layout/SectionLayout";

const aiPaths = [
  {
    number: "01",
    title: "Integrate AI into your product",
    body: "Add chat assistants, smart search, and AI features to your existing app, CRM, or workflow — without rebuilding what already works.",
    tags: ["LLM APIs", "RAG", "Chat assistants"],
  },
  {
    number: "02",
    title: "Upgrade existing systems with AI",
    body: "We improve the system you run today: AI automation, intelligent agents, and analytics that make your product more progressive and competitive.",
    tags: ["Automation", "AI agents", "Analytics"],
  },
  {
    number: "03",
    title: "Build a brand-new AI SaaS",
    body: "Have an AI product idea? We take it from concept to production — a complete AI-native SaaS built, launched, and maintained by one team.",
    tags: ["Laravel", "Next.js", "MVP to scale"],
  },
];

export function AiForStartups() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const baselineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    return animatePedestalEntrance(cards, baselineRef.current ?? undefined);
  }, []);

  return (
    <section
      id="ai-for-startups"
      ref={sectionRef}
      className="site-section bg-bg"
    >
      <SectionShell>
        <SectionSplit>
          <SectionHeadingCol>
            <AnimatedHeading
              eyebrow={<SectionTag>03 · AI path</SectionTag>}
              lines={["YOUR STARTUP'S", "AI PARTNER."]}
            />
            <p className="copy-lead mt-6">
              We specialize in AI-based solutions. Add AI to the product you already
              have, make your current system smarter, or launch a completely new AI
              SaaS with us.
            </p>
            <div className="btn-row">
              <MagneticButton href="#ai-chatbot">Discuss your AI idea →</MagneticButton>
            </div>
          </SectionHeadingCol>

          <SectionBodyCol>
            <div
              ref={baselineRef}
              className="mb-6 h-px w-full origin-left bg-brand-cyan/30"
              aria-hidden
            />
            <div
              ref={cardsRef}
              className="flex flex-col gap-6"
              style={{ perspective: 1200 }}
            >
              {aiPaths.map((path) => (
                <PedestalCard
                  key={path.number}
                  number={path.number}
                  title={path.title}
                  body={path.body}
                  tags={path.tags}
                />
              ))}
            </div>
          </SectionBodyCol>
        </SectionSplit>
      </SectionShell>
    </section>
  );
}
