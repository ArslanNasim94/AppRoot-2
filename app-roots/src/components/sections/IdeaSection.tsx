"use client";

import { useRef } from "react";
import Link from "next/link";
import { SectionTag } from "@/components/ui/SectionTag";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

export function IdeaSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  return (
    <section
      id="idea"
      className="site-section relative z-20 scroll-mt-20 bg-bg"
    >
      <div className="container max-w-5xl py-4 text-center lg:py-6">
        <SectionTag>01 · Idea</SectionTag>

        <p className="mb-3 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
          Your development partner
        </p>

        <h2 ref={headingRef} className="mx-auto text-heading-idea">
          {["YOU FOCUS ON", "GROWTH. WE BUILD", "THE PRODUCT."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p className="copy-lead mx-auto">
          AppRoots takes web, mobile, and backend development off your plate — so
          you can focus on marketing, sales, and customers while we ship the
          product.
        </p>

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
      </div>
    </section>
  );
}
