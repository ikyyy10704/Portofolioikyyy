import type { ProjectTranslation } from "../localize";
import { bankingTranslations } from "./banking";
import { miningTranslations } from "./mining";
import { otherTranslations } from "./other";

/**
 * Indonesian text for each project, keyed by slug.
 *
 * Anything absent here falls back to the English original, so a project can be
 * translated field by field without breaking the page.
 */
export const projectTranslations: Record<string, ProjectTranslation> = {
  ...bankingTranslations,
  ...miningTranslations,
  ...otherTranslations,
};
