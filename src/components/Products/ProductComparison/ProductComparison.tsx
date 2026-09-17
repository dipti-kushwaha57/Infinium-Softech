import React from "react";
import "./ProductComparison.scss";
import { PRODUCT_ITEMS } from "@/data/productsData";

export function ProductComparison() {
  return (
    <section className="product-comparison-section">
      <div className="product-comparison-container">
        {/* Header */}
        <div className="comparison-header">
          <div>
            <div data-reveal="" className="comparison-eyebrow">
              Side by side
            </div>
            <h2 data-reveal="" className="comparison-title">
              What ships in the box
            </h2>
          </div>
          <p data-reveal="" className="comparison-desc">
            Deployment shape, apps and integration surface for each platform.
            Everything listed is included, not an add-on.
          </p>
        </div>

        {/* Scrollable Comparison Table */}
        <div data-reveal="" className="table-responsive-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Industry</th>
                <th>Apps</th>
                <th>Integration</th>
                <th>Typical go-live</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCT_ITEMS.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 1 ? "row-alt" : "row-default"}
                >
                  <td className="product-name-cell">
                    <span className="dot" style={{ backgroundColor: item.tint }} />
                    <span className="name">{item.name}</span>
                  </td>
                  <td>{item.tag}</td>
                  <td>{item.apps}</td>
                  <td>{item.api}</td>
                  <td>{item.golive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
