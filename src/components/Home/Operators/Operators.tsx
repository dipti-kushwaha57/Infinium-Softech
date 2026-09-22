"use client";

import {
  CLIENTS_ROW_A,
  CLIENTS_ROW_B,
  OperatorClient,
} from "@/data/operatorsData";
import "./Operators.scss";

export function Operators() {
  return (
    <section
      id="operators"
      className="operators-section content-padding"
      aria-label="Trusted by operators"
    >
      <div className="operators-container">
        {/* Section Header */}
        <div className="operators-header">
          <div className="operators-title-wrap">
            <span data-reveal="" className="operators-eyebrow">
              Trusted by operators
            </span>
            <h2 data-reveal="" className="operators-headline">
              Running real operations
              <br />
              in nine industries.
            </h2>
          </div>

          <p data-reveal="" className="operators-intro">
            Powering real-world operations with reliable, scalable technology
            built to simplify workflows, improve efficiency, and help businesses
            grow.
          </p>
        </div>
      </div>

      {/* Marquee Ticker Rows */}
      <div className="operators-marquee-container">
        {/* Row A - Scrolling Left */}
        <div className="marquee-row-wrapper">
          <div className="marquee-track marquee-left">
            {[0, 1, 2, 3].map((copyIdx) => (
              <div
                key={copyIdx}
                className="marquee-group"
                aria-hidden={copyIdx > 0 ? "true" : undefined}
              >
                {CLIENTS_ROW_A.map((client: OperatorClient, idx: number) => (
                  <div key={idx} className="operator-client-card">
                    <span
                      className="operator-client-mark"
                      style={{ backgroundColor: client.tint }}
                      aria-hidden="true"
                    >
                      {client.mark}
                    </span>
                    <div className="operator-client-info">
                      <span className="operator-client-name">
                        {client.name}
                      </span>
                      <span className="operator-client-sector">
                        {client.sector}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row B - Scrolling Right */}
        <div className="marquee-row-wrapper">
          <div className="marquee-track marquee-right">
            {[0, 1, 2, 3].map((copyIdx) => (
              <div
                key={copyIdx}
                className="marquee-group"
                aria-hidden={copyIdx > 0 ? "true" : undefined}
              >
                {CLIENTS_ROW_B.map((client: OperatorClient, idx: number) => (
                  <div key={idx} className="operator-client-card">
                    <span
                      className="operator-client-mark"
                      style={{ backgroundColor: client.tint }}
                      aria-hidden="true"
                    >
                      {client.mark}
                    </span>
                    <div className="operator-client-info">
                      <span className="operator-client-name">
                        {client.name}
                      </span>
                      <span className="operator-client-sector">
                        {client.sector}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 