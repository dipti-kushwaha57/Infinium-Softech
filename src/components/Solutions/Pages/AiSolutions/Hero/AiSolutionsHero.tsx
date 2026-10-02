import Link from "next/link";
import { ArrowRight, BrainCircuit, ChevronRight, Sparkles } from "lucide-react";
import "./AiSolutionsHero.scss";

export function AiSolutionsHero() {
  return (
    <section className="ai-solutions-hero" aria-labelledby="ai-solutions-title">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
          <div className="hero-orbs">
            <div className="orb-bl" />
            <div className="orb-tr" />
          </div>
      </div>

      <div className="ai-solutions-hero-container">
        <nav className="ai-solutions-hero-crumbs" aria-label="Breadcrumb">
          <Link href="/solutions">Solutions</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">AI Solutions</span>
        </nav>

        <div className="ai-solutions-hero-identity">
          <span className="ai-solutions-hero-mark" aria-hidden="true">
            <BrainCircuit size={27} strokeWidth={1.8} />
          </span>
          <div>
            <strong>AI Solutions</strong>
            <span className="ai-solutions-hero-subtitle">
              <i className="ai-solutions-hero-pulse" /> Practical intelligence for business
            </span>
          </div>
        </div>

        <div className="ai-solutions-hero-intro">
          <h1 id="ai-solutions-title" className="ai-solutions-hero-title">
            AI built for your<br />
            <span className="highlight">real-world operations.</span>
          </h1>

          <div className="ai-solutions-hero-right">
            <p className="ai-solutions-hero-copy">
              From predictive insights to intelligent automation, we build AI around the way your
              teams work. Improve decisions, streamline operations, and put your data to work with
              solutions designed for measurable outcomes.
            </p>

            <div className="ai-solutions-hero-actions">
              <Link href="/contact" className="btn-primary">
                Book an AI consultation <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="#ai-capabilities" className="btn-outline">
                Explore AI services <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="ai-solutions-hero-highlights" aria-label="AI delivery principles">
          <span><Sparkles size={15} aria-hidden="true" /> Outcome-focused AI</span>
          <span><BrainCircuit size={15} aria-hidden="true" /> Human-guided decisions</span>
          <span><ArrowRight size={15} aria-hidden="true" /> Ready for real workflows</span>
        </div>
      </div>
    </section>
  );
}
