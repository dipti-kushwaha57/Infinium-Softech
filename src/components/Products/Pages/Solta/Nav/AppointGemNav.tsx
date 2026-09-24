"use client";

import React, { useState, useEffect } from "react";
import "./AppointGemNav.scss";

const NAV_ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "Interface", href: "#interface1" },
  { label: "Key challenges", href: "#challenges" },
  { label: "Our solution", href: "#solution" },
  { label: "Workflow", href: "#workflow" },
  { label: "Key results", href: "#results" },
  { label: "Technology", href: "#stack" },
];

export function AppointGemNav() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <nav className="appointgem-subnav-sticky" aria-label="AppointGem Page Navigation">
      <div className="appointgem-subnav-container">
        {NAV_ITEMS.map((item) => {
          const id = item.href.substring(1);
          const isActive = activeSection === id;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`appointgem-subnav-item ${isActive ? "active" : ""}`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
