"use client";

import { useEffect, useRef, useState } from "react";
import {
  initHeroScroll,
  renderFrame,
  getFramePath,
  HERO_TOTAL_VH,
  HeroFrameCache,
  type HeroScrollState,
} from "@/components/animations/heroSequence";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function applyExitPhase(state: HeroScrollState, visualEl: HTMLElement) {
  const exit = state.exitProgress;
  // Fade only — never shift upward into the nav bar.
  visualEl.style.transform = "translate3d(0, 0, 0)";
  visualEl.style.opacity = String(1 - clamp(exit / 0.92, 0, 1));
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<HeroFrameCache | null>(null);
  const completeDispatchedRef = useRef(false);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanupScroll: (() => void) | undefined;
    const cache = new HeroFrameCache();
    cacheRef.current = cache;

    const handleState = (state: HeroScrollState) => {
      const visual = visualRef.current;
      if (!visual) return;

      if (
        !completeDispatchedRef.current &&
        (state.phase === "hold" || state.phase === "exit")
      ) {
        completeDispatchedRef.current = true;
        window.dispatchEvent(new CustomEvent("hero-animation-complete"));
      }

      if (state.phase === "frames" || state.phase === "hold") {
        visual.style.transform = "translate3d(0, 0, 0)";
        visual.style.opacity = "1";
        return;
      }

      applyExitPhase(state, visual);
    };

    const setup = async () => {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const track = trackRef.current;
      const canvas = canvasRef.current;
      if (!track || !canvas || cancelled) return;

      try {
        await cache.loadFirst();
        const ctx = canvas.getContext("2d");
        if (ctx && !cancelled) {
          renderFrame(ctx, canvas, cache.resolve(0), 0);
          if (cache.resolve(0)) {
            setCanvasReady(true);
          }
        }
      } catch {
        // fallback img stays visible
      }

      if (cancelled) return;

      cleanupScroll = initHeroScroll({
        trackEl: track,
        canvas,
        cache,
        onState: handleState,
      });

      window.dispatchEvent(new CustomEvent("hero-sequence-ready"));
      cache.prefetchAround(0);
    };

    setup();

    return () => {
      cancelled = true;
      cleanupScroll?.();
    };
  }, []);

  return (
    <div
      id="hero"
      ref={trackRef}
      className="relative isolate"
      style={{ height: `calc(100svh - 5rem + ${HERO_TOTAL_VH * 100}svh)` }}
    >
      <div className="sticky top-20 z-[10] h-[calc(100svh-5rem)] w-full overflow-hidden bg-bg">
        <div ref={visualRef} className="absolute inset-0 will-change-[opacity]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFramePath(0)}
            alt=""
            aria-hidden
            fetchPriority="high"
            className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-300 sm:object-cover sm:object-[center_45%] ${
              canvasReady ? "opacity-0" : "opacity-100"
            }`}
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[1] h-full w-full"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.08) 12%, rgba(10,10,15,0.05) 40%, rgba(10,10,15,0.35) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
