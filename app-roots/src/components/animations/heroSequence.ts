"use client";

import { gsap } from "@/lib/gsap";

export const FRAME_COUNT = 208;
export const HERO_SCROLL_VH = 3; // 3x viewport of scroll distance after first screen

const BATCH_SIZE = 12;

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

export async function preloadAllFrames(
  onProgress?: (progress: number) => void
): Promise<HTMLImageElement[]> {
  const frames: HTMLImageElement[] = new Array(FRAME_COUNT);
  let loaded = 0;
  const report = () => onProgress?.(loaded / FRAME_COUNT);

  if (!frames[0]) {
    frames[0] = await loadFrame(0);
  }
  loaded++;
  report();

  for (let start = 1; start < FRAME_COUNT; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
    const batch = Array.from({ length: end - start }, (_, i) => start + i);

    await Promise.all(
      batch.map(async (index) => {
        if (frames[index]?.naturalWidth) {
          loaded++;
          report();
          return;
        }
        try {
          frames[index] = await loadFrame(index);
        } catch {
          // skip
        } finally {
          loaded++;
          report();
        }
      })
    );
  }

  return frames;
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

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

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

export function resolveFrame(
  frames: (HTMLImageElement | undefined)[],
  index: number
): HTMLImageElement | null {
  if (frames[index]?.naturalWidth) return frames[index]!;
  for (let i = index; i >= 0; i--) {
    if (frames[i]?.naturalWidth) return frames[i]!;
  }
  return frames.find((f) => f?.naturalWidth) ?? null;
}

interface HeroScrollOptions {
  trackEl: HTMLElement;
  canvas: HTMLCanvasElement;
  getFrames: () => (HTMLImageElement | undefined)[];
  onProgress?: (progress: number) => void;
}

export function initHeroScroll({
  trackEl,
  canvas,
  getFrames,
  onProgress,
}: HeroScrollOptions) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  let currentFrame = -1;

  const draw = (index: number) => {
    if (index === currentFrame) return;
    currentFrame = index;
    renderFrame(ctx, canvas, resolveFrame(getFrames(), index));
  };

  const update = () => {
    const rect = trackEl.getBoundingClientRect();
    const scrollable = trackEl.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const index = Math.min(
      Math.round(progress * (FRAME_COUNT - 1)),
      FRAME_COUNT - 1
    );
    draw(index);
    onProgress?.(progress);
  };

  draw(0);
  update();

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}

export { gsap };
