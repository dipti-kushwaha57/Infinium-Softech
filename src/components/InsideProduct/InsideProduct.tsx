"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_STATS, WHY_CAPABILITIES } from "@/data/whyData";
import "./InsideProduct.scss";

gsap.registerPlugin(ScrollTrigger);

export function InsideProduct() {
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
      id="inside-product"
      className="inside-product-section content-padding"
      aria-label="Inside a product"
    >
      <div className="inside-product-container">
        {/* Section Header */}
        <div className="inside-product-header">
          <div className="inside-product-eyebrow">Inside a product</div>

          <h2 className="inside-product-headline">
            Same platform core,
            <br />
            nine ways to work.
          </h2>

          <p className="inside-product-intro">
            Pick a product to see who uses it, the modules it ships with, and how
            a job moves through it end to end.
          </p>
        </div>

        

        {/* Platform Capabilities 4x2 Grid */}
        <div className="inside-product-grid">
          {WHY_CAPABILITIES.map((cap, idx) => (
            <div key={idx} className="capability-card">
              <div
                className="capability-icon"
                style={{ backgroundColor: cap.tint }}
                aria-hidden="true"
              />

              <div className="capability-name">{cap.name}</div>
              <p className="capability-desc">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
