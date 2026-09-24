import Link from "next/link";
import "./TechnologyHero.scss";
import { TECHNOLOGY_HERO_INDEX_ITEMS } from "@/data/technology/technologyData";

export function TechnologyHero() {
  return (
    <section
      id="technology"
      className="technology-hero-section"
      aria-label="Technology Hero"
    >
      {/* Animated Background Glow */}
      <div className="animated-spotlight-container" aria-hidden="true">
        <div className="animated-spotlight-core" />
        <div className="animated-spotlight-sheen" />

        {/* Two Vertical Round Glows */}
        <div className="hero-round-glow hero-round-glow--top" />
        <div className="hero-round-glow hero-round-glow--bottom" />
      </div>

      <div className="technology-hero-container">
        <div data-reveal="" className="technology-hero-eyebrow">
          Technology Stack
        </div>

        <h1 data-reveal="" className="technology-hero-headline">
          Our Technologies. Your <br />
          <span className="highlight">Innovation Stack Starts Here.</span>
        </h1>

        <div className="technology-hero-grid">
          <p data-reveal="" className="technology-hero-desc">
            Explore our cutting-edge frontend, backend, mobile, database, CMS, cloud, and design technologies designed to deliver scalable, reliable, and future-ready solutions.
          </p>

          <div data-reveal="" className="technology-hero-actions">
            <Link href="#frontend" className="btn-primary">
              Explore All Stack
            </Link>

            <Link href="/contact" className="btn-outline">
              Let’s Build Together
            </Link>
          </div>
        </div>

        {/* Quick Category Index Grid */}
      </div>
    </section>
  );
}
