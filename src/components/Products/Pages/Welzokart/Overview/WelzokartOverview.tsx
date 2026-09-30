import React from "react";
import "./WelzokartOverview.scss";

const USE_CASES = [
  "Grocery Shopping",
  "Daily Essentials",
  "Milk Subscriptions",
  "On-Demand Delivery",
];

const META_ITEMS = [
  { label: "Product", value: "Welzokart" },
  { label: "Category", value: "E-commerce & Grocery Delivery" },
  { label: "Platform", value: "Mobile Application" },
  { label: "Solution", value: "On-Demand Grocery Delivery App" },
  { label: "Country", value: "India" },
];

const MODULES = [
  "Calendars",
  "Staff rosters",
  "Payments",
  "Reminders",
  "Customer records",
  "Branch settings",
];

export function WelzokartOverview() {
  return (
    <section id="overview" className="appointgem-overview-section" aria-labelledby="overview-title">
      <div className="appointgem-overview-container">
        <div className="appointgem-overview-grid">
          <div className="overview-left">
            <span data-reveal="" className="appointgem-eyebrow">Overview</span>
            <h2 data-reveal="" id="overview-title" className="overview-headline">
              A Smarter Way to Shop <br className="mobile-title-break" />for Everyday Essentials
            </h2>
            <div data-reveal="" className="use-cases-row">
              {USE_CASES.map((item) => (
                <span key={item} className="use-case-tag">{item}</span>
              ))}
            </div>
          </div>

          <div className="overview-right">
            <p data-reveal="" className="overview-lead-p">
              WelzoKart brings grocery shopping, fresh milk delivery, and everyday household essentials together in one convenient platform. From discovering products to completing checkout and tracking delivery, every part of the experience is designed around simplicity, speed, and reliability.
            </p>
            <p data-reveal="" className="overview-body-p">
              It ships as its own platform and inherits the shared Infinium layer for sign-in, roles, billing, reporting and cloud, so a clinic chain and a single studio run the same product at different scale.
            </p>
          </div>
        </div>

        <div className="appointgem-meta-bar">
          {META_ITEMS.map((item) => (
            <div key={item.label} data-reveal="" className="meta-card">
              <span className="meta-key">{item.label}</span>
              <span className="meta-val">{item.value}</span>
            </div>
          ))}
        </div>

        <div data-reveal="" className="appointgem-modules-row">
          <span className="modules-label">Modules included</span>
          <div className="modules-list">
            {MODULES.map((mod) => (
              <span key={mod} className="module-chip">{mod}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
