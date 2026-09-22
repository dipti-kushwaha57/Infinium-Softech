import React from "react";
import Link from "next/link";
import "./AppointGemCta.scss";

export function AppointGemCta() {
  return (
    <section className="appointgem-cta-section" aria-labelledby="cta-title">
      <div className="appointgem-cta-container">
        <div className="cta-card-wrapper">
          <div className="cta-content">
            <span data-reveal="" className="cta-tag">Book consultation</span>
            <h2 data-reveal="" id="cta-title" className="cta-headline">
              See Slota <br className="mobile-title-break" />against your own calendar
            </h2>
            <p data-reveal="" className="cta-subtitle">
              Bring one week of real bookings. An implementation lead maps it into the product live and shows you where the gaps are.
            </p>
          </div>

          <div data-reveal="" className="cta-actions">
            <Link href="/contact" className="cta-btn-primary">
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products" className="cta-btn-secondary">
              Compare products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
