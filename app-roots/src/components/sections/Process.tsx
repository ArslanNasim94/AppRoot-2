"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const steps = [
  {
    number: "01",
    title: "Tell us your idea",
    role: "You",
    body: "One short call. We listen, ask the right questions, and agree on a clear scope — no lengthy paperwork.",
  },
  {
    number: "02",
    title: "We design, build & maintain",
    role: "Together",
    body: "A dedicated team ships your product with React Native, Laravel, and Next.js — and keeps it running after launch.",
  },
  {
    number: "03",
    title: "You focus on marketing & growth",
    role: "You",
    body: "While we handle the code, you handle campaigns, sales, and customers. Weekly demos keep you in the loop.",
  },
];

const notes = [
  {
    title: "Talk to the people building it",
    body: "No account managers. Direct access to your dev team.",
  },
  {
    title: "Weekly demos, honest updates",
    body: "See real progress every week, no surprises at the end.",
  },
  {
    title: "We're in it for the long run",
    body: "Launch is the start. We maintain, improve, and grow with you.",
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
    <section id="steps" className="site-section bg-bg-surface">
      <div className="container section-grid">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTag>06 · How we work</SectionTag>
          <h2 ref={headingRef} className="text-heading-section">
            {["THREE STEPS,", "NO OVERHEAD."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div className="relative space-y-10 pl-8 lg:space-y-12">
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
              <p className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-brand-cyan">
                {step.role}
              </p>
              <h3 className="heading-card mt-1">{step.title}</h3>
              <p className="text-card">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card-grid container mt-10 md:grid-cols-3 lg:mt-12">
        {notes.map((note) => (
          <div key={note.title} className="card-surface">
            <h3 className="font-satoshi text-sm font-black uppercase text-text-heading">
              {note.title}
            </h3>
            <p className="text-card">{note.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
