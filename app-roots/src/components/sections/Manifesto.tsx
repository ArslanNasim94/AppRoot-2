"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const youFocus = ["Marketing & campaigns", "Sales & customers", "Growth strategy"];
const ourFocus = ["Web & backend", "Mobile apps", "Launch & maintenance"];

export function Manifesto() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      cards.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: cards, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg section-padding">
      <div className="container relative z-10">
        <SectionTag>(How We Work Together)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 text-center font-satoshi text-[clamp(24px,4.5vw,68px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading whitespace-nowrap"
        >
          <span className="block overflow-hidden">
            <span data-line className="block">
              YOU → APPROOTS → LAUNCH.
            </span>
          </span>
        </h2>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.07] bg-bg-surface/80 p-10 backdrop-blur-sm">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-brand-cyan">
              You — Your focus
            </p>
            <h3 className="mt-4 font-satoshi text-2xl font-black uppercase text-text-heading">
              Growth, customers, revenue
            </h3>
            <ul className="mt-6 space-y-3">
              {youFocus.map((item) => (
                <li
                  key={item}
                  className="font-inter text-base text-text-body before:mr-2 before:text-brand-purple before:content-['→']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-bg-surface/80 p-10 backdrop-blur-sm">
            <p className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-brand-purple">
              AR — Our focus
            </p>
            <h3 className="mt-4 font-satoshi text-2xl font-black uppercase text-text-heading">
              Product, code, launch
            </h3>
            <ul className="mt-6 space-y-3">
              {ourFocus.map((item) => (
                <li
                  key={item}
                  className="font-inter text-base text-text-body before:mr-2 before:text-brand-cyan before:content-['→']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center font-satoshi text-xl font-black uppercase tracking-wide text-text-heading">
          One partnership. Clear roles. No overlap.
        </p>
      </div>
    </section>
  );
}
