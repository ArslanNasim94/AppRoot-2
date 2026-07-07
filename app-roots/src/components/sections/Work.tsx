"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import { useNizekHeading } from "@/components/animations/useNizekHeading";
import { products, formatPrice } from "@/data/products";

const featuredProducts = products.slice(0, 4);

export function Work() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useNizekHeading(headingRef);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const cards = grid.querySelectorAll("[data-project-card]");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section id="work" className="section-padding bg-bg">
      <div className="container">
        <SectionTag>(Our Products)</SectionTag>
        <h2
          ref={headingRef}
          className="mb-16 font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading"
        >
          {["READY-MADE", "PRODUCTS &", "SERVICES."].map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-4 md:auto-rows-[240px]"
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              data-project-card
              whileHover={{ scale: 1.02 }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/[0.07] p-10 ${product.span}`}
              style={{ backgroundColor: product.color }}
            >
              <div>
                {product.tag && (
                  <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
                    {product.tag}
                  </span>
                )}
                <p className="mt-2 font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
                  {product.category}
                </p>
              </div>

              <div>
                <h3 className="font-satoshi text-[clamp(22px,3vw,36px)] font-black uppercase text-text-heading">
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 font-inter text-sm text-text-body">
                  {product.description}
                </p>
                <p className="mt-2 font-inter text-sm font-medium text-brand-cyan">
                  {formatPrice(product.price)}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 inline-block font-inter text-sm text-text-body opacity-0 transition-opacity group-hover:opacity-100"
                  data-cursor="view"
                >
                  View Details →
                </Link>
              </div>

              <span className="pointer-events-none absolute bottom-4 right-6 font-satoshi text-[120px] font-black leading-none text-white/[0.04] transition-opacity group-hover:text-white/[0.08]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
            data-cursor="hover"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
