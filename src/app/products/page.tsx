import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Products } from "@/components/Products/Products";

export const metadata: Metadata = getPageMetadata("/products");

export default function ProductsPage() {
  return (
    <main className="main">
      <Products />
    </main>
  );
}
