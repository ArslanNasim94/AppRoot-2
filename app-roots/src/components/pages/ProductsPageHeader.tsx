"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function ProductsPageHeader() {
  return (
    <>
      <SectionTag>(Products)</SectionTag>
      <AnimatedHeading
        as="h1"
        className="mb-4 font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
      >
        Ready-Made Products & Services
      </AnimatedHeading>
    </>
  );
}

export function ProductDetailHeading({ title }: { title: string }) {
  return (
    <AnimatedHeading
      as="h1"
      className="mb-4 font-satoshi text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
    >
      {title}
    </AnimatedHeading>
  );
}
