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
        (card): card is HTMLDivElement => card !== null,
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
          },
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

  // Mobile horizontal scroll active card observer & seamless wrapping
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    let jumpTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (window.innerWidth >= 1024) return;
      const children = Array.from(container.children) as HTMLElement[];
      if (children.length < 3) return;

      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      children.forEach((el, idx) => {
        const elCenter = el.offsetLeft - container.offsetLeft + el.offsetWidth / 2;
        const diff = Math.abs(containerCenter - elCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      const totalReal = ECOSYSTEM_PRODUCTS.length;
      let resolvedRealIdx = 0;
      if (closestIdx === 0) {
        resolvedRealIdx = totalReal - 1;
      } else if (closestIdx === totalReal + 1) {
        resolvedRealIdx = 0;
      } else {
        resolvedRealIdx = closestIdx - 1;
      }

      if (resolvedRealIdx >= 0 && resolvedRealIdx < totalReal) {
        setActiveRail(ECOSYSTEM_PRODUCTS[resolvedRealIdx].n);
      }

      // Silent wrap after user manual swipe finishes
      if (jumpTimer) clearTimeout(jumpTimer);
      jumpTimer = setTimeout(() => {
        if (window.innerWidth >= 1024) return;
        if (closestIdx === 0) {
          const realLast = cardRefs.current[totalReal - 1];
          if (realLast && container) {
            container.scrollTo({
              left: realLast.offsetLeft - container.offsetLeft,
              behavior: "instant" as ScrollBehavior,
            });
          }
        } else if (closestIdx === totalReal + 1) {
          const realFirst = cardRefs.current[0];
          if (realFirst && container) {
            container.scrollTo({
              left: realFirst.offsetLeft - container.offsetLeft,
              behavior: "instant" as ScrollBehavior,
            });
          }
        }
      }, 150);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (jumpTimer) clearTimeout(jumpTimer);
    };
  }, []);

  // Initial scroll position to first real card on mobile
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const setInitialPos = () => {
      if (window.innerWidth < 1024) {
        const realFirst = cardRefs.current[0];
        if (realFirst && container.scrollLeft === 0) {
          container.scrollLeft = realFirst.offsetLeft - container.offsetLeft;
        }
      }
    };

    const timer = setTimeout(setInitialPos, 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCard = (index: number) => {
    setActiveRail(ECOSYSTEM_PRODUCTS[index].n);

    if (window.innerWidth >= 1024) {
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
        const offsetTop = card.getBoundingClientRect().top + window.scrollY - 96;

        window.scrollTo({
          top: offsetTop + 2,
          behavior: "smooth",
        });
      }
    } else {
      // Mobile & Tablet horizontal scroll
      const container = cardsContainerRef.current;
      const card = cardRefs.current[index];
      if (container && card) {
        const left = card.offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: left,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollPrevMobile = () => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const currentIdx = ECOSYSTEM_PRODUCTS.findIndex((p) => p.n === activeRail);

    if (currentIdx <= 0) {
      // Smoothly scroll to the prepended clone of the last card (DOM index 0)
      const firstChild = container.firstElementChild as HTMLElement;
      if (firstChild) {
        container.scrollTo({
          left: firstChild.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
      setActiveRail(ECOSYSTEM_PRODUCTS[ECOSYSTEM_PRODUCTS.length - 1].n);

      // Silently snap to the real last card after transition
      setTimeout(() => {
        const realLast = cardRefs.current[ECOSYSTEM_PRODUCTS.length - 1];
        if (realLast && container) {
          container.scrollTo({
            left: realLast.offsetLeft - container.offsetLeft,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }, 420);
    } else {
      scrollToCard(currentIdx - 1);
    }
  };

  const scrollNextMobile = () => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const currentIdx = ECOSYSTEM_PRODUCTS.findIndex((p) => p.n === activeRail);

    if (currentIdx >= ECOSYSTEM_PRODUCTS.length - 1) {
      // Smoothly scroll to the appended clone of the first card (last DOM child)
      const lastChild = container.lastElementChild as HTMLElement;
      if (lastChild) {
        container.scrollTo({
          left: lastChild.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
      setActiveRail(ECOSYSTEM_PRODUCTS[0].n);

      // Silently snap to the real first card after transition
      setTimeout(() => {
        const realFirst = cardRefs.current[0];
        if (realFirst && container) {
          container.scrollTo({
            left: realFirst.offsetLeft - container.offsetLeft,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }, 420);
    } else {
      scrollToCard(currentIdx + 1);
    }
  };

  // Prepare display items with clone wrappers for infinite mobile looping
  const displayCards = [
    {
      ...ECOSYSTEM_PRODUCTS[ECOSYSTEM_PRODUCTS.length - 1],
      uniqueKey: `clone-prev-${ECOSYSTEM_PRODUCTS[ECOSYSTEM_PRODUCTS.length - 1].n}`,
      isClone: true,
      realIndex: ECOSYSTEM_PRODUCTS.length - 1,
    },
    ...ECOSYSTEM_PRODUCTS.map((prod, idx) => ({
      ...prod,
      uniqueKey: prod.n,
      isClone: false,
      realIndex: idx,
    })),
    {
      ...ECOSYSTEM_PRODUCTS[0],
      uniqueKey: `clone-next-${ECOSYSTEM_PRODUCTS[0].n}`,
      isClone: true,
      realIndex: 0,
    },
  ];

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
           Nine platforms.Nine 
            <br />
            industries. One spine.
          </h2>

          <p className="ecosystem-intro">
            Each product ships as its own platform and inherits the same
            identity, billing, analytics and automation layer. Adopt one,
            connect the rest when the business is ready.
          </p>
        </div>

        {/* Section Main Content Grid */}
        <div className="ecosystem-body">
          {/* Left Number Rail (Sticky on Desktop >= 1024px) */}
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

          {/* Cards Area with Mobile Navigation Arrows & Bottom Dots */}
          <div className="ecosystem-cards-wrapper">
            {/* Mobile Left Arrow Button (Middle of Card) */}
            <button
              type="button"
              className="ecosystem-mobile-arrow prev-btn"
              onClick={scrollPrevMobile}
              aria-label="Previous ecosystem product card"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Stacking Cards List (Horizontal on Mobile, Sticky on Desktop) */}
            <div ref={cardsContainerRef} className="ecosystem-cards">
              {displayCards.map((prod) => (
                <div
                  key={prod.uniqueKey}
                  ref={(el) => {
                    if (!prod.isClone) {
                      cardRefs.current[prod.realIndex] = el;
                    }
                  }}
                  className={`ecosystem-card ${prod.isClone ? "is-clone" : ""}`}
                  data-card={prod.n}
                  style={{ zIndex: prod.isClone ? 1 : prod.realIndex + 1 }}
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

                          <span className="tag-label">{prod.tag}</span>
                        </div>

                        <div className="card-number" aria-hidden="true">
                          {prod.n}
                        </div>
                      </div>

                      {/* Product Name & Description */}
                      <h3 className="card-title">{prod.name}</h3>

                      <p className="card-desc">{prod.desc}</p>

                      {/* Bullet Features */}
                      <div className="card-features">
                        {prod.features.map((feature, fIdx) => (
                          <div key={fIdx} className="feature-item">
                            <span
                              className="feature-dot"
                              style={{
                                backgroundColor: prod.tint,
                              }}
                              aria-hidden="true"
                            />

                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Metrics Chips */}
                      <div className="card-metrics">
                        {/* Metric 1 (Dark Theme) */}
                        <div className="metric-chip metric-primary">
                          <div className="chip-label">{prod.metricLabel}</div>

                          <div className="chip-value">{prod.metric}</div>
                        </div>

                        {/* Metric 2: Growth Delta */}
                        <div className="metric-chip metric-secondary">
                          <div className="chip-label">Growth</div>

                          <div className="chip-value">{prod.metricDelta}</div>
                        </div>

                        {/* Metric 3: Realtime App Stat */}
                        <div className="metric-chip metric-secondary">
                          <div className="chip-label">{prod.appLabel}</div>

                          <div className="chip-value">{prod.appValue}</div>
                        </div>
                      </div>

                      {/* Action CTAs */}
                      <div className="card-actions">
                        <Link href="#demo" className="btn-card-primary">
                          Launch demo{" "}
                          <span className="btn-arrow" aria-hidden="true">
                            →
                          </span>
                        </Link>

                        <Link href="#showcase" className="btn-card-secondary">
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
                      <div className="visual-glow" aria-hidden="true" />

                      <div className="preview-img-wrapper">
                        <Image
                          src={prod.shot}
                          alt={`${prod.name} product screen preview`}
                          width={960}
                          height={600}
                          sizes="(min-width: 1280px) 720px, (min-width: 1024px) 55vw, 100vw"
                          className="preview-shot"
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Right Arrow Button (Middle of Card) */}
            <button
              type="button"
              className="ecosystem-mobile-arrow next-btn"
              onClick={scrollNextMobile}
              aria-label="Next ecosystem product card"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Mobile Bottom Pagination Dots (No text, no numbers) */}
            <div className="ecosystem-mobile-dots" aria-label="Product pagination dots">
              {ECOSYSTEM_PRODUCTS.map((prod, idx) => (
                <button
                  key={prod.n}
                  type="button"
                  className={`ecosystem-dot ${activeRail === prod.n ? "is-active" : ""}`}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${prod.name}`}
                >
                  <span
                    className="dot-fill"
                    style={{
                      backgroundColor: activeRail === prod.n ? prod.tint : undefined,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
