"use client";

import { useState, useRef, useEffect } from "react";
import "./BookDemoForm.scss";

const DEMO_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

const DEMO_PRODUCTS = [
  "AppointGem",
  "WelzoKart",
  "MapMyPay",
  "Truck Guru",
  "MindFul Menu",
  "Trekvano",
  "Needly",
  "Locale E Clean",
  "TextGem",
  "Not sure yet",
];

const DEMO_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DEMO_TIMES = ["Morning", "Midday", "Afternoon", "Evening"];

const DEMO_DESKS = [
  {
    name: "Your data, not a demo account",
    desc: "A workspace configured with your branches, roles and rough volumes before the call starts.",
    sla: "PRE-CONFIGURED",
    tint: "#1F31E8",
  },
  {
    name: "The exact workflow you run",
    desc: "We walk the booking, order or job through every state it passes through today.",
    sla: "LIVE WALKTHROUGH",
    tint: "#1E9E5A",
  },
  {
    name: "What connects to what",
    desc: "How it sits alongside your existing tools, and what migrates over on day one.",
    sla: "INTEGRATION CHECK",
    tint: "#E8A21F",
  },
  {
    name: "Pricing for your scale",
    desc: "A number based on your team size and modules, not a generic price list.",
    sla: "TRANSPARENT SCOPE",
    tint: "#8B3FE8",
  },
];

const DEMO_STEPS = [
  {
    n: "01",
    title: "Confirmation email",
    desc: "Calendar invite and a join link, usually within one working day.",
  },
  {
    n: "02",
    title: "The call",
    desc: "Thirty minutes, screen-share, questions welcome throughout.",
  },
  {
    n: "03",
    title: "Scope in writing",
    desc: "Timeline and cost follow within two working days if you want to proceed.",
  },
];

