import "./AboutBuilt.scss";

export function AboutBuilt() {
  return (
    <section className="about-built-section" aria-label="How We're Built">
      <div className="about-built-container">
        <div className="about-built-left">
          <div data-reveal="" className="about-built-eyebrow">
            How we&apos;re built
          </div>
          <h2 data-reveal="" className="about-built-headline">
            One company,<br />nine platforms.
          </h2>
        </div>

        <div data-reveal="" className="about-built-right">
          <p className="about-built-paragraph">
            Most software firms sell hours. Every engagement starts over, and
            nothing built for one client makes the next one faster. We took the
            opposite route. We build and own the products, then put them to work
            for the operators who need them.
          </p>
          <p className="about-built-paragraph">
            Sign-in, billing, notifications, reporting and integrations are
            solved once at the platform layer and inherited by every product. A
            fix there lands everywhere. A module built for one industry is
            available to the rest the week after.
          </p>
        </div>
      </div>
    </section>
  );
}
