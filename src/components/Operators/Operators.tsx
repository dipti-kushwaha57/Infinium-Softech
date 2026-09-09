"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  OPERATOR_STATS,
  CLIENTS_ROW_A,
  CLIENTS_ROW_B,
  OperatorClient,
} from "@/data/operatorsData";
import "./Operators.scss";

gsap.registerPlugin(ScrollTrigger);

export function Operators() {
  const statsBoxRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = statsBoxRef.current;
    if (!box) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: box,
        start: "top 85%",
        once: true,
        onEnter: () => {
          OPERATOR_STATS.forEach((stat, idx) => {
            const el = statRefs.current[idx];
            if (!el) return;

            const proxy = { val: 0 };
            gsap.to(proxy, {
              val: stat.raw,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                let formatted: string;
                if (stat.decimals && stat.decimals > 0) {
                  formatted = proxy.val.toFixed(stat.decimals);
                } else {
                  formatted = Math.round(proxy.val).toLocaleString("en-US");
                }
                el.textContent = `${stat.prefix || ""}${formatted}${
                  stat.suffix || ""
                }`;
              },
            });
          });
        },
      });
    }, box);

    return () => ctx.revert();
  }, []);

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
            <span className="operators-eyebrow">Trusted by operators</span>
            <h2 className="operators-headline">
              Running real operations
              <br />
              in nine industries.
            </h2>
          </div>

          {/* 3-Column Animated Stats Card */}
          <div ref={statsBoxRef} className="operators-stats-box">
            {OPERATOR_STATS.map((stat, idx) => (
              <div key={idx} className="operator-stat-item">
                <div
                  ref={(el) => {
                    statRefs.current[idx] = el;
                  }}
                  className="operator-stat-value"
                >
                  {stat.display}
                </div>
                <div className="operator-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
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