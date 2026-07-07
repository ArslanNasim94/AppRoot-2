"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  collectHeadingLetters,
  HEADING_SHADOW_FROM,
  HEADING_SHADOW_TO,
} from "@/components/animations/headingShadowEffect";

interface UseNizekHeadingOptions {
  stagger?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  fromX?: number;
}

export function useNizekHeading(
  ref: React.RefObject<HTMLElement | null>,
  options: UseNizekHeadingOptions = {}
) {
  const {
    stagger = 0.025,
    duration = 0.35,
    delay = 0,
    once = true,
    start = "top 88%",
    end = "top 52%",
    scrub = 0.35,
    fromX = 80,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lines = Array.from(el.querySelectorAll("[data-line]")) as HTMLElement[];

    if (lines.length === 0) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const letters = collectHeadingLetters(el);

    if (reducedMotion) {
      gsap.set(letters, {
        x: 0,
        opacity: 1,
        textShadow: HEADING_SHADOW_TO,
        clearProps: "transform",
      });
      return;
    }

    gsap.set(letters, {
      x: fromX,
      opacity: 0.3,
      textShadow: HEADING_SHADOW_FROM,
      force3D: true,
    });

    const tl = gsap.timeline({
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: once ? scrub : scrub,
        once,
      },
    });

    letters.forEach((letter, index) => {
      tl.to(
        letter,
        {
          x: 0,
          opacity: 1,
          textShadow: HEADING_SHADOW_TO,
          duration,
          ease: "power2.out",
        },
        index * stagger
      );
    });

    ScrollTrigger.refresh();

    const fallbackTimer = window.setTimeout(() => {
      const first = letters[0];
      if (!first) return;
      const opacity = Number.parseFloat(first.style.opacity || "1");
      if (opacity < 0.95) {
        gsap.set(letters, {
          x: 0,
          opacity: 1,
          textShadow: HEADING_SHADOW_TO,
          clearProps: "transform",
        });
      }
    }, 2000);

    const tag = el.previousElementSibling;
    if (tag?.classList.contains("section-tag")) {
      gsap.fromTo(
        tag,
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: tag, start, once },
        }
      );
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el || st.trigger === tag) st.kill();
      });
      tl.kill();
    };
  }, [ref, stagger, duration, delay, once, start, end, scrub, fromX]);
}
