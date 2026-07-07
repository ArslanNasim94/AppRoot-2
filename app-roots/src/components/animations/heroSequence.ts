"use client";

import { gsap } from "@/lib/gsap";

export const FRAME_COUNT = 208;
export const NAV_HEIGHT_PX = 80;
export const HERO_FRAME_VH = 2.75;
export const HERO_HOLD_VH = 0.4;
export const HERO_EXIT_VH = 1;
export const HERO_TOTAL_VH = HERO_FRAME_VH + HERO_HOLD_VH + HERO_EXIT_VH;

const PREFETCH_RADIUS = 40;
const FRAME_PHASE_END = HERO_FRAME_VH / HERO_TOTAL_VH;
const HOLD_PHASE_END = (HERO_FRAME_VH + HERO_HOLD_VH) / HERO_TOTAL_VH;

export function getHeroViewportHeight() {
  return Math.max(window.innerHeight - NAV_HEIGHT_PX, 1);
}

export function getFramePath(index: number): string {
  return `/hero/${String(index + 1).padStart(4, "0")}.webp`;
}

export function loadFrame(index: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to load hero frame ${index + 1}`));
    img.src = getFramePath(index);
  });
}

export class HeroFrameCache {
  private frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
  private loading = new Set<number>();

  resolve(index: number): HTMLImageElement | null {
    if (this.frames[index]?.naturalWidth) return this.frames[index]!;
    for (let i = index; i >= 0; i--) {
      if (this.frames[i]?.naturalWidth) return this.frames[i]!;
    }
    return this.frames.find((f) => f?.naturalWidth) ?? null;
  }

  async ensure(index: number): Promise<void> {
    const clamped = Math.max(0, Math.min(index, FRAME_COUNT - 1));
    if (this.frames[clamped]?.naturalWidth || this.loading.has(clamped)) return;

    this.loading.add(clamped);
    try {
      this.frames[clamped] = await loadFrame(clamped);
    } catch {
      // skip failed frame
    } finally {
      this.loading.delete(clamped);
    }
  }

  prefetchAround(index: number) {
    const start = Math.max(0, index - PREFETCH_RADIUS);
    const end = Math.min(FRAME_COUNT - 1, index + PREFETCH_RADIUS);

    for (let i = start; i <= end; i++) {
      if (!this.frames[i]?.naturalWidth && !this.loading.has(i)) {
        void this.ensure(i);
      }
    }
  }

  async loadFirst(): Promise<void> {
    await this.ensure(0);
  }
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement | null | undefined,
  frameIndex = 0
) {
  if (!img?.complete || !img.naturalWidth || !img.naturalHeight) return;

  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || getHeroViewportHeight();
  if (!w || !h) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const progress = frameIndex / Math.max(FRAME_COUNT - 1, 1);
  const scaleCover = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const scaleContain = Math.min(w / img.naturalWidth, h / img.naturalHeight);
  const containBlend = Math.min(Math.max((progress - 0.78) / 0.22, 0), 1);
  const scale = scaleCover * (1 - containBlend) + scaleContain * containBlend;

  const scaledW = img.naturalWidth * scale;
  const scaledH = img.naturalHeight * scale;
  const x = (w - scaledW) / 2;
  const focalY = 0.5 - progress * 0.2;
  const y = (h - scaledH) * focalY;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, x, y, scaledW, scaledH);
}

export type HeroScrollPhase = "frames" | "hold" | "exit";

export interface HeroScrollState {
  phase: HeroScrollPhase;
  frameProgress: number;
  exitProgress: number;
  overall: number;
}

export function getHeroScrollState(trackEl: HTMLElement): HeroScrollState {
  const scrollable = trackEl.offsetHeight - window.innerHeight;
  const rect = trackEl.getBoundingClientRect();
  const overall =
    scrollable <= 0 ? 0 : Math.min(Math.max(-rect.top / scrollable, 0), 1);

  if (overall <= FRAME_PHASE_END) {
    return {
      phase: "frames",
      frameProgress: overall / FRAME_PHASE_END,
      exitProgress: 0,
      overall,
    };
  }

  if (overall <= HOLD_PHASE_END) {
    return {
      phase: "hold",
      frameProgress: 1,
      exitProgress: 0,
      overall,
    };
  }

  return {
    phase: "exit",
    frameProgress: 1,
    exitProgress: (overall - HOLD_PHASE_END) / (1 - HOLD_PHASE_END),
    overall,
  };
}

interface HeroScrollOptions {
  trackEl: HTMLElement;
  canvas: HTMLCanvasElement;
  cache: HeroFrameCache;
  onState?: (state: HeroScrollState) => void;
}

export function initHeroScroll({
  trackEl,
  canvas,
  cache,
  onState,
}: HeroScrollOptions) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return () => {};

  let currentFrame = -1;
  let rafId = 0;
  let running = true;

  const draw = (frameProgress: number) => {
    const index = Math.min(
      Math.round(frameProgress * (FRAME_COUNT - 1)),
      FRAME_COUNT - 1
    );
    if (index === currentFrame) return;
    currentFrame = index;
    renderFrame(ctx, canvas, cache.resolve(index), index);
    cache.prefetchAround(index);
  };

  const tick = () => {
    if (!running) return;

    const rect = trackEl.getBoundingClientRect();
    const inView = rect.bottom > 0 && rect.top < window.innerHeight;

    if (inView) {
      const state = getHeroScrollState(trackEl);
      draw(state.frameProgress);
      onState?.(state);
    }

    rafId = requestAnimationFrame(tick);
  };

  draw(0);
  onState?.(getHeroScrollState(trackEl));
  rafId = requestAnimationFrame(tick);

  const onResize = () => {
    const state = getHeroScrollState(trackEl);
    currentFrame = -1;
    draw(state.frameProgress);
    onState?.(state);
  };

  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
  };
}

export { gsap };
