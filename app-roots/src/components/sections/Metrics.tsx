"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 80, suffix: "+", label: "Global Clients" },
  { value: 96, suffix: "%", label: "Client Retention Rate" },
  { value: 40, prefix: "$", suffix: "M+", label: "Revenue Generated for Clients" },
  { value: 99.9, suffix: "%", label: "Average Uptime Across Products" },
  { value: 18, suffix: "+", label: "Countries Served" },
];

export function Metrics() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const items = grid.querySelectorAll("[data-stat-value]");
    items.forEach((el, i) => {
      const stat = stats[i];
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        delay: i * 0.1,
        snap: { val: stat.value % 1 === 0 ? 1 : 0.1 },
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
        onUpdate: () => {
          const display =
            stat.value % 1 === 0
              ? Math.round(obj.val)
              : obj.val.toFixed(1);
          el.textContent = `${stat.prefix ?? ""}${display}${stat.suffix}`;
        },
      });
    });
  }, []);

  return (
    <section className="section-padding bg-bg">
      <div className="container">
        <SectionTag>(By The Numbers)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 text-center font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["RESULTS", "THAT", "SPEAK."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          ref={gridRef}
          className="mx-auto grid max-w-[900px] grid-cols-2 gap-10 md:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-white/[0.05] pb-8 text-center"
            >
              <div
                data-stat-value
                className="font-satoshi text-[clamp(56px,6vw,80px)] font-black text-text-heading"
              >
                {stat.prefix ?? ""}0{stat.suffix}
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
