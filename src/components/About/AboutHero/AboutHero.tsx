import Link from "next/link";
import "./AboutHero.scss";

export function AboutHero() {
  return (
    <section className="about-hero-section" aria-label="About Hero">
      {/* Background Animated Glow Orbs */}
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
        <div className="orb-bl" />
        <div className="orb-tr" />
        </div>
      </div>

      <div className="about-hero-container">
        <div data-reveal="" className="about-hero-eyebrow">
          About us
        </div>

        <h1 data-reveal="" className="about-hero-headline">
          We build products, <span className="highlight"> <br/> not projects.</span>
        </h1>

        <div className="about-hero-grid">
          <p data-reveal="" className="about-hero-desc">
            Infinium Softech runs nine proprietary platforms on one shared core.
            The same identity, billing, notifications, analytics and security
            layer sits behind every one of them.
          </p>

          <div data-reveal="" className="about-hero-actions">
            <Link href="#ecosystem" className="btn-primary">
              See the nine platforms
            </Link>
            <Link href="#process" className="btn-outline">
              How we deliver
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
