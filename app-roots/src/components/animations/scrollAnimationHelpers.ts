"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function refreshScrollTriggersSoon() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    window.setTimeout(() => ScrollTrigger.refresh(), 200);
  });
}

export function scheduleVisibilityFallback(
  elements: gsap.TweenTarget,
  visibleVars: gsap.TweenVars,
  delayMs = 2500
) {
  const timer = window.setTimeout(() => {
    const list = gsap.utils.toArray(elements) as HTMLElement[];
    const first = list[0];
    if (!first) return;

    const opacity = Number.parseFloat(getComputedStyle(first).opacity || "1");
    if (opacity < 0.55) {
      gsap.set(elements, visibleVars);
    }
  }, delayMs);

  return () => window.clearTimeout(timer);
}

export function forceVisibleIfPastTrigger(
  trigger: Element,
  targets: gsap.TweenTarget,
  visibleVars: gsap.TweenVars,
  start = "top 88%"
) {
  const ratio = Number.parseFloat(start.split(" ")[1]) / 100;
  if (!Number.isFinite(ratio)) return;

  const top = trigger.getBoundingClientRect().top;
  if (top < window.innerHeight * ratio) {
    gsap.set(targets, visibleVars);
  }
}
