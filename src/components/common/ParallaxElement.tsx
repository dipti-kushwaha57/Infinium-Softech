"use client";

import React, { ReactNode } from "react";
import { Parallax, useParallax, useParallaxController } from "react-scroll-parallax";

export interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  scale?: [number, number];
  opacity?: [number, number];
  rotate?: [number, number];
  translateY?: [string, string] | [number, number];
  translateX?: [string, string] | [number, number];
  className?: string;
  disabled?: boolean;
}

export function ParallaxElement({
  children,
  speed,
  scale,
  opacity,
  rotate,
  translateY,
  translateX,
  className = "",
  disabled = false,
}: ParallaxElementProps) {
  return (
    <Parallax
      speed={speed}
      scale={scale}
      opacity={opacity}
      rotate={rotate}
      translateY={translateY}
      translateX={translateX}
      className={className}
      disabled={disabled}
    >
      {children}
    </Parallax>
  );
}

export { Parallax, useParallax, useParallaxController };
