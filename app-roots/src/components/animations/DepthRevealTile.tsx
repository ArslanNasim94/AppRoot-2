"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/components/animations/useReducedMotion";
import { refreshScrollTriggersSoon } from "@/components/animations/scrollAnimationHelpers";

interface DepthRevealTileProps {
  name: string;
  description: string;
  tag: string;
}

export function DepthRevealTile({ name, description, tag }: DepthRevealTileProps) {
  return (
    <div data-depth-tile className="card-surface relative overflow-hidden transition-colors hover:border-brand-purple/30">
      <div
        data-depth-mask
        className="relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <h3 className="heading-card">{name}</h3>
        <p className="text-card">{description}</p>
        <span className="mt-4 inline-block rounded-full border border-white/[0.08] px-3 py-1 font-inter text-[11px] text-text-body">
          {tag}
        </span>
      </div>
    </div>
  );
}

const REVEALED = {
  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
  scale: 1,
  filter: "blur(0px)",
};

export function initDepthRevealScroll(container: HTMLElement) {
  const tiles = container.querySelectorAll<HTMLElement>("[data-depth-tile]");
  if (!tiles.length) return () => {};

  if (prefersReducedMotion()) {
    tiles.forEach((tile) => {
      const mask = tile.querySelector<HTMLElement>("[data-depth-mask]");
      if (mask) gsap.set(mask, REVEALED);
    });
    return () => {};
  }

  const triggers: ScrollTrigger[] = [];

  tiles.forEach((tile) => {
    const mask = tile.querySelector<HTMLElement>("[data-depth-mask]");
    if (!mask) return;

    gsap.set(mask, {
      scale: 1.06,
      filter: "blur(4px)",
    });

    const st = ScrollTrigger.create({
      trigger: tile,
      start: "top 88%",
      end: "top 55%",
      scrub: 0.5,
      animation: gsap.to(mask, {
        scale: 1,
        filter: "blur(0px)",
        ease: "none",
      }),
    });
    triggers.push(st);
  });

  refreshScrollTriggersSoon();

  return () => triggers.forEach((t) => t.kill());
}
