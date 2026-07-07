"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";
import { agents } from "@/data/agents";

const CARD_WIDTH = 480;
const GAP = 24;

export function AiAgents() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dragged, setDragged] = useState(false);
  useNizekHeading(headingRef);

  const maxDrag = -((CARD_WIDTH + GAP) * (agents.length - 1));

  return (
    <section className="section-padding overflow-hidden bg-bg">
      <div className="container mb-12">
        <SectionTag>(Agent Integrations)</SectionTag>
        <h2
          ref={headingRef}
          className="font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["INTEGRATE TOP", "AI AGENTS."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-2xl font-inter text-base text-text-body">
          Integrate top AI agents into your existing or new SaaS.
        </p>
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
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="w-[min(480px,85vw)] shrink-0 rounded-[20px] border border-white/[0.07] bg-bg-surface p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan font-satoshi text-xs font-bold text-white">
                  {agent.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-satoshi text-lg font-black uppercase text-text-heading">
                      {agent.name}
                    </p>
                    {agent.badge && (
                      <span className="rounded-full bg-brand-purple/20 px-2 py-0.5 font-inter text-[10px] font-medium uppercase tracking-wider text-brand-purple">
                        {agent.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="font-inter text-base leading-relaxed text-text-body">
                {agent.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
