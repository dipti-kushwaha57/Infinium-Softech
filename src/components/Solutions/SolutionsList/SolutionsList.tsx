"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "./SolutionsList.scss";
import {
  SOLUTIONS_LIST_DATA,
  HERO_INDEX_ITEMS,
} from "@/data/solutions/solutionsData";

const SECTION_IDS = HERO_INDEX_ITEMS.map((item) => item.href.substring(1));

export function SolutionsList() {
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollActiveTabIntoView = useCallback((sectionId: string) => {
    if (!navContainerRef.current) return;
    const activeCard = navContainerRef.current.querySelector(
      `[data-nav-id="${sectionId}"]`
    ) as HTMLElement;
    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.05,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (SECTION_IDS.includes(id)) {
            setActiveSection(id);
            scrollActiveTabIntoView(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollBottom = () => {
      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 30;
      if (atBottom && window.scrollY > 0) {
        const lastId = SECTION_IDS[SECTION_IDS.length - 1];
        setActiveSection(lastId);
        scrollActiveTabIntoView(lastId);
      }
    };

    window.addEventListener("scroll", handleScrollBottom, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollBottom);
    };
  }, [scrollActiveTabIntoView]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.currentTarget.blur();

    const id = href.substring(1);
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);
    scrollActiveTabIntoView(id);

    const targetY =
      element.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div className="solutions-list-wrapper">
      {/* Sticky Category Index Navigation Bar */}
      <section className="solutions-sticky-bar-section">
        <div className="solutions-sticky-container">
          <div
            className="solutions-hero-index solutions-sticky-index"
            ref={navContainerRef}
          >
            {HERO_INDEX_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.num}
                  href={item.href}
                  data-nav-id={sectionId}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`index-card ${isActive ? "active" : ""}`}
                  style={
                    { "--item-accent-color": item.color } as React.CSSProperties
                  }
                >
                  <div className="index-content">
                    <div className="index-title-row">
                      <span
                        className="index-dot"
                        style={{ backgroundColor: item.color }}
                        aria-hidden="true"
                      />
                      <span className="index-title">{item.title}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Item Sections */}
      {SOLUTIONS_LIST_DATA.map((item, idx) => {
        const isWhite = idx % 2 === 1;
        return (
          <section
            key={item.id}
            id={item.id}
            className={`solution-item-section ${isWhite ? "theme-white" : "theme-paper"}`}
          >
            <div className={`solution-item-container ${item.reverse ? "reverse" : ""}`}>
              {/* Text Column */}
              <div className="solution-text-col">
                <div data-reveal="" className="solution-eyebrow-row">
                  <span className="num-badge">{item.num}</span>
                  <span className="num-divider" aria-hidden="true" />
                  <span className="eyebrow-label">{item.category}</span>
                </div>
                <h2 data-reveal="" className="solution-title">
                  {item.title}
                </h2>
                <p data-reveal="" className="solution-desc">
                  {item.description}
                </p>

                <div data-reveal="" className="solution-checklist">
                  {item.checklist.map((point, pIdx) => (
                    <div key={pIdx} className="check-item">
                      <span
                        className="dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div data-reveal="" className="solution-action-row">
                  <Link href={item.ctaLink} className="solution-link-btn">
                    {item.ctaText} <span className="arrow">→</span>
                  </Link>
                </div>
              </div>

              {/* Visual Column with Strivedge Website Image */}
              <div data-reveal="" className="solution-visual-col">
                <div className={`mockup-card ${item.tintClass}`}>
                  <div className="mockup-content">
                    <div className="image-frame">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={640}
                        height={420}
                        className="strivedge-portfolio-img"
                        priority={item.num === "01"}
                      />
                    </div>
                  </div>
                  <div className="mockup-footer">
                    <span className="status-label">{item.statusLabel}</span>
                    <span className="products-tag">{item.productsTag}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
