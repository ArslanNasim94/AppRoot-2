"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

const aiPaths = [
  {
    number: "01",
    title: "Integrate AI into your product",
    body: "Add chat assistants, smart search, and AI features to your existing app, CRM, or workflow — without rebuilding what already works.",
    tags: ["LLM APIs", "RAG", "Chat assistants"],
  },
  {
    number: "02",
    title: "Upgrade existing systems with AI",
    body: "We improve the system you run today: AI automation, intelligent agents, and analytics that make your product more progressive and competitive.",
    tags: ["Automation", "AI agents", "Analytics"],
  },
  {
    number: "03",
    title: "Build a brand-new AI SaaS",
    body: "Have an AI product idea? We take it from concept to production — a complete AI-native SaaS built, launched, and maintained by one team.",
    tags: ["Laravel", "Next.js", "MVP to scale"],
  },
];

export function AiForStartups() {
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
      ScrollTrigger.refresh(true);
      mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(cards.scrollWidth - window.innerWidth + 200, 200)}`,
            pin: true,
            scrub: 1,
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
    setTimeout(init, 1500);

    return () => {
      window.removeEventListener("hero-sequence-ready", init);
      mm?.revert();
    };
  }, []);

  return (
    <section
      id="ai-for-startups"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div className="container flex flex-col gap-16 md:flex-row">
        <div className="md:sticky md:top-32 md:w-1/3 md:self-start">
          <SectionTag>02 · AI path</SectionTag>
          <h2
            ref={headingRef}
            className="font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
          >
            {["YOUR STARTUP'S", "AI PARTNER."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-6 font-inter text-base leading-relaxed text-text-body">
            We specialize in AI-based solutions. Add AI to the product you already
            have, make your current system smarter, or launch a completely new AI
            SaaS with us.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col gap-5 md:flex-row md:gap-5"
        >
          {aiPaths.map((path) => (
            <motion.div
              key={path.number}
              whileHover={{
                y: -8,
                borderColor: "rgba(123,47,255,0.3)",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group w-full shrink-0 rounded-2xl border border-white/[0.07] bg-bg-surface p-10 md:w-[420px]"
            >
              <span className="font-satoshi text-[80px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text">
                {path.number}
              </span>
              <h3 className="mt-4 font-satoshi text-[22px] font-black uppercase leading-tight text-text-heading">
                {path.title}
              </h3>
              <p className="mt-4 font-inter text-base leading-relaxed text-text-body">
                {path.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {path.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] px-3 py-1 font-inter text-[11px] text-text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mt-12 text-center">
        <MagneticButton href="#ai-chatbot">Discuss your AI idea →</MagneticButton>
      </div>
    </section>
  );
}
