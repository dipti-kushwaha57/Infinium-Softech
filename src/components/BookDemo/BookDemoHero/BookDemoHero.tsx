"use client";

import "./BookDemoHero.scss";

export function BookDemoHero() {
  return (
    <section className="contact-hero-section content-padding" aria-label="Book a Demo Hero">
      {/* Background Animated Glows */}
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="contact-hero-container">
        <div data-reveal="" className="contact-hero-eyebrow">
          Book a demo
        </div>

        <div className="contact-hero-grid">
          <h1 data-reveal="" className="contact-hero-headline">
            See it running
            <br />
            <span className="highlight">on your own numbers.</span>
          </h1>

          <div className="contact-hero-side">
            <p data-reveal="" className="contact-hero-intro">
              Thirty minutes with a product specialist, on a workspace configured
              with your branches, roles and volumes. Not a slide deck.
            </p>

            <div data-reveal="" className="hero-stats-row">
              <div className="hero-stat-item">
                <div className="stat-number">30 min</div>
                <div className="stat-label">Live walkthrough</div>
              </div>
              <div className="hero-stat-item">
                <div className="stat-number">1 day</div>
                <div className="stat-label">Typical reply time</div>
              </div>
              <div className="hero-stat-item">
                <div className="stat-number">9</div>
                <div className="stat-label">Products, one platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
