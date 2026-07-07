"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

interface ContentPageLayoutProps {
  children: React.ReactNode;
  maxWidth?: "md" | "lg" | "xl";
}

const widthClass = {
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
};

export function ContentPageLayout({
  children,
  maxWidth = "lg",
}: ContentPageLayoutProps) {
  return (
    <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-bg pb-20 pt-16 lg:pb-28 lg:pt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 900px 500px at 50% -10%, rgba(123,47,255,0.12) 0%, transparent 55%), radial-gradient(ellipse 700px 400px at 90% 20%, rgba(0,200,255,0.06) 0%, transparent 50%)",
        }}
      />
      <div className={`container relative z-10 ${widthClass[maxWidth]}`}>
        {children}
      </div>
    </div>
  );
}

interface ContentPageHeroProps {
  tag: string;
  title: string;
  description?: string;
  meta?: string;
}

export function ContentPageHero({
  tag,
  title,
  description,
  meta,
}: ContentPageHeroProps) {
  return (
    <header className="mb-12 lg:mb-16">
      <SectionTag>{tag}</SectionTag>
      <AnimatedHeading
        as="h1"
        className="font-satoshi text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
      >
        {title}
      </AnimatedHeading>
      {meta && (
        <p className="mt-3 font-inter text-sm text-white/40">{meta}</p>
      )}
      {description && (
        <p className="mt-6 max-w-2xl font-inter text-base leading-relaxed text-text-body lg:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
