"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AppWindow, ArrowRight, Smartphone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { formatPrice, hasProductImage, type Product } from "@/data/products";
import {
  isTouchDevice,
  prefersReducedMotion,
} from "@/components/animations/useReducedMotion";

function iconForCategory(category: string) {
  return /mobile/i.test(category) ? Smartphone : AppWindow;
}

function ProductImagePlaceholder({ product }: { product: Product }) {
  const Icon = iconForCategory(product.category);
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(123,47,255,0.18) 0%, rgba(10,10,15,0.9) 62%, rgba(0,200,255,0.14) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)",
        }}
      />
      <div className="relative flex h-full items-center justify-center">
        <Icon className="h-14 w-14 text-white/25" aria-hidden />
      </div>
    </div>
  );
}

function ProductImageZone({ product }: { product: Product }) {
  const hasImage = hasProductImage(product);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-elevated">
      {hasImage ? (
        <Image
          src={product.imageSrc!}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover/product:scale-[1.06]"
        />
      ) : (
        <ProductImagePlaceholder product={product} />
      )}
      <span className="absolute left-3 top-3 rounded-full border border-brand-cyan/30 bg-bg/70 px-3 py-1 font-inter text-[11px] font-medium text-brand-cyan backdrop-blur">
        {product.category}
      </span>
    </div>
  );
}

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sx = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const sy = useSpring(rotateY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const batch = ScrollTrigger.batch(el, {
      start: "top 85%",
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 32, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          }
        );
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, { opacity: 0, y: 24, scale: 0.97, duration: 0.3 });
      },
    });

    return () => {
      batch.forEach((trigger) => trigger.kill());
    };
  }, []);

  const onPointerMove: React.PointerEventHandler<HTMLAnchorElement> = (e) => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion() || isTouchDevice()) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = x / rect.width - 0.5;
    const cy = y / rect.height - 0.5;
    rotateY.set(Math.max(Math.min(cx * 12, 6), -6));
    rotateX.set(Math.max(Math.min(-cy * 12, 6), -6));
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: sx,
        rotateY: sy,
        transformPerspective: 1000,
      }}
      className="will-change-transform"
    >
      <Link
        ref={cardRef}
        href={`/products/${product.slug}`}
        className="group/product card-surface relative flex h-full flex-col gap-5 overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_48px_rgba(123,47,255,0.16)]"
        style={
          {
            "--mx": "50%",
            "--my": "50%",
            backgroundImage:
              "radial-gradient(circle at var(--mx) var(--my), rgba(123,47,255,0.16), transparent 42%)",
          } as React.CSSProperties
        }
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={() => {
          if (isTouchDevice()) {
            gsap.to(cardRef.current, { scale: 0.98, duration: 0.12 });
          }
        }}
        onPointerUp={() => {
          if (isTouchDevice()) {
            gsap.to(cardRef.current, { scale: 1, duration: 0.2 });
          }
        }}
        data-cursor="view"
      >
        <motion.div
          layoutId={`product-image-${product.slug}`}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0, 1] }}
          style={{ viewTransitionName: `product-image-${product.slug}` }}
        >
          <ProductImageZone product={product} />
        </motion.div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            {product.tag && (
              <span className="inline-block rounded-full border border-brand-purple/25 bg-brand-purple/10 px-2 py-0.5 font-inter text-[10px] font-medium uppercase text-brand-purple transition-transform duration-300 group-hover/product:-translate-y-0.5">
                {product.tag}
              </span>
            )}
            <motion.h2
              layoutId={`product-title-${product.slug}`}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0, 1] }}
              style={{ viewTransitionName: `product-title-${product.slug}` }}
              className="mt-3 font-satoshi text-lg font-black uppercase text-text-heading"
            >
              {product.name}
            </motion.h2>
            <p className="mt-2 line-clamp-1 font-inter text-sm text-text-body">
              {product.description}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-inter text-sm font-medium text-brand-cyan">
              {formatPrice(product.price)}
            </span>
            <span className="inline-flex items-center gap-1 font-inter text-sm text-text-body">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/product:translate-x-1" />
            </span>
          </div>
        </div>

        <span className="pointer-events-none absolute right-4 top-4 font-inter text-[10px] text-white/25">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
      </Link>
    </motion.div>
  );
}
