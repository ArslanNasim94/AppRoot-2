"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/components/animations/useReducedMotion";
import {
  refreshScrollTriggersSoon,
  scheduleVisibilityFallback,
} from "@/components/animations/scrollAnimationHelpers";

interface PedestalCardProps {
  number: string;
  title: string;
  body: string;
  tags?: string[];
}

export function PedestalCard({ number, title, body, tags }: PedestalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;

    const onEnter = () => {
      gsap.to(card, { scale: 1.03, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        card.querySelector("[data-sweep]"),
        { xPercent: -120, opacity: 0.6 },
        { xPercent: 120, opacity: 0, duration: 0.6, ease: "power2.inOut" }
      );
    };
    const onLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.35, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-pedestal-card
      className="card-surface group relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_56px_rgba(0,200,255,0.1)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        data-sweep
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        aria-hidden
      />
      <span className="relative font-satoshi text-[56px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[64px]">
        {number}
      </span>
      <h3 className="heading-card relative mt-3">{title}</h3>
      <p className="text-card relative">{body}</p>
      {tags && tags.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] px-3 py-1 font-inter text-[11px] text-text-body"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function animatePedestalEntrance(container: HTMLElement, baseline?: HTMLElement) {
  const cards = container.querySelectorAll("[data-pedestal-card]");
  if (!cards.length) return () => {};

  const visible = { opacity: 1, rotateX: 0, y: 0, clearProps: "transform" };

  if (prefersReducedMotion()) {
    gsap.set(cards, visible);
    if (baseline) gsap.set(baseline, { scaleX: 1 });
    return () => {};
  }

  const cardTween = gsap.fromTo(
    cards,
    { y: 48, rotateX: 10, transformOrigin: "bottom center" },
    {
      y: 0,
      rotateX: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        once: true,
        toggleActions: "play none none none",
      },
    }
  );

  let baselineTween: gsap.core.Tween | undefined;
  if (baseline) {
    baselineTween = gsap.fromTo(
      baseline,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          once: true,
          toggleActions: "play none none none",
        },
      }
    );
  }

  const clearFallback = scheduleVisibilityFallback(cards, visible);
  refreshScrollTriggersSoon();

  return () => {
    clearFallback();
    cardTween.scrollTrigger?.kill();
    cardTween.kill();
    baselineTween?.scrollTrigger?.kill();
    baselineTween?.kill();
  };
}
