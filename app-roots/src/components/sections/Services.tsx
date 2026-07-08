"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      cards.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: cards, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="site-section relative overflow-hidden bg-bg-surface"
    >
      <SectionShell>
        <SectionSplit>
          <SectionHeadingCol>
            <SectionTag>02 · Pain points — Sound familiar?</SectionTag>
            <h2 ref={headingRef} className="text-heading-section">
              {["THE PROBLEMS", "THAT SLOW STARTUPS DOWN."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-line className="block lg:whitespace-nowrap">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <p className="copy-lead max-w-[36ch]">
              You&apos;re not alone — we hear these from founders every week. We
              built AppRoots to take exactly these problems off your plate.
            </p>
          </SectionHeadingCol>

          <SectionBodyCol>
            <div ref={cardsRef} className="flex flex-col gap-6">
              {painPoints.map((point) => (
                <div
                  key={point.number}
                  className="card-surface group transition-colors hover:border-brand-purple/30"
                >
                  <span className="font-satoshi text-[48px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[56px]">
                    {point.number}
                  </span>
                  <h3 className="heading-card mt-3">{point.title}</h3>
                  <p className="text-card">{point.body}</p>
                  <p className="mt-4 font-inter text-sm font-medium text-brand-cyan">
                    → {point.solution}
                  </p>
                </div>
              ))}
            </div>
          </SectionBodyCol>
        </SectionSplit>
      </SectionShell>
    </section>
  );
}
