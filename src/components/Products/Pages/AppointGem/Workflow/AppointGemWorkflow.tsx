import React from "react";
import "./AppointGemWorkflow.scss";

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "Customer picks a slot",
    desc: "Web widget or app shows only genuinely open times per practitioner.",
  },
  {
    num: "02",
    title: "Booking is confirmed",
    desc: "Deposit or full payment taken, reminders scheduled automatically.",
  },
  {
    num: "03",
    title: "Visit is served",
    desc: "Front desk checks the customer in, practitioner closes the appointment.",
  },
  {
    num: "04",
    title: "Invoice and follow-up",
    desc: "Invoice raised against the visit, next appointment offered.",
  },
];

const ACCOUNT_ROLES = [
  { mark: "FD", name: "Front desk" },
  { mark: "PR", name: "Practitioner" },
  { mark: "MG", name: "Branch manager" },
  { mark: "AC", name: "Accounts" },
];

export function AppointGemWorkflow() {
  return (
    <section id="workflow" className="appointgem-workflow-section" aria-labelledby="workflow-title">
      <div className="appointgem-workflow-container">
        <div className="workflow-header-grid">
          <div>
            <span data-reveal="" className="workflow-eyebrow">Workflow</span>
            <h2 data-reveal="" id="workflow-title" className="workflow-headline">
              How a booking moves
            </h2>
          </div>
          <p data-reveal="" className="workflow-subtitle">
            Four states, four owners. Each hand-off writes to the same record, so the invoice and the follow-up carry the full history of the visit.
          </p>
        </div>

        <div className="workflow-steps-grid">
          {WORKFLOW_STEPS.map((step) => (
            <div key={step.num} data-reveal="" className="workflow-step-card">
              <span className="step-num">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div data-reveal="" className="workflow-roles-bar">
          <span className="roles-label">Roles on the account</span>
          <div className="roles-pills">
            {ACCOUNT_ROLES.map((role) => (
              <span key={role.mark} className="role-pill">
                <span className="role-mark">{role.mark}</span>
                <span className="role-name">{role.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
