"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_STATS, WHY_CAPABILITIES } from "@/data/whyData";
import "./Why.scss";

gsap.registerPlugin(ScrollTrigger);

export function Why() {
  const statsRowRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const row = statsRowRef.current;
    if (!row) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 85%",
        once: true,
        onEnter: () => {
          WHY_STATS.forEach((stat, idx) => {
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
    }, row);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      className="why-section content-padding"
      aria-label="Why Infinium Softech"
    >
      <div className="why-container">
        {/* Section Header */}
        <div className="why-header">
          <div>
            <div className="why-eyebrow">Why Infinium Softech</div>

            <h2 className="why-headline">
              Built like one company,
              <br />
              <span className="highlight">shipped like nine.</span>
            </h2>
          </div>

          <p className="why-intro">
            Shared cloud infrastructure, one security posture, and a single
            engineering standard behind every product in the ecosystem.
          </p>
        </div>

        {/* Counter Statistics Row */}
        <div ref={statsRowRef} className="why-stats-row">
          {WHY_STATS.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div
                ref={(el) => {
                  statRefs.current[idx] = el;
                }}
                className="stat-value"
              >
                {stat.display}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