export function BookDemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("1–10");
  const [product, setProduct] = useState("Not sure yet");
  const [day, setDay] = useState("Tue");
  const [time, setTime] = useState("Afternoon");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  // Big screen (>= 768px): 2-grid mouse scrollable & draggable carousel (no arrows, no dots)
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [isDesktopDeskPaused, setIsDesktopDeskPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // Auto-play timer for big screen carousel (4.5s)
  useEffect(() => {
    if (isDesktopDeskPaused || isDragging) return;
    const timer = setInterval(() => {
      const el = desktopScrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 5) return;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: el.scrollLeft + el.clientWidth, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(timer);
  }, [isDesktopDeskPaused, isDragging]);

  // Mouse wheel scroll handler
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDesktopWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    setIsDesktopDeskPaused(true);
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    } else {
      el.scrollLeft += e.deltaX;
    }

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      setIsDesktopDeskPaused(false);
    }, 2500);
  };

  // Mouse drag handlers
  const handleDesktopMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    setIsDesktopDeskPaused(true);
  };

  const handleDesktopMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return;
    const el = desktopScrollRef.current;
    if (!el) return;
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    el.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleDesktopMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
  };

  const handleDesktopMouseLeave = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
    setIsDesktopDeskPaused(false);
  };

  // Touch handlers for big screen touch devices
  const desktopTouchStartXRef = useRef<number | null>(null);
  const desktopTouchStartScrollLeftRef = useRef<number>(0);

  const handleDesktopTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    setIsDesktopDeskPaused(true);
    desktopTouchStartXRef.current = e.touches[0].clientX;
    desktopTouchStartScrollLeftRef.current = el.scrollLeft;
  };

  const handleDesktopTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (desktopTouchStartXRef.current === null) return;
    const el = desktopScrollRef.current;
    if (!el) return;
    const diff = e.touches[0].clientX - desktopTouchStartXRef.current;
    el.scrollLeft = desktopTouchStartScrollLeftRef.current - diff;
  };

  const handleDesktopTouchEnd = () => {
    desktopTouchStartXRef.current = null;
    setIsDesktopDeskPaused(false);
  };

  // Small screen (< 768px) carousel state
  const [deskActiveIndex, setDeskActiveIndex] = useState(0);
  const [deskDirection, setDeskDirection] = useState<"next" | "prev">("next");
  const totalDesks = DEMO_DESKS.length;
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

  const currentDesk = DEMO_DESKS[deskActiveIndex];

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
    setDay("Tue");
    setTime("Afternoon");
    setMessage("");
  };

  const productChipsRef = useRef<HTMLDivElement>(null);
  const [isChipsDragging, setIsChipsDragging] = useState(false);
  const chipsMouseDownRef = useRef(false);
  const chipsStartXRef = useRef(0);
  const chipsStartScrollLeftRef = useRef(0);

  const handleChipsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = productChipsRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    } else {
      el.scrollLeft += e.deltaX;
    }
  };

  const handleChipsMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = productChipsRef.current;
    if (!el) return;
    chipsMouseDownRef.current = true;
    chipsStartXRef.current = e.pageX - el.offsetLeft;
    chipsStartScrollLeftRef.current = el.scrollLeft;
  };

  const handleChipsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chipsMouseDownRef.current) return;
    const el = productChipsRef.current;
    if (!el) return;
    e.preventDefault();
    setIsChipsDragging(true);
    const x = e.pageX - el.offsetLeft;
    const walk = (x - chipsStartXRef.current) * 1.3;
    el.scrollLeft = chipsStartScrollLeftRef.current - walk;
  };

  const handleChipsMouseUp = () => {
    chipsMouseDownRef.current = false;
    setTimeout(() => {
      setIsChipsDragging(false);
    }, 50);
  };

  const handleChipsMouseLeave = () => {
    chipsMouseDownRef.current = false;
    setIsChipsDragging(false);
  };

  const scrollChipsLeft = () => {
    if (productChipsRef.current) {
      productChipsRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollChipsRight = () => {
    if (productChipsRef.current) {
      productChipsRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const handleProductSelect = (
    prodName: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isChipsDragging) return;
    setProduct(prodName);
    if (e.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <section id="form" className="contact-form-section content-padding" aria-label="Book a Demo Request Form">
      <div className="contact-form-container">
        {/* Left Column: Interactive Form Card */}
        <div data-reveal="" className="contact-form-card">
          {!isSent ? (
            <form onSubmit={handleSubmit} className="form-inner">
              <h2 className="form-title">Pick a time</h2>
              <p className="form-subtitle">
                Tell us who&apos;s joining and roughly when works. We&apos;ll confirm the exact slot by email.
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
                      {DEMO_SIZES.map((s, idx) => (
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
                <div className="form-products-header">
                  <span className="field-label">Which product do you want to see</span>
                  <div className="chips-nav-controls">
                    <button
                      type="button"
                      className="chips-scroll-btn"
                      onClick={scrollChipsLeft}
                      aria-label="Scroll products left"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="chips-scroll-btn"
                      onClick={scrollChipsRight}
                      aria-label="Scroll products right"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  ref={productChipsRef}
                  className={`product-chips-wrap ${isChipsDragging ? "is-dragging" : ""}`}
                  onWheel={handleChipsWheel}
                  onMouseDown={handleChipsMouseDown}
                  onMouseMove={handleChipsMouseMove}
                  onMouseUp={handleChipsMouseUp}
                  onMouseLeave={handleChipsMouseLeave}
                  role="group"
                  aria-label="Select product"
                >
                  {DEMO_PRODUCTS.map((prodName, idx) => {
                    const isSelected = product === prodName;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`chip-btn ${isSelected ? "is-selected" : ""}`}
                        onClick={(e) => handleProductSelect(prodName, e)}
                        aria-pressed={isSelected}
                      >
                        {prodName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Day Chips */}
              <div className="form-chips-section">
                <span className="field-label">Preferred day</span>
                <div className="option-chips-row">
                  {DEMO_DAYS.map((dName, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`option-chip-btn ${day === dName ? "is-active" : ""}`}
                      onClick={() => setDay(dName)}
                    >
                      {dName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Time Chips */}
              <div className="form-chips-section">
                <span className="field-label">Preferred time</span>
                <div className="option-chips-row">
                  {DEMO_TIMES.map((tName, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`option-chip-btn ${time === tName ? "is-active" : ""}`}
                      onClick={() => setTime(tName)}
                    >
                      {tName}
                    </button>
                  ))}
                </div>
                <div className="time-subnote">Times shown in your local timezone. We&apos;ll confirm by email.</div>
              </div>

              {/* Message Textarea */}
              <label className="form-field form-field--full">
                <span className="field-label">Anything we should know before the call</span>
                <textarea
                  rows={4}
                  placeholder="Current process, rough volumes, the tools you run today."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-textarea"
                />
              </label>

              {/* Form Actions */}
              <div className="form-footer">
                <button type="submit" className="btn-primary">
                  Request this slot
                  <span aria-hidden="true">→</span>
                </button>
                <span className="form-note">No cost, no obligation.</span>
              </div>
            </form>
          ) : (
            <div className="form-success-state">
              <div className="success-badge" aria-hidden="true">
                ✓
              </div>
              <h3 className="success-title">Request sent.</h3>
              <p className="success-note">
                We&apos;ll confirm {day} · {time} by email within one working day, with a calendar invite and a link to join.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="btn-reset"
              >
                Book another
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Desks & Steps */}
        <div className="contact-sidebar">
          {/* Top Box: What you'll see */}
          <div data-reveal="" className="desks-card">
            <div className="desks-eyebrow">What you&apos;ll see</div>

            {/* Big Screen: 2-Grid Carousel (>= 768px, no arrows, no dots, mouse scroll & drag) */}
            <div
              ref={desktopScrollRef}
              className={`desks-desktop-track ${isDragging ? "is-dragging" : ""}`}
              onMouseEnter={() => setIsDesktopDeskPaused(true)}
              onMouseLeave={handleDesktopMouseLeave}
              onWheel={handleDesktopWheel}
              onMouseDown={handleDesktopMouseDown}
              onMouseMove={handleDesktopMouseMove}
              onMouseUp={handleDesktopMouseUp}
              onTouchStart={handleDesktopTouchStart}
              onTouchMove={handleDesktopTouchMove}
              onTouchEnd={handleDesktopTouchEnd}
              aria-label="What you will see carousel"
            >
              {DEMO_DESKS.map((desk, idx) => (
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
              aria-label="What you will see carousel"
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
                  aria-label="Previous topic"
                >
                  <svg
                    width="14"
                    height="14"
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
                  aria-label="Next topic"
                >
                  <svg
                    width="14"
                    height="14"
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
                aria-label="Topic navigation dots"
              >
                {DEMO_DESKS.map((desk, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`desks-dot ${
                      deskActiveIndex === idx ? "is-active" : ""
                    }`}
                    onClick={() => handleDeskIndex(idx)}
                    aria-label={`Go to topic ${idx + 1}: ${desk.name}`}
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

          {/* Bottom Box: After the call (Dark) */}
          <div data-reveal="" className="steps-card">
            <div className="steps-eyebrow">After the call</div>
            <div className="steps-list">
              {DEMO_STEPS.map((step, idx) => (
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
