"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "./TechnologyList.scss";
import {
  CATEGORY_HEADERS,
  INDIVIDUAL_TECH_ITEMS,
  TECHNOLOGY_HERO_INDEX_ITEMS,
} from "@/data/technology/technologyData";

const SECTION_IDS = TECHNOLOGY_HERO_INDEX_ITEMS.map((item) =>
  item.href.substring(1)
);

const SCROLL_OFFSET = 125;
const ACTIVATION_OFFSET = 160;

export function TechnologyList() {
  const categoryKeys = Object.keys(CATEGORY_HEADERS);
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

  const updateActiveFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollPosition = scrollY + ACTIVATION_OFFSET;
    const atBottom =
      window.innerHeight + Math.ceil(scrollY) >=
      document.documentElement.scrollHeight - 30;

    if (atBottom && scrollY > 0) {
      const lastId = SECTION_IDS[SECTION_IDS.length - 1];
      if (document.getElementById(lastId)) {
        setActiveSection(lastId);
        scrollActiveTabIntoView(lastId);
        return;
      }
    }

    let current = SECTION_IDS[0];

    for (let i = SECTION_IDS.length - 1; i >= 0; i -= 1) {
      const element = document.getElementById(SECTION_IDS[i]);
      if (!element) continue;

      const sectionTop = element.getBoundingClientRect().top + scrollY;
      if (sectionTop <= scrollPosition) {
        current = SECTION_IDS[i];
        break;
      }
    }

    setActiveSection(current);
    scrollActiveTabIntoView(current);
  }, [scrollActiveTabIntoView]);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    const initialUpdateFrame = window.requestAnimationFrame(updateActiveFromScroll);

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      window.cancelAnimationFrame(initialUpdateFrame);
    };
  }, [updateActiveFromScroll]);

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
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div id="tech-list" className="technology-list-wrapper">
      {/* Sticky Index Navigation Bar */}
      <section className="tech-sticky-bar-section">
        <div className="tech-sticky-container">
          <div
            className="solutions-hero-index tech-sticky-index"
            ref={navContainerRef}
          >
            {TECHNOLOGY_HERO_INDEX_ITEMS.map((item) => {
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

      {/* Category Blocks and All Technology Items */}
      {categoryKeys.map((catKey, cIdx) => {
        const header = CATEGORY_HEADERS[catKey];
        const categoryItems = INDIVIDUAL_TECH_ITEMS.filter(
          (item) => item.category === catKey
        );
        const isWhiteSection = cIdx % 2 === 1;

        return (
          <section
            key={header.id}
            id={header.id}
            className={`technology-category-block ${isWhiteSection ? "theme-white" : "theme-paper"}`}
          >
            {/* Category Header Banner */}
            <div className="category-header-container">
              <div data-reveal="" className="category-header-eyebrow">
                <span className="num-badge">{header.num}</span>
                <span className="num-divider" aria-hidden="true" />
                <span className="eyebrow-label">{header.title}</span>
              </div>

              <h2 data-reveal="" className="category-header-title">
                {header.subtitle}
              </h2>
            </div>

            {/* Individual Technology Items Grid / Rows */}
            <div className="category-items-container">
              {categoryItems.map((item, iIdx) => {
                const isReverse = iIdx % 2 === 1;
                return (
                  <div
                    key={item.id}
                    id={`tech-${item.id}`}
                    data-reveal=""
                    className={`technology-item-row ${isReverse ? "reverse" : ""}`}
                  >
                    {/* Text Column */}
                    <div className="technology-text-col">
                      <div className="tech-badge-pill">
                        <span
                          className="badge-dot"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.categoryName}</span>
                      </div>

                      <h3 className="technology-title">{item.title}</h3>

                      <p className="technology-desc">{item.description}</p>

                      <div className="technology-action-row">
                        <Link
                          href={`/contact?tech=${encodeURIComponent(item.title)}`}
                          className="technology-link-btn"
                        >
                          Hire {item.title} Developer <span className="arrow">→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Visual / Image Column */}
                    <div className="technology-visual-col">
                      <div className="mockup-card">
                        <div className="mockup-content">
                          <div className="image-frame">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={480}
                              height={320}
                              className="strivedge-tech-img"
                              priority={cIdx === 0 && iIdx < 2}
                            />
                          </div>
                        </div>
                        <div className="mockup-footer">
                          <span className="status-label">Enterprise Ready</span>
                          <span className="products-tag">{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}