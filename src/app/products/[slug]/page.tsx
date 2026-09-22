import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppointGem } from "@/components/Products/Pages/Solta/AppointGem";
import { PRODUCT_ITEMS } from "@/data/productsData";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_ITEMS.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_ITEMS.find((item) => item.id === slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.desc,
    alternates: {
      canonical: `/products/${product.id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCT_ITEMS.find((item) => item.id === slug);

  if (!product) {
    notFound();
  }

  if (product.id === "slota") {
    return <AppointGem product={product} />;
  }

  return (
    <main className="main">
      <section style={{ padding: "120px 40px", maxWidth: 1440, margin: "0 auto" }}>
        <p>{product.tag} platform</p>
        <h1>{product.name}</h1>
        <p>{product.desc}</p>
      </section>
    </main>
  );
}