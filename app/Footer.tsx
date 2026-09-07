<<<<<<< HEAD
"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { useLanguage } from "./i18n/LanguageProvider";
import { siteContent } from "./i18n/content";

export function Footer() {
  const { language } = useLanguage();
  const content = siteContent(language);
  const quickLinks = [
    { label: content.nav.home, href: "/#home" },
    { label: content.nav.about, href: "/#about" },
    { label: content.nav.skills, href: "/#skills" },
    { label: content.nav.projects, href: "/#projects" },
    { label: content.nav.experience, href: "/#experience" },
  ];

=======
import Link from "next/link";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";

export function Footer() {
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
  return (
    <footer id="contact" className="bg-[#111111] py-16 text-slate-300 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Kiri: Info Personal */}
          <FadeIn variant="left" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Rizki Pangestu</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
<<<<<<< HEAD
                {content.footer.tagline}
=======
                A creator exploring tech and AI. Building digital experiences and sharing the journey.
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
              </p>
            </div>

            <div className="space-y-4 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-slate-500" />
<<<<<<< HEAD
                <span>{content.footer.location}</span>
=======
                <span>Daeraah Istimewa Yogyakarta, Indonesia</span>
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-500" />
                <a href="mailto:riskypangestu057@gmail.com" className="transition-colors hover:text-white">
                  riskypangestu057@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-slate-500" />
                <a href="tel:+6281279393094" className="transition-colors hover:text-white">
                  (+62) 812 7939 3094
                </a>
              </div>
            </div>

            <div className="space-y-4">
<<<<<<< HEAD
              <p className="text-sm font-semibold text-white">{content.footer.followMe}</p>
=======
              <p className="text-sm font-semibold text-white">Follow me</p>
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a href="https://www.instagram.com/rizkypgestu?igsh=MTFtN21leDBibzh4Yg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 transition-colors hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@ikyyyl?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-500 transition-colors hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/rizki-pangestu-a52200318/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 transition-colors hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                {/* GitHub */}
                <a href="https://github.com/ikyyy10704" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 transition-colors hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89 5 5 0 0 0-.15-3.82s-1.18-.38-3.9 1.47a13.38 13.38 0 0 0-7 0c-2.72-1.85-3.9-1.47-3.9-1.47a5 5 0 0 0-.15 3.82A5.5 5.5 0 0 0 2 11.24c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="pt-4">
              <a href="mailto:riskypangestu057@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200">
<<<<<<< HEAD
                {content.footer.workTogether}
=======
                Let&apos;s Work Together
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
                <ArrowRight size={16} />
              </a>
            </div>
          </FadeIn>

          {/* Tengah: Services */}
          <FadeIn variant="up" delay={100}>
<<<<<<< HEAD
            <h3 className="mb-6 text-sm font-bold text-white">{content.footer.servicesTitle}</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              {content.footer.services.map((service) => (
                <li key={service}>
                  <a href="#" className="transition-colors hover:text-white">{service}</a>
                </li>
              ))}
=======
            <h3 className="mb-6 text-sm font-bold text-white">Services</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="transition-colors hover:text-white">Full Stack Development</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Data Science & ML</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Web Analytics</a></li>
              <li><a href="#" className="transition-colors hover:text-white">UI/UX Design</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Company Profile</a></li>
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
            </ul>
          </FadeIn>

          {/* Kanan: Quick Links */}
          <FadeIn variant="right" delay={200}>
<<<<<<< HEAD
            <h3 className="mb-6 text-sm font-bold text-white">{content.footer.quickLinksTitle}</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
=======
            <h3 className="mb-6 text-sm font-bold text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/#home" className="transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/#about" className="transition-colors hover:text-white">About</Link></li>
              <li><Link href="/#skills" className="transition-colors hover:text-white">Skills</Link></li>
              <li><Link href="/#projects" className="transition-colors hover:text-white">Projects</Link></li>
              <li><Link href="/#experience" className="transition-colors hover:text-white">Experience</Link></li>
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
            </ul>
          </FadeIn>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row">
<<<<<<< HEAD
          <p>{content.footer.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">{content.footer.privacy}</a>
            <a href="#" className="transition-colors hover:text-white">{content.footer.terms}</a>
=======
          <p>© 2026 Rizki Pangestu. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          </div>
        </div>
      </div>
    </footer>
  );
}
