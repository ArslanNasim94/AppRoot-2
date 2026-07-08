"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AppWindow, ChevronRight, Smartphone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ProductInquiryForm } from "@/components/pages/ProductInquiryForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  formatPrice,
  getProductWebsiteUrl,
  hasProductImage,
  type Product,
} from "@/data/products";
import { prefersReducedMotion } from "@/components/animations/useReducedMotion";

function ProductBreadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 font-inter text-sm text-text-body">
        <li>
          <Link href="/" className="transition-colors hover:text-text-heading">
            Home
          </Link>
        </li>
        <li aria-hidden className="flex items-center gap-1.5">
          <ChevronRight size={14} className="opacity-50" />
          <Link
            href="/products"
            className="transition-colors hover:text-text-heading"
          >
            Products
          </Link>
        </li>
        <li aria-hidden className="flex items-center gap-1.5">
          <ChevronRight size={14} className="opacity-50" />
          <span aria-current="page" className="font-medium text-text-heading">
            {name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function ProductHeroVisual({ product }: { product: Product }) {
  const hasImage = hasProductImage(product);
  const Icon = /mobile/i.test(product.category) ? Smartphone : AppWindow;

  return (
    <motion.div
      layoutId={`product-image-${product.slug}`}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0, 1] }}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-elevated"
      data-hero-image
      style={{
        viewTransitionName: `product-image-${product.slug}`,
        background:
          "linear-gradient(145deg, rgba(123,47,255,0.18) 0%, rgba(10,10,15,0.9) 62%, rgba(0,200,255,0.14) 100%)",
      }}
    >
      {hasImage ? (
        <Image
          src={product.imageSrc!}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)",
            }}
          />
          <div className="relative flex h-full items-center justify-center">
            <Icon className="h-20 w-20 text-white/25" aria-hidden />
          </div>
        </>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
      <div className="absolute left-4 top-4 rounded-full border border-brand-cyan/30 bg-bg/70 px-3 py-1 font-inter text-[11px] font-medium text-brand-cyan backdrop-blur">
        {product.category}
      </div>
    </motion.div>
  );
}

export function ProductLandingPage({ product }: { product: Product }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const websiteUrl = getProductWebsiteUrl(product);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const heroEls = root.querySelectorAll("[data-hero-fade]");
    const sectionEls = root.querySelectorAll("[data-section-reveal]");
    const fields = root.querySelectorAll("[data-form-field]");
    const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");

    gsap.fromTo(
      heroEls,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
    );

    if (heroImage) {
      gsap.fromTo(
        heroImage,
        { scale: 1.08, filter: "blur(6px)" },
        { scale: 1, filter: "blur(0px)", duration: 0.75, ease: "power3.out" }
      );

      gsap.to(heroImage, {
        y: -14,
        ease: "none",
        scrollTrigger: {
          trigger: heroImage,
          start: "top 80%",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    sectionEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        }
      );
    });

    gsap.fromTo(
      fields,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#request-info",
          start: "top 82%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={rootRef} className="site-section pt-28 lg:pt-32">
      <div className="container max-w-6xl">
        <ProductBreadcrumb name={product.name} />

        <section className="section-grid border-b border-white/[0.07] pb-12 lg:pb-20">
          <div>
            <div className="mb-4 flex flex-wrap gap-2" data-hero-fade>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-inter text-xs font-medium uppercase tracking-wide text-text-heading">
                {product.category}
              </span>
              {product.badges?.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-brand-cyan/20 bg-brand-cyan/10 px-3 py-1 font-inter text-xs font-medium text-brand-cyan"
                >
                  {badge}
                </span>
              ))}
            </div>

            <motion.div
              layoutId={`product-title-${product.slug}`}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0, 1] }}
              style={{ viewTransitionName: `product-title-${product.slug}` }}
            >
              <AnimatedHeading
                as="h1"
                className="mb-4"
                headingClassName="text-heading-page"
                lines={[product.name.toUpperCase()]}
              />
            </motion.div>
            <p className="copy-lead max-w-xl" data-hero-fade>
              {product.description}
            </p>

            <div className="btn-row" data-hero-fade>
              {websiteUrl && (
                <MagneticButton href={websiteUrl}>
                  Visit Website
                </MagneticButton>
              )}
              <Link
                href="#request-info"
                className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
                data-cursor="hover"
              >
                Request Pricing / Buy Now
              </Link>
            </div>
          </div>

          <ProductHeroVisual product={product} />
        </section>

        <section
          className="border-b border-white/[0.07] py-12 lg:py-20"
          data-section-reveal
        >
          <AnimatedHeading
            lines={["ABOUT THIS PRODUCT"]}
            headingClassName="text-heading-section mb-6"
          />
          <p className="copy-lead max-w-3xl">{product.about}</p>

          {product.features && product.features.length > 0 && (
            <ul className="card-grid mt-10 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="card-surface flex gap-3"
                >
                  <span className="mt-0.5 shrink-0 text-brand-cyan">→</span>
                  <span className="font-inter text-sm leading-relaxed text-text-body">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          className="border-b border-white/[0.07] py-12 lg:py-20"
          data-section-reveal
        >
          <AnimatedHeading
            lines={["PRICING"]}
            headingClassName="text-heading-section mb-6"
          />
          <div className="card-surface max-w-md">
            <p className="font-satoshi text-3xl font-black text-brand-cyan">
              {formatPrice(product.price)}
              {product.price > 0 && (
                <span className="font-inter text-base font-normal text-text-body">
                  {" "}
                  /month
                </span>
              )}
            </p>
            <p className="text-card">{product.pricingNote}</p>
            <div className="btn-row">
              <MagneticButton href="#request-info">
                Request Pricing / Buy Now
              </MagneticButton>
            </div>
          </div>
        </section>

        <section
          className="border-b border-white/[0.07] py-12 lg:py-20"
          data-section-reveal
        >
          <AnimatedHeading
            lines={["USE CASES"]}
            headingClassName="text-heading-section mb-6"
          />
          <p className="copy-lead max-w-3xl">{product.useCases}</p>
        </section>

        <section id="request-info" className="py-12 lg:py-20" data-section-reveal>
          <AnimatedHeading
            lines={["REQUEST INFORMATION"]}
            headingClassName="text-heading-section mb-3"
          />
          <p className="copy-lead mb-0 max-w-2xl text-sm">
            Interested in {product.name}? Fill out the form below and our team
            will get back to you.
          </p>
          <div className="card-surface mt-8 max-w-2xl" data-form-field>
            <ProductInquiryForm productName={product.name} />
          </div>
        </section>
      </div>
    </div>
  );
}
