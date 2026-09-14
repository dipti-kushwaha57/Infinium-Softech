import { ABOUT_INDUSTRIES } from "@/data/aboutData";
import "./AboutOperators.scss";

export function AboutOperators() {
  // Duplicate industries array for smooth continuous marquee scroll
  const marqueeItems = [...ABOUT_INDUSTRIES, ...ABOUT_INDUSTRIES];

  return (
    <section className="about-operators-section" aria-label="Who We Build For">
      <div className="about-operators-container">
        <div data-reveal="" className="about-operators-eyebrow">
          Who we build for
        </div>
        <h2 data-reveal="" className="about-operators-headline">
          Operators,<br />not audiences.
        </h2>
        <p data-reveal="" className="about-operators-desc">
          Dispatchers, schedulers, crew leads, front-desk staff and finance
          teams. The workflows come from their day, not from a feature list.
        </p>
      </div>

      <div className="about-operators-marquee-track">
        <div className="about-operators-marquee">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="industry-pill">
              <span
                className="industry-dot"
                style={{ backgroundColor: item.tint }}
                aria-hidden="true"
              />
              <span className="industry-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
