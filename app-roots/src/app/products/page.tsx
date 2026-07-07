import type { Metadata } from "next";
import Link from "next/link";
import { SectionTag } from "@/components/ui/SectionTag";
import { products, formatPrice } from "@/data/products";

export const metadata: Metadata = {
  title: "Products — AppRoots",
  description:
    "Explore our collection of production-ready SaaS products, services, and mobile apps available for purchase or partnership.",
};

export default function ProductsPage() {
  return (
    <div className="section-padding pt-32">
      <div className="container">
        <SectionTag>(Products)</SectionTag>
        <h1 className="mb-4 font-satoshi text-[clamp(40px,6vw,72px)] font-black uppercase leading-[0.95] tracking-tight text-text-heading">
          Ready-Made Products &amp; Services
        </h1>
        <p className="mb-16 max-w-2xl font-inter text-lg text-text-body">
          Explore our collection of production-ready SaaS products, services, and
          mobile apps available for purchase or partnership.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex flex-col justify-between rounded-[20px] border border-white/[0.07] bg-bg-surface p-8 transition-colors hover:border-brand-purple/30"
              data-cursor="view"
            >
              <div>
                <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
                  {product.category}
                </span>
                <h2 className="mt-3 font-satoshi text-xl font-black uppercase text-text-heading">
                  {product.name}
                </h2>
                <p className="mt-3 line-clamp-3 font-inter text-sm leading-relaxed text-text-body">
                  {product.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-inter text-sm font-medium text-brand-cyan">
                  {formatPrice(product.price)}
                </span>
                <span className="font-inter text-sm text-text-body opacity-0 transition-opacity group-hover:opacity-100">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
