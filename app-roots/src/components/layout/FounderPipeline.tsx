"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const FOUNDER_PIPELINE_STEPS = [
  { id: "idea", num: "01", label: "Idea" },
  { id: "pain-points", num: "02", label: "Pain points" },
  { id: "ai-for-startups", num: "03", label: "AI path" },
  { id: "why-different", num: "04", label: "Why us" },
  { id: "tech-stack", num: "05", label: "Tech stack" },
  { id: "steps", num: "06", label: "How we work" },
  { id: "contact", num: "07", label: "Launch" },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getSectionTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function collectSections() {
  return FOUNDER_PIPELINE_STEPS.map((step) =>
    document.getElementById(step.id)
  ).filter(Boolean) as HTMLElement[];
}

export function FounderPipeline() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const visibleRef = useRef(false);
  const rafRef = useRef(0);
  const runningRef = useRef(true);

  useEffect(() => {
    runningRef.current = true;

    const showPipeline = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onHeroComplete = () => showPipeline();
    window.addEventListener("hero-animation-complete", onHeroComplete);

    const isHeroComplete = () => {
      if (window.scrollY > 120) return true;

      const heroTrack = document.getElementById("hero");
      if (heroTrack) {
        const scrollable = heroTrack.offsetHeight - window.innerHeight;
        if (scrollable > 0) {
          const rect = heroTrack.getBoundingClientRect();
          const progress = clamp(-rect.top / scrollable, 0, 1);
          if (progress >= 0.5) return true;
        }
      }

      const idea = document.getElementById("idea");
      if (idea && idea.getBoundingClientRect().top <= window.innerHeight * 0.85) {
        return true;
      }

      return false;
    };

    const tick = () => {
      if (!runningRef.current) return;

      if (isHeroComplete()) showPipeline();

      const sections = collectSections();
      if (sections.length >= 2) {
        const marker = window.scrollY + window.innerHeight * 0.38;
        const journeyStart = getSectionTop(sections[0]);
        const lastSection = sections[sections.length - 1];
        const journeyEnd = getSectionTop(lastSection) + lastSection.offsetHeight;
        const journeySpan = Math.max(journeyEnd - journeyStart, 1);
        const scrollProgress = clamp((marker - journeyStart) / journeySpan, 0, 1);

        if (progressRef.current) {
          progressRef.current.style.height = `${scrollProgress * 100}%`;
        }

        let current = 0;
        for (let i = 0; i < sections.length; i++) {
          if (getSectionTop(sections[i]) <= marker) current = i;
        }

        if (current !== activeRef.current) {
          activeRef.current = current;
          setActive(current);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      /* positions recalc on next frame */
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize, { passive: true });

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      window.removeEventListener("hero-animation-complete", onHeroComplete);
    };
  }, []);

  const current = FOUNDER_PIPELINE_STEPS[active];

  return (
    <aside
      aria-label="Founder pipeline navigation"
      className={`fixed left-4 top-0 z-[150] hidden h-screen w-[160px] flex-col pt-28 pb-10 md:flex xl:left-6 2xl:left-8 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ transition: "opacity 0.45s ease" }}
    >
      <div className="shrink-0 px-1">
        <p className="font-inter text-[11px] font-medium uppercase tracking-[0.14em] text-brand-cyan">
          {current.label} {active + 1} / {FOUNDER_PIPELINE_STEPS.length}
        </p>
        <p className="mt-1 font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
          Founder Pipeline
        </p>
      </div>

      <div className="relative mt-8 min-h-0 flex-1">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/[0.08]" />
        <div
          ref={progressRef}
          className="absolute left-[7px] top-0 w-px origin-top bg-gradient-to-b from-brand-purple to-brand-cyan will-change-[height]"
          style={{ height: "0%" }}
        />

        <ul className="relative flex h-full flex-col justify-between py-1">
          {FOUNDER_PIPELINE_STEPS.map((step, index) => {
            const isActive = index === active;
            const isPast = index < active;

            return (
              <li key={step.id}>
                <Link
                  href={`#${step.id}`}
                  className={`group flex items-center gap-3 ${
                    isActive
                      ? "text-text-heading"
                      : isPast
                        ? "text-white/45 hover:text-text-heading"
                        : "text-white/25 hover:text-white/45"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                      isActive
                        ? "border-brand-cyan bg-brand-cyan/20 shadow-[0_0_12px_rgba(0,200,255,0.35)]"
                        : isPast
                          ? "border-brand-purple/50 bg-brand-purple/10"
                          : "border-white/15 bg-bg"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                        isActive
                          ? "bg-brand-cyan"
                          : isPast
                            ? "bg-brand-purple"
                            : "bg-transparent"
                      }`}
                    />
                  </span>
                  <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span
                      className={`font-satoshi text-[10px] font-black tracking-wider ${
                        isActive ? "text-brand-cyan" : "text-white/30"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="font-inter text-[11px] font-medium leading-none">
                      {step.label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
