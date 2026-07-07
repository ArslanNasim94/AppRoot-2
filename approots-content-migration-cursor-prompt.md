# CURSOR BUILD PROMPT — Content Migration: approots.net → app-root-2.vercel.app

## ROLE
You are a senior Next.js/React engineer working inside the existing `app-root-2.vercel.app` codebase (the project currently open in this workspace). This is a **content migration task**, not a redesign task.

## HARD CONSTRAINTS — DO NOT VIOLATE
1. **Do not change the design system.** Keep every existing color token, font (headline + body typefaces as currently configured), spacing scale, border-radius values, and theme variables exactly as they are.
2. **Do not change animations.** Keep all existing GSAP/Framer Motion/R3F animation logic, ScrollTrigger configs, easing curves, hover states, cursor behavior, and page-load sequences exactly as they are. If a section currently has a scroll-pinned reveal, stagger, or 3D element, the new content must flow into that *same* animation wrapper/component — do not strip animations to "make room" for more text.
3. **Do not change layout/template structure.** Keep the same grid systems, card components, section wrappers, and component hierarchy. If new content is longer/shorter than placeholder content, adjust text truncation, line-clamp, or card height gracefully — do not redesign the component.
4. **Reuse existing components.** If a new page (Products, FAQ, Privacy, Terms) doesn't exist yet in this template, build it using the *existing* component library (same Card, Button, Section, Container, Heading components already used on the homepage) so it visually matches the rest of the site. Do not introduce a new visual style for new pages.
5. Where old-site content doesn't map 1:1 to an existing section, insert it as a new section using the existing section-wrapper pattern (same padding, same reveal-on-scroll behavior as neighboring sections) — never as a plain unstyled `<div>`.
6. Keep all existing SEO/meta scaffolding (Next.js `metadata` exports, OG tags) but update the actual text values to the new copy below.

## OBJECTIVE
Replace all current placeholder/demo content in `app-root-2.vercel.app` (Luminary AI, FlowOps, Vertex 3D, Orbis Commerce, fake testimonials, fake stats, etc.) with the **real AppRoots content** below, sourced from the live approots.net site. Every page/section listed must end up with real copy — no lorem ipsum, no placeholder client names, no placeholder numbers left in place.

---

## 1. GLOBAL NAV + FOOTER

Update the nav to include real destinations while keeping the current nav's visual style/animation (magnetic hover, underline, whatever exists):

