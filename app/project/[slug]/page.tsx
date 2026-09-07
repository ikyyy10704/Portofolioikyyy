import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
<<<<<<< HEAD
import { ProjectArticle } from "./ProjectArticle";
=======
import { Navbar, NavItem } from "../../Navbar";
import { FadeIn } from "../../FadeIn";
import { ExternalLink, Code, FileText, CheckCircle2 } from "lucide-react";
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
<<<<<<< HEAD

  if (!projects.some((project) => project.slug === slug)) {
    notFound();
  }

  // The article renders on the client because every string in it is language dependent.
  return <ProjectArticle slug={slug} />;
=======
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const study = project.caseStudy;

  // In-page navbar that mirrors the case-study sections.
  const caseStudyNav: NavItem[] = [
    { label: "Problem", id: "problem" },
    { label: "Dataset", id: "dataset" },
    { label: "EDA", id: "eda" },
    { label: "Approach", id: "approach" },
    { label: "Result", id: "results" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#08090d] dark:text-white">
      {study ? (
        <Navbar
          items={caseStudyNav}
          samePage
          cta={{ label: "Back to Portfolio", href: "/#projects" }}
        />
      ) : (
        <Navbar cta={{ label: "Back to Portfolio", href: "/#projects" }} />
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

        {/* Hero Image (Placeholder Gradasi) */}
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 to-slate-900" />
        </div>

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
                  The Problem
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
                </section>
              </FadeIn>
            ))}
          </div>
        ) : (
          /* Fallback: simple description for projects without a full case study */
          <div className="mt-12 max-w-none">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
              About the Project
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
              Read Full Report (PDF)
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
              Visit Live Site
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
              View Source Code
            </a>
          )}
        </div>
      </article>
    </main>
  );
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
}
