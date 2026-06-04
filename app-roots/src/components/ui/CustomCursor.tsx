"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      "ontouchstart" in window ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!dot || !circle) return;

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const xToCircle = gsap.quickTo(circle, "x", { duration: 0.15, ease: "power3.out" });
    const yToCircle = gsap.quickTo(circle, "y", { duration: 0.15, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToCircle(e.clientX);
      yToCircle(e.clientY);
    };

    const onDown = () => {
      gsap.to(circle, { scale: 0.75, duration: 0.2 });
    };

    const onUp = () => {
      gsap.to(circle, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
    };

    const setHover = (isCard: boolean) => {
      gsap.to(dot, { opacity: 0, duration: 0.2 });
      gsap.to(circle, {
        width: 64,
        height: 64,
        borderColor: "rgba(123,47,255,0.6)",
        duration: 0.3,
      });
      if (label) {
        gsap.to(label, { opacity: isCard ? 1 : 0, duration: 0.2 });
      }
    };

    const resetHover = () => {
      gsap.to(dot, { opacity: 1, duration: 0.2 });
      gsap.to(circle, {
        width: 40,
        height: 40,
        borderColor: "rgba(255,255,255,0.15)",
        duration: 0.3,
      });
      if (label) {
        gsap.to(label, { opacity: 0, duration: 0.2 });
      }
    };

    const interactiveSelector = "a, button, [data-cursor='hover']";
    const cardSelector = "[data-cursor='view']";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(cardSelector)) {
        setHover(true);
      } else if (target.closest(interactiveSelector)) {
        setHover(false);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related?.closest(interactiveSelector) &&
        !related?.closest(cardSelector)
      ) {
        resetHover();
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5"
        style={{
          background:
            "linear-gradient(#0A0A0F, #0A0A0F) padding-box, linear-gradient(135deg, #7B2FFF, #00C8FF) border-box",
        }}
      >
        <span
          ref={labelRef}
          className="font-inter text-[10px] font-semibold uppercase tracking-widest text-white opacity-0"
        >
          View
        </span>
      </div>
    </div>
  );
}
