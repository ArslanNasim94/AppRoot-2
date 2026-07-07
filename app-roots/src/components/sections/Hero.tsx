"use client";

import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  applyHeadingLetterReveal,
  collectHeadingLetters,
  setHeadingLettersInitial,
} from "@/components/animations/headingShadowEffect";
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

function applyExitPhase(
  state: HeroScrollState,
  visualEl: HTMLElement,
  contentEl: HTMLElement,
  headingLetters: HTMLElement[]
) {
  const exit = state.exitProgress;

  const heroShift = clamp(exit / 0.5, 0, 1) * -50;
  visualEl.style.transform = `translate3d(0, ${heroShift}vh, 0)`;
  visualEl.style.opacity = String(1 - clamp(exit / 0.55, 0, 1) * 0.35);

  const eyebrow = contentEl.querySelector<HTMLElement>(".hero-eyebrow");
  const ctas = contentEl.querySelector<HTMLElement>(".hero-ctas");

  if (exit < 0.5) {
    contentEl.style.visibility = "hidden";
    contentEl.style.pointerEvents = "none";
    contentEl.style.opacity = "0";
    setHeadingLettersInitial(headingLetters, 80);
    if (eyebrow) {
      eyebrow.style.opacity = "0";
      eyebrow.style.transform = "translate3d(0, 16px, 0)";
    }
    if (ctas) {
      Array.from(ctas.children).forEach((child) => {
        (child as HTMLElement).style.opacity = "0";
        (child as HTMLElement).style.transform = "translate3d(0, 16px, 0)";
      });
    }
    return;
  }

  contentEl.style.visibility = "visible";
  contentEl.style.pointerEvents = "auto";
  contentEl.style.opacity = "1";

  const reveal = (exit - 0.5) / 0.5;
  applyHeadingLetterReveal(headingLetters, reveal, 80);

  const supportStart = 0.62;
  const supportT = clamp((reveal - supportStart) / (1 - supportStart), 0, 1);

  if (eyebrow) {
    eyebrow.style.opacity = String(supportT);
    eyebrow.style.transform = `translate3d(0, ${(1 - supportT) * 16}px, 0)`;
  }
  if (ctas?.children.length) {
    Array.from(ctas.children).forEach((child, index) => {
      const t = clamp(supportT - index * 0.08, 0, 1);
      (child as HTMLElement).style.opacity = String(t);
      (child as HTMLElement).style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`;
    });
  }
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headingLettersRef = useRef<HTMLElement[]>([]);
  const cacheRef = useRef<HeroFrameCache | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanupScroll: (() => void) | undefined;
    const cache = new HeroFrameCache();
    cacheRef.current = cache;

    const handleState = (state: HeroScrollState) => {
      const visual = visualRef.current;
      const content = headlineRef.current;
      if (!visual || !content) return;

      if (state.phase === "frames") {
        visual.style.transform = "translate3d(0, 0, 0)";
        visual.style.opacity = "1";
        content.style.visibility = "hidden";
        content.style.pointerEvents = "none";
        content.style.opacity = "0";
        return;
      }

      applyExitPhase(state, visual, content, headingLettersRef.current);
    };

    const setup = async () => {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const track = trackRef.current;
      const canvas = canvasRef.current;
      const content = headlineRef.current;
      if (!track || !canvas || cancelled) return;

      if (content) {
        headingLettersRef.current = collectHeadingLetters(content);
        setHeadingLettersInitial(headingLettersRef.current, 80);
      }

      try {
        await cache.loadFirst();
        const ctx = canvas.getContext("2d");
        if (ctx && !cancelled) {
          renderFrame(ctx, canvas, cache.resolve(0));
          setCanvasReady(true);
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
      id="idea"
      ref={trackRef}
      className="relative"
      style={{ height: `calc(100svh - 5rem + ${HERO_TOTAL_VH * 100}svh)` }}
    >
      <div className="sticky top-20 z-[10] h-[calc(100svh-5rem)] w-full overflow-hidden bg-bg">
        <div ref={visualRef} className="absolute inset-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFramePath(0)}
            alt=""
            aria-hidden
            fetchPriority="high"
            className={`absolute inset-0 h-full w-full object-cover object-[center_62%] transition-opacity duration-300 ${
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
                "linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.35) 50%, rgba(10,10,15,0.55) 100%)",
            }}
          />
        </div>

        <div
          ref={headlineRef}
          className="hero-content invisible pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center px-6 text-center opacity-0 lg:px-12"
        >
          <p className="hero-eyebrow mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
            Your development partner
          </p>

          <h1 className="hero-heading mb-6 max-w-5xl font-satoshi text-[clamp(40px,7vw,96px)] font-black uppercase leading-[0.92] tracking-tighter text-text-heading">
            {["YOU FOCUS ON", "GROWTH. WE BUILD", "THE PRODUCT."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-ctas flex flex-wrap items-center justify-center gap-6">
            <MagneticButton href="/register">Let&apos;s talk →</MagneticButton>
            <a
              href="/products"
              className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
              data-cursor="hover"
            >
              See Our Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
