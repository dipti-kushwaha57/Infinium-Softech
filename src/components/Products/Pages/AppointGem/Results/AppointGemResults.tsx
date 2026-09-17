import React from "react";
import "./AppointGemResults.scss";

const RESULTS = [
  {
    value: "18,412",
    delta: "▲ 16.4%",
    title: "Bookings per month",
    desc: "Volume handled across live AppointGem accounts this month.",
  },
  {
    value: "86.4%",
    delta: "▲ 5.1%",
    title: "Staff utilisation",
    desc: "Billable time against published availability, per practitioner.",
  },
  {
    value: "₹ 4.86 Cr",
    delta: "▲ 21.2%",
    title: "Booking revenue",
    desc: "Collected through the platform, deposits and balances included.",
  },
  {
    value: "3.2%",
    delta: "▼ from 11%",
    title: "No-show rate",
    desc: "After automated reminder journeys replaced manual calls.",
  },
  {
    value: "4–6 wks",
    delta: "typical",
    title: "Time to go live",
    desc: "From kickoff to first live branch, including data migration.",
  },
  {
    value: "99.95%",
    delta: "12-month",
    title: "Platform uptime",
    desc: "Shared multi-region cloud layer behind every Infinium product.",
  },
];

export function AppointGemResults() {
  return (
    <section id="results" className="appointgem-results-section" aria-labelledby="results-title">
      <div className="appointgem-results-container">
        <div className="results-header">
          <div>
            <span data-reveal="" className="appointgem-eyebrow">Key results</span>
            <h2 data-reveal="" id="results-title" className="results-headline">
              Measured across live accounts
            </h2>
          </div>
          <p data-reveal="" className="results-subtitle">
            Current month across AppointGem deployments, compared with the same month last year.
          </p>
        </div>

        <div className="results-grid">
          {RESULTS.map((item) => (
            <div key={item.title} data-reveal="" className="result-card">
              <div className="result-value-row">
                <span className="result-value">{item.value}</span>
                <span className="result-delta">{item.delta}</span>
              </div>
              <h3 className="result-card-title">{item.title}</h3>
              <p className="result-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
