"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects as fallbackProjects } from "../../constants/projects";
import { usePublicContent } from "../../hooks/usePublicContent";
import { toProject } from "../../lib/content/project";
import { ContentRecord } from "../../lib/firebase/content";
import { Project } from "../../types";
import { Navbar } from "../navbar/Navbar";
import { ProjectImagePlaceholder } from "./ProjectImagePlaceholder";
import { optimizedCloudinaryUrl } from "../../lib/cloudinary/imageUrl";

export function ProjectDetailClient({ id }: { id: string }) {
  const { records, loading } = usePublicContent<ContentRecord>(
    "projects",
    fallbackProjects,
  );
  const portfolioProjects = records
    .map(toProject)
    .filter((project): project is Project => project !== null);
  const matchedRecord = records.find(
    (item) =>
      item.id === id ||
      item.slug === id ||
      (Array.isArray(item.legacyIds) && item.legacyIds.includes(id)),
  );
  const project = matchedRecord ? toProject(matchedRecord) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-200/65">
            Project case study
          </p>
          <h1 className="mt-4 text-3xl font-medium">
            {loading ? "Loading project..." : "Project not found"}
          </h1>
          {!loading && (
            <p className="mt-3 text-sm text-white/50">
              This project may be unpublished or no longer available.
            </p>
          )}
          <Link
            href="/projects"
            className="mt-7 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/70 hover:border-white/35 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
        </main>
      </div>
    );
  }

  const index = portfolioProjects.findIndex((item) => item.id === project.id);
  const previous = portfolioProjects[(index - 1 + portfolioProjects.length) % portfolioProjects.length];
  const next = portfolioProjects[(index + 1) % portfolioProjects.length];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main>
        <section className="border-b border-white/[0.06] pt-32 sm:pt-40">
          <div className="mx-auto max-w-7xl px-6 pb-10 sm:px-8 sm:pb-14">
            <Link
              href="/projects"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 hover:border-white/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
            <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-blue-200/70">
                  Case study / {project.subHeader}
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">
                  {project.summary}
                </p>
              </div>
              <dl className="grid gap-4 border-l border-white/10 pl-5 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-white/40">Role</dt>
                  <dd className="mt-1 text-white/80">{project.role.join(", ")}</dd>
                </div>
                {project.company && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-white/40">Company</dt>
                    <dd className="mt-1 text-white/80">{project.company}</dd>
                  </div>
                )}
                {project.period && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-white/40">Period</dt>
                    <dd className="mt-1 text-white/80">{project.period}</dd>
                  </div>
                )}
              </dl>
            </div>
            {project.technologies.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li key={technology} className="rounded-md border border-blue-200/15 bg-blue-200/[0.04] px-3 py-1.5 font-mono text-xs text-blue-100/70">
                    {technology}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 sm:pb-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12] sm:rounded-3xl">
              {project.image ? (
                <Image src={optimizedCloudinaryUrl(project.image, 1600)} alt={`${project.title} project cover`} fill priority sizes="100vw" className="object-cover" />
              ) : (
                <ProjectImagePlaceholder title={project.title} theme={project.theme} label="Case study cover" />
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 sm:px-8 sm:py-24">
          <CaseStudySection label="Overview" heading="A closer look at the product.">
            <p>{project.caseStudy.overview}</p>
          </CaseStudySection>
          <CaseStudySection label="Challenge" heading="The problem space.">
            <p>{project.caseStudy.challenge}</p>
          </CaseStudySection>
          <CaseStudySection label="Contribution" heading="My role in the work.">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.caseStudy.contributions.map((item) => (
                <li key={item} className="border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-6 text-white/70">{item}</li>
              ))}
            </ul>
          </CaseStudySection>
          {project.caseStudy.process && project.caseStudy.process.length > 0 && (
            <section className="border-t border-white/[0.08] pt-10">
              <Eyebrow>Process</Eyebrow>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.caseStudy.process.map((step, stepIndex) => (
                  <article key={`${step.title}-${stepIndex}`} className="border border-white/[0.08] bg-[#090a0d] p-6 sm:p-8">
                    <p className="font-mono text-xs text-blue-200/60">STEP {String(stepIndex + 1).padStart(2, "0")}</p>
                    <h3 className="mt-5 text-xl font-medium">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{step.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {project.caseStudy.features && project.caseStudy.features.length > 0 && (
            <section className="border-t border-white/[0.08] pt-10">
              <Eyebrow>Key experiences</Eyebrow>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.caseStudy.features.map((feature, featureIndex) => (
                  <article key={`${feature.title}-${featureIndex}`} className="border border-white/[0.08] bg-[#090a0d] p-6 sm:p-8">
                    <p className="font-mono text-xs text-blue-200/55">MODULE / {String(featureIndex + 1).padStart(2, "0")}</p>
                    <h3 className="mt-5 text-xl font-medium">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
          {project.gallery && project.gallery.length > 0 && (
            <section className="border-t border-white/[0.08] pt-10">
              <Eyebrow>Visuals / Gallery</Eyebrow>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.gallery.map((item, itemIndex) => (
                  <figure key={`${item.alt}-${itemIndex}`} className="overflow-hidden border border-white/[0.08] bg-[#090a0d]">
                    <div className="relative aspect-[16/10]">
                      {item.src ? (
                        <Image src={optimizedCloudinaryUrl(item.src, 1200)} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                      ) : (
                        <ProjectImagePlaceholder title={project.title} theme={project.theme} label={`Gallery / ${String(itemIndex + 1).padStart(2, "0")}`} />
                      )}
                    </div>
                    {item.caption && <figcaption className="border-t border-white/[0.06] px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-white/45">{item.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </section>
          )}
          {project.caseStudy.technicalDetails && project.caseStudy.technicalDetails.length > 0 && (
            <CaseStudySection label="Implementation" heading="Tools and technical details.">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.caseStudy.technicalDetails.map((detail) => (
                  <li key={detail} className="border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-6 text-white/70">{detail}</li>
                ))}
              </ul>
            </CaseStudySection>
          )}
          <CaseStudySection label="Reflection" heading="What I took away.">
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.caseStudy.learnings.map((item) => (
                <li key={item} className="border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-6 text-white/70">{item}</li>
              ))}
            </ul>
          </CaseStudySection>
          {portfolioProjects.length > 1 && previous && next && (
            <nav aria-label="Other projects" className="grid gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-2">
              <ProjectNav href={`/projects/${previous.id}`} label="Previous project" title={previous.title} icon={<ArrowLeft className="h-4 w-4" />} />
              <ProjectNav href={`/projects/${next.id}`} label="Next project" title={next.title} icon={<ArrowRight className="h-4 w-4" />} />
            </nav>
          )}
        </div>
      </main>
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-200/65">{children}</p>;
}

function CaseStudySection({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 border-t border-white/[0.08] pt-10 lg:grid-cols-[.65fr_1.35fr]">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2 className="mt-4 max-w-xs text-3xl font-medium tracking-tight">{heading}</h2>
      </div>
      <div className="space-y-4 text-base leading-7 text-white/65">{children}</div>
    </section>
  );
}

function ProjectNav({
  href,
  label,
  title,
  icon,
}: {
  href: string;
  label: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <Link href={href} className="flex min-h-24 items-center justify-between gap-4 border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-white/20">
      <span className="min-w-0">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</span>
        <span className="mt-2 block truncate text-sm text-white/80">{title}</span>
      </span>
      {icon}
    </Link>
  );
}
