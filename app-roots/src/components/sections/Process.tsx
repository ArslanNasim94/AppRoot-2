"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import {
  SectionBodyCol,
  SectionHeadingCol,
  SectionShell,
  SectionSplit,
} from "@/components/layout/SectionLayout";

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
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!section || !path) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) return;

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
        },
      });

      if (glow) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
          onUpdate: (self) => {
            const point = path.getPointAtLength(length * self.progress);
            glow.setAttribute("cx", String(point.x));
            glow.setAttribute("cy", String(point.y));
          },
        });
      }

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          onEnter: () => setActiveStep(i),
          onLeaveBack: () => setActiveStep(Math.max(0, i - 1)),
        });

        gsap.fromTo(
          step,
          { opacity: 0.35, x: 12 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="steps"
      ref={sectionRef}
      className="site-section bg-bg-surface"
      style={{ perspective: 1200 }}
    >
      <SectionShell>
        <SectionSplit>
          <SectionHeadingCol>
            <AnimatedHeading
              eyebrow={<SectionTag>06 · How we work</SectionTag>}
              lines={["THREE STEPS,", "NO OVERHEAD."]}
            />
          </SectionHeadingCol>

          <SectionBodyCol>
            <div className="relative space-y-10 pl-8 lg:space-y-12">
              <svg
                className="pointer-events-none absolute left-0 top-0 h-full w-8 overflow-visible"
                viewBox="0 0 32 400"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="process-beam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(123,47,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(0,212,255,0.4)" />
                  </linearGradient>
                  <filter id="process-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  ref={pathRef}
                  d="M 16 0 C 16 80, 24 120, 16 160 S 8 240, 16 280 S 24 340, 16 400"
                  fill="none"
                  stroke="url(#process-beam)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  ref={glowRef}
                  r="5"
                  fill="rgba(0,212,255,0.9)"
                  filter="url(#process-glow)"
                />
              </svg>

              {steps.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative transition-opacity duration-300"
                  data-process-step
                  style={{ opacity: activeStep >= i ? 1 : 0.4 }}
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
          </SectionBodyCol>
        </SectionSplit>

        <div className="card-grid mt-10 md:grid-cols-3 lg:mt-12">
          {notes.map((note) => (
            <div key={note.title} className="card-surface">
              <h3 className="font-satoshi text-sm font-black uppercase text-text-heading">
                {note.title}
              </h3>
              <p className="text-card">{note.body}</p>
            </div>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
