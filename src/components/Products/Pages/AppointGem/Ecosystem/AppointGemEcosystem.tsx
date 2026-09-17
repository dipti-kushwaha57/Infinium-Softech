import React from "react";
import Link from "next/link";
import "./AppointGemEcosystem.scss";

const RELATED_PRODUCTS = [
  {
    name: "MapMyPay",
    mark: "MP",
    tag: "Healthcare",
    tint: "#8B3FE8",
    desc: "Healthcare and nursing recruitment platform with shift-based payouts.",
    href: "/products#mapmypay",
  },
  {
    name: "Locale E Clean",
    mark: "LE",
    tag: "Home services",
    tint: "#4338CA",
    desc: "Cleaning and home service booking platform with route-optimised crews.",
    href: "/products#locale-e-clean",
  },
  {
    name: "TextGem",
    mark: "TX",
    tag: "Communication",
    tint: "#0C0C0D",
    desc: "Bulk SMS and business communication platform with delivery analytics.",
    href: "/products#textgem",
  },
];

export function AppointGemEcosystem() {
  return (
    <section className="appointgem-ecosystem-section" aria-labelledby="ecosystem-title">
      <div className="appointgem-ecosystem-container">
        <div className="ecosystem-header">
          <h2 data-reveal="" id="ecosystem-title" className="ecosystem-headline">
            Other products in the ecosystem
          </h2>
          <Link href="/products" className="ecosystem-link">
            View all nine <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="ecosystem-grid">
          {RELATED_PRODUCTS.map((prod) => (
            <Link
              key={prod.name}
              href={prod.href}
              data-reveal=""
              className="ecosystem-card"
            >
              <div className="card-identity">
                <span className="card-badge" style={{ backgroundColor: prod.tint }}>
                  {prod.mark}
                </span>
                <div>
                  <h3 className="card-name">{prod.name}</h3>
                  <span className="card-tag">{prod.tag}</span>
                </div>
              </div>
              <p className="card-desc">{prod.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
