"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNizekHeading } from "@/components/animations/useNizekHeading";
import { SectionShell } from "@/components/layout/SectionLayout";

const usualPath = [
  "Rotating freelancers who lose context every sprint",
  "Account managers — never the engineers who ship",
  "Separate vendors for web, mobile, and AI",
  "Surprise scope creep and invoices you didn't expect",
];

const withAppRoots = [
  "One dedicated squad that knows your product inside out",
  "Talk directly to the devs building your MVP",
  "Web, mobile, backend & AI agents — one partner",
  "Milestone pricing, weekly demos, zero surprises",
];

const miniCards = [
  {
    title: "A dedicated, professional team",
    body: "One squad that ships web, mobile, AI, and backend — so you stay focused on customers.",
  },
  {
    title: "Direct, honest communication",
    body: "Talk to the people building it — no account managers between you and your dev team.",
  },
  {
    title: "Full development support",
    body: "From MVP to launch and beyond — we maintain, improve, and grow with you.",
  },
  {
    title: "Multiple stacks, one partner",
    body: "React Native, SwiftUI, Kotlin, Laravel, and Next.js — all under one roof.",
  },
];

export function WhyUs() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
  }, []);

  return (
    <section id="why-different" className="site-section bg-bg-surface">
      <SectionShell>
        <div className="section-header mx-auto max-w-3xl text-center">
          <SectionTag>04 · Why us</SectionTag>
          <h2 ref={headingRef} className="text-heading-section">
            <span className="block overflow-hidden">
              <span data-line className="block lg:whitespace-nowrap">
                BUILT FOR FOUNDERS.
              </span>
            </span>
          </h2>
          <p className="copy-lead mx-auto max-w-2xl">
            Most startups juggle freelancers, agencies, and hiring. AppRoots gives you
            one dedicated squad that ships web, mobile, AI, and backend — so you stay
            focused on customers. Our experienced team brings 20+ years in the IT
            industry, using that expertise to boost, refine, and polish your SaaS, MVP,
            or startup product.
          </p>
        </div>

        <div className="card-grid md:grid-cols-2">
          <div className="card-surface">
            <h3 className="heading-card text-white/40">The usual path</h3>
            <ul className="mt-6 space-y-4">
              {usualPath.map((item) => (
                <li
                  key={item}
                  className="font-inter text-sm text-text-body before:mr-2 before:text-white/20 before:content-['✕']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface border-brand-purple/30 bg-brand-purple/5">
            <h3 className="heading-card gradient-text">With AppRoots</h3>
            <ul className="mt-6 space-y-4">
              {withAppRoots.map((item) => (
                <li
                  key={item}
                  className="font-inter text-sm text-text-body before:mr-2 before:text-brand-cyan before:content-['✓']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={cardsRef} className="card-grid mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {miniCards.map((card) => (
            <div key={card.title} className="card-surface">
              <h3 className="font-satoshi text-sm font-black uppercase text-text-heading">
                {card.title}
              </h3>
              <p className="text-card">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-satoshi text-lg font-black uppercase text-text-heading lg:text-xl">
          You stay in founder mode. We stay in build mode.
        </p>

        <div className="btn-row-center">
          <MagneticButton href="#steps">See how we work →</MagneticButton>
          <a
            href="/products"
            className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
            data-cursor="hover"
          >
            See Our Products
          </a>
        </div>
      </SectionShell>
    </section>
  );
}
