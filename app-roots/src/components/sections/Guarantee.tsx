"use client";

import { useEffect, useRef } from "react";
import { Shield, Code2, RefreshCw } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const pillars = [
  {
    icon: Shield,
    title: "Zero Compromise Quality",
    body: "Every commit is reviewed, every edge case considered. We ship code we'd be proud to maintain ourselves.",
  },
  {
    icon: Code2,
    title: "Clean Architecture",
    body: "Modular, testable, documented. Your codebase stays maintainable long after we hand it over.",
  },
  {
    icon: RefreshCw,
    title: "Free Rewrites",
    body: "If you're not satisfied with any deliverable, we rewrite it at no extra cost. That's our guarantee.",
  },
];

export function Guarantee() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center bg-bg section-padding">
      <div className="container text-center">
        <SectionTag>(Our Promise)</SectionTag>
        <h2
          ref={headingRef}
          className="mx-auto font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["IF YOU DON'T", "LOVE THE CODE,", "WE REWRITE IT."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span data-line className="gradient-text block">
              FREE.
            </span>
          </span>
        </h2>

        <div
          ref={pillarsRef}
          className="mt-20 grid gap-10 md:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-left md:text-center">
              <pillar.icon
                className="mb-4 h-5 w-5 text-brand-purple"
                strokeWidth={1.5}
              />
              <h3 className="font-satoshi text-xl font-black uppercase text-text-heading">
                {pillar.title}
              </h3>
              <p className="mt-3 font-inter text-base text-text-body">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <MagneticButton href="#contact">Hold Us to It →</MagneticButton>
        </div>
      </div>
    </section>
  );
}
