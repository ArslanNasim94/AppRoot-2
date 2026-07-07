"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const stats = [
  {
    display: "React Native · SwiftUI · Kotlin · Laravel · Next.js",
    label: "Core stacks",
    large: false,
  },
  {
    display: "3+",
    label: "Products running in production",
    large: true,
  },
  {
    display: "1 team",
    label: "Dedicated squad per project",
    large: true,
  },
  {
    display: "Weekly",
    label: "Demos & honest progress updates",
    large: true,
  },
];

export function Metrics() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section className="section-padding bg-bg">
      <div className="container">
        <SectionTag>(Partnership Stats)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 text-center font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["ONE PARTNERSHIP.", "CLEAR ROLES."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          ref={gridRef}
          className="mx-auto grid max-w-[900px] grid-cols-1 gap-10 md:grid-cols-2"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-white/[0.05] pb-8 text-center"
            >
              <div
                className={`font-satoshi font-black text-text-heading ${
                  stat.large
                    ? "text-[clamp(36px,5vw,56px)]"
                    : "text-base leading-relaxed md:text-lg"
                }`}
              >
                {stat.display}
              </div>
              <p className="mt-2 font-inter text-sm text-text-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
