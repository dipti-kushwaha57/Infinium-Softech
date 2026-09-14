"use client";

import "./ContactHero.scss";

export function ContactHero() {
  return (
    <section className="contact-hero-section content-padding" aria-label="Contact Us Hero">
      {/* Background Animated Glows */}
      <div className="contact-hero-glows" aria-hidden="true">
        <div className="glow-blob glow-blob--left" />
        <div className="glow-blob glow-blob--right" />
      </div>

      <div className="contact-hero-container">
        <div data-reveal="" className="contact-hero-eyebrow">
          Contact us
        </div>

        {/* Headline strictly in two lines as requested */}
        <h1 data-reveal="" className="contact-hero-headline">
          Tell us what you run.
          <br />
          <span className="highlight">We&apos;ll show you the fit.</span>
        </h1>

        <p data-reveal="" className="contact-hero-intro">
          Every enquiry goes to a person who works on the product, not a queue.
          Tell us the scale you operate at and we&apos;ll come back with the
          platform that matches, a walkthrough and an honest timeline.
        </p>
      </div>
    </section>
  );
}
