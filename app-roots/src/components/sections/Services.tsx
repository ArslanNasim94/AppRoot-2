"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const services = [
  {
    number: "01",
    title: "AI Engineering",
    body: "Custom LLM integrations, intelligent automation, and production-grade AI systems that deliver measurable ROI — not demos.",
  },
  {
    number: "02",
    title: "3D Web Experiences",
    body: "Immersive WebGL and Three.js experiences that stop scrollers, win awards, and convert visitors into believers.",
  },
  {
    number: "03",
    title: "SaaS Platforms",
    body: "Scalable multi-tenant architectures built for growth — from MVP to enterprise with clean, maintainable code.",
  },
  {
    number: "04",
    title: "Mobile Apps",
    body: "Native-feel cross-platform apps with pixel-perfect UI, offline support, and App Store-ready polish.",
  },
  {
    number: "05",
    title: "Product Strategy",
    body: "Technical discovery, architecture decisions, and roadmap planning that align engineering with business outcomes.",
  },
  {
    number: "06",
    title: "Cloud Architecture",
    body: "AWS, GCP, and Azure infrastructure designed for 99.9% uptime, auto-scaling, and cost efficiency at scale.",
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
      id="services"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-bg"
    >
      <div className="container flex flex-col gap-16 md:flex-row">
        <div className="md:sticky md:top-32 md:w-1/3 md:self-start">
          <SectionTag>(What We Do)</SectionTag>
          <h2
            ref={headingRef}
            className="font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
          >
            {["EVERY", "PROBLEM.", "ONE ROOT."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col gap-5 md:flex-row md:gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              whileHover={{
                y: -8,
                borderColor: "rgba(123,47,255,0.3)",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="group w-full shrink-0 rounded-2xl border border-white/[0.07] bg-bg-surface p-10 md:w-[420px]"
            >
              <span className="font-satoshi text-[80px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text">
                {service.number}
              </span>
              <h3 className="mt-4 font-satoshi text-[28px] font-black uppercase text-text-heading">
                {service.title}
              </h3>
              <p className="mt-4 font-inter text-base leading-relaxed text-text-body">
                {service.body}
              </p>
              <a
                href="#contact"
                className="mt-6 inline-block font-inter text-[13px] text-text-body transition-colors hover:gradient-text"
                data-cursor="hover"
              >
                Explore →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
