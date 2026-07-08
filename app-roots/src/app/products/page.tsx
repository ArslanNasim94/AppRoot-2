import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductsPageHeader } from "@/components/pages/ProductsPageHeader";
import { products } from "@/data/products";
import { ProductsGridClient } from "@/components/pages/ProductsGridClient";

export const metadata: Metadata = {
  title: "Startup Products & SaaS Apps Built by AppRoots",
  description:
    "Explore our collection of production-ready SaaS products, services, and mobile apps available for purchase or partnership.",
};

export default function ProductsPage() {
  return (
    <div className="site-section pt-28 lg:pt-32">
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

        <ProductsGridClient products={products} />
      </div>
    </div>
  );
}
