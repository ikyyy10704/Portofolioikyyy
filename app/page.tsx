"use client";

import { Navbar } from "./Navbar";
import Image from "next/image";
import { Code2, LineChart, Palette } from "lucide-react";
import { ScrollText } from "./ScrollText";
import { FadeIn } from "./FadeIn";
import { projects } from "./data/projects";
import { ProjectsGrid } from "./ProjectsGrid";
import { Footer } from "./Footer";
import { useLanguage } from "./i18n/LanguageProvider";
import { siteContent } from "./i18n/content";

const skillVisuals = [
  {
    icon: Code2,
    accent: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-500 dark:text-cyan-300",
    items: ["PHP", "Laravel", "CodeIgniter", "Next.js", "React", "MySQL", "REST API", "Git"],
  },
  {
    icon: LineChart,
    accent: "from-violet-500/20 to-fuchsia-500/10",
    iconColor: "text-violet-500 dark:text-violet-300",
    items: ["Python", "Pandas", "NumPy", "Machine Learning", "Recommendation Systems", "Tableau", "Looker Studio", "SQL"],
  },
  {
    icon: Palette,
    accent: "from-amber-500/20 to-rose-500/10",
    iconColor: "text-amber-500 dark:text-amber-300",
    items: ["Illustrator", "Photoshop", "Premiere Pro", "After Effects", "Content Strategy", "Copywriting"],
  },
];




export default function Home() {
  const { language } = useLanguage();
  const content = siteContent(language);
  const skillGroups = skillVisuals.map((visual, index) => ({
    ...visual,
    ...content.skills.groups[index],
  }));

  return (
    <main className="relative min-h-screen bg-white overflow-hidden text-slate-900 transition-colors duration-300 dark:bg-[#08090d] dark:text-white">

      {/* ─── HEADER ─── */}
      <Navbar />

      {/* ─── HERO ─── */}
      <ScrollText />
      <section id="home" className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pt-40 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">
        <div className="flex flex-col justify-center">
          <FadeIn delay={0}>
            <p className="mb-5 w-fit rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
              {content.hero.badge}
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-7xl dark:text-white">
              {content.hero.title}
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
              {content.hero.intro}
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-200"
              >
                {content.hero.viewProjects}
              </a>
              <a
                href="/Document/CV%20ATS%20Rizi%20Pangestu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 bg-slate-100 px-6 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-cyan-400 hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-cyan-300/60 dark:hover:bg-white/10"
              >
                {content.hero.downloadCv}
              </a>
            </div>
          </FadeIn>
        </div>

        {/* ─── FOTO HERO ─── */}
        <FadeIn delay={400} className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Efek Glow */}
          <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-cyan-400/20 blur-3xl" />

          {/* Frame Foto */}
          <div className="shadow-drop-2-center relative aspect-square overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-[#15141b]/60">
            <Image
              src="/Image/Backroundawl.png"
              alt={content.hero.photoAlt}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Ornamen Terapung: Social Media */}
          <div className="absolute -left-6 bottom-12 flex gap-4 rounded-full border border-slate-200/80 bg-white/80 px-6 py-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
            {/* Instagram */}
            <a href="https://www.instagram.com/rizkypgestu?igsh=MTFtN21leDBibzh4Yg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 transition-colors hover:scale-110 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/rizki-pangestu-a52200318/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 transition-colors hover:scale-110 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@ikyyyl?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-slate-500 transition-colors hover:scale-110 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>

            {/* GitHub */}
            <a href="https://github.com/ikyyy10704" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 transition-colors hover:scale-110 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89 5 5 0 0 0-.15-3.82s-1.18-.38-3.9 1.47a13.38 13.38 0 0 0-7 0c-2.72-1.85-3.9-1.47-3.9-1.47a5 5 0 0 0-.15 3.82A5.5 5.5 0 0 0 2 11.24c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
                <path d="M9 19c-4.3 1.4-4.3-2.5-6-3"></path>
              </svg>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="border-y border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <FadeIn variant="left">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{content.about.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl dark:text-white">
              {content.about.heading}
            </h2>
          </FadeIn>
          <div className="space-y-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            {content.about.paragraphs.map((paragraph, index) => (
              <FadeIn key={index} variant="right" delay={(index + 1) * 100}>
                <p>{paragraph}</p>
              </FadeIn>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {content.about.stats.map((stat, index) => (
                <FadeIn key={stat.label} variant="zoom" delay={index * 80}>
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-300/40">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <FadeIn variant="up" className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{content.skills.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            {content.skills.heading}
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <FadeIn key={group.title} variant="zoom" delay={index * 120}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-cyan-300/40">
                  {/* Aksen gradient yang menyala saat hover */}
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${group.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${group.accent} ${group.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="relative mt-5 text-xl font-bold text-slate-900 dark:text-white">{group.title}</h3>
                  <p className="relative mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{group.subtitle}</p>
                  <div className="relative mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-lg border border-cyan-300/30 bg-cyan-50 px-3 py-1 text-sm text-cyan-700 transition-colors hover:border-cyan-400/60 hover:bg-cyan-100 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="bg-slate-50 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{content.experience.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            {content.experience.heading}
          </h2>
        </div>

        <div className="mt-16 border-l-2 border-slate-200 dark:border-white/10 ml-3 md:ml-6 space-y-12">
          {content.experience.entries.map((item, index) => {
            // Node pertama aktif
            const isActive = index === 0;

            return (
              <FadeIn key={`${item.role}-${item.company}`} delay={index * 150} className="relative pl-8 md:pl-12">
                {/* Timeline Node */}
                <span
                  className={`absolute left-[-9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-slate-50 dark:bg-[#0a0a0a] ${isActive ? "border-slate-900 dark:border-white" : "border-slate-300 dark:border-slate-600"
                    }`}
                >
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />}
                </span>

                {/* Content Header: Role & Date */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {item.company}
                    </p>
                  </div>
                  <div className="mt-2 shrink-0 text-sm font-medium text-slate-400 sm:mt-0 dark:text-slate-500">
                    {item.date}
                  </div>
                </div>

                {/* Description (Bullet Point) */}
                <div className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  <ul className="list-outside list-disc space-y-2 ml-4 marker:text-slate-300 dark:marker:text-slate-600">
                    {Array.isArray(item.description) ? (
                      item.description.map((desc, i) => <li key={i}>{desc}</li>)
                    ) : (
                      <li>{item.description}</li>
                    )}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ─── FOOTER & CONTACT ─── */}
      <Footer />
    </main>
  );
}
