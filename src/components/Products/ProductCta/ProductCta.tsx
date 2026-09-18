import React from "react";
import Link from "next/link";
import "./ProductCta.scss";

export function ProductCta() {
  return (
    <section className="product-cta-section">
      <div className="product-cta-container">
        <div className="cta-content">
          <h3 data-reveal="" className="cta-title">
            Not sure which one fits your operation?
          </h3>
          <p data-reveal="" className="cta-desc">
            Tell us how the work moves today. An implementation lead maps it to
            the closest product and shows you the gaps in a 30-minute session.
          </p>
        </div>
        <div data-reveal="" className="cta-actions">
          <Link href="/contact" className="btn-primary-blue">
            Talk to us <span className="arrow">→</span>
          </Link>
          <Link href="/about" className="btn-outline-dark">
            How we work
          </Link>
        </div>
      </div>
    </section>
  );
}
