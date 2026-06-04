"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const steps = [
  {
    number: "01",
    title: "Discover",
    body: "We dive deep into your vision, users, and constraints. No assumptions — just clarity on what success looks like.",
  },
  {
    number: "02",
    title: "Architect",
    body: "Technical decisions mapped to business outcomes. Stack selection, system design, and a roadmap you can trust.",
  },
  {
    number: "03",
    title: "Build",
    body: "Agile sprints with weekly demos. Clean code, comprehensive tests, and transparent progress every step.",
  },
  {
    number: "04",
    title: "Launch",
    body: "Zero-downtime deployments, performance optimization, and monitoring that catches issues before users do.",
  },
  {
    number: "05",
    title: "Grow",
    body: "Post-launch support, feature iteration, and scaling guidance as your product finds product-market fit.",
  },
];

export function Process() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  useNizekHeading(headingRef);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    stepRefs.current.forEach((step, i) => {
      if (!step) return;
      ScrollTrigger.create({
        trigger: step,
        start: "top 60%",
        onEnter: () => setActiveStep(i),
        onLeaveBack: () => setActiveStep(Math.max(0, i - 1)),
      });
    });
  }, []);

  return (
    <section className="section-padding bg-bg">
      <div className="container grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTag>(How We Work)</SectionTag>
          <h2
            ref={headingRef}
            className="font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
          >
            {["FROM IDEA", "TO IMPACT."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="relative space-y-16 pl-8">
          <div
            className="absolute left-3 top-0 h-full w-px bg-white/10"
            style={{
              background: `linear-gradient(to bottom, rgba(123,47,255,0.5) 0%, rgba(123,47,255,0.5) ${((activeStep + 1) / steps.length) * 100}%, rgba(255,255,255,0.1) ${((activeStep + 1) / steps.length) * 100}%)`,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="relative"
            >
              <span
                className={`absolute -left-8 font-satoshi text-lg font-black transition-all duration-300 ${
                  activeStep >= i ? "gradient-text" : "text-white/20"
                }`}
              >
                {step.number}
              </span>
              <h3 className="font-satoshi text-[32px] font-black uppercase text-text-heading">
                {step.title}
              </h3>
              <p className="mt-3 font-inter text-base text-text-body">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
