"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseNizekHeadingOptions {
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  start?: string;
}

export function useNizekHeading(
  ref: React.RefObject<HTMLElement | null>,
  options: UseNizekHeadingOptions = {}
) {
  const {
    stagger = 0.12,
    duration = 0.9,
    delay = 0,
    once = true,
    start = "top 80%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) gsap.set(el, { opacity: 1 });
      return;
    }

    const lines = Array.from(el.querySelectorAll("[data-line]")) as HTMLElement[];

    if (lines.length === 0) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    gsap.set(lines, { yPercent: 110, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
      delay,
    });

    tl.to(lines, {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power4.out",
    });

    const tag = el.previousElementSibling;
    if (tag?.classList.contains("section-tag")) {
      gsap.fromTo(
        tag,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: { trigger: tag, start, once },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el || st.trigger === tag) st.kill();
      });
    };
  }, [ref, stagger, duration, delay, once, start]);
}
