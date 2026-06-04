"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const industries = [
  {
    name: "FinTech",
    description: "Secure, compliant platforms for payments, banking, and wealth management.",
  },
  {
    name: "HealthTech",
    description: "HIPAA-ready systems that improve patient outcomes and clinical workflows.",
  },
  {
    name: "E-Commerce",
    description: "High-conversion storefronts and marketplaces built for scale.",
  },
  {
    name: "EdTech",
    description: "Engaging learning platforms with analytics and adaptive experiences.",
  },
  {
    name: "Logistics",
    description: "Real-time tracking, fleet management, and supply chain optimization.",
  },
  {
    name: "Startups",
    description: "MVPs to market in weeks, with architecture that scales when you do.",
  },
  {
    name: "Enterprise",
    description: "Legacy modernization and custom integrations for large organizations.",
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
    <section className="section-padding bg-bg">
      <div className="container grid gap-16 lg:grid-cols-2">
        <div>
          <SectionTag>(Industries)</SectionTag>
          <h2
            ref={headingRef}
            className="font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
          >
            {["BUILT FOR", "EVERY", "SECTOR."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-md font-inter text-lg text-text-body">
            Deep domain expertise across regulated and high-growth industries —
            we speak your language and understand your constraints.
          </p>
        </div>

        <div ref={tilesRef} className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <IndustryTile key={industry.name} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryTile({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setOpen(!open)}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      animate={{
        borderRadius: open ? 16 : 100,
        backgroundColor: open
          ? "rgba(123,47,255,0.08)"
          : "rgba(255,255,255,0.03)",
        borderColor: open
          ? "rgba(123,47,255,0.3)"
          : "rgba(255,255,255,0.08)",
      }}
      className="border px-7 py-3.5 text-left font-inter text-sm text-text-body transition-colors hover:text-text-heading"
    >
      <span className="font-medium">{name}</span>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 max-w-xs text-xs leading-relaxed text-text-body"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}