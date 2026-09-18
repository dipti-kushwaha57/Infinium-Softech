import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Solutions } from "@/components/Solutions/Solutions";

export const metadata: Metadata = getPageMetadata("/solutions");

export default function SolutionsPage() {
  return (
    <main className="main">
      <Solutions />
    </main>
  );
}
