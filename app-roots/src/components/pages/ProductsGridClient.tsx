"use client";

import { LayoutGroup } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/pages/ProductCard";

export function ProductsGridClient({ products }: { products: Product[] }) {
  return (
    <LayoutGroup id="products-grid">
      <div className="card-grid sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </LayoutGroup>
  );
}
