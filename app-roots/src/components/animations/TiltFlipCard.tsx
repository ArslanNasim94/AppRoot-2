"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/components/animations/useReducedMotion";
import {
  refreshScrollTriggersSoon,
  scheduleVisibilityFallback,
} from "@/components/animations/scrollAnimationHelpers";

interface TiltFlipCardProps {
  number: string;
  title: string;
  body: string;
  solution?: string;
  children?: React.ReactNode;
  className?: string;
}

export function TiltFlipCard({
  number,
  title,
  body,
  solution,
  children,
  className = "",
}: TiltFlipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion() || isTouchDevice()) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = x * 16;
      const rotX = -y * 16;
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.35,
        ease: "power2.out",
        transformPerspective: 900,
      });
      if (numeralRef.current) {
        gsap.to(numeralRef.current, {
          x: rotY * 1.6,
          y: rotX * -1.6,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
      if (numeralRef.current) {
        gsap.to(numeralRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      }
    };

    card.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      data-tilt-card
      className={`card-surface group relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(123,47,255,0.12)] ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <span
        ref={numeralRef}
        className="pointer-events-none absolute -right-2 top-2 font-satoshi text-[7rem] font-black leading-none text-white/[0.04] will-change-transform lg:text-[8rem]"
        style={{ transform: "translateZ(-60px) scale(1.4)" }}
        aria-hidden
      >
        {number}
      </span>
      <span className="relative font-satoshi text-[48px] font-black leading-none text-white/[0.06] transition-all duration-300 group-hover:gradient-text lg:text-[56px]">
        {number}
      </span>
      <h3 className="heading-card relative mt-3">{title}</h3>
      <p className="text-card relative">{body}</p>
      {solution && (
        <p className="relative mt-4 font-inter text-sm font-medium text-brand-cyan">
          → {solution}
        </p>
      )}
      {children}
    </div>
  );
}

export function animateTiltFlipEntrance(container: HTMLElement) {
  const cards = container.querySelectorAll("[data-tilt-card]");
  if (!cards.length) return () => {};

  const visible = { opacity: 1, rotateY: 0, clearProps: "transform" };

  if (prefersReducedMotion()) {
    gsap.set(cards, visible);
    return () => {};
  }

  const tween = gsap.fromTo(
    cards,
    { rotateY: -18, x: -24, transformOrigin: "left center" },
    {
      rotateY: 0,
      x: 0,
      duration: 0.85,
      stagger: 0.12,
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
