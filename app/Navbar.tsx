"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./i18n/LanguageToggle";
import { useLanguage } from "./i18n/LanguageProvider";
import { siteContent } from "./i18n/content";

export interface NavItem {
  label: string;
  id: string;
}

export function Navbar({
  items,
  samePage = false,
  cta,
}: {
  /** Nav items to render. Defaults to the homepage sections. */
  items?: NavItem[];
  /** When true, links scroll within the current page (`#id`) instead of returning home (`/#id`). */
  samePage?: boolean;
  /** Right-side call-to-action button. */
  cta?: { label: string; href: string };
} = {}) {
  const { language } = useLanguage();
  const content = siteContent(language);

  const defaultNavLinks: NavItem[] = [
    { label: content.nav.home, id: "home" },
    { label: content.nav.about, id: "about" },
    { label: content.nav.skills, id: "skills" },
    { label: content.nav.projects, id: "projects" },
    { label: content.nav.experience, id: "experience" },
  ];

  const navLinks = items ?? defaultNavLinks;
  const callToAction = cta ?? { label: content.nav.contact, href: "/#contact" };
  const hrefFor = (id: string) => (samePage ? `#${id}` : `/#${id}`);

  const [active, setActive] = useState(navLinks[0]?.id ?? "");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Detect scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via IntersectionObserver ───────────────────────────────
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const obs: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, [navLinks]);

  return (
    <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
      <header
        className={[
          "pointer-events-auto flex items-center justify-between",
          // Desain box: selalu pill melengkung, padding & lebar statis (tidak reflow)
          "rounded-full border backdrop-blur-xl px-4 py-2.5",
          "w-full max-w-[860px] origin-top",
          // Animasi HANYA pakai transform (scale + translateY) → mulus di GPU, tanpa reflow.
          // cubic-bezier dengan nilai >1 memberi efek bounce (overshoot lalu menetap).
          "transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform",

          scrolled
            ? "translate-y-2 scale-100" // Saat scroll: membesar penuh (bounce ke ukuran tetap)
            : "-translate-y-1 scale-90", // Di atas: lebih kecil

          // Warna
          "border-slate-200/80 bg-white/70 shadow-xl",
          "dark:border-white/10 dark:bg-[#15141b]/70",
        ].join(" ")}
      >
        {/* ── Logo ──────────────────────────────────────────────── */}
        <Link
          href="/#home"
          aria-label="Rizki Pangestu home"
          className="flex shrink-0 items-center gap-2 pl-1"
        >
          <span className="hidden whitespace-nowrap text-sm font-bold tracking-wide text-slate-900 sm:block dark:text-white">
            Rizki Pangestu
          </span>
        </Link>

        {/* ── Nav links (Desktop) ────────────────────────────────── */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={hrefFor(id)}
                className={[
                  "whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-300 px-4 py-2",
                  isActive
                    ? "bg-slate-200 text-slate-900 shadow-sm dark:bg-white/15 dark:text-white"
                    : "text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right: toggle + CTA + Mobile Menu Button ────────────── */}
        <div className="flex shrink-0 items-center gap-2 pr-1">
<<<<<<< HEAD
          <LanguageToggle />
          <ThemeToggle />

          <Link
            href={callToAction.href}
            className="hidden sm:inline-block whitespace-nowrap rounded-full bg-slate-900 font-bold text-white transition-all hover:scale-[1.03] hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-5 py-2.5 text-sm"
          >
            {callToAction.label}
=======
          <ThemeToggle />

          <Link
            href={cta.href}
            className="hidden sm:inline-block whitespace-nowrap rounded-full bg-slate-900 font-bold text-white transition-all hover:scale-[1.03] hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 px-5 py-2.5 text-sm"
          >
            {cta.label}
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          </Link>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 md:hidden dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Dropdown ─────────────────────────────────── */}
      <div
        className={[
          "absolute inset-x-4 top-[calc(100%+12px)] overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-[#15141b]/95",
          // Transisi smooth bounce vertikal (spring ease)
          "transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top",
          mobileMenuOpen 
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100 visibility-visible" 
            : "pointer-events-none -translate-y-6 scale-95 opacity-0 invisible",
        ].join(" ")}
      >
        <div className="flex flex-col p-4 space-y-1">
          {navLinks.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={hrefFor(id)}
                onClick={() => setMobileMenuOpen(false)}
                className={[
                  "rounded-2xl px-5 py-3.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
          <div className="pt-3 mt-1 border-t border-slate-200/50 dark:border-white/10 sm:hidden">
            <Link
<<<<<<< HEAD
              href={callToAction.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {callToAction.label}
=======
              href={cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {cta.label}
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
