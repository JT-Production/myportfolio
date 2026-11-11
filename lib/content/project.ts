import { ContentRecord } from "../firebase/content";
import { Project, ProjectCaseStudy, ProjectFeature, ProjectProcessStep } from "../../types";

function strings(value: unknown): string[] | null {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : null;
}

function features(value: unknown): ProjectFeature[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter(
    (item): item is ProjectFeature =>
      !!item &&
      typeof item === "object" &&
      typeof item.title === "string" &&
      typeof item.description === "string",
  );
}

function processSteps(value: unknown): ProjectProcessStep[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter(
    (item): item is ProjectProcessStep =>
      !!item &&
      typeof item === "object" &&
      typeof item.title === "string" &&
      typeof item.description === "string",
  );
}

export function toProject(record: ContentRecord): Project | null {
  const categories = strings(record.categories);
  const roles = strings(record.role);
  const technologies = strings(record.technologies);
  const caseStudy = record.caseStudy;

  if (
    typeof record.title !== "string" ||
    typeof record.summary !== "string" ||
    typeof record.description !== "string" ||
    !categories ||
    !roles ||
    !technologies ||
    !caseStudy ||
    typeof caseStudy !== "object" ||
    typeof caseStudy.overview !== "string" ||
    typeof caseStudy.challenge !== "string" ||
    !Array.isArray(caseStudy.contributions) ||
    !caseStudy.contributions.every((item: unknown) => typeof item === "string") ||
    !Array.isArray(caseStudy.learnings) ||
    !caseStudy.learnings.every((item: unknown) => typeof item === "string")
  ) {
    console.error(`Skipping malformed published project "${record.id}".`);
    return null;
  }

  const normalizedCaseStudy: ProjectCaseStudy = {
    overview: caseStudy.overview,
    challenge: caseStudy.challenge,
    contributions: caseStudy.contributions,
    learnings: caseStudy.learnings,
    process: processSteps(caseStudy.process),
    features: features(caseStudy.features),
    technicalDetails: strings(caseStudy.technicalDetails) ?? undefined,
  };

  const project: Project = {
    id: record.id,
    title: record.title,
    subHeader: typeof record.subHeader === "string" ? record.subHeader : record.title,
    categories,
    role: roles,
    summary: record.summary,
    description: record.description,
    technologies,
    theme: typeof record.theme === "string" ? record.theme : "default",
    caseStudy: normalizedCaseStudy,
    featured: record.featured === true,
    company: typeof record.company === "string" ? record.company : undefined,
    period: typeof record.period === "string" ? record.period : undefined,
    image: typeof record.image === "string" && record.image ? record.image : undefined,
    gallery: Array.isArray(record.gallery)
      ? record.gallery.filter(
          (item): item is { src: string; alt: string; caption?: string } =>
            !!item &&
            typeof item === "object" &&
            typeof item.src === "string" &&
            typeof item.alt === "string",
        )
      : undefined,
  };

  return project;
}
