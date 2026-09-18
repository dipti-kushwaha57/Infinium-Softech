import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = getPageMetadata("/contact");

export default function ContactPage() {
  return (
    <main className="main">
      <Contact />
    </main>
  );
}

