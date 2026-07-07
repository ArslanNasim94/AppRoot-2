"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function ProductsPageHeader() {
  return (
    <>
      <SectionTag>Proof of work</SectionTag>
      <AnimatedHeading
        as="h1"
        className="mb-4 text-heading-page"
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
      className="mb-4 text-heading-page"
    >
      {title}
    </AnimatedHeading>
  );
}
