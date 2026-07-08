"use client";

import { useEffect, useRef } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  DepthRevealTile,
  initDepthRevealScroll,
} from "@/components/animations/DepthRevealTile";
import {
  SectionBodyCol,
  SectionHeadingCol,
  SectionShell,
  SectionSplit,
} from "@/components/layout/SectionLayout";

const stackCards = [
  {
    name: "Web Platforms",
    description:
      "Production-grade web applications and SaaS platforms built with Laravel and Next.js. Scalable, secure, and maintainable from day one.",
    tag: "Laravel · Next.js",
  },
  {
    name: "Mobile Apps",
    description:
      "Cross-platform iOS and Android apps built with React Native — one codebase, native experience, faster time to market.",
    tag: "React Native",
  },
  {
    name: "Backend & DevOps",
    description:
      "APIs, databases, cloud infrastructure, and post-launch maintenance — everything that keeps your product running reliably.",
    tag: "Full development support",
  },
];

export function Industries() {
  const tilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiles = tilesRef.current;
    if (!tiles) return;
    return initDepthRevealScroll(tiles);
  }, []);

  return (
    <section id="tech-stack" className="site-section bg-bg" style={{ perspective: 1200 }}>
      <SectionShell>
        <SectionSplit>
          <SectionHeadingCol>
            <AnimatedHeading
              eyebrow={<SectionTag>05 · Tech stack</SectionTag>}
              lines={["FULL-STACK", "DEVELOPMENT,", "ONE PARTNER."]}
            />
          </SectionHeadingCol>

          <SectionBodyCol>
            <div ref={tilesRef} className="flex flex-col gap-6">
              {stackCards.map((card) => (
                <DepthRevealTile
                  key={card.name}
                  name={card.name}
                  description={card.description}
                  tag={card.tag}
                />
              ))}
            </div>
          </SectionBodyCol>
        </SectionSplit>

        <div className="btn-row">
          <MagneticButton href="/products">See Our Products →</MagneticButton>
        </div>
      </SectionShell>
    </section>
  );
}
