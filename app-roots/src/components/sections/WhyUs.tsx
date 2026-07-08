"use client";

import { useEffect, useRef } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  FlipFocusCard,
  animateFanEntrance,
} from "@/components/animations/FlipFocusCard";
import { SectionShell } from "@/components/layout/SectionLayout";

const reasons = [
  {
    number: "01",
    title: "We think like founders",
    body: "We understand runway, launch pressure, and the need to move fast. Every decision we make is about getting you to market — not padding a scope.",
  },
  {
    number: "02",
    title: "One team, full stack",
    body: "Web, mobile, backend, and AI — all under one roof. No juggling freelancers or agencies. One team that knows your product inside out.",
  },
  {
    number: "03",
    title: "We stay after launch",
    body: "Launch is just the start. We maintain, improve, and scale your product as you grow — so you never have to rebuild from scratch.",
  },
];

const miniCards = [
  { label: "Core stacks", value: "Laravel · Next.js · React Native" },
  { label: "Dedicated team", value: "3+ engineers on your product" },
  { label: "Communication", value: "Weekly demos & updates" },
];

export function WhyUs() {
  const fanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    return animateFanEntrance(fan);
  }, []);

  return (
    <section id="why-us" className="site-section bg-bg-surface" style={{ perspective: 1200 }}>
      <SectionShell className="text-center">
        <AnimatedHeading
          eyebrow={<SectionTag>04 · Why us</SectionTag>}
          lines={["BUILT FOR FOUNDERS."]}
          align="center"
          headingClassName="text-heading-section mx-auto"
          className="mx-auto max-w-3xl"
        />

        <p className="copy-lead mx-auto mt-6 max-w-2xl">
          We&apos;re not a generic dev shop. We partner with founders who need a
          reliable product team — so they can stay focused on growth.
        </p>

        <div className="mx-auto mt-10 max-w-4xl space-y-8 text-left lg:mt-12">
          {reasons.map((reason) => (
            <div key={reason.number} className="border-b border-white/10 pb-8 last:border-0">
              <span className="font-satoshi text-sm font-black gradient-text">
                {reason.number}
              </span>
              <h3 className="heading-card mt-2">{reason.title}</h3>
              <p className="text-card mt-2">{reason.body}</p>
            </div>
          ))}
        </div>

        <div
          ref={fanRef}
          className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 lg:mt-12"
        >
          {miniCards.map((card) => (
            <FlipFocusCard key={card.label} title={card.label} body={card.value} />
          ))}
        </div>

        <div className="btn-row-center">
          <MagneticButton href="/register">Start a project →</MagneticButton>
        </div>
      </SectionShell>
    </section>
  );
}
