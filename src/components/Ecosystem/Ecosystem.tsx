"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ECOSYSTEM_PRODUCTS, EcosystemProduct } from "@/data/ecosystemData";
import "./Ecosystem.scss";

gsap.registerPlugin(ScrollTrigger);

export function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeRail, setActiveRail] = useState<string>("01");

  const railTriggersRef = useRef<ScrollTrigger[]>([]);
  const stickyTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    /*
     * Only run the stacking animation on desktop.
     * Mobile/tablet behavior remains unchanged.
     */
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => card !== null
      );

      if (!cards.length) return;

      /*
       * Set initial state
       */
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".card-inner");

        if (!inner) return;

        gsap.set(inner, {
          scale: 1,
          opacity: 1,
          transformOrigin: "center center",
        });
      });

      /*
       * Create ScrollTrigger for every card.
       *
       * As the next card approaches and covers the previous card,
       * the previous card scales down and fades to 0.
       */
      cards.forEach((card, index) => {
        const inner = card.querySelector<HTMLElement>(".card-inner");

        if (!inner) return;

        const nextCard = cards[index + 1];

        /*
         * Last card has nothing covering it.
         */
        if (!nextCard) return;

        gsap.fromTo(
          inner,
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
          },
          {
            scale: 0.95,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: "top 96px",
              scrub: true,
              onLeave: () => {
                gsap.set(inner, { visibility: "hidden" });
              },
              onEnterBack: () => {
                gsap.set(inner, { visibility: "visible" });
              },
            },
          }
        );
      });

      /*
       * Active rail item:
       * In CSS sticky stacking, Card i is active when it reaches top 120px
       * until the next card reaches top 120px and stacks over it.
       * This gives perfect synchronization across all screen widths including 1200px+.
       */
      railTriggersRef.current = [];
      stickyTriggersRef.current = [];

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        const isFirst = index === 0;
        const isLast = index === cards.length - 1;

        // Sticky trigger for click-to-scroll navigation
        const stickySt = ScrollTrigger.create({
          trigger: card,
          start: "top 96px",
        });
        stickyTriggersRef.current.push(stickySt);

        // Rail active indicator trigger
        const railSt = ScrollTrigger.create({
          trigger: card,
          start: isFirst ? "top 75%" : "top 120px",
          endTrigger: isLast ? section : nextCard,
          end: isLast ? "bottom 60%" : "top 120px",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveRail(ECOSYSTEM_PRODUCTS[index].n);
            }
          },
        });

        railTriggersRef.current.push(railSt);
      });

      /*
       * Refresh ScrollTrigger after everything is created.
       */
      ScrollTrigger.refresh();

      /*
       * Cleanup for this media query.
       */
      return () => {
        railTriggersRef.current = [];
        stickyTriggersRef.current = [];
        cards.forEach((card) => {
          const inner = card.querySelector<HTMLElement>(".card-inner");
          if (inner) {
            gsap.killTweensOf(inner);
            gsap.set(inner, {
              clearProps: "transform,opacity,visibility",
            });
          }
        });

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger && section.contains(trigger.trigger)) {
            trigger.kill();
          }
        });
      };
    });

    /*
     * Mobile/tablet:
     *
     * GSAP does not run below 1024px.
     * Clear any inline styles so your existing
     * responsive SCSS controls the design.
     */
    mm.add("(max-width: 1023px)", () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const inner = card.querySelector<HTMLElement>(".card-inner");

        if (!inner) return;

        gsap.set(inner, {
          clearProps: "transform,opacity,visibility",
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  const scrollToCard = (index: number) => {
    setActiveRail(ECOSYSTEM_PRODUCTS[index].n);

    const st = stickyTriggersRef.current[index];

    if (st && typeof st.start === "number") {
      window.scrollTo({
        top: st.start + 2,
        behavior: "smooth",
      });
      return;
    }

    const card = cardRefs.current[index];

    if (card) {
      const offsetTop =
        card.getBoundingClientRect().top +
        window.scrollY -
        96;

      window.scrollTo({
        top: offsetTop + 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="ecosystem-section content-padding"
      aria-label="Product Ecosystem"
    >
      <div className="ecosystem-container">
        {/* Section Header */}
        <div className="ecosystem-header">
          <div className="ecosystem-eyebrow">The ecosystem</div>

          <h2 className="ecosystem-headline">
            <span>Nine platforms.</span> <span>Nine industries.</span>
            <br />
            <span>One spine.</span>
          </h2>

          <p className="ecosystem-intro">
            Each product ships as its own platform and inherits the same
            identity, billing, analytics and automation layer. Adopt one,
            connect the rest when the business is ready.
          </p>
        </div>

        {/* Section Main Content Grid */}
        <div className="ecosystem-body">
          {/* Left Number Rail (Sticky on Desktop) */}
          <nav
            className="ecosystem-rail"
            aria-label="Ecosystem navigation rail"
          >
            {ECOSYSTEM_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.n}
                type="button"
                className={`rail-item ${
                  activeRail === prod.n ? "is-active" : ""
                }`}
                onClick={() => scrollToCard(idx)}
                aria-label={`Jump to ${prod.name}`}
              >
                <span className="rail-bar" aria-hidden="true" />
                <span>{prod.n}</span>
              </button>
            ))}
          </nav>

          {/* Stacking Cards List */}
          <div
            ref={cardsContainerRef}
            className="ecosystem-cards"
          >
            {ECOSYSTEM_PRODUCTS.map(
              (prod: EcosystemProduct, idx: number) => (
                <div
                  key={prod.n}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="ecosystem-card"
                  data-card={prod.n}
                  style={{ zIndex: idx + 1 }}
                >
                  <div className="card-inner">
                    {/* Left Column: Content & Metadata */}
                    <div className="card-content">
                      {/* Left Accent Color Strip */}
                      <div
                        className="card-accent-bar"
                        style={{
                          backgroundColor: prod.tint,
                        }}
                        aria-hidden="true"
                      />

                      {/* Header Row: Category Badge & Giant Number */}
                      <div className="card-header-row">
                        <div className="card-tag-pill">
                          <span
                            className="tag-mark"
                            style={{
                              backgroundColor: prod.tint,
                            }}
                          >
                            {prod.mark}
                          </span>

                          <span className="tag-label">
                            {prod.tag}
                          </span>
                        </div>

                        <div
                          className="card-number"
                          aria-hidden="true"
                        >
                          {prod.n}
                        </div>
                      </div>

                      {/* Product Name & Description */}
                      <h3 className="card-title">
                        {prod.name}
                      </h3>

                      <p className="card-desc">
                        {prod.desc}
                      </p>

                      {/* Bullet Features */}
                      <div className="card-features">
                        {prod.features.map(
                          (feature, fIdx) => (
                            <div
                              key={fIdx}
                              className="feature-item"
                            >
                              <span
                                className="feature-dot"
                                style={{
                                  backgroundColor: prod.tint,
                                }}
                                aria-hidden="true"
                              />

                              <span>{feature}</span>
                            </div>
                          )
                        )}
                      </div>

                      {/* Metrics Chips */}
                      <div className="card-metrics">
                        {/* Metric 1 (Dark Theme) */}
                        <div className="metric-chip metric-primary">
                          <div className="chip-label">
                            {prod.metricLabel}
                          </div>

                          <div className="chip-value">
                            {prod.metric}
                          </div>
                        </div>

                        {/* Metric 2: Growth Delta */}
                        <div className="metric-chip metric-secondary">
                          <div className="chip-label">
                            Growth
                          </div>

                          <div className="chip-value">
                            {prod.metricDelta}
                          </div>
                        </div>

                        {/* Metric 3: Realtime App Stat */}
                        <div className="metric-chip metric-secondary">
                          <div className="chip-label">
                            {prod.appLabel}
                          </div>

                          <div className="chip-value">
                            {prod.appValue}
                          </div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="card-actions">
                        <Link
                          href="#demo"
                          className="btn-card-primary"
                        >
                          Launch demo{" "}
                          <span
                            className="btn-arrow"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>

                        <Link
                          href="#showcase"
                          className="btn-card-secondary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Screenshot Visual */}
                    <div
                      className="card-visual"
                      style={{
                        backgroundColor: prod.wash,
                      }}
                    >
                      <div
                        className="visual-glow"
                        aria-hidden="true"
                      />

                      <div className="preview-img-wrapper">
                        <Image
                          src={prod.shot}
                          alt={`${prod.name} product screen preview`}
                          width={960}
                          height={600}
                          sizes="(min-width: 1280px) 540px, (min-width: 1024px) 45vw, 100vw"
                          className="preview-shot"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
