"use client";

import { ABOUT_PRODUCTS, AboutProduct } from "@/data/aboutData";
import { useAboutCarousel } from "../useAboutCarousel";
import "./AboutPlatforms.scss";

const CLONE_COUNT = 3;

function PlatformCardView({
  product,
  isClone = false,
}: {
  product: AboutProduct;
  isClone?: boolean;
}) {
  return (
    <div
      data-reveal={isClone ? undefined : ""}
      className={`platform-card ${isClone ? "platform-card--clone" : ""}`}
      data-carousel-item
      aria-hidden={isClone ? "true" : undefined}
    >
      <div className="platform-card-top">
        <span
          className="platform-badge"
          style={{ backgroundColor: product.tint }}
        >
          {product.mark}
        </span>
        <span className="platform-number">{product.n}</span>
      </div>

      <div className="platform-card-body">
        <h3 className="platform-name">{product.name}</h3>
        <div className="platform-tag">{product.tag}</div>
      </div>

      <p className="platform-desc">{product.desc}</p>
    </div>
  );
}

export function AboutPlatforms() {
  const { scrollRef, activeIndex, scrollToIndex, handleNext, handlePrev } =
    useAboutCarousel(ABOUT_PRODUCTS.length, {
      breakpoint: Infinity,
      cloneCount: CLONE_COUNT,
      alignMode: "auto",
    });

  const prependedClones = ABOUT_PRODUCTS.slice(-CLONE_COUNT);
  const appendedClones = ABOUT_PRODUCTS.slice(0, CLONE_COUNT);

  return (
    <section id="ecosystem" className="about-platforms-section" aria-label="What We've Built">
      <div className="about-platforms-container">
        <div className="about-platforms-header">
          <div>
            <div data-reveal="" className="about-platforms-eyebrow">
              What we&apos;ve built
            </div>
            <h2 data-reveal="" className="about-platforms-headline">
              Nine platforms,<br />nine industries.
            </h2>
          </div>
          <p data-reveal="" className="about-platforms-intro">
            Each ships as its own platform and inherits the same identity, billing
            and reporting layer as the rest.
          </p>
        </div>

        <div className="about-platforms-wrap">
          <div className="about-platforms-track">
            <div className="about-platforms-grid" ref={scrollRef}>
              {/* Prepended clones for seamless reverse scroll */}
              {prependedClones.map((product, idx) => (
                <PlatformCardView
                  key={`pre-${product.n}-${idx}`}
                  product={product}
                  isClone={true}
                />
              ))}

              {/* Real Products */}
              {ABOUT_PRODUCTS.map((product) => (
                <PlatformCardView key={product.n} product={product} />
              ))}

              {/* Appended clones for seamless forward scroll */}
              {appendedClones.map((product, idx) => (
                <PlatformCardView
                  key={`post-${product.n}-${idx}`}
                  product={product}
                  isClone={true}
                />
              ))}
            </div>

            {/* Left Arrow Button (perfect card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--left"
              aria-label="Previous platform"
              onClick={handlePrev}
            >
              <svg
                width="20"
                height="20"
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

            {/* Right Arrow Button (perfect card middle) */}
            <button
              type="button"
              className="carousel-btn carousel-btn--right"
              aria-label="Next platform"
              onClick={handleNext}
            >
              <svg
                width="20"
                height="20"
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
          <div className="carousel-dots" aria-label="Platforms navigation dots">
            {ABOUT_PRODUCTS.map((product, idx) => (
              <button
                key={product.n}
                type="button"
                className={`carousel-dot ${activeIndex === idx ? "is-active" : ""}`}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to platform ${idx + 1}: ${product.name}`}
              >
                <span
                  className="dot-fill"
                  style={{
                    backgroundColor:
                      activeIndex === idx ? product.tint : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
