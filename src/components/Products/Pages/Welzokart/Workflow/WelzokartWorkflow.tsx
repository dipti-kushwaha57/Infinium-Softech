"use client";

import React from "react";
import { useAboutCarousel } from "@/components/About/useAboutCarousel";
import "./WelzokartWorkflow.scss";

interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    num: "01",
    title: "Customer Explores Products",
    desc: "Users browse grocery categories, search for products, and select the items they need.",
  },
  {
    num: "02",
    title: "Order Is Placed",
    desc: "Selected products are added to the cart and the customer completes the checkout process.",
  },
  {
    num: "03",
    title: "Order Is Assigned",
    desc: "The order is processed and assigned to an appropriate delivery partner for fulfillment.",
  },
  {
    num: "04",
    title: "Order Is Delivered",
    desc: "The delivery partner navigates to the customer while real-time updates keep the customer informed until delivery is completed.",
  },
];

const ACCOUNT_ROLES = [
  { mark: "CU", name: "Customer" },
  { mark: "AD", name: "Admin" },
  { mark: "DP", name: "Delivery Partner" },
  { mark: "OP", name: "Operations" },
];

function WorkflowCardView({
  step,
  isClone = false,
}: {
  step: WorkflowStep;
  isClone?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`workflow-step-card ${isClone ? "workflow-step-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <span className="step-num">{step.num}</span>
      <h3 className="step-title">{step.title}</h3>
      <p className="step-desc">{step.desc}</p>
    </div>
  );
}

export function WelzokartWorkflow() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(WORKFLOW_STEPS.length, 1024);

  return (
    <section id="workflow" className="appointgem-workflow-section" aria-labelledby="workflow-title">
      <div className="appointgem-workflow-container">
        <div className="workflow-header-grid">
          <div>
            <span data-reveal="" className="workflow-eyebrow">Workflow</span>
            <h2 data-reveal="" id="workflow-title" className="workflow-headline">
              From Product Discovery<br className="mobile-title-break" />to Doorstep Delivery
            </h2>
          </div>
          <p data-reveal="" className="workflow-subtitle">
            WelzoKart connects customers, orders, subscriptions, and delivery partners through a simple end-to-end workflow.
          </p>
        </div>

        <div className="workflow-steps-wrap">
          <div className="workflow-steps-track">
            <div className="workflow-steps-grid" ref={scrollRef}>
              {/* Clone of last card placed before first card for seamless reverse scroll */}
              <WorkflowCardView
                step={WORKFLOW_STEPS[WORKFLOW_STEPS.length - 1]}
                isClone={true}
              />

              {/* Real Steps */}
              {WORKFLOW_STEPS.map((step) => (
                <WorkflowCardView key={step.num} step={step} />
              ))}

              {/* Clone of first card placed right next to last card for seamless forward scroll */}
              <WorkflowCardView step={WORKFLOW_STEPS[0]} isClone={true} />
            </div>

            {/* Left Arrow Button */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous step"
              onClick={handlePrev}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next step"
              onClick={handleNext}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="carousel-dots" aria-label="Workflow steps navigation dots">
            {WORKFLOW_STEPS.map((step, idx) => (
              <button
                key={step.num}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to step ${idx + 1}`}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
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
