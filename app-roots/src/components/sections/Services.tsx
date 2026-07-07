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
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    let mm: gsap.MatchMedia | undefined;

    const init = () => {
      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(cards.scrollWidth - window.innerWidth + 200, 200)}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        tl.to(cards, {
          x: () => -(cards.scrollWidth - window.innerWidth + 200),
          ease: "none",
        });
      });
    };

    window.addEventListener("hero-sequence-ready", init, { once: true });
    setTimeout(init, 800);

    return () => {
      window.removeEventListener("hero-sequence-ready", init);
      mm?.revert();
    };
  }, []);

  return (
    <section
      id="pain-points"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div className="container flex flex-col gap-16 md:flex-row">
        <div className="md:sticky md:top-32 md:w-1/3 md:self-start">
          <SectionTag>01 · Pain points — Sound familiar?</SectionTag>
          <h2
            ref={headingRef}
            className="font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
          >
            {["THE PROBLEMS", "THAT SLOW", "STARTUPS DOWN."].map((line) => (
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

        <div
          ref={cardsRef}
          className="flex flex-col gap-5 md:flex-row md:gap-5"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.number}
              whileHover={{
                y: -8,
                borderColor: "rgba(123,47,255,0.3)",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group w-full shrink-0 rounded-2xl border border-white/[0.07] bg-bg-surface p-10 md:w-[420px]"
            >
              <span className="font-satoshi text-[80px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text">
                {point.number}
              </span>
              <h3 className="mt-4 font-satoshi text-[22px] font-black uppercase leading-tight text-text-heading">
                {point.title}
              </h3>
              <p className="mt-4 font-inter text-base leading-relaxed text-text-body">
                {point.body}
              </p>
              <p className="mt-4 font-inter text-sm font-medium text-brand-cyan">
                → {point.solution}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
