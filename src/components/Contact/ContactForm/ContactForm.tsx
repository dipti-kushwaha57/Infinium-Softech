"use client";

import { useState, useRef } from "react";
import {
  CONTACT_SIZES,
  CONTACT_PRODUCTS,
  CONTACT_DESKS,
  CONTACT_STEPS,
} from "@/data/contactData";
import "./ContactForm.scss";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("1–10");
  const [product, setProduct] = useState("Not sure yet");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  // Reach the right desk carousel state for small screens (< 768px)
  const [deskActiveIndex, setDeskActiveIndex] = useState(0);
  const [deskDirection, setDeskDirection] = useState<"next" | "prev">("next");
  const totalDesks = CONTACT_DESKS.length;
  const deskTouchStartXRef = useRef<number | null>(null);
  const deskTouchEndXRef = useRef<number | null>(null);

  const handleDeskNext = () => {
    setDeskDirection("next");
    setDeskActiveIndex((prev) => (prev + 1) % totalDesks);
  };

  const handleDeskPrev = () => {
    setDeskDirection("prev");
    setDeskActiveIndex((prev) => (prev - 1 + totalDesks) % totalDesks);
  };

  const handleDeskIndex = (idx: number) => {
    setDeskDirection(idx > deskActiveIndex ? "next" : "prev");
    setDeskActiveIndex(idx);
  };

  const handleDeskTouchStart = (e: React.TouchEvent) => {
    deskTouchStartXRef.current = e.touches[0].clientX;
    deskTouchEndXRef.current = null;
  };

  const handleDeskTouchMove = (e: React.TouchEvent) => {
    deskTouchEndXRef.current = e.touches[0].clientX;
  };

  const handleDeskTouchEnd = () => {
    if (deskTouchStartXRef.current !== null && deskTouchEndXRef.current !== null) {
      const diff = deskTouchStartXRef.current - deskTouchEndXRef.current;
      if (diff > 45) {
        handleDeskNext();
      } else if (diff < -45) {
        handleDeskPrev();
      }
    }
    deskTouchStartXRef.current = null;
    deskTouchEndXRef.current = null;
  };

  const currentDesk = CONTACT_DESKS[deskActiveIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSent(true);
  };

  const handleReset = () => {
    setIsSent(false);
    setName("");
    setEmail("");
    setCompany("");
    setSize("1–10");
    setProduct("Not sure yet");
    setMessage("");
  };

  const sentMessageNote =
    product === "Not sure yet"
      ? "A product specialist will read this and recommend the platform that fits. Expect a reply within one working day, usually with two or three questions and a time for a walkthrough."
      : `Routed to the ${product} team. Expect a reply within one working day, usually with two or three questions and a time for a walkthrough.`;

  return (
    <section id="form" className="contact-form-section content-padding" aria-label="Send Brief & Contacts">
      <div className="contact-form-container">
        {/* Left Column: Interactive Form Box */}
        <div data-reveal="" className="contact-form-card">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="form-inner">
              <h2 className="form-title">Send us a brief</h2>
              <p className="form-subtitle">
                Six fields. The more you tell us about volumes and teams, the more useful the first call is.
              </p>

              <div className="form-grid">
                <label className="form-field">
                  <span className="field-label">Full name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Work email</span>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Company</span>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="field-input"
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Team size</span>
                  <div className="select-wrap">
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="field-select"
                    >
                      {CONTACT_SIZES.map((s, idx) => (
                        <option key={idx} value={s}>
                          {s} 
                        </option>
                      ))}
                    </select>
                    <span className="select-caret" aria-hidden="true">▾</span>
                  </div>
                </label>
              </div>

              {/* Product Chips Selection */}
              <div className="form-products-group">
                <span className="field-label">Which product are you looking at</span>
                <div className="product-chips-wrap">
                  {CONTACT_PRODUCTS.map((prodName, idx) => {
                    const isSelected = product === prodName;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`chip-btn ${isSelected ? "is-selected" : ""}`}
                        onClick={() => setProduct(prodName)}
                      >
                        {prodName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Textarea */}
              <label className="form-field form-field--full">
                <span className="field-label">What are you trying to solve</span>
                <textarea
                  rows={4}
                  placeholder="Current process, rough volumes, the tools you run today, and anything that has to stay."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-textarea"
                />
              </label>

              {/* Form Actions */}
              <div className="form-footer">
                <button type="submit" className="btn-submit">
                  Send enquiry
                  <span aria-hidden="true">→</span>
                </button>
                <span className="form-note">We reply within one working day.</span>
              </div>
            </form>
          ) : (
            <div className="form-success-state">
              <div className="success-badge" aria-hidden="true">
                ✓
              </div>
              <h3 className="success-title">Brief received.</h3>
              <p className="success-note">{sentMessageNote}</p>
              <button
                type="button"
                onClick={handleReset}
                className="btn-reset"
              >
                Send another
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Desks & Steps */}
        <div className="contact-sidebar">
          {/* Top Box: Reach the right desk */}
          <div data-reveal="" className="desks-card">
            <div className="desks-eyebrow">Reach the right desk</div>

            {/* Desktop / Tablet Grid (>= 768px) */}
            <div className="desks-grid" aria-label="Desks grid">
              {CONTACT_DESKS.map((desk, idx) => (
                <div key={idx} className="desk-item">
                  <div
                    className="desk-indicator"
                    style={{ backgroundColor: desk.tint }}
                    aria-hidden="true"
                  />
                  <h3 className="desk-name">{desk.name}</h3>
                  <p className="desk-desc">{desk.desc}</p>
                  <div className="desk-sla">{desk.sla}</div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Slider (< 768px) */}
            <div
              className="desks-carousel"
              aria-label="Reach the right desk carousel"
            >
              <div
                className="desks-carousel-wrapper"
                onTouchStart={handleDeskTouchStart}
                onTouchMove={handleDeskTouchMove}
                onTouchEnd={handleDeskTouchEnd}
              >
                <button
                  type="button"
                  className="carousel-arrow-btn prev-btn"
                  onClick={handleDeskPrev}
                  aria-label="Previous desk"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div
                  key={deskActiveIndex}
                  className={`desk-carousel-card slide-${deskDirection}`}
                >
                  <div className="desk-carousel-header">
                    <div
                      className="desk-indicator"
                      style={{ backgroundColor: currentDesk.tint }}
                      aria-hidden="true"
                    />
                    <span className="desk-counter">
                      0{deskActiveIndex + 1} / 0{totalDesks}
                    </span>
                  </div>
                  <h3 className="desk-name">{currentDesk.name}</h3>
                  <p className="desk-desc">{currentDesk.desc}</p>
                  <div className="desk-sla">{currentDesk.sla}</div>
                </div>

                <button
                  type="button"
                  className="carousel-arrow-btn next-btn"
                  onClick={handleDeskNext}
                  aria-label="Next desk"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* Pagination Dots */}
              <div
                className="desks-carousel-dots"
                aria-label="Desk navigation dots"
              >
                {CONTACT_DESKS.map((desk, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`desks-dot ${
                      deskActiveIndex === idx ? "is-active" : ""
                    }`}
                    onClick={() => handleDeskIndex(idx)}
                    aria-label={`Go to desk ${idx + 1}: ${desk.name}`}
                  >
                    <span
                      className="dot-fill"
                      style={{
                        backgroundColor:
                          deskActiveIndex === idx ? desk.tint : undefined,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Box: What happens next (Dark) */}
          <div data-reveal="" className="steps-card">
            <div className="steps-eyebrow">What happens next</div>
            <div className="steps-list">
              {CONTACT_STEPS.map((step, idx) => (
                <div key={idx} className="step-item">
                  <span className="step-num">{step.n}</span>
                  <div className="step-content">
                    <span className="step-title">{step.title}</span>
                    <span className="step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
