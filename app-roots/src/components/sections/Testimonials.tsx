"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const testimonials = [
  {
    quote:
      "App Roots didn't just build our platform — they built the foundation we needed to scale. Every detail was considered, every deadline was met. The code is as clean as the UI.",
    name: "Sarah Chen",
    title: "CTO",
    company: "Luminary AI",
    initials: "SC",
  },
  {
    quote:
      "We'd worked with three agencies before App Roots. None of them came close. Their guarantee isn't marketing — they mean it, and they've never had to use it with us because they get it right the first time.",
    name: "Marcus Reid",
    title: "Founder & CEO",
    company: "FlowOps",
    initials: "MR",
  },
  {
    quote:
      "The 3D web experience they built for us generated 4.2 million organic impressions in the first week. Our competitors are still trying to figure out how we did it.",
    name: "Aisha Patel",
    title: "Head of Digital",
    company: "Vertex 3D",
    initials: "AP",
  },
];

const CARD_WIDTH = 480;
const GAP = 24;

export function Testimonials() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dragged, setDragged] = useState(false);
  useNizekHeading(headingRef);

  const maxDrag = -((CARD_WIDTH + GAP) * (testimonials.length - 1));

  return (
    <section className="section-padding overflow-hidden bg-bg">
      <div className="container mb-12">
        <SectionTag>(Client Voices)</SectionTag>
        <h2
          ref={headingRef}
          className="font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["WHAT THEY", "SAY."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>
      </div>

      <div className="container relative">
        {!dragged && (
          <p className="mb-6 text-center font-inter text-xs uppercase tracking-widest text-white/25">
            ← drag →
          </p>
        )}

        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: maxDrag }}
          dragElastic={0.1}
          onDragStart={() => setDragged(true)}
          className="flex cursor-grab gap-6 active:cursor-grabbing"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="w-[min(480px,85vw)] shrink-0 rounded-[20px] border border-white/[0.07] bg-bg-surface p-10"
            >
              <p className="font-inter text-lg italic leading-relaxed text-text-heading">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan font-satoshi text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="font-inter text-sm font-medium text-text-heading">
                    {t.name}
                  </p>
                  <p className="font-inter text-sm text-text-body">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
