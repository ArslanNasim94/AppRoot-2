import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductsPageHeader } from "@/components/pages/ProductsPageHeader";
import { products, formatPrice } from "@/data/products";

export const metadata: Metadata = {
  title: "Startup Products & SaaS Apps Built by AppRoots",
  description:
    "Explore our collection of production-ready SaaS products, services, and mobile apps available for purchase or partnership.",
};

export default function ProductsPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 font-inter text-sm text-text-body">
            <li>
              <Link href="/" className="transition-colors hover:text-text-heading">
                Home
              </Link>
            </li>
            <li aria-hidden className="flex items-center gap-1.5">
              <ChevronRight size={14} className="opacity-50" />
              <span aria-current="page" className="font-medium text-text-heading">
                Products
              </span>
            </li>
          </ol>
        </nav>

        <ProductsPageHeader />
        <p className="copy-lead section-intro">
          Explore our collection of production-ready SaaS products, services, and
          mobile apps available for purchase or partnership.
        </p>

        <div className="card-grid sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-surface group flex flex-col justify-between transition-colors hover:border-brand-purple/30"
              data-cursor="view"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
                    {product.category}
                  </span>
                  {product.tag && (
                    <span className="rounded-full bg-brand-purple/15 px-2 py-0.5 font-inter text-[10px] font-medium uppercase tracking-wide text-brand-purple">
                      {product.tag}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-satoshi text-lg font-black uppercase text-text-heading">
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
