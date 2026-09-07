"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { ProjectCover } from "./ProjectCover";
import { useLanguage } from "./i18n/LanguageProvider";
import { siteContent } from "./i18n/content";
import { localizeProjects } from "./data/localize";
import type { Project, ProjectGroup } from "./data/projects";

type FilterValue = ProjectGroup | "all";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const { language } = useLanguage();
  const content = siteContent(language);

  const filterOptions: { label: string; value: FilterValue }[] = [
    { label: content.projects.filters.all, value: "all" },
    { label: content.projects.filters.data, value: "data" },
    { label: content.projects.filters.fullstack, value: "fullstack" },
  ];

  const localizedProjects = localizeProjects(projects, language);

  const countFor = (value: FilterValue) =>
    value === "all"
      ? localizedProjects.length
      : localizedProjects.filter((project) => project.group === value).length;

  const visibleProjects =
    activeFilter === "all"
      ? localizedProjects
      : localizedProjects.filter((project) => project.group === activeFilter);

  return (
    <>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
            {content.projects.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
            {content.projects.heading}
          </h2>
        </div>

        <div
          role="tablist"
          aria-label={content.projects.filterLabel}
          className="flex w-fit flex-wrap gap-2 rounded-full border border-slate-300 bg-white p-1.5 dark:border-white/10 dark:bg-[#15141b]"
        >
          {filterOptions.map((option) => {
            const isActive = option.value === activeFilter;
            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.value)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                }`}
              >
                {option.label}
                <span
                  className={`text-xs font-bold ${
                    isActive
                      ? "text-white/70 dark:text-slate-950/60"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {countFor(option.value)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <FadeIn key={`${activeFilter}-${project.slug}`} delay={index * 100}>
            <a
              href={`/project/${project.slug}`}
              className="group relative flex aspect-[4/5] sm:aspect-square md:aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800"
            >
              {/* Cover art bertema: chart untuk project data, stack aplikasi untuk full stack. */}
              <ProjectCover
                group={project.group}
                variant={index}
                uid={project.slug}
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient Hitam di bawah teks */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

              {/* Konten Text */}
              <div className="relative z-10 flex flex-col justify-end p-6 md:p-8">
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    project.group === "data" ? "text-violet-300" : "text-cyan-300"
                  }`}
                >
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
    </>
  );
}
