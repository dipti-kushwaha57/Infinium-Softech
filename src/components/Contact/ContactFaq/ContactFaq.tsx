"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { CONTACT_FAQS } from "@/data/contactData";
import "./ContactFaq.scss";

export function ContactFaq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  const totalCards = CONTACT_FAQS.length;
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setSlideDirection("next");
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    setSlideDirection("prev");
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToIndex = (index: number) => {
    setSlideDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  // Auto-scroll / Auto-play timer (4.5s)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      if (diff > 45) {
        goToNext();
      } else if (diff < -45) {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setIsPaused(false);
  };

  const currentFaq = CONTACT_FAQS[activeIndex];
  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(totalCards).padStart(2, "0");

  return (
    <section className="contact-faq-section content-padding" aria-label="Before You Write FAQs">
      <div className="contact-faq-container">
        {/* Section Header */}
        <div className="contact-faq-header">
          <div>
            <div data-reveal="" className="contact-faq-eyebrow">
              Before you write
            </div>
            <h2 data-reveal="" className="contact-faq-headline">
              Questions we get first.
            </h2>
          </div>
          <p data-reveal="" className="contact-faq-intro">
            If one of these is your question, the answer is here and you don&apos;t
            need to wait for a call.
          </p>
        </div>

        {/* DESKTOP VIEW: 3x2 FAQ Grid (Desktop >= 1024px) */}
        <div className="contact-faq-grid" aria-label="Questions and answers grid">
          {CONTACT_FAQS.map((faq, idx) => (
            <div data-reveal="" key={idx} className="faq-card">
              <h3 className="faq-question">{faq.q}</h3>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* MOBILE & TABLET VIEW: Interactive Centered Slider with Middle Arrows (< 1024px) */}
        <div className="contact-faq-slider-area" aria-label="FAQ carousel slider">
          <div
            className="contact-faq-slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Arrow Button (Vertically centered) */}
            <button
              type="button"
              className="slider-arrow-btn prev-btn"
              onClick={goToPrev}
              aria-label="Previous question"
            >
              <svg
                width="20"
                height="20"
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

            {/* Active Card */}
            <div
              key={activeIndex}
              className={`faq-slider-card slide-${slideDirection}`}
            >
              <div className="card-top-bar">
                <span className="card-counter">
                  {formattedIndex} / {formattedTotal}
                </span>
              </div>

              <h3 className="card-title">{currentFaq.q}</h3>
              <p className="card-desc">{currentFaq.a}</p>
            </div>

            {/* Right Arrow Button (Vertically centered) */}
            <button
              type="button"
              className="slider-arrow-btn next-btn"
              onClick={goToNext}
              aria-label="Next question"
            >
              <svg
                width="20"
                height="20"
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
          <div className="slider-pagination" aria-label="FAQ navigation dots">
            {CONTACT_FAQS.map((faq, idx) => (
              <button
                key={idx}
                type="button"
                className={`pagination-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => goToIndex(idx)}
                aria-label={`Go to question ${idx + 1}`}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
