"use client";

import { useRef } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

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
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16 xl:gap-12">
          <div className="left-0 top-0 md:sticky md:top-32 md:self-start md:py-8 lg:top-36">
            <SectionTag>02 · Pain points — Sound familiar?</SectionTag>
            <h2
              ref={headingRef}
              className="font-satoshi text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.02] tracking-tight text-text-heading"
            >
              {["THE PROBLEMS THAT", "SLOW STARTUPS DOWN."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-prose font-inter text-base leading-relaxed text-text-body">
              You&apos;re not alone — we hear these from founders every week. We
              built AppRoots to take exactly these problems off your plate.
            </p>
          </div>

          <ContainerScroll className="min-h-[220vh] space-y-6 py-8 md:py-12">
            {painPoints.map((point, index) => (
              <CardSticky
                key={point.number}
                index={index + 2}
                incrementY={14}
                incrementZ={10}
                className="group w-full rounded-2xl border border-white/[0.08] bg-bg-surface/95 p-8 shadow-[0_8px_32px_rgba(10,10,15,0.45)] backdrop-blur-md lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-satoshi text-[56px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[64px]">
                    {point.number}
                  </span>
                </div>
                <h3 className="mt-2 font-satoshi text-xl font-black uppercase leading-tight text-text-heading lg:text-[22px]">
                  {point.title}
                </h3>
                <p className="mt-4 font-inter text-[15px] leading-relaxed text-text-body lg:text-base">
                  {point.body}
                </p>
                <p className="mt-5 font-inter text-sm font-medium text-brand-cyan">
                  → {point.solution}
                </p>
              </CardSticky>
            ))}
          </ContainerScroll>
        </div>
      </div>
    </section>
  );
}
