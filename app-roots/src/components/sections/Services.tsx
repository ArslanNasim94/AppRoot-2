"use client";

import { useEffect, useRef } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import {
  TiltFlipCard,
  animateTiltFlipEntrance,
} from "@/components/animations/TiltFlipCard";
import {
  SectionBodyCol,
  SectionHeadingCol,
  SectionShell,
  SectionSplit,
} from "@/components/layout/SectionLayout";

const painPoints = [
  {
    number: "01",
    title: "Hiring takes months you don't have",
    body: "Finding, hiring, and managing a reliable dev team eats the runway you need for everything else.",
    solution: "We become your dev team — no hiring required.",
  },
  {
    number: "02",
    title: "Marketing is ready, but the product isn't",
    body: "Your launch plan is waiting on features that keep slipping — and every delay costs you momentum.",
    solution: "We ship on your timeline so marketing can launch.",
  },
  {
    number: "03",
    title: "You're building software instead of finding customers",
    body: "Founders end up buried in tech decisions when their time is worth far more in front of customers.",
    solution: "We handle tech — you stay in front of customers.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    return animateTiltFlipEntrance(cards);
  }, []);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="site-section relative overflow-hidden bg-bg-surface"
      style={{ perspective: 1200 }}
    >
      <SectionShell>
        <SectionSplit>
          <SectionHeadingCol>
            <AnimatedHeading
              eyebrow={<SectionTag>02 · Pain points — Sound familiar?</SectionTag>}
              lines={["THE PROBLEMS", "THAT SLOW STARTUPS DOWN."]}
            />
            <p className="copy-lead mt-6 max-w-[36ch]">
              You&apos;re not alone — we hear these from founders every week. We
              built AppRoots to take exactly these problems off your plate.
            </p>
          </SectionHeadingCol>

          <SectionBodyCol>
            <div ref={cardsRef} className="flex flex-col gap-6">
              {painPoints.map((point) => (
                <TiltFlipCard
                  key={point.number}
                  number={point.number}
                  title={point.title}
                  body={point.body}
                  solution={point.solution}
                />
              ))}
            </div>
          </SectionBodyCol>
        </SectionSplit>
      </SectionShell>
    </section>
  );
}
