# App Roots — Bug Fix: Product "Visit Website" Links Point to the Wrong URL

## The bug
On `/products/[slug]`, the "Visit Website" button is supposed to link to that specific product's own real-world destination (its live site, or its App Store / Play Store listing for mobile-only apps). Instead, for at least one product it is pointing to the reference/staging site (`approots.net/products/[slug]`) instead of the product's actual destination, and for at least one other product the link is missing entirely.

Confirmed examples:
- `asfleet` → correctly links to `https://asfleet.com` ✅ (use this as the reference for "correct" behavior)
- `drinx-hydration` → incorrectly links to `https://approots.net/products/drinx-hydration` ❌ (should link to Drinx's real destination — likely its App Store URL, since the page shows "Mobile App Available · iOS App")
- `sipar-hydration-with-steps` → no "Visit Website" button rendered at all ❌ (field is empty/missing)

## Fix required

1. Open the products data source (`data/products.ts`, `products.json`, or CMS schema — wherever `asfleet`'s correct `websiteUrl`/`externalUrl` field lives) and find the field name used to render the "Visit Website" button.
2. Audit every product entry (`asfleet`, `drinx-hydration`, `sipar-hydration-with-steps`, `fit-tracking`, `mindsync-ai`, `saas-project-management-tool`, `mobile-fitness-app`, `ecommerce-platform`, `crm-software-solution`) for this field:
   - If the value is a `approots.net/products/...` URL (the reference/staging site) — this is always wrong, replace it with the product's actual real destination.
   - If the value is empty/null — do not render a broken/dead button. Find the product's real destination:
     - For SaaS products with their own domain (like `asfleet.com`), use that domain.
     - For iOS-only apps (badge says "iOS App"), use the App Store listing URL for that app.
     - For Android or cross-platform apps, use the appropriate store listing (or the app's marketing site if it has one).
   - If no real destination can be found for a given product anywhere in the project/assets, do not fabricate one — conditionally hide the "Visit Website" button for that product only (don't render an empty/dead link), while still showing "Request Pricing / Buy Now".
3. Make sure this field is never defaulted or fallback-templated to the reference site's own URL pattern (`approots.net/products/${slug}`) anywhere in the code — that's almost certainly the root cause: a fallback/placeholder value that was meant to be temporary got left in for one or more products, or the mapping between the product's own field and the button's `href` was wired to the wrong source.
4. Re-verify each of the 9 products' "Visit Website" button after the fix — it must point only to that product's own real external destination, never to `approots.net`.

## Quick QA checklist
- [ ] `asfleet` → `https://asfleet.com` (unchanged, already correct)
- [ ] `drinx-hydration` → its real destination (not `approots.net`)
- [ ] `sipar-hydration-with-steps` → its real destination, button now renders
- [ ] `fit-tracking`, `mindsync-ai`, `saas-project-management-tool`, `mobile-fitness-app`, `ecommerce-platform`, `crm-software-solution` → each checked and confirmed correct
- [ ] No product's "Visit Website" button ever points to `approots.net`
- [ ] No product shows a broken/empty "Visit Website" link — either a correct URL or the button is hidden
