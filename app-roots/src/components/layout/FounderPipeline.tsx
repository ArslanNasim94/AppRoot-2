"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STEPS = [
  { id: "idea", num: "01", label: "Idea" },
  { id: "pain-points", num: "02", label: "Pain points" },
  { id: "ai-for-startups", num: "03", label: "AI path" },
  { id: "why-different", num: "04", label: "Why us" },
  { id: "tech-stack", num: "05", label: "Tech stack" },
  { id: "steps", num: "06", label: "How we work" },
  { id: "contact", num: "07", label: "Launch" },
] as const;

export function FounderPipeline() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = STEPS.map((step) =>
      document.getElementById(step.id)
    ).filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const updateActive = () => {
      const marker = window.innerHeight * 0.38;
      let current = 0;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= marker) current = i;
      }

      setActive(current);
      setVisible(window.scrollY > 120);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const current = STEPS[active];

  return (
    <aside
      aria-label="Founder pipeline navigation"
      className={`fixed left-6 top-1/2 z-[150] hidden -translate-y-1/2 transition-all duration-500 xl:block ${
        visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
      }`}
    >
      <div className="w-[148px]">
        <p className="font-inter text-[11px] font-medium uppercase tracking-[0.14em] text-brand-cyan">
          {current.label} {active + 1} / {STEPS.length}
        </p>
        <p className="mt-1 font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-white/30">
          Founder Pipeline
        </p>

        <div className="relative mt-6">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.08]" />
          <div
            className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-brand-purple to-brand-cyan transition-all duration-500"
            style={{
              height: `${Math.max(0, (active / (STEPS.length - 1)) * 100)}%`,
              maxHeight: "calc(100% - 16px)",
            }}
          />

          <ul className="relative space-y-4">
            {STEPS.map((step, index) => {
              const isActive = index === active;
              const isPast = index < active;

              return (
                <li key={step.id}>
                  <Link
                    href={`#${step.id}`}
                    className={`group flex items-center gap-3 transition-colors duration-300 ${
                      isActive
                        ? "text-text-heading"
                        : isPast
                          ? "text-white/45 hover:text-text-heading"
                          : "text-white/25 hover:text-white/45"
                    }`}
                  >
                    <span
                      className={`relative z-10 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-brand-cyan bg-brand-cyan/20 shadow-[0_0_12px_rgba(0,200,255,0.35)]"
                          : isPast
                            ? "border-brand-purple/50 bg-brand-purple/10"
                            : "border-white/15 bg-bg"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                          isActive
                            ? "bg-brand-cyan"
                            : isPast
                              ? "bg-brand-purple"
                              : "bg-transparent"
                        }`}
                      />
                    </span>
                    <span className="flex items-baseline gap-1.5">
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
      </div>
    </aside>
  );
}
