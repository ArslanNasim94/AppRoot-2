"use client";

import { useRef } from "react";
import { useNizekHeading } from "@/components/animations/useNizekHeading";

interface AnimatedHeadingProps {
  as?: "h1" | "h2" | "h3";
  lines?: string[];
  children?: string;
  className?: string;
}

export function AnimatedHeading({
  as: Tag = "h2",
  lines,
  children,
  className = "",
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useNizekHeading(headingRef);

  const content = lines ?? (children ? [children] : []);

  return (
    <Tag ref={headingRef} className={className}>
      {content.map((line) => (
        <span key={line} className="block overflow-hidden">
          <span data-line className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
