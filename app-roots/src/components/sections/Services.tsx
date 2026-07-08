"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
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
    if (!cards) return;

    const items = cards.querySelectorAll("[data-pain-card]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { x: 0, opacity: 1 });
      return;
    }

    gsap.set(items, { x: 160, opacity: 0 });

    gsap.to(items, {
      x: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cards,
        start: "top 78%",
        once: true,
      },
    });
  }, []);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="site-section relative overflow-hidden bg-bg-surface"
    >
      <SectionShell>
        <SectionSplit>
          <SectionHeadingCol sticky="center">
            <SectionTag>02 · Pain points — Sound familiar?</SectionTag>
            <h2 ref={headingRef} className="text-heading-section">
              {["THE PROBLEMS THAT", "SLOW STARTUPS DOWN."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-line className="block">
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

          <SectionBodyCol className="section-body-col--narrow">
          <ContainerScroll
            ref={cardsRef}
            className="min-h-[80vh] space-y-4 md:min-h-[92vh]"
          >
            {painPoints.map((point, index) => (
              <CardSticky
                key={point.number}
                index={index + 1}
                incrementY={8}
                incrementZ={10}
                data-pain-card
                className="card-surface group w-full !p-5 shadow-[0_8px_32px_rgba(10,10,15,0.45)] backdrop-blur-md will-change-transform lg:!p-6"
              >
                <span className="font-satoshi text-[48px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[56px]">
                  {point.number}
                </span>
                <h3 className="heading-card mt-3">{point.title}</h3>
                <p className="text-card">{point.body}</p>
                <p className="mt-4 font-inter text-sm font-medium text-brand-cyan">
                  → {point.solution}
                </p>
              </CardSticky>
            ))}
          </ContainerScroll>
          </SectionBodyCol>
        </SectionSplit>
      </SectionShell>
    </section>
  );
}
