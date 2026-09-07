"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "up" | "left" | "right" | "zoom";

const variantClass: Record<Variant, string> = {
  up: "animate-fade-in-up",
  left: "animate-fade-in-left",
  right: "animate-fade-in-right",
  zoom: "animate-zoom-in",
};

export function FadeIn({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset status sehingga animasi berulang tiap kali di-scroll
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        isVisible ? variantClass[variant] : "opacity-0"
      } ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}
