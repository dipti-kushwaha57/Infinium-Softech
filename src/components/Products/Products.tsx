"use client";

import React, { useState } from "react";
import { ProductHero } from "./ProductHero/ProductHero";
import { ProductCatalogue } from "./ProductCatalogue/ProductCatalogue";
import { ProductComparison } from "./ProductComparison/ProductComparison";
import { ProductCta } from "./ProductCta/ProductCta";
import { PRODUCT_ITEMS } from "@/data/productsData";

export function Products() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <div className="products-page">
      <ProductHero />
      <ProductCatalogue
        products={PRODUCT_ITEMS}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />
      <ProductComparison />
      <ProductCta />
    </div>
  );
}
