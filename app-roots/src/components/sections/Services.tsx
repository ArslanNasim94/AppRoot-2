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
      className="site-section relative overflow-hidden bg-bg-surface"
    >
      <div className="container">
        <div className="section-grid md:grid-cols-2">
          <div className="left-0 top-0 md:sticky md:top-32 md:self-start lg:top-36">
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
            <p className="copy-lead">
              You&apos;re not alone — we hear these from founders every week. We
              built AppRoots to take exactly these problems off your plate.
            </p>
          </div>

          <ContainerScroll className="min-h-[115vh] space-y-6 md:min-h-[135vh]">
            {painPoints.map((point, index) => (
              <CardSticky
                key={point.number}
                index={index + 1}
                incrementY={10}
                incrementZ={10}
                className="card-surface group w-full shadow-[0_8px_32px_rgba(10,10,15,0.45)] backdrop-blur-md"
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
        </div>
      </div>
    </section>
  );
}
