import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { About } from "@/components/About/About";

export const metadata: Metadata = getPageMetadata("/about");

export default function AboutPage() {
  return (
    <main className="main">
      <About />
    </main>
  );
}
