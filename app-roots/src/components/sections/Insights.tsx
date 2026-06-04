"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

// TODO: Replace with real data
const posts = [
  {
    category: "AI",
    title: "Why Most AI Consultants Are Selling You Hype",
    readTime: "5 min read",
    date: "May 2025",
  },
  {
    category: "3D Web",
    title: "WebGL in 2025: What's Actually Production-Ready",
    readTime: "8 min read",
    date: "Apr 2025",
  },
  {
    category: "SaaS",
    title: "The Architecture Decisions That Scale — and the Ones That Don't",
    readTime: "6 min read",
    date: "Apr 2025",
  },
];

export function Insights() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section id="insights" className="section-padding bg-bg">
      <div className="container">
        <SectionTag>(Insights)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 font-satoshi text-[clamp(56px,7vw,100px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["THOUGHTS", "FROM THE", "ROOT."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div ref={gridRef} className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <motion.a
              key={post.title}
              href="#"
              whileHover={{ y: -4 }}
              className="group border-b border-white/[0.07] pb-8"
              data-cursor="hover"
            >
              <span className="gradient-text font-inter text-[11px] font-medium uppercase tracking-[0.12em]">
                {post.category}
              </span>
              <h3 className="mt-3 font-satoshi text-[22px] font-bold leading-tight text-text-heading group-hover:underline group-hover:decoration-white/30 group-hover:underline-offset-4">
                {post.title}
              </h3>
              <p className="mt-4 font-inter text-[13px] text-text-body">
                {post.readTime} · {post.date}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
