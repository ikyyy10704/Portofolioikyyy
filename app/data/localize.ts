import type { Language } from "../i18n/LanguageProvider";
import type { CaseStudySection, Project } from "./projects";
import { projectTranslations } from "./translations";

export interface SectionTranslation {
  heading?: string;
  navLabel?: string;
  body?: string;
  bullets?: string[];
  /** Figure captions, matched by position within the section's figure list. */
  captions?: string[];
}

export interface ProjectTranslation {
  title?: string;
  category?: string;
  description?: string;
  longDescription?: string;
  caseStudy?: {
    context?: string;
    problemHeading?: string;
    problem?: string[];
    /** Highlight labels, matched by position. Values stay untranslated. */
    highlightLabels?: string[];
    /** Section overrides keyed by section id, so partial translations still render. */
    sections?: Record<string, SectionTranslation>;
  };
}

/** Falls back to the English original whenever a translated string is missing. */
function pick<T>(translated: T[] | undefined, index: number, original: T): T {
  return translated?.[index] ?? original;
}

function localizeSection(
  section: CaseStudySection,
  translation: SectionTranslation | undefined,
): CaseStudySection {
  if (!translation) {
    return section;
  }
  return {
    ...section,
    heading: translation.heading ?? section.heading,
    navLabel: translation.navLabel ?? section.navLabel,
    body: translation.body ?? section.body,
    bullets: section.bullets?.map((bullet, index) => pick(translation.bullets, index, bullet)),
    figures: section.figures?.map((figure, index) => ({
      ...figure,
      caption: pick(translation.captions, index, figure.caption),
    })),
  };
}

/**
 * Returns the project rendered in the requested language.
 *
 * Translations live in a separate registry keyed by slug so that the English data stays
 * the single source of truth for structure, and an untranslated field simply shows in English.
 */
export function localizeProject(project: Project, language: Language): Project {
  if (language === "en") {
    return project;
  }

  const translation = projectTranslations[project.slug];
  if (!translation) {
    return project;
  }

  const study = project.caseStudy;
  const studyTranslation = translation.caseStudy;

  return {
    ...project,
    title: translation.title ?? project.title,
    category: translation.category ?? project.category,
    description: translation.description ?? project.description,
    longDescription: translation.longDescription ?? project.longDescription,
    caseStudy:
      study && studyTranslation
        ? {
            ...study,
            context: studyTranslation.context ?? study.context,
            problemHeading: studyTranslation.problemHeading ?? study.problemHeading,
            problem: study.problem.map((paragraph, index) =>
              pick(studyTranslation.problem, index, paragraph),
            ),
            highlights: study.highlights.map((metric, index) => ({
              ...metric,
              label: pick(studyTranslation.highlightLabels, index, metric.label),
            })),
            sections: study.sections.map((section) =>
              localizeSection(section, studyTranslation.sections?.[section.id]),
            ),
          }
        : study,
  };
}

export function localizeProjects(projects: Project[], language: Language): Project[] {
  return projects.map((project) => localizeProject(project, language));
}
