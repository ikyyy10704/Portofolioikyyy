"use client";

import { useEffect, useState } from "react";

export function ScrollText() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Memperjelas opacity menjadi 100% namun menggunakan warna yang sangat soft (slate-100 / slate-800)
    // agar terlihat jelas sebagai background text yang elegan
    <div className="pointer-events-none absolute left-0 top-[20%] z-0 w-full opacity-100 mix-blend-multiply dark:opacity-20 dark:mix-blend-normal">
      <div
        className="flex whitespace-nowrap text-[10rem] font-black uppercase leading-none tracking-tighter text-slate-300 sm:text-[14rem] dark:text-white"
        style={{
          transform: `translateX(${-scrollY * 0.9}px)`,
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="mr-8">
            HI I&apos;M RIZKI PANGESTU &mdash;
          </span>
        ))}
      </div>
    </div>
  );
}
