"use client";

import { useEffect } from "react";
import { SolutionsHero } from "./SolutionsHero/SolutionsHero";
import { SolutionsList } from "./SolutionsList/SolutionsList";
import { SolutionsCta } from "./SolutionsCta/SolutionsCta";

export function Solutions() {
  useEffect(() => {
    // IntersectionObserver for scroll-reveal animations
    const els = document.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translate3d(0,20px,0)";
      htmlEl.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 6) * 60}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 6) * 60}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const htmlEl = entry.target as HTMLElement;
            htmlEl.style.opacity = "1";
            htmlEl.style.transform = "translate3d(0,0,0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="solutions-page">
      <SolutionsHero />
      <SolutionsList />
      <SolutionsCta />
    </div>
  );
}
