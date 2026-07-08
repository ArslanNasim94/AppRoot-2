"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const scaleRef = useRef(1);
  const rafRef = useRef(0);

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

    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let hovering = false;
    let isCard = false;

    const applyStyles = () => {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = hovering ? "0" : "1";

      const size = hovering ? 64 : 40;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.borderColor = hovering
        ? "rgba(123,47,255,0.6)"
        : "rgba(255,255,255,0.15)";
      circle.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;

      if (label) {
        label.style.opacity = hovering && isCard ? "1" : "0";
      }
    };

    const tick = () => {
      cx += (mx - cx) * 0.82;
      cy += (my - cy) * 0.72;
      applyStyles();
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onDown = () => {
      scaleRef.current = 0.75;
    };

    const onUp = () => {
      scaleRef.current = 1;
    };

    const interactiveSelector = "a, button, [data-cursor='hover']";
    const cardSelector = "[data-cursor='view']";

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(cardSelector)) {
        hovering = true;
        isCard = true;
      } else if (target.closest(interactiveSelector)) {
        hovering = true;
        isCard = false;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        !related?.closest(interactiveSelector) &&
        !related?.closest(cardSelector)
      ) {
        hovering = false;
        isCard = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] max-[767px]:hidden">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-white will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[rgba(10,10,15,0.85)] will-change-transform"
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
