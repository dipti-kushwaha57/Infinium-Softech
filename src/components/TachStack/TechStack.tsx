"use client";

import { STACK_LAYERS, STACK_NOTES, StackLayer } from "@/data/stackData";
import "./TechStack.scss";

export function TechStack() {
  return (
    <section
      id="stack"
      className="stack-section content-padding"
      aria-label="Technology Stack"
    >
      {/* Background Radial Glow */}
      <div className="stack-glow" aria-hidden="true" />

      <div className="stack-container">
        {/* Section Header */}
        <div className="stack-header">
          <div>
            <div className="stack-eyebrow">Technology</div>

            <h2 className="stack-headline">
              The stack behind
              <br />
              <span className="highlight">all nine.</span>
            </h2>
          </div>

          <p className="stack-intro">
            Web, mobile and cloud built from one toolchain, so a fix in the
            platform layer lands across every product in the ecosystem.
          </p>
        </div>

        {/* 3 Architecture Layers with Marquee Tracks */}
        <div className="stack-layers">
          {STACK_LAYERS.map((layer: StackLayer) => (
            <div key={layer.n} className="stack-layer-row">
              {/* Left Layer Info */}
              <div className="layer-meta">
                <div className="layer-kicker-row">
                  <span className="layer-n">{layer.n}</span>
                  <span className="layer-line" aria-hidden="true" />
                  <span className="layer-kicker">{layer.kicker}</span>
                </div>

                <h3 className="layer-title">{layer.title}</h3>
                <p className="layer-desc">{layer.desc}</p>
              </div>

              {/* Right Marquee Infinite Track */}
              <div className="layer-marquee-wrapper">
                <div
                  className={`marquee-track direction-${layer.direction}`}
                  style={{
                    animationDuration: `${layer.duration}s`,
                  }}
                >
                  {/* Render twice for seamless infinite scroll loop */}
                  {[0, 1].map((copyIdx) => (
                    <div
                      key={copyIdx}
                      className="marquee-group"
                      aria-hidden={copyIdx === 1 ? "true" : undefined}
                    >
                      {layer.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="tech-chip">
                          <span
                            className="chip-tint"
                            style={{ backgroundColor: item.tint }}
                            aria-hidden="true"
                          />
                          <div className="chip-info">
                            <span className="chip-name">{item.name}</span>
                            <span className="chip-role">{item.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3 Architecture Commitments */}
        <div className="stack-notes-grid">
          {STACK_NOTES.map((note, idx) => (
            <div key={idx} className="note-card">
              <div className="note-check" aria-hidden="true">
                ✓
              </div>
              <p className="note-text">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
