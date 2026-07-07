import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailHeading } from "@/components/pages/ProductsPageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getProductBySlug, products, formatPrice } from "@/data/products";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found — AppRoots" };

  return {
    title: `${product.name} — AppRoots`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <div className="section-padding pt-32">
      <div className="container max-w-3xl">
        <Link
          href="/products"
          className="mb-8 inline-block font-inter text-sm text-text-body transition-colors hover:text-text-heading"
        >
          ← Back to Products
        </Link>

        <span className="section-tag mb-6 block font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-white/30">
          {product.category}
        </span>
        <ProductDetailHeading title={product.name} />
        <p className="mb-2 font-inter text-2xl font-medium text-brand-cyan">
          {formatPrice(product.price)}
        </p>
        <p className="mb-12 font-inter text-lg leading-relaxed text-text-body">
          {product.description}
        </p>

        <div className="rounded-2xl border border-white/[0.07] bg-bg-surface p-8">
          <h2 className="font-satoshi text-lg font-black uppercase text-text-heading">
            About this product
          </h2>
          <p className="mt-4 font-inter text-base leading-relaxed text-text-body">
            {product.name} is a production-ready {product.category.toLowerCase()}{" "}
            available for purchase or partnership through AppRoots. Contact us to
            learn more about customization options, licensing, and support
            packages tailored to your needs.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="/register">Get Started →</MagneticButton>
          <Link
            href="/#contact"
            className="link-underline font-inter text-sm font-semibold uppercase tracking-[0.06em] text-text-heading"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
