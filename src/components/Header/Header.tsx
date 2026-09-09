"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Header.scss";

import {
  ECOSYSTEM_PRODUCTS,
  MENU_DEFS,
  MENU_KEYS,
  type ProductItem,
  type GenericMenuItem,
  type MenuDef,
} from "@/data/headerData";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [previewProductName, setPreviewProductName] = useState<string>("AppointGem");
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Detect screen size for responsive mode
  useEffect(() => {
    function checkSize() {
      setIsMobile(window.innerWidth < 1240);
    }
    checkSize();
    window.addEventListener("resize", checkSize, { passive: true });
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Smoothly center active chip on mobile
  useEffect(() => {
    if (activeMenu && chipRefs.current[activeMenu]) {
      chipRefs.current[activeMenu]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeMenu]);

  // Close menu on click outside or escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape ") {
        setActiveMenu(null);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openMenu = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(key);
    const menuDef = MENU_DEFS[key];
    if (menuDef) {
      if (menuDef.isProducts && menuDef.productItems && menuDef.productItems.length > 0) {
        setPreviewProductName(menuDef.productItems[0].name);
      } else if (menuDef.items && menuDef.items.length > 0) {
        setPreviewProductName(menuDef.items[0].product);
      }
    }
  };

  const handleDesktopMouseEnter = (key: string) => {
    if (!isMobile) {
      openMenu(key);
    }
  };

  const handleDesktopMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 180);
    }
  };

  const toggleMenuKey = (key: string) => {
    if (activeMenu === key) {
      setActiveMenu(null);
    } else {
      openMenu(key);
    }
  };

  const currentMenuKey = activeMenu || "products";
  const currentMenuDef = activeMenu ? MENU_DEFS[activeMenu] : null;
  const currentPreviewProduct =
    ECOSYSTEM_PRODUCTS.find((p) => p.name === previewProductName) || ECOSYSTEM_PRODUCTS[0];

  return (
    <div
      className="site-header-wrapper"
      ref={headerRef}
      onMouseLeave={handleDesktopMouseLeave}
      onMouseEnter={() => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }}
    >
      <header className="site-header">
        <nav className="nav content-padding" aria-label="Main Navigation">
          <Link
            href="/"
            className="logo"
            onClick={() => setActiveMenu(null)}
          >
            <Image
              src="/brand/logo-dark.png"
              alt="Infinium Softech"
              width={168}
              height={38}
              priority
            />
          </Link>

          {/* Desktop Nav Tabs */}
          <div className="nav-desktop">
            {MENU_KEYS.map((key) => {
              const def = MENU_DEFS[key];
              const isOpen = activeMenu === key;
              return (
                <button
                  key={key}
                  type="button"
                  className={`nav-menu-btn ${isOpen ? "is-active" : ""}`}
                  aria-expanded={isOpen}
                  onMouseEnter={() => handleDesktopMouseEnter(key)}
                  onClick={() => toggleMenuKey(key)}
                >
                  {def.label}
                  <span className={`caret ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                    ▼
                  </span>
                </button>
              );
            })}
          </div>

          {/* Responsive Toggle & Action Button */}
          <div className="actions">
            {/* Mobile/Compact Trigger Button */}
            <div className="nav-compact">
              <button
                type="button"
                className={`compact-toggle-btn ${activeMenu ? "is-active" : ""}`}
                aria-label={activeMenu ? "Close menu" : "Open menu"}
                aria-expanded={!!activeMenu}
                aria-controls="mega-menu-dropdown"
                onClick={() => toggleMenuKey(activeMenu ? activeMenu : "products")}
              >
                <span className="compact-toggle-icon" aria-hidden="true">
                  <span className="bar bar-top" />
                  <span className="bar bar-bottom" />
                </span>
              </button>
            </div>

            <Link
              href="#demo"
              className="cta"
              onClick={() => setActiveMenu(null)}
            >
              Book a demo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Remaining Space Blurred Backdrop Overlay */}
      {currentMenuDef && (
        <div
          className="mega-menu-backdrop"
          aria-hidden="true"
          onClick={() => setActiveMenu(null)}
          onMouseEnter={handleDesktopMouseLeave}
        />
      )}

      {/* Unified Mega Menu Dropdown (Desktop & Mobile) */}
      {currentMenuDef && (
        <div
          id="mega-menu-dropdown"
          className="mega-menu-panel"
          role="region"
          aria-label={`${currentMenuDef.label} menu`}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
        >
          <div className="mega-menu-inner">
            {/* Left Content Column */}
            <div className="mega-left-col">
              {/* Category Eyebrow Header */}
              <div className="mega-eyebrow">
                <span>{currentMenuDef.eyebrow}</span>
                <span className="divider-line" aria-hidden="true" />
              </div>

              {/* Mobile / Tablet Horizontal Category Chip Tabs */}
              <div className="mobile-category-chips-wrapper">
                <div className="mobile-category-chips">
                  {MENU_KEYS.map((key) => {
                    const def = MENU_DEFS[key];
                    const isSelected = currentMenuKey === key;
                    return (
                      <button
                        key={key}
                        ref={(el) => {
                          chipRefs.current[key] = el;
                        }}
                        type="button"
                        className={`category-chip ${isSelected ? "is-selected" : ""}`}
                        onClick={() => openMenu(key)}
                      >
                        {def.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Cards Layout (9 Products) */}
              {currentMenuDef.isProducts && currentMenuDef.productItems && (
                <div className="products-grid">
                  {currentMenuDef.productItems.map((prod) => {
                    const isSelected = previewProductName === prod.name;
                    return (
                      <Link
                        key={prod.name}
                        href="#ecosystem"
                        className={`product-card ${isSelected ? "is-selected" : ""}`}
                        onMouseEnter={() => setPreviewProductName(prod.name)}
                        onClick={() => {
                          setPreviewProductName(prod.name);
                          if (isMobile) setActiveMenu(null);
                        }}
                      >
                        <span
                          className="badge-mark"
                          style={{ backgroundColor: prod.tint }}
                        >
                          {prod.mark}
                        </span>
                        <div className="card-info">
                          <div className="card-header-row">
                            <span className="product-title">{prod.name}</span>
                            <span className="product-tag">{prod.tag}</span>
                          </div>
                          <span className="product-desc">{prod.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Generic Menu Links Layout (Industries, Solutions, Technology, Company, Demo) */}
              {!currentMenuDef.isProducts && currentMenuDef.items && (
                <div className="links-grid">
                  {currentMenuDef.items.map((item) => {
                    const isSelected = previewProductName === item.product;
                    return (
                      <Link
                        key={item.name}
                        href="#showcase"
                        className={`link-card ${isSelected ? "is-selected" : ""}`}
                        onMouseEnter={() => setPreviewProductName(item.product)}
                        onClick={() => {
                          setPreviewProductName(item.product);
                          if (isMobile) setActiveMenu(null);
                        }}
                      >
                        <span
                          className="link-dot"
                          style={{ backgroundColor: item.tint }}
                          aria-hidden="true"
                        />
                        <div className="link-info">
                          <span className="link-title">{item.name}</span>
                          <span className="link-desc">{item.desc}</span>
                        </div>
                        <span className="link-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Bottom bar of Mega Menu */}
              <div className="mega-bottom-bar">
                <span className="bottom-count">9 products across 9 industries</span>
                <Link
                  href="#ecosystem"
                  className="bottom-link"
                  onClick={() => setActiveMenu(null)}
                >
                  Browse the full ecosystem →
                </Link>
              </div>
            </div>

            {/* Right Preview Card */}
            <div className="preview-card">
              <div
                className="preview-image-wrapper"
                style={{ backgroundColor: currentPreviewProduct.wash }}
              >
                <img
                  src={currentPreviewProduct.shot}
                  alt={currentPreviewProduct.name}
                  className="preview-img"
                />
              </div>
              <div className="preview-content">
                <div className="preview-tag">{currentPreviewProduct.tag}</div>
                <div className="preview-title">{currentPreviewProduct.name}</div>
                <div className="preview-desc">{currentPreviewProduct.desc}</div>
                <div className="preview-actions">
                  <Link
                    href="#demo"
                    className="btn-launch"
                    onClick={() => setActiveMenu(null)}
                  >
                    Launch demo <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="#showcase"
                    className="btn-details"
                    onClick={() => setActiveMenu(null)}
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
