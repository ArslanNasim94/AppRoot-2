"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const projects = [
  {
    id: "01",
    title: "Luminary AI",
    category: "SaaS · Web App",
    outcome: "Scaled to 50,000 users in 4 months",
    color: "#1A0A2E",
    tag: "Featured",
    span: "col-span-2 row-span-2",
  },
  {
    id: "02",
    title: "Vertex 3D",
    category: "3D Web · Immersive Experience",
    outcome: "4.2M impressions in launch week",
    color: "#0A1A2E",
    span: "col-span-2 row-span-1",
  },
  {
    id: "03",
    title: "FlowOps",
    category: "AI Automation",
    outcome: "Reduced manual workload by 78%",
    color: "#0A1A1A",
    span: "col-span-1 row-span-2",
  },
  {
    id: "04",
    title: "Orbis Commerce",
    category: "Mobile App",
    outcome: "4.9★ App Store rating · 200k downloads",
    color: "#1A1A0A",
    span: "col-span-3 row-span-1",
  },
];

export function Work() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const cards = grid.querySelectorAll("[data-project-card]");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section id="work" className="section-padding bg-bg">
      <div className="container">
        <SectionTag>(Selected Work)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["PROJECTS", "THAT", "PROVE IT."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[240px]"
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href="#"
              data-project-card
              data-cursor="view"
              whileHover={{ scale: 1.02 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/[0.07] p-10 ${project.span}`}
              style={{ backgroundColor: project.color }}
            >
              <div>
                {project.tag && (
                  <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
                    {project.tag}
                  </span>
                )}
                <p className="mt-2 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
                  {project.category}
                </p>
              </div>

              <div>
                <h3 className="font-satoshi text-[clamp(28px,4vw,48px)] font-black uppercase text-text-heading">
                  {project.title}
                </h3>
                <p className="mt-2 font-inter text-sm text-text-body">
                  {project.outcome}
                </p>
                <span className="mt-4 inline-block font-inter text-sm text-text-body opacity-0 transition-opacity group-hover:opacity-100">
                  View Case Study →
                </span>
              </div>

              <span className="pointer-events-none absolute bottom-4 right-6 font-satoshi text-[120px] font-black leading-none text-white/[0.04] transition-opacity group-hover:text-white/[0.08]">
                {project.id}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
