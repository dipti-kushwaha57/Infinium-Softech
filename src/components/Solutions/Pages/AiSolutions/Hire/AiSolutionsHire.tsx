import Link from "next/link";
import "./AiSolutionsHire.scss";

export function AiSolutionsHire() {
  return (
    <section className="ai-solutions-hire">
      <div className="ai-solutions-container hire-grid">
        <div className="hire-copy">
          <span className="section-kicker">Partner with us</span>
          <h2>Build AI that your teams can trust.</h2>
        </div>
        <p>
          Whether you need a sharper forecasting model, smarter automation, or a complete AI
          product strategy, we help turn complex technology into reliable operating systems.
        </p>
        <Link href="/contact" className="btn-primary">
          Talk to our team
        </Link>
      </div>
    </section>
  );
}
