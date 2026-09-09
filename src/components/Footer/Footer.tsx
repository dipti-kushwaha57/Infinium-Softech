"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Footer.scss";

const FOOTER_COLUMNS = [
  {
    title: "Products",
    items: ["AppointGem", "WelzoKart", "MapMyPay", "Truck Guru", "Trekvano", "TextGem"],
  },
  {
    title: "Industries",
    items: ["Logistics", "Healthcare", "Commerce", "Education", "Home services", "Communication"],
  },
  {
    title: "Resources",
    items: ["Customer Stories", "Documentation", "Help Center", "Release Notes", "Webinars", "Status"],
  },
  {
    title: "Company",
    items: ["About Us", "Careers", "Partners", "Contact Sales", "Support"],
  },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Security"];

export function Footer() {
  const year = new Date().getFullYear();
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  const toggleColumn = (title: string) => {
    setOpenColumn((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="site-footer">
      <div className="top">
        <div className="brand">
          <Image src="/brand/logo-light.png" alt="Infinium Softech" width={154} height={35} />
          <p>
            Nine proprietary products. One unified platform. Built for operators across logistics,
            healthcare, commerce, education and services.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => {
          const isOpen = openColumn === col.title;
          return (
            <div
              key={col.title}
              className={`column ${isOpen ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="column-header-btn"
                onClick={() => toggleColumn(col.title)}
                aria-expanded={isOpen}
              >
                <span className="column-title">{col.title}</span>
                <span className="toggle-icon" aria-hidden="true">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <ul className="column-list">
                {col.items.map((item) => (
                  <li key={item}>
                    <Link href="#demo">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bottom">
        <div>© {year} Infinium Softech. All rights reserved.</div>
        <div className="legal">
          {LEGAL_LINKS.map((label) => (
            <Link key={label} href="#demo">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
