import { experiences } from "../../constants/experience";
import { projects } from "../../constants/projects";
import { defaultSkills } from "../../constants/skills";
import { defaultToolkit } from "../../constants/toolkit";
import {
  ContentCollection,
  ContentRecord,
  createContent,
  listAdminContent,
} from "./content";

type ImportableCollection = Extract<
  ContentCollection,
  "projects" | "skills" | "toolkit" | "experience"
>;

export async function importMissingStaticContent(uid: string) {
  const sources: Record<ImportableCollection, ContentRecord[]> = {
    projects: projects.map((project, index) => ({
      ...project,
      status: "published",
      isVisible: true,
      displayOrder: index,
    })),
    skills: defaultSkills.map((skill) => ({
      ...skill,
      id: skill.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    })),
    toolkit: defaultToolkit.map((item, index) => ({
      ...item,
      id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      displayOrder: index,
    })),
    experience: experiences.map((item, index) => ({
      ...item,
      isVisible: true,
      displayOrder: index,
    })),
  };
  const imported: Record<ImportableCollection, number> = {
    projects: 0,
    skills: 0,
    toolkit: 0,
    experience: 0,
  };

  for (const collectionName of Object.keys(sources) as ImportableCollection[]) {
    const existing = await listAdminContent(collectionName);
    const existingIds = new Set(existing.map((record) => record.id));
    for (const record of sources[collectionName]) {
      if (existingIds.has(record.id)) continue;
      const { id, ...values } = record;
      await createContent(collectionName, values, uid, id);
      imported[collectionName] += 1;
    }
  }

  return imported;
}
