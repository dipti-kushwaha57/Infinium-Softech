"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./SiteLoader.scss";

export function SiteLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after a short delay or when window is fully loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 second arbitrary loading feel

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`site-loader ${!loading ? "is-hidden" : ""}`}>
      <div className="loader-logo-wrapper">
        <Image
          src="/brand/logo-dark.png"
          alt="Infinium Softech"
          width={180}
          height={60}
          className="loader-logo"
          priority
        />
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
}
