"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface CarouselOptions {
  cloneCount?: number;
  breakpoint?: number;
  alignMode?: "center" | "start" | "auto";
}

export function useAboutCarousel(
  itemCount: number,
  breakpointOrOptions: number | CarouselOptions = 1024,
  cloneCountParam = 1
) {
  let breakpoint = 1024;
  let cloneCount = 1;
  let alignMode: "center" | "start" | "auto" = "center";

  if (typeof breakpointOrOptions === "object") {
    breakpoint = breakpointOrOptions.breakpoint ?? Infinity;
    cloneCount = breakpointOrOptions.cloneCount ?? 1;
    alignMode = breakpointOrOptions.alignMode ?? "center";
  } else {
    breakpoint = breakpointOrOptions;
    cloneCount = cloneCountParam;
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeRealIndex, setActiveRealIndex] = useState(0);
  const isJumpingRef = useRef(false);

  const getVisibleCards = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return [];
    return Array.from(
      el.querySelectorAll<HTMLElement>("[data-carousel-item]")
    ).filter((card) => {
      return (
        card.offsetParent !== null ||
        window.getComputedStyle(card).display !== "none"
      );
    });
  }, []);

  const getEffectiveAlign = useCallback(() => {
    if (alignMode === "start") return "start";
    if (alignMode === "center") return "center";
    // "auto": center on mobile (<768), start on tablet/desktop (>=768)
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return "start";
    }
    return "center";
  }, [alignMode]);

  const getCardTargetScrollLeft = useCallback(
    (el: HTMLElement, card: HTMLElement) => {
      const align = getEffectiveAlign();
      const cardRect = card.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const cardRelativeLeft = cardRect.left - elRect.left + el.scrollLeft;

      if (align === "start") {
        return cardRelativeLeft;
      }
      return cardRelativeLeft - (el.clientWidth - card.offsetWidth) / 2;
    },
    [getEffectiveAlign]
  );

  const getActiveVisibleIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return cloneCount;
    const cards = getVisibleCards();
    if (cards.length === 0) return cloneCount;

    const align = getEffectiveAlign();
    const compareScrollPoint =
      align === "start" ? el.scrollLeft : el.scrollLeft + el.clientWidth / 2;

    let closestIndex = cloneCount;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const cardRelativeLeft = cardRect.left - elRect.left + el.scrollLeft;
      const comparePoint =
        align === "start"
          ? cardRelativeLeft
          : cardRelativeLeft + card.offsetWidth / 2;
      const distance = Math.abs(compareScrollPoint - comparePoint);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [getVisibleCards, getEffectiveAlign, cloneCount]);

  const scrollToDomIndex = useCallback(
    (targetIndex: number, smooth = true) => {
      const el = scrollRef.current;
      if (!el) return;
      const cards = getVisibleCards();
      if (cards.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
      const targetCard = cards[clampedIndex];
      const targetScrollLeft = getCardTargetScrollLeft(el, targetCard);

      el.scrollTo({
        left: Math.max(
          0,
          Math.min(el.scrollWidth - el.clientWidth, targetScrollLeft)
        ),
        behavior: smooth ? "smooth" : "instant",
      });
    },
    [getVisibleCards, getCardTargetScrollLeft]
  );

  // Initialize position on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (breakpoint < Infinity) {
      const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      if (!mq.matches) return;
    }

    const timer = setTimeout(() => {
      const cards = getVisibleCards();
      if (cards.length === itemCount + cloneCount * 2) {
        scrollToDomIndex(cloneCount, false);
        setActiveRealIndex(0);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [itemCount, breakpoint, cloneCount, getVisibleCards, scrollToDomIndex]);

  // Handle scroll tracking & seamless infinite jump on clones
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let jumpTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const cards = getVisibleCards();
      if (cards.length !== itemCount + cloneCount * 2) return;

      const visibleIdx = getActiveVisibleIndex();

      let realIdx = (visibleIdx - cloneCount) % itemCount;
      if (realIdx < 0) {
        realIdx += itemCount;
      }
      setActiveRealIndex(realIdx);

      // Silent jump on clones after scroll settles
      if (jumpTimeout) clearTimeout(jumpTimeout);
      jumpTimeout = setTimeout(() => {
        if (visibleIdx < cloneCount) {
          isJumpingRef.current = true;
          scrollToDomIndex(visibleIdx + itemCount, false);
          setTimeout(() => {
            isJumpingRef.current = false;
          }, 50);
        } else if (visibleIdx >= cloneCount + itemCount) {
          isJumpingRef.current = true;
          scrollToDomIndex(visibleIdx - itemCount, false);
          setTimeout(() => {
            isJumpingRef.current = false;
          }, 50);
        }
      }, 150);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (jumpTimeout) clearTimeout(jumpTimeout);
    };
  }, [itemCount, cloneCount, getVisibleCards, getActiveVisibleIndex, scrollToDomIndex]);

  const handleNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = getVisibleCards();
    if (cards.length === 0) return;

    const currentVisible = getActiveVisibleIndex();
    const nextVisible = currentVisible + 1;

    if (nextVisible < cards.length) {
      scrollToDomIndex(nextVisible, true);
    } else {
      scrollToDomIndex(cloneCount, true);
    }
  }, [getVisibleCards, getActiveVisibleIndex, scrollToDomIndex, cloneCount]);

  const handlePrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = getVisibleCards();
    if (cards.length === 0) return;

    const currentVisible = getActiveVisibleIndex();
    const prevVisible = currentVisible - 1;

    if (prevVisible >= 0) {
      scrollToDomIndex(prevVisible, true);
    } else {
      scrollToDomIndex(cloneCount + itemCount - 1, true);
    }
  }, [itemCount, cloneCount, getVisibleCards, getActiveVisibleIndex, scrollToDomIndex]);

  const scrollToRealIndex = useCallback(
    (targetRealIndex: number) => {
      scrollToDomIndex(targetRealIndex + cloneCount, true);
    },
    [scrollToDomIndex, cloneCount]
  );

  return {
    scrollRef,
    activeIndex: activeRealIndex,
    scrollToIndex: scrollToRealIndex,
    handleNext,
    handlePrev,
  };
}
