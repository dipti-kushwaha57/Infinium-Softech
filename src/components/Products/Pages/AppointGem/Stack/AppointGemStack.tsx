import React from "react";
import "./AppointGemStack.scss";

const TECH_STACK = [
  { name: "React", role: "Web console" },
  { name: "Node.js", role: "Services" },
  { name: "PostgreSQL", role: "Bookings data" },
  { name: "Flutter", role: "Staff mobile" },
  { name: "AWS", role: "Multi-region cloud" },
  { name: "Figma", role: "Design system" },
];

export function AppointGemStack() {
  return (
    <section id="stack" className="appointgem-stack-section" aria-labelledby="stack-title">
      <div className="appointgem-stack-container">
        <div className="stack-card-wrapper">
          <div className="stack-grid">
            <div className="stack-info">
              <span data-reveal="" className="stack-eyebrow">Technology</span>
              <h2 data-reveal="" id="stack-title" className="stack-headline">
                The stack behind it
              </h2>
              <p data-reveal="" className="stack-desc">
                Same toolchain as every other Infinium product, so a fix in the platform layer lands here too.
              </p>
            </div>

            <div className="tech-items-grid">
              {TECH_STACK.map((item) => (
                <div key={item.name} data-reveal="" className="tech-item-box">
                  <div className="tech-name">{item.name}</div>
                  <div className="tech-role">{item.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
