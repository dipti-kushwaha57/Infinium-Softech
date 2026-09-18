import Link from "next/link";
import Image from "next/image";
import "./SolutionsList.scss";
import { SOLUTIONS_LIST_DATA } from "@/data/solutions/solutionsData";

export function SolutionsList() {
  return (
    <div className="solutions-list-wrapper">
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
