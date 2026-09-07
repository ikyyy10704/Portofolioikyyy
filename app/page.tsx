<<<<<<< HEAD
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
=======
import { Navbar } from "./Navbar";
import Image from "next/image";
import { ArrowUpRight, Code2, LineChart, Palette } from "lucide-react";
import { ScrollText } from "./ScrollText";
import { FadeIn } from "./FadeIn";
import { projects } from "./data/projects";
import { Footer } from "./Footer";

const skillGroups = [
  {
    title: "Full Stack Development",
    subtitle: "Production web systems and API integration",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
    icon: Code2,
    accent: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-500 dark:text-cyan-300",
    items: ["PHP", "Laravel", "CodeIgniter", "Next.js", "React", "MySQL", "REST API", "Git"],
  },
  {
<<<<<<< HEAD
=======
    title: "Data Science & Analytics",
    subtitle: "Machine learning, dashboards, and predictive analytics",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
    icon: LineChart,
    accent: "from-violet-500/20 to-fuchsia-500/10",
    iconColor: "text-violet-500 dark:text-violet-300",
    items: ["Python", "Pandas", "NumPy", "Machine Learning", "Recommendation Systems", "Tableau", "Looker Studio", "SQL"],
  },
  {
<<<<<<< HEAD
=======
    title: "Design & Creative",
    subtitle: "Visual communication for products and campaigns",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
    icon: Palette,
    accent: "from-amber-500/20 to-rose-500/10",
    iconColor: "text-amber-500 dark:text-amber-300",
    items: ["Illustrator", "Photoshop", "Premiere Pro", "After Effects", "Content Strategy", "Copywriting"],
  },
];



<<<<<<< HEAD

