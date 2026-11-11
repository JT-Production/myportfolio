import type { Metadata } from "next";
import { ProjectDetailClient } from "../../../components/projects/ProjectDetailClient";
import { getProjectById, projects } from "../../../constants/projects";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.flatMap((project) =>
    [project.id, ...(project.legacyIds ?? [])].map((id) => ({ id })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project case study",
      description: "Explore a selected project from Joey's portfolio.",
    };
  }

  return {
    title: `${project.title} — ${project.subHeader}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.subHeader}`,
      description: project.summary,
      type: "article",
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <ProjectDetailClient id={id} />;
}
