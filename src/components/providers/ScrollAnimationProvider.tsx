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

    // 2. Synchronize Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // 3. Connect GSAP ticker with Lenis rAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Smooth scroll on anchor link clicks
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
      document.removeEventListener("click", handleAnchorClick);
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
