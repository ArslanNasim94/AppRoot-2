"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const stackCards = [
  {
    name: "Web Platforms",
    description:
      "Production-grade web applications and SaaS platforms built with Laravel and Next.js. Scalable, secure, and maintainable from day one.",
    tag: "Laravel · Next.js",
  },
  {
    name: "Mobile Apps",
    description:
      "Cross-platform iOS and Android apps built with React Native — one codebase, native experience, faster time to market.",
    tag: "React Native",
  },
  {
    name: "Backend & DevOps",
    description:
      "APIs, databases, cloud infrastructure, and post-launch maintenance — everything that keeps your product running reliably.",
    tag: "Full development support",
  },
];

export function Industries() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const tiles = tilesRef.current;
    if (!tiles || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      tiles.children,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: tiles, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section id="tech-stack" className="section-padding bg-bg">
      <div className="container grid gap-16 lg:grid-cols-2">
        <div>
          <SectionTag>05 · Tech stack</SectionTag>
          <h2
            ref={headingRef}
            className="font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
          >
            {["FULL-STACK", "DEVELOPMENT,", "ONE PARTNER."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div ref={tilesRef} className="flex flex-col gap-4">
          {stackCards.map((card) => (
            <div
              key={card.name}
              className="rounded-2xl border border-white/[0.07] bg-bg-surface p-8 transition-colors hover:border-brand-purple/30"
            >
              <h3 className="font-satoshi text-xl font-black uppercase text-text-heading">
                {card.name}
              </h3>
              <p className="mt-3 font-inter text-sm leading-relaxed text-text-body">
                {card.description}
              </p>
              <span className="mt-4 inline-block rounded-full border border-white/[0.08] px-3 py-1 font-inter text-[11px] text-text-body">
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-12 text-center">
        <MagneticButton href="/products">See Our Products →</MagneticButton>
      </div>
    </section>
  );
}
