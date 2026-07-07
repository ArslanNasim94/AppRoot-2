"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const items = [
  "React Native",
  "SwiftUI",
  "Kotlin",
  "Laravel",
  "Next.js",
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const text = items.join(" · ");

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    tweenRef.current = gsap.to(track, {
      x: "-50%",
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.3, duration: 0.4 });
    }
  };

  const handleLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
    }
  };

  return (
    <div
      className="overflow-hidden border-y border-white/[0.07] py-5"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="px-8 font-inter text-[13px] uppercase tracking-[0.1em] text-white/25"
          >
            {text}
            <span className="mx-8">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
