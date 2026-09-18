import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { LandingPage } from "@/components/Home";

export const metadata: Metadata = getPageMetadata("/");

export default function Home() {
  return (
    <main className="main">
      <LandingPage />
    </main>
  );
}
