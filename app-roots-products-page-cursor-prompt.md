# App Roots — Products Page Upgrade: Cursor Implementation Prompt

> Paste everything below into Cursor. Target routes: `/products` (grid) and `/products/[slug]` (detail). Reference for detail-page structure/content parity: `https://approots.net/products/[slug]`. Do not touch fonts or color tokens anywhere — reuse existing `globals.css`/Tailwind theme values only.

---

## 0. FIRST: AUDIT WHY PRODUCT IMAGES AREN'T RENDERING

Before writing any animation code, find and fix the root cause — this is a bug, not a design task.

1. Locate the products data source (likely `data/products.ts`, `lib/products.ts`, a `products.json`, or a CMS query e.g. Sanity/Contentful/Notion fetch). Find the field meant to hold each product's image (`image`, `logo`, `thumbnail`, `coverImage`, etc.).
2. For each of the 9 products (AsFleet, Drinx – Hydration, SipAR, Fit Tracking, MindSync AI, SaaS Project Management Tool, Mobile Fitness App, E-Commerce Platform, CRM Software Solution), check whether that field:
   - is empty/`null`/undefined in the data source → **no image exists yet, this product needs a placeholder, not a fix**, or
   - has a value but the image isn't rendering → likely causes to check: wrong path (missing leading `/`, wrong `public/` subfolder), a `next/image` component with a broken `src` prop, an `alt`-only render where `src` was never wired up, a CMS field name mismatch (querying `product.thumbnail` when the schema field is actually `product.image`), or the image file simply not existing in `public/images/products/`.
3. Cross-check `public/images/` (or wherever image assets live) for any product screenshots/logos that exist on disk but were never connected to their product entry — wire these up first, they're free wins.
4. For any product with genuinely no image asset available anywhere in the project, do **not** fabricate one — implement the placeholder treatment in Section 2 below instead, and flag it in a code comment (`// TODO: no image asset available for this product yet`) so it's easy to find later when a real screenshot/logo is supplied.
5. Fix the same root cause on the product detail page (`/products/[slug]`) — it needs a larger hero image, which is very likely pulling from the same broken/missing field.

---

## 1. PRODUCT GRID (`/products`) — ONE SHARED CARD ANIMATION FOR ALL 9 CARDS

Unlike the homepage sections (where every section needed a distinct effect), here the user explicitly wants **visual consistency**: every product card, regardless of category (SaaS / Mobile app / Mobile app with backend), uses the exact same animation system. Build one `<ProductCard />` component and reuse it 9 times with different data — do not create per-product variants.

### Card anatomy (top to bottom)
- Image zone: fixed aspect ratio (e.g. `aspect-[4/3]` or `16/10`, pick one and use it everywhere), rounded corners matching existing card radius token.
- Category badge (SaaS / Mobile app / Mobile app with backend) — floating top-left over the image, glass pill using existing accent color.
- Title, one-line description (existing truncation/line-clamp if already present), price, "View Details →" link — unchanged copy/layout, don't rewrite content.

### The shared animation (build this once, in detail)
**Entrance (scroll-in):** Cards animate in with a staggered reveal as the grid scrolls into view — `opacity 0→1`, `y: 32→0`, `scale: 0.96→1`, over 0.6s, `ease: power3.out`, staggered `0.08s` per card in reading order (row-major). Use one `ScrollTrigger` on the grid container (`start: "top 85%"`, `toggleActions: "play none none reverse"`) rather than one per card, so it fires as a single cohesive wave in each viewport batch (important for a 3x3/4x3 grid where later rows enter later naturally via their own trigger position — batch with `ScrollTrigger.batch()` if using GSAP, so cards scrolling into view later still animate correctly rather than only firing once for the whole page).

**Hover (desktop):**
1. Image zone: subtle `scale(1.06)` zoom on the image only (contained by `overflow: hidden` on the wrapper), 0.5s `ease-out`.
2. Card tilt: pointer-reactive 3D tilt on the whole card, `rotateX`/`rotateY` clamped to ±6° based on cursor position relative to card center (Framer Motion `useMotionValue` + `useSpring`, stiffness ~150, damping ~15) — keep this subtle, this is a product catalog, not a homepage hero.
3. A soft directional glow/spotlight follows the cursor across the card surface: a radial gradient (using existing accent color at low opacity) positioned at the cursor's x/y within the card, fading out at the edges — implement via a CSS custom property (`--mx`, `--my`) updated on `pointermove` and referenced in a `radial-gradient(circle at var(--mx) var(--my), ...)` background layer.
4. The category badge lifts slightly (`translateY(-2px)`) and the price/CTA row's "View Details →" arrow nudges right 4px with an `ease-out` spring — small, not competing with the tilt.
5. Card shadow deepens (`box-shadow` blur/spread increases) to reinforce the lift.

**Tap/click transition into detail page:** implement a shared-element morph so the clicked card visually becomes the detail page hero rather than a hard navigation cut — see Section 3.

**Touch devices:** disable tilt + spotlight (both are pointer-position-dependent and meaningless on touch); keep only the entrance stagger and a simple `scale(0.98)` tap-down feedback on `pointerdown`.

**Missing-image placeholder treatment (for any card whose product has no image, per the audit in Section 0):** reserve the exact same `aspect-[4/3]` box (never collapse it — grid alignment must stay identical whether a product has an image or not) and fill it with a soft branded gradient (using existing background/accent tokens, no new colors) plus a centered minimal icon representing the category (a generic "app window" glyph for SaaS, a "phone" glyph for Mobile app) at low opacity, and a faint diagonal pinstripe texture — it should read intentionally as "artwork coming soon," not as a broken image. This placeholder gets the exact same hover tilt/spotlight treatment as a real image card, so it doesn't feel like a second-class card.

