import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import "./AppointGemHero.scss";

export function AppointGemHero({ product }: { product: ProductItem }) {
  return (
    <section className="appointgem-hero-section" aria-labelledby="appointgem-title">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="appointgem-hero-container">
        <div data-reveal="" className="appointgem-hero-crumbs">
          <Link href="/products">Products</Link>
          <span>/</span>
          <span className="current">AppointGem</span>
        </div>

        <div data-reveal="" className="appointgem-hero-identity">
          <span className="appointgem-hero-mark">{product.mark || "AG"}</span>
          <div>
            <strong>AppointGem</strong>
            <span className="sub">
              <i className="appointgem-hero-pulse-dot" /> Bookings · Live in production
            </span>
          </div> 
        </div>

        <div className="appointgem-hero-intro">
          <h1 data-reveal="" id="appointgem-title" className="appointgem-hero-title">
            Bookings, staff and payments on <span className="highlight">one live calendar.</span>
          </h1>

          <p data-reveal="" className="appointgem-hero-copy">
            AppointGem is the business booking and management platform for appointment-led teams.
            Multi-location calendars, staff-level availability, payments and reminder journeys run in one system,
            so the front desk, the practitioner and accounts all work from the same record.
          </p>
        </div>

        <div data-reveal="" className="appointgem-hero-actions">
          <Link href="/contact" className="appointgem-hero-primary">
            Book a walkthrough <span aria-hidden="true">→</span>
          </Link>
          <a href="#interface" className="appointgem-hero-secondary">
            See the interface
          </a>
        </div>
        <div className="section-breakline">
          <hr />
        </div>
        <div id="interface" className="appointgem-hero-interface">
          <div className="appointgem-hero-tablet" aria-label="AppointGem Tablet Companies View">
            <div className="appointgem-hero-tablet-screen">
              <img
                src="/shots/tablet-appointgem.webp"
                alt="AppointGem Tablet Companies Screen"
                className="appointgem-hero-tablet-img"
              />
            </div>
          </div>

          <div className="appointgem-hero-mobile" aria-label="AppointGem Mobile Companies View">
            <span className="notch" />
            <div className="appointgem-hero-mobile-screen">
              <img
                src="/shots/mobile-appotingem.webp"
                alt="AppointGem Mobile Companies Screen"
                className="appointgem-hero-mobile-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}