"use client";

import Image from "next/image";
import { projects } from "../../data/projects";
import { localizeProject } from "../../data/localize";
import { Navbar, NavItem } from "../../Navbar";
import { FadeIn } from "../../FadeIn";
import { ProjectCover } from "../../ProjectCover";
import { useLanguage } from "../../i18n/LanguageProvider";
import { siteContent } from "../../i18n/content";
import { ExternalLink, Code, FileText, CheckCircle2 } from "lucide-react";

export function ProjectArticle({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const content = siteContent(language);

  const projectIndex = projects.findIndex((entry) => entry.slug === slug);
  const project = localizeProject(projects[projectIndex], language);
  const study = project.caseStudy;

  // The hero shows a project figure, so the panel behind it has to match that figure's canvas.
  const coverIsDark = (study?.sections ?? [])
    .flatMap((section) => section.figures ?? [])
    .some((figure) => figure.src === project.coverImage && figure.theme === "dark");

  // In-page navbar that mirrors the case-study sections that opted in with a navLabel.
  const caseStudyNav: NavItem[] = [
    { label: content.nav.problem, id: "problem" },
    ...(study?.sections ?? [])
      .filter((section) => section.navLabel)
      .map((section) => ({ label: section.navLabel as string, id: section.id })),
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#08090d] dark:text-white">
      {study ? (
        <Navbar
          items={caseStudyNav}
          samePage
          cta={{ label: content.nav.backToPortfolio, href: "/#projects" }}
        />
      ) : (
        <Navbar cta={{ label: content.nav.backToPortfolio, href: "/#projects" }} />
      )}

      <article className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            {project.category}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl dark:text-white">
            {project.title}
          </h1>

          {study?.context && (
            <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              {study.context}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Hero: chart kunci bila project punya, selain itu cover art bertema. */}
        {project.coverImage ? (
          <div
            className={`relative aspect-video w-full overflow-hidden rounded-3xl border p-4 sm:p-6 ${
              coverIsDark
                ? "border-slate-800 bg-[#0f1117]"
                : "border-slate-200 bg-white dark:border-white/10"
            }`}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} - ${content.detail.keyVisual}`}
              fill
              priority
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="object-contain p-4 sm:p-6"
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
            <ProjectCover
              group={project.group}
              variant={projectIndex}
              uid={`hero-${project.slug}`}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}

        {study ? (
          <div className="mt-12 space-y-14">
            {/* Highlight metrics */}
            {study.highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {study.highlights.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div className="text-2xl font-black text-cyan-600 sm:text-3xl dark:text-cyan-300">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* The Problem / Background */}
            <FadeIn>
              <section id="problem" className="scroll-mt-28">
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
                  {study.problemHeading ?? content.detail.problemHeading}
                </h2>
                <div className="mt-5 space-y-4">
                  {study.problem.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-lg leading-8 text-slate-600 dark:text-slate-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Detailed sections */}
            {study.sections.map((section) => (
              <FadeIn key={section.id}>
                <section id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
                    {section.heading}
                  </h2>
                  {section.body && (
                    <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                      {section.body}
                    </p>
                  )}
                  {section.bullets && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-lg leading-8 text-slate-600 dark:text-slate-300"
                        >
                          <CheckCircle2
                            size={22}
                            className="mt-1.5 shrink-0 text-cyan-500 dark:text-cyan-400"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.figures && (
                    <div className="mt-8 space-y-6">
                      {section.figures.map((figure) => (
                        <figure
                          key={figure.src}
                          className={`overflow-hidden rounded-2xl border ${
                            figure.theme === "dark"
                              ? "border-slate-800 bg-[#0f1117]"
                              : "border-slate-200 bg-white dark:border-white/10"
                          }`}
                        >
                          {/* Kartunya mengikuti latar chart-nya, supaya figur tetap terbaca di light maupun dark mode. */}
                          <Image
                            src={figure.src}
                            alt={figure.alt}
                            width={figure.width}
                            height={figure.height}
                            sizes="(min-width: 1024px) 56rem, 100vw"
                            className="h-auto w-full"
                          />
                          <figcaption
                            className={`border-t px-5 py-4 text-sm leading-6 ${
                              figure.theme === "dark"
                                ? "border-slate-800 bg-[#15171f] text-slate-400"
                                : "border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                            }`}
                          >
                            {figure.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </section>
              </FadeIn>
            ))}
          </div>
        ) : (
          /* Fallback: simple description for projects without a full case study */
          <div className="mt-12 max-w-none">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
              {content.detail.aboutProject}
            </h2>
            <p className="mt-5 whitespace-pre-line text-lg leading-8 text-slate-600 dark:text-slate-300">
              {project.longDescription || project.description}
            </p>
          </div>
        )}

        {/* Tombol Aksi (Report, Demo & GitHub) */}
        <div className="mt-14 flex flex-wrap gap-4 border-t border-slate-200 pt-8 dark:border-white/10">
          {study?.reportUrl && (
            <a
              href={study.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              <FileText size={18} />
              {content.detail.readReport}
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-transparent px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              <ExternalLink size={18} />
              {content.detail.visitSite}
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-transparent px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              <Code size={18} />
              {content.detail.viewSource}
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
