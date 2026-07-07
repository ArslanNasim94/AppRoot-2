import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductDetailHeading } from "@/components/pages/ProductsPageHeader";
import {
  ProductInquiryForm,
  ProductScreenshots,
} from "@/components/pages/ProductInquiryForm";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { formatPrice, type Product } from "@/data/products";

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
  return (
    <div
      className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] lg:aspect-square"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${product.color}88 0%, #0A0A0F 70%)`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10" />
      <div className="relative text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 font-satoshi text-2xl font-black uppercase text-text-heading backdrop-blur-sm">
          {product.name
            .split(" ")
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </div>
        <p className="font-inter text-sm text-white/40">{product.category}</p>
      </div>
    </div>
  );
}

export function ProductLandingPage({ product }: { product: Product }) {
  return (
    <div className="section-padding pt-28">
      <div className="container max-w-6xl">
        <ProductBreadcrumb name={product.name} />

        <section className="section-grid border-b border-white/[0.07] pb-12 lg:pb-16">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
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

            <ProductDetailHeading title={product.name} />
            <p className="copy-lead max-w-xl">{product.description}</p>

            <div className="btn-row">
              {product.websiteUrl && (
                <MagneticButton href={product.websiteUrl}>
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

        <section className="border-b border-white/[0.07] py-12 lg:py-16">
          <h2 className="text-heading-section mb-6">About This Product</h2>
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

        <ProductScreenshots product={product} />

        <section className="border-b border-white/[0.07] py-12 lg:py-16">
          <h2 className="text-heading-section mb-6">Pricing</h2>
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

        <section className="border-b border-white/[0.07] py-12 lg:py-16">
          <h2 className="text-heading-section mb-6">Use Cases</h2>
          <p className="copy-lead max-w-3xl">{product.useCases}</p>
        </section>

        <section id="request-info" className="py-12 lg:py-16">
          <h2 className="text-heading-section mb-3">Request Information</h2>
          <p className="copy-lead mb-0 max-w-2xl text-sm">
            Interested in {product.name}? Fill out the form below and our team
            will get back to you.
          </p>
          <div className="card-surface mt-8 max-w-2xl">
            <ProductInquiryForm productName={product.name} />
          </div>
        </section>
      </div>
    </div>
  );
}
