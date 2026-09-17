import React from "react";
import "./AppointGemSolution.scss";

const SOLUTIONS = [
  {
    title: "Multi-location calendars",
    desc: "Availability derived from live staff rosters per branch, with room and equipment capacity respected.",
    tint: "#1F31E8",
  },
  {
    title: "Staff-level availability",
    desc: "Each practitioner carries their own working hours, leave and service list; the public widget only ever shows what is real.",
    tint: "#1E9E5A",
  },
  {
    title: "Payments in the booking",
    desc: "Deposits, part payments and balances attach to the appointment, with invoices raised against the visit.",
    tint: "#E8A21F",
  },
  {
    title: "Reminder journeys",
    desc: "Automated SMS, WhatsApp and email sequences with confirm and reschedule links, logged per booking.",
    tint: "#8B3FE8",
  }, 
  {
    title: "One customer record",
    desc: "Visit history, notes, payments and communications on a single profile shared across branches.",
    tint: "#0F8F87",
  },
  {
    title: "Utilisation reporting",
    desc: "Revenue and utilisation per practitioner, service and branch, exportable or scheduled.",
    tint: "#2AA8C4",
  },
];

export function AppointGemSolution() {
  return (
    <section id="solution" className="appointgem-solution-section" aria-labelledby="solution-title">
      <div className="appointgem-solution-container">
        <div className="solution-header">
          <div>
            <span data-reveal="" className="appointgem-eyebrow">Our solution</span>
            <h2 data-reveal="" id="solution-title" className="solution-headline">
              What ships in AppointGem
            </h2>
          </div>
          <p data-reveal="" className="solution-subtitle">
            Six capabilities, all included. Nothing on this list is a paid add-on or a custom build.
          </p>
        </div>

        <div className="solution-grid">
          {SOLUTIONS.map((item) => (
            <div key={item.title} data-reveal="" className="solution-card">
              <span className="dot-indicator" style={{ backgroundColor: item.tint }} />
              <h3 className="solution-card-title">{item.title}</h3>
              <p className="solution-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
