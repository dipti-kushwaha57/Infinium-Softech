"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { ProductItem } from "@/data/productsData";
import "./AppointGemHero.scss";

export function AppointGemHero({ product }: { product: ProductItem }) {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const updateScroll = () => {
      const section = sectionRef.current;
      const intro = introRef.current;
      const interfaceElement = interfaceRef.current;
      if (!section || !intro || !interfaceElement) return;

      if (!desktopQuery.matches) {
        interfaceElement.style.transform = "";
        interfaceElement.style.zIndex = "";
        intro.style.transform = "";
        intro.style.opacity = "";
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - sectionTop) / (viewportHeight * 1.2)),
      );
      const lift = progress * Math.min(150, intro.offsetHeight * 0.55);

      interfaceElement.style.transform = `translate3d(0, ${-lift.toFixed(1)}px, 0) scale(${(1 + progress * 0.025).toFixed(4)})`;
      interfaceElement.style.zIndex = progress > 0 ? "3" : "";
      intro.style.transform = `translate3d(0, ${(-progress * 28).toFixed(1)}px, 0)`;
      intro.style.opacity = String(1 - progress * 0.18);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktopQuery.addEventListener("change", onScroll);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktopQuery.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="appointgem-hero-section" aria-labelledby="appointgem-title">
      <div className="hero-glow-layer" aria-hidden="true">
        <div className="hero-glow-tr" />
        <div className="hero-glow-bl" />
        <div className="hero-glow-center" />
        <div className="hero-orbs">
          <div className="orb-bl" />
          <div className="orb-tr" />
        </div>
      </div>

      <div className="appointgem-hero-container">
        <div data-reveal="" className="appointgem-hero-crumbs">
          <Link href="/products">Products</Link>
          <span>/</span>
          <span className="current">Slota</span>
        </div>

        <div data-reveal="" className="appointgem-hero-identity">
          <span className="appointgem-hero-mark">{product.mark || "SL"}</span>
          <div>
            <strong>Slota</strong>
            <span className="sub">
              <i className="appointgem-hero-pulse-dot" /> Bookings · Live in production
            </span>
          </div>
        </div>

        <div ref={introRef} className="appointgem-hero-intro">
          <h1 data-reveal="" id="appointgem-title" className="appointgem-hero-title">
            Bookings, staff and payments on <br className="mobile-title-break" /> <span className="highlight">one live calendar.</span>
          </h1>

          <div className="appointgem-hero-right">
            <p data-reveal="" className="appointgem-hero-copy">
              Slota is the business booking and management platform for appointment-led teams.
              Multi-location calendars, staff-level availability, payments and reminder journeys run in one system,
              so the front desk, the practitioner and accounts all work from the same record.
            </p>

            <div data-reveal="" className="appointgem-hero-actions">
              <Link href="/contact" className="appointgem-hero-primary">
                Book a walkthrough <span aria-hidden="true">→</span>
              </Link>
              <a href="#interface" className="appointgem-hero-secondary">
                See the interface
              </a>
            </div>
          </div>
        </div>
        <div className="section-breakline">
          <hr />
        </div>
        <div ref={interfaceRef} id="interface" className="appointgem-hero-interface">
          <div className="appointgem-hero-tablet" aria-label="Slota Tablet Companies View">
            <div className="appointgem-hero-tablet-screen">
              <img
                src="/shots/tablet-appointgem.webp"
                alt="Slota Tablet Companies Screen"
                className="appointgem-hero-tablet-img"
              />
            </div>
          </div>

          <div className="appointgem-hero-mobile" aria-label="Slota Mobile Companies View">
            <span className="notch" />
            <div className="appointgem-hero-mobile-screen">
              <img
                src="/shots/mobile-appotingem.webp"
                alt="Slota Mobile Companies Screen"
                className="appointgem-hero-mobile-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}