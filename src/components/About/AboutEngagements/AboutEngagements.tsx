import Link from "next/link";
import { ABOUT_ENGAGEMENTS } from "@/data/aboutData";
import "./AboutEngagements.scss";

export function AboutEngagements() {
  return (
    <section id="contact" className="about-engagements-section" aria-label="Work With Us">
      <div className="about-engagements-container">
        <div className="about-engagements-card">
          <div className="about-engagements-left">
            <div data-reveal="" className="about-engagements-eyebrow">
              Work with us
            </div>

            <h2 data-reveal="" className="about-engagements-headline">
              Start with one product.<br />Connect the rest later.
            </h2>

            <div data-reveal="" className="about-engagements-actions">
              <Link href="#contact" className="btn-sales">
                Talk to sales
              </Link>
              <Link href="#contact" className="btn-roles">
                See open roles
              </Link>
            </div>
          </div>

          <div className="about-engagements-right">
            {ABOUT_ENGAGEMENTS.map((engagement, idx) => (
              <div key={idx} className="engagement-item">
                <span
                  className="engagement-dot"
                  style={{ backgroundColor: engagement.tint }}
                  aria-hidden="true"
                />
                <div className="engagement-content">
                  <span className="engagement-title">{engagement.title}</span>
                  <span className="engagement-fit">{engagement.fit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
