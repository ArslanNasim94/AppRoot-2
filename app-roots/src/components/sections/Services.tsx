"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const painPoints = [
  {
    number: "01",
    title: "Hiring takes months you don't have",
    body: "Finding, hiring, and managing a reliable dev team eats the runway you need for everything else.",
    solution: "We become your dev team — no hiring required.",
  },
  {
    number: "02",
    title: "Marketing is ready, but the product isn't",
    body: "Your launch plan is waiting on features that keep slipping — and every delay costs you momentum.",
    solution: "We ship on your timeline so marketing can launch.",
  },
  {
    number: "03",
    title: "You're building software instead of finding customers",
    body: "Founders end up buried in tech decisions when their time is worth far more in front of customers.",
    solution: "We handle tech — you stay in front of customers.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      cards.children,
      { x: 120, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start lg:gap-16 xl:grid-cols-[minmax(0,420px)_1fr]">
          <div className="lg:sticky lg:top-32">
            <SectionTag>01 · Pain points — Sound familiar?</SectionTag>
            <h2
              ref={headingRef}
              className="font-satoshi text-[clamp(32px,4vw,52px)] font-black uppercase leading-[1.02] tracking-tight text-text-heading"
            >
              {["THE PROBLEMS THAT", "SLOW STARTUPS DOWN."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <p className="mt-6 font-inter text-base leading-relaxed text-text-body">
              You&apos;re not alone — we hear these from founders every week. We built
              AppRoots to take exactly these problems off your plate.
            </p>
          </div>

          <div ref={cardsRef} className="flex flex-col gap-5">
            {painPoints.map((point) => (
              <motion.div
                key={point.number}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(123,47,255,0.3)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                className="group w-full rounded-2xl border border-white/[0.07] bg-bg-surface p-8 lg:p-10"
              >
                <span className="font-satoshi text-[64px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[72px]">
                  {point.number}
                </span>
                <h3 className="mt-3 font-satoshi text-xl font-black uppercase leading-tight text-text-heading lg:text-[22px]">
                  {point.title}
                </h3>
                <p className="mt-4 font-inter text-[15px] leading-relaxed text-text-body lg:text-base">
                  {point.body}
                </p>
                <p className="mt-5 font-inter text-sm font-medium text-brand-cyan">
                  → {point.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
