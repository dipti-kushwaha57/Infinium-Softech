"use client";

import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxProvider } from "react-scroll-parallax";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationContextType {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
}

const ScrollAnimationContext = createContext<ScrollAnimationContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export const useScrollAnimation = () => useContext(ScrollAnimationContext);
export const useSmoothScroll = () => useContext(ScrollAnimationContext);

export function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;

    // 2. Global Staggered Viewport Reveal Engine (matching Figma Standalone syncReveals)
    document.documentElement.classList.add("reveals-ready");

    const syncReveals = () => {
      const vh = window.innerHeight || 1;
      const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
      
      revealNodes.forEach((node, idx) => {
        if (node.getAttribute("data-revealed") === "1") return;
        const rect = node.getBoundingClientRect();
        
        if (node.getAttribute("data-rev-init") !== "1") {
          node.setAttribute("data-rev-init", "1");
          const stagger = ((idx % 6) * 0.05).toFixed(2);
          node.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s`;
          
          if (rect.top > vh * 0.92) {
            node.style.opacity = "0";
            node.style.transform = "translateY(26px)";
            return;
          }
        }
        
        if (rect.top < vh * 0.92) {
          node.setAttribute("data-revealed", "1");
          node.style.opacity = "1";
          node.style.transform = "none";
        }
      });
    };

    // Initial check & safety checks
    syncReveals();
    const safetyTimer1 = setTimeout(syncReveals, 300);
    const safetyTimer2 = setTimeout(syncReveals, 900);

    // 3. Synchronize Lenis scroll with GSAP ScrollTrigger & Reveal engine
    const handleScroll = () => {
      ScrollTrigger.update();
      syncReveals();
    };
    lenis.on("scroll", handleScroll);
    window.addEventListener("scroll", syncReveals, { passive: true });
    window.addEventListener("resize", syncReveals, { passive: true });

    // 4. Connect GSAP ticker with Lenis rAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 5. Smooth scroll on anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl as HTMLElement, {
            offset: -80,
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(safetyTimer1);
      clearTimeout(safetyTimer2);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("scroll", syncReveals);
      window.removeEventListener("resize", syncReveals);
      gsap.ticker.remove(tickerCallback);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement | number,
      options?: { offset?: number; duration?: number; immediate?: boolean }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    []
  );

  return (
    <ScrollAnimationContext.Provider value={{ getLenis, scrollTo }}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ScrollAnimationContext.Provider>
  );
}