---

## 2. PRODUCT DETAIL PAGE (`/products/[slug]`) — match approots.net structure, elevate with animation

Content structure to match `approots.net/products/[slug]` exactly (order and sections — copy/content itself should already match since both sites pull from the same product data; this is about layout parity, not rewriting text):

1. Breadcrumb: `Home / Products / [Product Name]`
2. Category tag + `H1` product name + one-line description
3. CTA row: `Visit Website` (external link) + `Request Pricing / Buy Now` (anchors to the form)
4. **Hero product image** — this is the section most in need of upgrade; the current build appears to have no visual here at all. Add a large, prominent image/screenshot zone directly under the CTA row, full-bleed or contained per existing container width. If a screenshot/mockup asset exists for the product (per Section 0 audit), display it in a subtly tilted 3D device-frame or flat card with depth shadow; if not, use the same placeholder treatment as Section 1's card placeholder, scaled up.
5. `## About This Product` — descriptive paragraph + bullet feature list (existing arrow-bullet style — keep it, don't switch to inline paragraph style)
6. `## Pricing` — price + note + CTA button
7. `## Use Cases` — paragraph
8. `## Request Information` — form (Name, Email, Phone, Inquiry Type dropdown, Message, Submit)

### Animation spec for this page
- **Shared-element transition from grid to detail:** when a card is clicked on `/products`, its image and title should visually persist and expand into the hero image/heading position on the detail page rather than a plain route change. Implement with Framer Motion's `layoutId` (shared `layoutId` on the image element and on the title element between `ProductCard` and the detail page's hero, e.g. `layoutId={`product-image-${slug}`}`) wrapped in an `AnimatePresence`/`LayoutGroup`, or with the View Transitions API (`document.startViewTransition`) if the app already uses the App Router view-transitions pattern. This single continuous-feeling transition is the "wow" moment of this page — get it working before polishing anything else on the detail page.
- **Hero entrance:** breadcrumb and category tag fade up first (0.4s), then the `H1` uses the same `AnimatedHeading` component built for the homepage (3D line-flip reveal) — reuse it here, don't rebuild it, so the heading motion language stays consistent site-wide. CTA buttons fade/slide in last.
- **Hero image:** on load, a subtle `scale(1.08→1)` + `filter: blur(6px)→blur(0)` settle-in (distinct from the grid card's hover-zoom — this one only plays once on entrance, not on hover), plus a gentle idle parallax where the image shifts a few px opposite to scroll direction as the user scrolls past it (`ScrollTrigger` with `scrub`).
- **About/Pricing/Use Cases sections:** each section's heading uses `AnimatedHeading`; body content and bullet list items fade/slide up with a small stagger (`0.06s` per bullet) as each section scrolls into view — keep this understated, this is a content/conversion page, not a homepage showcase.
- **Request Information form:** inputs reveal with a subtle stagger on scroll-in; add a refined focus state (label micro-shifts up, border/underline animates in with existing accent color, no new colors) and a satisfying submit-button state (loading spinner morph → checkmark morph on success) rather than a static form.
- **Missing hero image case:** if this product has no image, do not leave a jarring empty gap — the placeholder (Section 1 style, enlarged) still participates in the shared-element transition from the grid card, so the experience feels intentional even without real artwork.

---

## 3. SHARED-ELEMENT MORPH — IMPLEMENTATION NOTE

This is the single most important upgrade for making the products section feel "award-winning" rather than a standard catalog-to-detail flow. Two viable approaches — pick whichever fits the existing router setup:

- **Framer Motion `layoutId` approach:** requires the grid and the detail page to be mounted within the same persisted layout tree at the moment of transition (common pattern: keep the grid rendered underneath, animate the detail content over it, then swap the route). This is more control but more work in Next.js App Router.
- **View Transitions API approach:** if using Next.js 15+/App Router with `next-view-transitions` (or native support), wrap navigation in a view transition and assign matching `view-transition-name` CSS properties to the card image/title and their corresponding detail-page hero image/title. Simpler to wire up, slightly less control over easing.

Whichever is chosen, the effect from the user's perspective: click a product card → its image and title smoothly grow/move into the hero position of the new page while the rest of the page content fades/builds in around it — no hard cut, no flash of unstyled/empty content.

---

## 4. CONSTRAINTS (same as homepage upgrade)
- No font-family or color token changes.
- Respect `prefers-reduced-motion` — collapse all of the above to simple opacity fades, no tilt, no shared-element morph (fall back to a plain fade transition between routes).
- Disable pointer-tilt/spotlight on touch (`(hover: none)`).
- Only animate `transform`, `opacity`, `filter` — no layout-thrashing properties.
- Grid must remain visually stable (no CLS) whether a card has a real image or a placeholder — same reserved dimensions always.

## 5. QA CHECKLIST
- [ ] Every one of the 9 products either shows its real image or an intentional-looking placeholder — no broken image icons, no blank boxes.
- [ ] All 9 cards use the identical `<ProductCard />` component and identical animation — no per-product variation.
- [ ] Clicking any card triggers the shared-element morph into its detail page.
- [ ] Detail page section order/content matches `approots.net/products/[slug]` structure.
- [ ] Detail page heading(s) use the same `AnimatedHeading` component from the homepage upgrade.
- [ ] Reduced-motion and touch fallbacks verified.
- [ ] No CLS introduced by image loading (use fixed aspect-ratio containers + `next/image` with proper `sizes`).
