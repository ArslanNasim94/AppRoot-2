"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { HERO_EXIT_OVERLAP_SVH } from "@/components/animations/heroSequence";
import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { IdeaPartnership } from "@/components/sections/IdeaPartnership";
import { SectionShell } from "@/components/layout/SectionLayout";

export function IdeaSection() {
  return (
    <section
      id="idea"
      className="site-section relative z-20 scroll-mt-20 bg-bg !pt-8 lg:!pt-12"
      style={{ marginTop: `calc(-1 * ${HERO_EXIT_OVERLAP_SVH}svh)`, perspective: 1200 }}
    >
      <SectionShell className="py-4 text-center lg:py-6">
        <AnimatedHeading
          eyebrow={<SectionTag>01 · Idea</SectionTag>}
          lines={["YOU FOCUS ON GROWTH.", "WE BUILD THE PRODUCT."]}
          headingClassName="text-heading-idea mx-auto"
          className="mx-auto max-w-4xl"
        />

        <p className="copy-lead mx-auto mt-6 max-w-2xl">
          AppRoots takes web, mobile, and backend development off your plate — so
          you can focus on marketing, sales, and customers while we ship the
          product.
        </p>

        <div
          className="mx-auto mt-8 inline-flex max-w-full items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/[0.08] px-4 py-2.5 text-left font-inter text-[13px] leading-snug text-brand-cyan sm:text-sm lg:mt-10"
          role="note"
        >
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            We also build AI solutions — integrate AI into your existing system or
            launch a new AI SaaS.
          </span>
        </div>

        <div className="btn-row-center">
          <MagneticButton href="/register">Let&apos;s talk →</MagneticButton>
          <Link
            href="/products"
            className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
            data-cursor="hover"
          >
            See Our Products
          </Link>
        </div>

        <IdeaPartnership />
      </SectionShell>
    </section>
  );
}
