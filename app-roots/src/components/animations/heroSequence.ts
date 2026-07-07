"use client";

import { gsap } from "@/lib/gsap";

export const FRAME_COUNT = 208;
export const HERO_SCROLL_VH = 3;
const PREFETCH_RADIUS = 24;

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

  get(index: number): HTMLImageElement | undefined {
    return this.frames[index];
  }

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
  img: HTMLImageElement | null | undefined
) {
  if (!img?.complete || !img.naturalWidth || !img.naturalHeight) return;

  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || window.innerHeight;
  if (!w || !h) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const x = (w - img.naturalWidth * scale) / 2;
  const y = (h - img.naturalHeight * scale) / 2;

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
}

interface HeroScrollOptions {
  trackEl: HTMLElement;
  canvas: HTMLCanvasElement;
  cache: HeroFrameCache;
  onProgress?: (progress: number) => void;
}

export function initHeroScroll({
  trackEl,
  canvas,
  cache,
  onProgress,
}: HeroScrollOptions) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return () => {};

  let currentFrame = -1;
  let ticking = false;
  let lastProgress = -1;

  const draw = (index: number) => {
    if (index === currentFrame) return;
    currentFrame = index;
    renderFrame(ctx, canvas, cache.resolve(index));
    cache.prefetchAround(index);
  };

  const update = () => {
    ticking = false;
    const rect = trackEl.getBoundingClientRect();
    const scrollable = trackEl.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const index = Math.min(
      Math.round(progress * (FRAME_COUNT - 1)),
      FRAME_COUNT - 1
    );

    draw(index);

    if (Math.abs(progress - lastProgress) > 0.02) {
      lastProgress = progress;
      onProgress?.(progress);
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  draw(0);
  update();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

export { gsap };
