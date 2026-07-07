import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLandingPage } from "@/components/pages/ProductLandingPage";
import { getProductBySlug, products } from "@/data/products";

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

  return <ProductLandingPage product={product} />;
}
