"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
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
      id="ai-for-startups"
      ref={sectionRef}
      className="site-section relative overflow-hidden bg-bg"
    >
      <div className="container">
        <div className="section-grid lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start xl:grid-cols-[minmax(0,420px)_1fr]">
          <div className="lg:sticky lg:top-32">
            <SectionTag>03 · AI path</SectionTag>
            <h2 ref={headingRef} className="text-heading-section">
              {["YOUR STARTUP'S", "AI PARTNER."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
            <p className="copy-lead">
              We specialize in AI-based solutions. Add AI to the product you already
              have, make your current system smarter, or launch a completely new AI
              SaaS with us.
            </p>
          </div>

          <div ref={cardsRef} className="flex flex-col gap-6">
            {aiPaths.map((path) => (
              <motion.div
                key={path.number}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(123,47,255,0.3)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
                className="card-surface group w-full"
              >
                <span className="font-satoshi text-[56px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[64px]">
                  {path.number}
                </span>
                <h3 className="heading-card mt-3">{path.title}</h3>
                <p className="text-card">{path.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="btn-row-center">
          <MagneticButton href="#ai-chatbot">Discuss your AI idea →</MagneticButton>
        </div>
      </div>
    </section>
  );
}