export default function Home() {
  const { language } = useLanguage();
  const content = siteContent(language);
  const skillGroups = skillVisuals.map((visual, index) => ({
    ...visual,
    ...content.skills.groups[index],
  }));

=======
const experiences = [
  {
    role: "Data Scientist Participant",
    company: "Coding Camp 2026 - Dicoding & DBS Foundation",
    date: "Feb 2026 - Jul 2026",
    description: [
      "Completed an intensive Data Scientist learning path covering Python programming, machine learning, and data visualization.",
      "Built capstone project 'Jivara': a health-tech application for food detection and medication adherence tracking using CV and AI.",
      "Prepared ML datasets and developed a Streamlit dashboard for monitoring food-drug interactions."
    ]
  },
  {
    role: "Full Stack Developer",
    company: "CV. GASNI ADITAMA KONSTRUKSI",
    date: "June 2025 - May 2026",
    description: [
      "Developed and enhanced features for an in-house construction management system to support daily operations.",
      "Maintained system performance and managed structured data input to ensure database accuracy.",
      "Built and integrated new modules using PHP (CI3), MySQL, and REST API based on evolving business needs."
    ]
  },
  {
    role: "Speaker (Crypto Enthusiast)",
    company: "Talk Show FORBISDA HIPMI DIY Blockchain 101",
    date: "Feb 2026",
    description: [
      "Delivered presentations on blockchain fundamentals and cryptocurrency ecosystems.",
      "Educated participants about opportunities and risks in the blockchain industry.",
      "Shared insights on Web3 trends, crypto adoption, and digital assets."
    ]
  },
  {
    role: "Board of Director - Business Pillar",
    company: "JJC Amikom Jogja",
    date: "Feb 2026",
    description: [
      "Contributed to business development strategies and community growth initiatives.",
      "Supported cross-division collaboration to drive the organization's business-oriented programs."
    ]
  },
  {
    role: "Ketua Divisi OKK",
    company: "HIPMI PT Amikom Yogyakarta",
    date: "Jun 2024 - March 2025",
    description: [
      "Led the membership recruitment, onboarding, and cadre development division.",
      "Managed organizational programs to strengthen member engagement and institutional capacity."
    ]
  },
  {
    role: "Data Science Division Member",
    company: "AMCC (Amikom Computer Club)",
    date: "Dec 2023 - Jul 2024",
    description: [
      "Actively contributed to data science discussions, knowledge sharing, and internal workshops.",
      "Collaborated with fellow members on data-related projects and technical problem-solving sessions.",
      "Completed a final project assigned by AMCC facilitators as part of the division's structured learning program."
    ]
  },
  {
    role: "Junior Graphic Designer",
    company: "KBMDG STUDIO",
    date: "Jan 2022 - Jun 2022",
    description: [
      "Led the development of various design projects by collaborating with creative team members.",
      "Conceptualized and delivered 20+ distinct design projects with 100% client satisfaction rate.",
      "Pioneered a new design approach that reduced revision cycles."
    ]
  }
];

const stats = [
  { value: "3.84", label: "GPA / 4.00" },
  { value: "10+", label: "Real Projects" },
  { value: "45%", label: "Engagement Growth" },
  { value: "2", label: "Languages" },
];

export default function Home() {
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
<<<<<<< HEAD
              {content.hero.badge}
=======
              Full Stack Developer + Data Scientist
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-7xl dark:text-white">
<<<<<<< HEAD
              {content.hero.title}
=======
              Building web systems and data products that solve real business problems.
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
<<<<<<< HEAD
              {content.hero.intro}
=======
              I am Rizki Pangestu, an Information Systems student at Universitas Amikom Yogyakarta with hands-on experience in production web applications, machine learning, analytics dashboards, and AI-powered product features.
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-200"
              >
<<<<<<< HEAD
                {content.hero.viewProjects}
=======
                View Projects
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
              </a>
              <a
                href="/Document/CV%20ATS%20Rizi%20Pangestu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 bg-slate-100 px-6 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-cyan-400 hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-cyan-300/60 dark:hover:bg-white/10"
              >
<<<<<<< HEAD
                {content.hero.downloadCv}
=======
                Download CV
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
<<<<<<< HEAD
              alt={content.hero.photoAlt}
=======
              alt="Rizki Pangestu - Full Stack Developer & Data Scientist"
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
<<<<<<< HEAD
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
=======
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">About</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl dark:text-white">
              A hybrid builder for software, analytics, and creative problem solving.
            </h2>
          </FadeIn>
          <div className="space-y-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            <FadeIn variant="right" delay={100}>
              <p>
                My work connects full stack engineering with data science. I have developed production-ready systems for construction operations, laboratory workflows, SaaS laundry management, and trading journals with AI-driven analysis.
              </p>
            </FadeIn>
            <FadeIn variant="right" delay={200}>
              <p>
                On the data side, I work with machine learning, computer vision, predictive analytics, recommendation systems, and dashboarding. I enjoy turning raw information into products that are practical, clear, and ready for users.
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {stats.map((stat, index) => (
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
<<<<<<< HEAD
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{content.skills.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            {content.skills.heading}
=======
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">Skills</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            Technical toolkit from CV and project experience.
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
<<<<<<< HEAD
          <ProjectsGrid projects={projects} />
=======
          
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">Projects</p>
              <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
                My Portfolio.
              </h2>
            </div>
            <a 
              href="#projects" 
              className="group flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-[#15141b] dark:text-white dark:hover:bg-white/10"
            >
              View All Projects 
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <FadeIn key={project.title} delay={index * 100}>
                <a 
                  href={`/project/${project.slug}`} 
                  className="group relative flex aspect-[4/5] sm:aspect-square md:aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800"
                >
                  {/* Background Image / Placeholder */}
                  {/* Jika nanti Anda punya gambar project asli, ganti div ini dengan <Image src={project.image} fill className="object-cover" /> */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-slate-900 transition-transform duration-700 group-hover:scale-105" />
                  
                  {/* Overlay Gradient Hitam di bawah teks */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                  {/* Konten Text */}
                  <div className="relative z-10 flex flex-col justify-end p-6 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icon Panah Pop Up */}
                  <div className="absolute bottom-6 right-6 z-10 flex h-10 w-10 translate-y-4 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
<<<<<<< HEAD
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{content.experience.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            {content.experience.heading}
=======
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">Experience</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            Career, education, and organization highlights.
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          </h2>
        </div>

        <div className="mt-16 border-l-2 border-slate-200 dark:border-white/10 ml-3 md:ml-6 space-y-12">
<<<<<<< HEAD
          {content.experience.entries.map((item, index) => {
=======
          {experiences.map((item, index) => {
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
