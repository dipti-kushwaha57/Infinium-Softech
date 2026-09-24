import Link from "next/link";
import Image from "next/image";
import "./TechnologyList.scss";
import {
  CATEGORY_HEADERS,
  INDIVIDUAL_TECH_ITEMS,
  TECHNOLOGY_HERO_INDEX_ITEMS,
} from "@/data/technology/technologyData";

export function TechnologyList() {
  const categoryKeys = Object.keys(CATEGORY_HEADERS);

  return (
    <div id="tech-list" className="technology-list-wrapper">
      {/* Sticky Index Navigation Bar */}
      <section className="tech-sticky-bar-section">
        <div className="tech-sticky-container">
          <div className="solutions-hero-index tech-sticky-index">
            {TECHNOLOGY_HERO_INDEX_ITEMS.map((item) => (
              <Link key={item.num} href={item.href} className="index-card">
                <div className="index-content">
                  {/* <span className="index-num">{item.num}</span> */}
                  <div className="index-title-row">
                    <span
                      className="index-dot"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    />
                    <span className="index-title">{item.title}</span>
                  </div>
                </div>
              </Link>
            ))}
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
