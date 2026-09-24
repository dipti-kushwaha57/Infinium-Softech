"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.substring(1));

// Where a section lands after clicking (space for sticky header + sub nav)
const SCROLL_OFFSET = 110;
// A section becomes active when its top passes this line (must be >= SCROLL_OFFSET)
const ACTIVATION_OFFSET = 140;
// How long without scroll events before we treat scrolling as "finished"
const SCROLL_END_DELAY = 150;

export function AppointGemNav() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const isManualScroll = useRef(false);
  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveFromScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollPosition = scrollY + ACTIVATION_OFFSET;

    // At the very bottom of the page -> last item active
    const atBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 4;

    if (atBottom && scrollY > 0) {
      const lastId = SECTION_IDS[SECTION_IDS.length - 1];
      if (document.getElementById(lastId)) {
        setActiveSection(lastId);
        return;
      }
    }

    let current = SECTION_IDS[0];

    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const element = document.getElementById(SECTION_IDS[i]);
      if (!element) continue;

      const sectionTop = element.getBoundingClientRect().top + scrollY;
      if (sectionTop <= scrollPosition) {
        current = SECTION_IDS[i];
        break;
      }
    }

    setActiveSection(current);
  }, []);

  // Lock is released once scrolling has really stopped
  const scheduleUnlock = useCallback((delay = SCROLL_END_DELAY) => {
    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
    unlockTimeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, delay);
  }, []);

  const unlockNow = useCallback(() => {
    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
    isManualScroll.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) {
        // still animating from a click -> keep lock, wait until scroll stops
        scheduleUnlock();
        return;
      }
      updateActiveFromScroll();
    };

    // If user takes control while smooth scroll is running, stop ignoring scroll
    const handleUserInput = () => {
      if (isManualScroll.current) unlockNow();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInput, { passive: true });
    window.addEventListener("touchstart", handleUserInput, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);

    updateActiveFromScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInput);
      window.removeEventListener("touchstart", handleUserInput);
      window.removeEventListener("resize", updateActiveFromScroll);
      if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
    };
  }, [scheduleUnlock, unlockNow, updateActiveFromScroll]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    e.currentTarget.blur(); // remove focus/hover leftovers from clicked link

    const id = href.substring(1);
    const element = document.getElementById(id);
    if (!element) return;

    isManualScroll.current = true;
    setActiveSection(id);

    const y =
      element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });

    // Fallback in case no scroll event fires (already at the target position)
    scheduleUnlock(400);
  };

  return (
    <nav
      className="appointgem-subnav-sticky"
      aria-label="AppointGem Page Navigation"
    >
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
              aria-current={isActive ? "true" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav >
  );
}