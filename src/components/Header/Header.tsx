"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "Company", href: "#company" },
  { label: "Demo Center", href: "#demo-center" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="nav">
        <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
          <Image
            src="/brand/logo-dark.png"
            alt="Infinium Softech"
            width={168}
            height={38}
            priority
          />
        </Link>

        <ul className="links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="actions">
          <Link href="#demo" className="cta">
            Book a demo <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-bars">
              <span />
              <span />
            </span>
            Menu
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-nav" className="mobile-nav">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#demo" className="cta" onClick={() => setMenuOpen(false)}>
            Book a demo <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </header>
  );
}
