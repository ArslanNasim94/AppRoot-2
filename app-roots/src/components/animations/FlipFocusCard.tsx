"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/components/animations/useReducedMotion";
import {
  refreshScrollTriggersSoon,
  scheduleVisibilityFallback,
} from "@/components/animations/scrollAnimationHelpers";

interface FlipFocusCardProps {
  title: string;
  body: string;
  className?: string;
}

export function FlipFocusCard({ title, body, className = "" }: FlipFocusCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;

    const siblings = card.parentElement?.querySelectorAll("[data-flip-card]");
    const onEnter = () => {
      siblings?.forEach((sib) => {
        if (sib !== card) {
          gsap.to(sib, { opacity: 0.45, filter: "blur(3px)", duration: 0.35 });
        }
      });
    };
    const onLeave = () => {
      siblings?.forEach((sib) => {
        gsap.to(sib, { opacity: 1, filter: "blur(0px)", duration: 0.35 });
      });
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
      data-flip-card
      className={`group/card [perspective:900px] ${className}`}
    >
      <div className="relative h-full min-h-[140px] transition-transform duration-500 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)] group-focus-within/card:[transform:rotateY(180deg)]">
        <div className="card-surface absolute inset-0 flex flex-col justify-center [backface-visibility:hidden]">
          <h3 className="font-satoshi text-sm font-black uppercase text-text-heading">
            {title}
          </h3>
        </div>
        <div className="card-surface absolute inset-0 flex flex-col justify-center border-brand-cyan/20 bg-brand-cyan/[0.06] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-card">{body}</p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(123,47,255,0.15), transparent 70%)",
        }}
        aria-hidden
      />
    </div>
  );
}

export function animateFanEntrance(container: HTMLElement) {
  const cards = container.querySelectorAll("[data-flip-card]");
  if (!cards.length) return () => {};

  const visible = { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, clearProps: "transform" };

  if (prefersReducedMotion()) {
    gsap.set(cards, visible);
    return () => {};
  }

  const tween = gsap.fromTo(
    cards,
    { y: 28, x: -8, rotate: -2, scale: 0.97 },
    {
      y: 0,
      x: 0,
      rotate: 0,
      scale: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        once: true,
        toggleActions: "play none none none",
      },
    }
  );

  const clearFallback = scheduleVisibilityFallback(cards, visible);
  refreshScrollTriggersSoon();

  return () => {
    clearFallback();
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
