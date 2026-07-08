# App Roots — Homepage 3D Upgrade: Cursor Implementation Prompt

> Copy everything below into Cursor as a single instruction. It's written to be handed directly to the agent — it references your existing file structure conventions (Next.js App Router, GSAP/ScrollTrigger, Framer Motion, Three.js / React Three Fiber, Lenis). Adjust file paths if your actual component names differ.

---

## 0. NON-NEGOTIABLE CONSTRAINTS (read first, apply everywhere)

1. **Do not change any font-family, font-weight tokens, or color tokens** anywhere in the codebase. Keep Bricolage Grotesque / Urbanist and the existing color variables (`--bg`, `--fg`, accent colors, etc.) exactly as defined in `globals.css` / `tailwind.config`. Only touch layout, motion, depth, and structure.
2. **One heading animation system, reused everywhere.** Every `<h2>` section eyebrow + heading pair (the `(Label)` + `## HEADING` pattern already in the page — "Our Belief", "What We Do", "Our Promise", "Selected Work", "By The Numbers", "Industries", "How We Work", "Client Voices", "The Minds Behind It", "Insights") must use ONE shared `<AnimatedHeading />` component. Do not build a bespoke heading effect per section.
3. **No animation repeats across sections except the heading effect.** Every section's card/content reveal + hover interaction must be structurally distinct from every other section. A checklist is provided in Section 3 — check it off as you build so nothing is copy-pasted between sections.
4. **Respect `prefers-reduced-motion`.** Every GSAP timeline, R3F scene, and CSS 3D transform must have a reduced-motion fallback (simple fade/opacity, no parallax, no tilt).
5. **Performance discipline:** only animate `transform` and `opacity` (GPU-accelerated). Use `will-change` sparingly and remove it after animation completes. Use `IntersectionObserver`-gated triggers (ScrollTrigger's built-in `start`/`end`/`toggleActions`) so off-screen sections do zero work. Disable heavy cursor-tilt/3D-parallax on touch devices (`(hover: none)` media query) — replace with a simple scroll-reveal there.
6. **Stack to use:** GSAP + ScrollTrigger for scroll-scrubbed motion, Framer Motion for discrete hover/tap micro-interactions, React Three Fiber / Three.js only where a section explicitly calls for a WebGL layer (flagged below), Lenis for the smooth scroll already presumably driving the hero — make sure ScrollTrigger is synced to Lenis's scroll proxy (`lenis.on('scroll', ScrollTrigger.update)`), not the native scroll event.

---

## 1. GLOBAL HEADING SYSTEM — modeled on nizek.com

### What Nizek does (the effect to replicate)
On nizek.com, every major section heading (`TRUST / WORTHY`, `PROVEN / RESULTS`, `SELECTED / CASE STUDY`, `MARKET / PRESENCE`, `PARTNER / STORIES`, `TALENT / ENGINE`, `DAILY / INSIGHTS`) is split into individual words/lines that sit in a perspective-masked container. As the section scrolls into view, each line animates in independently with a 3D depth flip: it enters rotated on the X-axis (as if hinged at the bottom edge, like a flap display), blurred and pushed back in Z-space, then rotates to `rotateX(0)`, sharpens, and settles into place — staggered line-by-line rather than all at once. The words are masked by an `overflow: hidden` wrapper so the flip reveal is clipped cleanly, giving it a "surfacing from behind glass" feel rather than a simple fade-up.

### Build this as `components/AnimatedHeading.tsx`

```tsx
"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  eyebrow?: string;        // the "(Our Belief)" style label
  lines: string[];         // each line/word group rendered as its own split unit
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export default function AnimatedHeading({ eyebrow, lines, as: Tag = "h2", className }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = gsap.context(() => {
      const lineEls = containerRef.current!.querySelectorAll<HTMLElement>("[data-heading-line]");
      const eyebrowEl = containerRef.current!.querySelector("[data-heading-eyebrow]");

      if (mql.matches) {
        gsap.set(lineEls, { opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(lineEls, { rotateX: 70, transformOrigin: "bottom center", y: 40, opacity: 0, filter: "blur(6px)" });
      if (eyebrowEl) gsap.set(eyebrowEl, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      if (eyebrowEl) tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

      tl.to(lineEls, {
        rotateX: 0,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      }, eyebrowEl ? "-=0.2" : 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ perspective: 800 }}>
      {eyebrow && <span data-heading-eyebrow className="heading-eyebrow">{eyebrow}</span>}
      <Tag className="heading-root">
        {lines.map((line, i) => (
          <span key={i} style={{ display: "block", overflow: "hidden" }}>
            <span data-heading-line style={{ display: "inline-block" }}>{line}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
```

**Do not use GSAP SplitText** (paid plugin) — either use the `SplitType` npm package for character/word granularity if you want finer stagger than line-level, or keep the line-level split above, which matches Nizek's actual per-line (not per-letter) behavior closely enough and is lighter-weight. Wire every heading in the page (`WE BUILD / WHAT OTHERS / CAN'T IMAGINE`, `TECHNOLOGY / SHOULD FEEL / LIKE MAGIC`, `EVERY PROBLEM. / ONE ROOT.`, `IF YOU DON'T / LOVE THE CODE, / WE REWRITE IT. / FREE.`, `PROJECTS THAT / PROVE IT.`, `RESULTS THAT / SPEAK.`, `BUILT FOR / EVERY SECTOR.`, `FROM IDEA / TO IMPACT.`, `WHAT THEY / SAY.`, `TALENT WITH / ROOTS`, `THOUGHTS FROM / THE ROOT.`, `YOUR IDEA / DESERVES / BETTER CODE.`) through this exact component, passing each existing line break as an array item. Do not restyle the text itself — only wrap it.

---

## 2. GLOBAL 3D FOUNDATION (apply once, benefits every section)

- Add a persistent, extremely subtle WebGL depth layer using React Three Fiber, fixed behind the content (`position: fixed`, `z-index: -1`, `pointer-events: none`): a sparse field of soft, out-of-focus particles/points that drift slowly and shift parallax offset based on scroll progress (via `useScroll`/`ScrollTrigger` progress fed into a uniform). This is the *only* place raw WebGL runs continuously — keep it cheap (a single `Points` instance, < 300 particles, no post-processing) so it doesn't compete with per-section effects.
- Add a lightweight custom cursor (a small dot + trailing ring, Framer Motion `useSpring` on mouse position) that scales up and inverts color when hovering any interactive card — this becomes the connective tissue that makes every section feel like part of one 3D "instrument," even though each section's card animation is different. Disable entirely on touch.
- Set `perspective: 1000–1500px` at the section-container level (not globally) so each section's 3D children get consistent depth without fighting each other.

---

## 3. SECTION-BY-SECTION CARD DESIGN (each one structurally unique — checklist)

| # | Section (as it appears on page) | Card/content type | Unique 3D treatment assigned | Repeats another section's motion? |
|---|---|---|---|---|
| 1 | Our Belief | statement, no cards | ambient WebGL particle depth only (Section 2 global layer) + heading | — |
| 2 | Every Problem. One Root. (Services) | 6 numbered cards | Tilt-flip index cards | No |
| 3 | Our Promise (Zero Compromise / Clean Architecture / Free Rewrites) | 3 feature cards | Pedestal lift cards | No |
| 4 | Selected Work (4 case studies) | 4 project cards | Depth-mask image reveal + magnetic cursor preview | No |
| 5 | Results That Speak (stat counters) | 6 stat panels | Split-flap odometer counters | No |
| 6 | Built For Every Sector (industry tags) | 7 pills | Orbiting depth marquee | No |
| 7 | From Idea to Impact (process steps) | 5 step cards | Scroll-scrubbed light-beam path | No |
| 8 | What They Say (testimonials) | draggable quote cards | 3D coverflow arc | No |
| 9 | Talent With Roots (team initials) | 3 avatar tiles | Flip-card reveal with focal blur halo | No |
| 10 | Thoughts From The Root (insights) | 3 article cards | Fanning paper-stack | No |

Below is the detailed spec for each. Build each as its own component; do not share animation logic between them beyond generic scroll-trigger helpers.

### Section 2 — Services: "Tilt-Flip Index Cards"
- Each of the 6 cards (`01 AI Engineering` … `06 Cloud Architecture`) sits on a glass panel (`backdrop-filter: blur`, existing color tokens only, no new colors).
- Render the card's number (`01`–`06`) as a huge, low-opacity numeral positioned absolutely behind/inside the card, offset in Z via `translateZ(-60px) scale(1.4)` inside a perspective wrapper — it should look like the number floats in a deeper depth plane than the card content.
- On mouse move over the card (desktop only), apply a pointer-reactive tilt: `rotateX`/`rotateY` calculated from cursor position relative to card center, clamped to ±8°, using Framer Motion's `useMotionValue` + `useSpring` for smoothing. The floating background numeral should move at roughly 1.6x the tilt amount, creating parallax separation between the two depth planes.
- On scroll-in, cards animate in with a staggered `rotateY(-25deg) → 0` swing from their left edge (a "swinging open panel" entrance), not a fade or slide — this must NOT be reused in any other section.
- On hover, the "Explore →" link underlines with a liquid/morph underline (width scale from center), and the card lifts 6px with shadow growing — subtle, secondary to the tilt.

### Section 3 — Our Promise: "Pedestal Lift Cards"
- 3 cards in a row. On scroll entrance, each card rises up from below a shared baseline "pedestal" line (a thin horizontal accent line using existing accent color) with a slight `rotateX` tip-back-to-flat motion (opposite axis logic from Section 2 — Section 2 rotates on Y, this rotates on X, and the hinge point is bottom-center not left-edge, so it reads differently).
- Stagger by 0.15s left to right.
- On hover: no tilt-follow here (already used in Section 2) — instead the card scales to 1.03 and its shadow's blur radius + spread animate up smoothly (a "pedestal glow" effect), while a thin light sweep (a diagonal gradient highlight) passes once across the card surface, left to right, over 0.6s.

### Section 4 — Selected Work: "Depth-Mask Reveal + Magnetic Preview"
- Each project card's image is revealed via an animated `clip-path` wipe (vertical blinds or diagonal wipe — pick diagonal for distinction) combined with a `scale(1.15 → 1)` and `filter: blur(8px) → blur(0)` on the image only, scrubbed to scroll position (`scrub: true` on the ScrollTrigger, not a one-shot play) so it feels tied to the user's scroll speed — this is the only *scroll-scrubbed* (as opposed to *scroll-triggered play-once*) card reveal on the page, making it distinct.
- Implement the "magnetic cursor" behavior: when hovering a project card, the custom cursor (from Section 2 of this doc) morphs into a small circular label reading "View →" and the card's image shifts subtly toward the cursor position (max 10px offset) for a magnetic-pull feel.
- Case study number ("01"–"04") sits pinned to the card corner in a thin outlined style, no fill — do not repeat Section 2's floating-numeral-behind-content treatment.

### Section 5 — Results That Speak: "Split-Flap Odometer Counters"
- Replace the current static `0+` placeholders with an odometer/split-flap digit animation: each digit column flips like an airport departure board as it counts up to the real value, triggered once the section is ~60% in view.
- Build a small reusable `<FlipCounter value={number} suffix="+"/>` where each digit is its own 3D-flipping tile (`rotateX` hinge, top half flips down to reveal the next digit) — this is a literal mechanical-flip motion, distinct from every fade/tilt/swing used elsewhere.
- Panels have no card border — instead use floating glass tiles with a soft ambient shadow that pulses very subtly (scale 1 → 1.01 → 1, 4s loop, barely perceptible) to feel alive without being a repeat of any hover interaction elsewhere.

### Section 6 — Built For Every Sector: "Orbiting Depth Marquee"
- Render the 7 industry tags (FinTech, HealthTech, E-Commerce, EdTech, Logistics, Startups, Enterprise) as pill chips arranged along a single horizontal auto-scrolling marquee (infinite loop, `translateX` driven by `requestAnimationFrame` or GSAP `xPercent` tween, not scroll-linked — this must autoplay independent of scroll to be distinct from the scroll-triggered sections around it).
- Give each pill a depth offset using `translateZ` + reduced opacity/scale based on its horizontal position relative to center (center pill = full scale/opacity/sharp, edge pills = smaller/dimmer/slightly blurred) — recalculated per frame using the marquee's own transform progress, to fake a shallow "orbit" depth-of-field without literal 3D geometry.
- Pause the marquee and snap the hovered pill to full scale/opacity/front-most Z on hover; resume on mouse leave.

### Section 7 — From Idea to Impact: "Scroll-Scrubbed Light-Beam Path"
- The 5 process steps (Discover, Architect, Build, Launch, Grow) are connected by an SVG path (a gentle curved line, not straight) running through the section.
- Use GSAP `DrawSVGPlugin`-style stroke reveal (or a manual `stroke-dashoffset` tween if you don't have the paid plugin) scrubbed to scroll progress across the whole section, so the line "draws" itself as the user scrolls — plus a glowing dot/beam that travels along the same path at the same scrub progress (`getPointAtLength` on the path each scroll tick).
- Each step card activates (brightens, its number scales up slightly, a soft glow appears behind it) at the exact scroll progress where the traveling light-beam passes its anchor point — this ties card state directly to scroll-scrubbed progress rather than a simple viewport-enter trigger, making it functionally distinct from every "enter fade/flip/swing" pattern above.

### Section 8 — What They Say: "3D Coverflow Arc"
- Replace the flat drag carousel with a true 3D coverflow: cards positioned along an arc using `rotateY` + `translateZ` + `translateX` computed from each card's offset from the active index (active card: `rotateY(0) translateZ(0) scale(1)`, neighbors: `rotateY(±25deg) translateZ(-120px) scale(0.85)` with a `filter: blur(2px)` fog effect increasing with distance from center).
- Keep drag/swipe to change the active index (Framer Motion `drag="x"` with `dragConstraints`, snapping to nearest card on release) — dragging directly manipulates the arc's rotation in real time (1:1 with drag delta) rather than triggering a discrete slide animation, which is what makes this feel physically 3D rather than a slideshow.

### Section 9 — Talent With Roots: "Flip-Card Reveal With Focal Halo"
- The 3 initials (AR, JK, SM) become small flip cards: front face shows the initials in a circular glass tile; on hover (or tap on mobile), the whole tile does a `rotateY(180deg)` flip to reveal name + role on the back face (`backface-visibility: hidden` on both faces).
- While flipped/hovered, a soft radial "focal halo" glow blooms behind the tile and the other two tiles blur/dim slightly (`filter: blur(3px)` + reduced opacity) to simulate a shallow depth-of-field pulling focus onto the active one — this cross-card focus-shift behavior does not appear in any other section.

### Section 10 — Thoughts From The Root: "Fanning Paper-Stack"
- The 3 insight cards start visually stacked with a slight offset (like a stack of index cards, each behind the last with a small y/x offset and decreasing scale) and on scroll-in they fan out into their final horizontal row positions with a slight rotational spread (each card rotates a few degrees off-axis as it settles, like cards dealt from a stack) — a "dealing cards" motion, distinct from swing, flip, lift, or arc used elsewhere.
- On hover, only a subtle depth-lift (translateY -4px, shadow grows) — keep this hover minimal since the section's signature motion is the entrance, not the hover.

### CTA / Footer
- No new card animation needed here. Apply only: the shared `AnimatedHeading` for "Your Idea Deserves Better Code," and a magnetic-button effect on the two CTA links (button subtly follows cursor within a small radius, using the same magnetic logic pattern as Section 4 but scoped to buttons, not cards, so it doesn't read as a repeat).

---

## 4. IMPLEMENTATION ORDER (suggested sequence for Cursor to work through)

1. Build `AnimatedHeading.tsx` and wire it into every section heading first — this is highest-value and lowest-risk.
2. Set up the Lenis → ScrollTrigger sync utility if not already present.
3. Build the global ambient WebGL particle layer + custom cursor (Section 2 of this doc).
4. Implement each section's card system one at a time, in the order listed in the Section 3 table, testing scroll behavior after each before moving to the next.
5. Do a final pass for `prefers-reduced-motion`, touch-device fallbacks, and Lighthouse/performance check (target: no CLS from these changes, animations should not block main thread > 50ms at a time).

## 5. QA CHECKLIST BEFORE CALLING IT DONE
- [ ] No font-family or color value changed anywhere in the diff.
- [ ] Every section heading uses `<AnimatedHeading />`.
- [ ] No two sections share the same entrance-animation function or hover-interaction function (cross-check the Section 3 table).
- [ ] `prefers-reduced-motion: reduce` collapses every animation to a simple opacity fade.
- [ ] All 3D tilt/hover effects are disabled under `(hover: none)`.
- [ ] ScrollTrigger instances are killed/reverted on route change or component unmount (use `gsap.context()` cleanup, as shown in `AnimatedHeading`).
- [ ] Mobile performance: WebGL particle layer either paused or removed below a viewport-width breakpoint (e.g., < 768px).