- Logo → stays "AppRoots" / AR mark (already correct)
- Nav links: `Work` (#work) · `Services` (#services) · `AI for Startups` (#ai-for-startups) · `Why Us` (#why-different) · `Products` (/products) · `FAQ` (/faq)
- Right side: `Login` → /login (external/placeholder auth route), `Let's talk` → /register (or #contact if no register flow yet)
- Keep language switcher pattern if the component already supports i18n scaffolding (en / es / ar) — otherwise skip for now, English only.

Footer — keep current footer's layout/columns, update link targets and copy:
- Tagline: "AppRoots takes web, mobile, and backend development off your plate — so you can spend your time on marketing, sales, and customers."
- Core stacks list: React Native · SwiftUI · Kotlin · Laravel · Next.js
- Column "Explore": Why Us, AI for Startups, Problems, How it works, Products
- Column "Company": FAQ, Privacy Policy, Terms of Service, Contact
- Copyright: "© 2026 AppRoots.net — All rights reserved."

---

## 2. HOME PAGE — SECTION-BY-SECTION CONTENT

Map each existing homepage section in `app-root-2` to the corresponding real content below. Keep whichever section wrapper/animation currently exists at each position; just swap the copy.

### Hero
- Eyebrow: "Your development partner"
- Headline: "You focus on growth. We build the product."
- Subtext: "AppRoots takes web, mobile, and backend development off your plate — so you can spend your time on marketing, sales, and customers. We also build AI solutions — integrate AI into your existing system or launch a new AI SaaS."
- CTA buttons: "Let's talk" (→ /register), "See Our Products" (→ /products)
- Keep the "You → AppRoots → Launch" three-node visual if the current hero has a similar diagram/3D element; otherwise treat this as a supporting sub-block right under the hero (see next section).

### "How we work together" block
- Left card "You — Your focus": Growth, customers, revenue — bullets: Marketing & campaigns / Sales & customers / Growth strategy
- Right card "AR — Our focus": Product, code, launch — bullets: Web & backend / Mobile apps / Launch & maintenance
- Strapline: "One partnership. Clear roles. No overlap."
- Stat row: Core stacks (React Native, SwiftUI, Kotlin, Laravel, Next.js) · "3+ Products running in production" · "1 team — Dedicated squad per project" · "Weekly — Demos & honest progress updates"

### Pain points ("01 · Pain points — Sound familiar?")
- Section intro: "The problems that slow startups down — you're not alone, we hear these from founders every week. We built AppRoots to take exactly these problems off your plate."
- Card 1 — "Hiring takes months you don't have": Finding, hiring, and managing a reliable dev team eats the runway you need for everything else. → We become your dev team — no hiring required.
- Card 2 — "Marketing is ready, but the product isn't": Your launch plan is waiting on features that keep slipping — and every delay costs you momentum. → We ship on your timeline so marketing can launch.
- Card 3 — "You're building software instead of finding customers": Founders end up buried in tech decisions when their time is worth far more in front of customers. → We handle tech — you stay in front of customers.

### AI for Startups ("02 · AI path")
- Section intro: "Your startup's AI partner — integrate, upgrade, or build from zero. We specialize in AI-based solutions. Add AI to the product you already have, make your current system smarter, or launch a completely new AI SaaS with us."
- Card 1 — "Integrate AI into your product": Add chat assistants, smart search, and AI features to your existing app, CRM, or workflow — without rebuilding what already works. Tags: LLM APIs · RAG · Chat assistants
- Card 2 — "Upgrade existing systems with AI": We improve the system you run today: AI automation, intelligent agents, and analytics that make your product more progressive and competitive. Tags: Automation · AI agents · Analytics
- Card 3 — "Build a brand-new AI SaaS": Have an AI product idea? We take it from concept to production — a complete AI-native SaaS built, launched, and maintained by one team. Tags: Laravel · Next.js · MVP to scale

**Agent integrations sub-section** ("Integrate top AI agents into your existing or new SaaS"):
Render as a carousel/grid (use whatever interactive component currently exists for the AI-agents row — swipeable cards, orbiting nodes, etc.) with these 9 agents:
1. Hermes (badge: Popular) — Self-hosted agent with secure tool access — ideal for private, production automation.
2. LangGraph — Multi-step AI workflows that keep context as tasks move through your product.
3. CrewAI — Teams of AI agents collaborating on research, ops, and customer work.
4. OpenAI Assistants — ChatGPT-powered assistants with files, tools, and API integrations built in.
5. Microsoft Copilot — Microsoft agents connected to Office 365, Dynamics, and your business data.
6. Google Vertex AI — Google Cloud agents for grounded search, chat, and enterprise AI features.
7. Amazon Bedrock — AWS-managed agents with knowledge bases and actions at production scale.
8. Paperclip — Open-source control plane to run, budget, and govern teams of AI agents.
9. MCP Tools — Model Context Protocol — connect agents to your apps, APIs, and internal data.
CTA under this block: "Discuss your AI idea" → opens the AI chatbot section/anchor.

### Why Us ("03 · Why us")
- Section intro: "Built for founders — not agency overhead. Most startups juggle freelancers, agencies, and hiring. AppRoots gives you one dedicated squad that ships web, mobile, AI, and backend — so you stay focused on customers. Our experienced team brings 20+ years in the IT industry, using that expertise to boost, refine, and polish your SaaS, MVP, or startup product."
- Comparison table/two-column — "The usual path" vs "With AppRoots":
  - Usual path: Rotating freelancers who lose context every sprint / Account managers — never the engineers who ship / Separate vendors for web, mobile, and AI / Surprise scope creep and invoices you didn't expect
  - With AppRoots: One dedicated squad that knows your product inside out / Talk directly to the devs building your MVP / Web, mobile, backend & AI agents — one partner / Milestone pricing, weekly demos, zero surprises
- Four supporting mini-cards: "A dedicated, professional team" · "Direct, honest communication" · "Full development support" · "Multiple stacks, one partner" (with the descriptions from the source content above)
- Closing line: "You stay in founder mode. We stay in build mode."
- CTAs: "See how we work" (#steps), "See Our Products" (/products)

### Tech Stack ("04 · Tech stack")
- Section intro: "Full-stack development, one partner"
- Card 1 — "Web Platforms": Production-grade web applications and SaaS platforms built with Laravel and Next.js. Scalable, secure, and maintainable from day one. Tag: Laravel · Next.js
- Card 2 — "Mobile Apps": Cross-platform iOS and Android apps built with React Native — one codebase, native experience, faster time to market. Tag: React Native
- Card 3 — "Backend & DevOps": APIs, databases, cloud infrastructure, and post-launch maintenance — everything that keeps your product running reliably. Tag: Full development support
- CTA: "See Our Products" (/products)

### How We Work ("05 · How we work")
- Section intro: "Three steps, no overhead"
- Step 01 — "Tell us your idea" (You): One short call. We listen, ask the right questions, and agree on a clear scope — no lengthy paperwork.
- Step 02 — "We design, build & maintain" (Together): A dedicated team ships your product with React Native, Laravel, and Next.js — and keeps it running after launch.
- Step 03 — "You focus on marketing & growth" (You): While we handle the code, you handle campaigns, sales, and customers. Weekly demos keep you in the loop.
- Three supporting notes: "Talk to the people building it — No account managers. Direct access to your dev team." / "Weekly demos, honest updates — See real progress every week, no surprises at the end." / "We're in it for the long run — Launch is the start. We maintain, improve, and grow with you."

### Final CTA
- Eyebrow: "Pipeline complete — ready to ship"
- Headline: "Stop juggling development. Start building momentum."
- Subtext: "Tell us what you're building. We'll figure out the first step together."
- CTAs: "Let's talk" (/register), "Talk to us" (#ai-chatbot)
- Keep the existing AI chatbot widget component if one exists in app-root-2; wire the greeting to: "Hello! I'm your AI assistant. How can I help you today?"

---

## 3. NEW PAGE — `/products` (Products listing)

Build using the existing Card/Grid components (same card style as the homepage "Selected Work" section). Page header: "Ready-Made Products & Services" — subtext: "Explore our collection of production-ready SaaS products, services, and mobile apps available for purchase or partnership."

Grid of 9 product cards, each with: category tag, name, one-line description, price, "View Details" link (→ `/products/[slug]`):

| Category | Name | Description | Price | Slug |
|---|---|---|---|---|
| SaaS | AsFleet | Professional fleet maintenance tracking for small and mid-size businesses. Manage vehicles, schedules, repairs, and reminders in one powerful dashboard. | $0.00 | asfleet |
| Mobile app | Drinx – Hydration | Transform your hydration habits with Drinx — track, log, and stay refreshed daily! | $0.00 | drinx-hydration |
| Mobile app | SipAR \| Hydration with Steps | Achieve your health goals with SipAR! Track your hydration, count your steps & visualize your progress through augmented reality. | $0.00 | sipar-hydration-with-steps |
| Mobile app | Fit Tracking | Track your health and fitness effortlessly — multiple health calculators, personalized profiles & timely reminders. | $0.00 | fit-tracking |
| Mobile app | MindSync AI | Achieve emotional balance & mental clarity — analyze emotions, track moods & achieve wellness goals. | $0.00 | mindsync-ai |
| SaaS | SaaS Project Management Tool | A comprehensive project management SaaS platform with real-time collaboration. | $29.99 | saas-project-management-tool |
| Mobile app with backend | Mobile Fitness App | iOS and Android fitness tracking app. | $9.99 | mobile-fitness-app |
| SaaS | E-Commerce Platform | Complete e-commerce solution. | $49.99 | ecommerce-platform |
| SaaS | CRM Software Solution | CRM for sales teams. | $39.99 | crm-software-solution |

Build a simple `/products/[slug]` detail template (reuse existing case-study/detail page pattern if one exists) that pulls name/description/price/category from a shared data file (e.g. `data/products.ts`) so all 9 slugs route correctly. Placeholder body content is fine for now (full spec, screenshots, etc.) since the live site doesn't expose more detail than the card copy.

---

## 4. NEW PAGE — `/faq`

Header: "Frequently Asked Questions" — subtext: "Find answers to common questions about AppRoots, our products, services, and how we can help you build your startup."

Build as an accordion (use existing accordion/disclosure component if one exists in the design system; otherwise a simple expand/collapse styled with existing card + border tokens), grouped into 6 categories exactly as below. Keep each question as the accordion trigger and each answer as the expanding content.

**General Questions**
- What is AppRoots? — AppRoots is a startup development partner for new founders. We help early-stage startups design, build, and launch web and mobile products with a dedicated engineering team — so you can focus on customers, marketing, and growth instead of hiring in-house developers.
- How does AppRoots work? — AppRoots operates as a comprehensive platform where you can purchase ready-made SaaS products, commission custom development projects, and join a community of entrepreneurs. Our AI-powered tools help streamline the development process and provide intelligent assistance throughout your journey.
- What services do you offer? — We offer web development, mobile app development, AI-powered solutions, ready-made SaaS products, and comprehensive startup support services. You can purchase existing products or commission custom projects tailored to your needs.
- Is there a community I can join? — Yes! AppRoots has an active startup community where entrepreneurs, developers, and innovators come together to share ideas, collaborate, and support each other.

**AI Solutions**
- Can AppRoots integrate AI into our existing product? — Yes. We integrate AI into products and systems you already run — chat assistants, smart search, document understanding, and workflow automation — using LLM APIs and retrieval-augmented generation (RAG), without rebuilding your existing app.
- How do you upgrade an existing system with AI? — We start with a short audit of your current system, identify the highest-impact AI opportunities (automation, assistants, analytics), then ship improvements incrementally so your product becomes more progressive without downtime or a risky rewrite.
- Do you build new AI SaaS products for startups? — Yes — building AI-native SaaS is one of our specialties. We take your AI product idea from concept to production: architecture, LLM integration, web and mobile frontends, billing, and post-launch maintenance, all handled by one dedicated team.

**Products & Services**
- What types of products do you offer? — We offer three main types of products: SaaS applications, mobile apps, and custom services. All products are production-ready and can be purchased or customized based on your requirements.
- Can I customize purchased products? — Yes! All our products can be customized to fit your specific needs — features, branding, integrations, and functionality. Contact us with your requirements for a custom quote.
- Do products come with support? — Yes, all products come with documentation and support. We offer various support packages including email support, priority support, and dedicated support channels.
- What is the pricing model? — Pricing varies by product. Some products have fixed pricing, while others use subscription models or custom pricing. Each product page displays its specific pricing information.

**Custom Projects**
- How do I start a custom project? — Create an account, navigate to the dashboard, and click "Create New Project." Fill out the project details including requirements, timeline, and budget. Our team will review and get back to you with a proposal.
- What is the development timeline? — Timelines vary by project complexity and scope. Simple projects may take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during the project proposal phase.
- How does payment work for custom projects? — Payment is typically structured in milestones. An initial deposit is required to start, followed by payments at key milestones. Final payment is due upon project completion and delivery.
- Can I track my project progress? — Yes! The dashboard provides real-time project tracking — tasks, deliverables, project status, team communication, and payment tracking all in one place.

**Payments & Billing**
- What payment methods do you accept? — We accept credit/debit cards, bank transfers, and digital payment platforms. Payment options are displayed during checkout.
- Is my payment information secure? — Yes. We use industry-standard encryption and secure payment gateways. We never store complete credit card details on our servers.
- Can I get a refund? — Refund policies vary by product type. Digital products may have different refund terms than custom development projects — refer to the specific product's refund policy or contact support.
- Do you offer payment plans? — Yes, for larger projects we offer flexible payment plans structured in milestones or installments — discussed during project planning.

**Technical Support**
- What technologies do you use? — We work with Laravel, React, Vue.js, Flutter, Swift, Kotlin, Python, and various cloud platforms, depending on project requirements.
- Do you provide hosting services? — We can assist with hosting setup and recommendations. While we don't provide hosting directly, we work with major cloud providers to help set up and configure your environment.
- What kind of support do you provide post-launch? — Bug fixes, maintenance, updates, and technical assistance. Support packages vary and can be customized; monthly maintenance plans are available.
- Can you integrate with third-party services? — Yes — payment gateways, email services, cloud storage, APIs, and more, discussed during project planning.

Closing block: "Still have questions? Can't find what you're looking for? Our support team is here to help!" — CTAs: "Chat with AI Assistant" (#ai-chatbot), "Create Account" (/register)

---

## 5. NEW PAGE — `/privacy` and `/terms`

Build both as simple long-form legal pages using the existing typography scale (H2 for numbered sections, body text style for paragraphs, existing container width for readable line-length). No special animation needed beyond whatever fade-in already applies to standard page content in this template.

For `/privacy`, use the effective date **July 1, 2026** and structure with these 12 numbered sections (write full content for each, following the meaning/intent below — do not shorten to bullet fragments, keep as proper legal-style paragraphs):
1. Information We Collect (account info, project/communication data, payment info, AI chatbot interactions, technical/usage data)
2. How We Use Your Information (account management, service delivery, payments, inquiries, notices, analytics, legal compliance)
3. Legal Bases for Processing (EEA/UK Users) — contract performance, legitimate interests, consent, legal obligation
4. How We Share Information — service providers (hosting, email, analytics, payment incl. Tazapay, AI infra), professional advisors, business transfers, legal requirements
5. International Data Transfers — safeguards such as standard contractual clauses
6. Data Retention — retained only as long as necessary, then deleted/anonymized
7. Cookies and Similar Technologies — sign-in, language preference, security, analytics; browser controls
8. Security — administrative/technical/organizational measures, no absolute guarantee
9. Your Rights and Choices — access/correct/delete/restrict/port, object, withdraw consent; contact privacy@approots.net; right to lodge complaint
10. Children's Privacy — not directed to under-16s
11. Third-Party Links — not responsible for third-party practices
12. Changes to This Policy — effective date updates, continued use = acceptance

Contact line at the end: "Questions about this policy? Contact us at privacy@approots.net"

For `/terms`, same visual treatment, effective date **July 1, 2026**, 15 numbered sections:
1. Eligibility and Accounts (16+ age requirement, account responsibility)
2. Description of Services (platform for founders/clients; custom work may need separate SOWs)
3. Acceptable Use (prohibited conduct list: illegal use, unauthorized access, malware/spam, scraping, misuse of AI assistant, misrepresentation)
4. Client Content and Projects (client retains ownership, limited license to AppRoots, client warrants rights)
5. Products, Inquiries, and Custom Work (info is general/subject to change; inquiries ≠ binding contract)
6. Payments (fees/taxes, third-party processors incl. Tazapay, suspension on failed payment)
7. AI Features (chatbot for convenience/informational use only, not professional advice, interaction logging)
8. Intellectual Property (AppRoots owns branding/software/docs except Client Content)
9. Confidentiality (mutual confidentiality obligations)
10. Disclaimers ("AS IS"/"AS AVAILABLE", no warranty of uninterrupted/error-free/secure service)
11. Limitation of Liability (no indirect/incidental/consequential damages; liability capped at greater of fees paid in 12 months or $100 USD)
12. Indemnification (client indemnifies AppRoots for Client Content/Terms violations)
13. Suspension and Termination (breach/security/non-payment grounds; surviving provisions)
14. Governing Law and Disputes (jurisdiction where AppRoots operates; informal resolution first via privacy@approots.net)
15. Changes to These Terms (effective date updates, continued use = acceptance)

Contact line at the end: same as privacy page.

---

## 6. FINAL QA CHECKLIST (run through before calling this done)
- [ ] No placeholder client names remain anywhere (Luminary AI, FlowOps, Vertex 3D, Orbis Commerce, Sarah Chen, Marcus Reid, Aisha Patel, AR/JK/SM team initials) unless Arslan explicitly wants to keep a testimonials/team section as-is with new copy supplied later.
- [ ] All 9 AI-agent cards render with correct names + descriptions in the existing carousel/orbit component.
- [ ] All 9 products route correctly to `/products/[slug]` with no broken links.
- [ ] `/faq`, `/privacy`, `/terms` exist, are linked from the footer, and visually match the rest of the site (same fonts, spacing, dark theme, no unstyled default HTML).
- [ ] Every existing animation (hero load, scroll reveals, hover states, any 3D/WebGL elements) still fires exactly as before — content swap should be invisible from an animation-behavior standpoint.
- [ ] Meta title/description on each page updated to match the real copy (use approots.net's meta descriptions as reference for tone).
- [ ] No console errors from missing data fields (e.g. undefined product price/slug).
