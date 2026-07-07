"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  initHeroScroll,
  renderFrame,
  getFramePath,
  HERO_SCROLL_VH,
  HeroFrameCache,
} from "@/components/animations/heroSequence";

function revealHeadline(headlineEl: HTMLElement) {
  const lines = headlineEl.querySelectorAll("[data-line]");
  if (!lines.length) return;

  const first = lines[0] as HTMLElement;
  if (parseFloat(getComputedStyle(first).opacity) > 0.5) return;

  gsap.fromTo(
    lines,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: "power4.out",
    }
  );
  gsap.fromTo(
    headlineEl.querySelector(".hero-sub"),
    { opacity: 0 },
    { opacity: 1, duration: 0.6, delay: 0.4 }
  );
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<HeroFrameCache | null>(null);
  const headlineShownRef = useRef(false);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cleanupScroll: (() => void) | undefined;
    const cache = new HeroFrameCache();
    cacheRef.current = cache;

    const setup = async () => {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const track = trackRef.current;
      const canvas = canvasRef.current;
      if (!track || !canvas || cancelled) return;

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
        onProgress: (progress) => {
          if (progress >= 0.08 && !headlineShownRef.current && headlineRef.current) {
            headlineShownRef.current = true;
            revealHeadline(headlineRef.current);
          }
        },
      });

      window.dispatchEvent(new CustomEvent("hero-sequence-ready"));
      cache.prefetchAround(0);

      setTimeout(() => {
        if (!cancelled && headlineRef.current && !headlineShownRef.current) {
          headlineShownRef.current = true;
          revealHeadline(headlineRef.current);
        }
      }, 1000);
    };

    setup();

    return () => {
      cancelled = true;
      cleanupScroll?.();
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `calc(100svh + ${HERO_SCROLL_VH * 100}svh)` }}
    >
      <div className="sticky top-0 z-[100] h-svh w-full overflow-hidden bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFramePath(0)}
          alt=""
          aria-hidden
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
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
              "linear-gradient(to top, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.35) 50%, rgba(10,10,15,0.55) 100%)",
          }}
        />

        <div
          ref={headlineRef}
          className="absolute bottom-[10%] left-0 z-[3] w-full px-6 pt-28 lg:px-12"
        >
          <p className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
            Your development partner
          </p>

          <h1 className="mb-6 font-satoshi text-[clamp(40px,7vw,96px)] font-black uppercase leading-[0.92] tracking-tighter text-text-heading">
            {["YOU FOCUS ON", "GROWTH. WE BUILD", "THE PRODUCT."].map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block opacity-0">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mb-8 max-w-xl font-inter text-lg text-text-body opacity-0">
            AppRoots takes web, mobile, and backend development off your plate — so
            you can spend your time on marketing, sales, and customers. We also
            build AI solutions — integrate AI into your existing system or launch a
            new AI SaaS.
          </p>

          <div className="flex flex-wrap items-center gap-6">
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
