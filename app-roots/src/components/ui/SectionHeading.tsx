"use client";

import { useRef } from "react";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

interface SectionHeadingProps {
  tag?: string;
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  tag,
  lines,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  return (
    <>
      {tag && <span className="section-tag mb-4 block font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">{tag}</span>}
      <Tag
        ref={headingRef}
        className={`text-heading-display ${className}`}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span data-line className="block">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </>
  );
}
