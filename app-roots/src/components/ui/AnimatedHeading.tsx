"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useNizekHeading } from "@/components/animations/useNizekHeading";
import { prefersReducedMotion } from "@/components/animations/useReducedMotion";

interface AnimatedHeadingProps {
  eyebrow?: React.ReactNode;
  lines?: string[];
  /** @deprecated Prefer `lines` — kept for auth/content pages with a single title string */
  children?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
}

export function AnimatedHeading({
  eyebrow,
  lines,
  children,
  as: Tag = "h2",
  align = "left",
  className = "",
  headingClassName = "text-heading-section",
}: AnimatedHeadingProps) {
  const resolvedLines = lines ?? (children ? [children] : []);
  const linesKey = resolvedLines.join("|");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useNizekHeading(headingRef, {
    start: "top 88%",
    end: "top 52%",
    scrub: 0.35,
    once: true,
    fromX: 48,
  });

  useEffect(() => {
    const eyebrowEl = eyebrowRef.current;
    if (!eyebrowEl || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      eyebrowEl,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: eyebrowEl,
          start: "top 88%",
          once: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [linesKey]);

  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`.trim()}
    >
      {eyebrow && (
        <div
          ref={eyebrowRef}
          className={`mb-4 ${align === "center" ? "flex justify-center" : ""}`}
        >
          {eyebrow}
        </div>
      )}
      <Tag ref={headingRef} className={headingClassName}>
        {resolvedLines.map((line) => (
          <span key={line} className="block overflow-hidden">
            <span data-line className="block">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
