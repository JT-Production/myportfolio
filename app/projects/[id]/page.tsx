import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../../components/navbar/Navbar";
import { ProjectImagePlaceholder } from "../../../components/projects/ProjectImagePlaceholder";
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
      title: "Project not found",
      description: "This project could not be found.",
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

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-200/65">
      {number} / {children}
    </p>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const gallery =
    project.gallery?.length
      ? project.gallery
      : [
          {
            alt: `Concept visual for ${project.title}`,
            caption: "Concept visual — screenshot not supplied",
          },
          {
            alt: `Product direction for ${project.title}`,
            caption: "Product direction — screenshot not supplied",
          },
          {
            alt: `Interface details for ${project.title}`,
            caption: "Interface detail — screenshot not supplied",
          },
        ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.06] pt-32 sm:pt-40">
          <div className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 sm:pb-16">
            <Link
              href="/projects"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-white/65 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Link>

            <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55"
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

              <dl className="grid min-w-56 gap-4 border-l border-white/10 pl-5 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Role
                  </dt>
                  <dd className="mt-1 text-white/80">{project.role.join(", ")}</dd>
                </div>
                {project.company && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                      Company
                    </dt>
                    <dd className="mt-1 text-white/80">{project.company}</dd>
                  </div>
                )}
                {project.period && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                      Period
                    </dt>
                    <dd className="mt-1 text-white/80">{project.period}</dd>
                  </div>
                )}
              </dl>
            </div>

            {project.technologies.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-blue-200/15 bg-blue-200/[0.04] px-3 py-1.5 font-mono text-xs text-blue-100/70"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 sm:pb-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d12] sm:rounded-3xl">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} project cover`}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <ProjectImagePlaceholder
                  title={project.title}
                  theme={project.theme}
                  label="Case study cover"
                />
              )}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-20 px-6 py-16 sm:px-8 sm:py-24">
          <section className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <SectionLabel number="01">Overview</SectionLabel>
              <h2 className="mt-4 max-w-xs text-3xl font-medium tracking-tight">
                A closer look at the product.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-white/65">
              {project.caseStudy.overview}
            </p>
          </section>

          <section className="grid gap-8 border-t border-white/[0.08] pt-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <SectionLabel number="02">Challenge</SectionLabel>
              <h2 className="mt-4 max-w-xs text-3xl font-medium tracking-tight">
                The problem space.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-white/65">
              {project.caseStudy.challenge}
            </p>
          </section>

          <section className="grid gap-8 border-t border-white/[0.08] pt-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <SectionLabel number="03">Contribution</SectionLabel>
              <h2 className="mt-4 max-w-xs text-3xl font-medium tracking-tight">
                My role in the work.
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.caseStudy.contributions.map((contribution) => (
                <li
                  key={contribution}
                  className="border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-6 text-white/70"
                >
                  {contribution}
                </li>
              ))}
            </ul>
          </section>

          {project.caseStudy.process && (
            <section className="border-t border-white/[0.08] pt-10">
              <SectionLabel number="04">Process</SectionLabel>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {project.caseStudy.process.map((step, index) => (
                  <article
                    key={step.title}
                    className="border border-white/[0.08] bg-[#090a0d] p-6 sm:p-8"
                  >
                    <p className="font-mono text-xs text-blue-200/60">
                      STEP {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 text-xl font-medium">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {project.caseStudy.features && (
            <section className="border-t border-white/[0.08] pt-10">
              <SectionLabel number="05">Key experiences</SectionLabel>
              <h2 className="mt-4 text-3xl font-medium tracking-tight">
                The product, in parts.
              </h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {project.caseStudy.features.map((feature, index) => (
                  <article
                    key={feature.title}
                    className="relative overflow-hidden border border-white/[0.08] bg-[#090a0d] p-6 sm:p-8"
                  >
                    <span className="font-mono text-xs text-blue-200/55">
                      MODULE / {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-xl font-medium">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="border-t border-white/[0.08] pt-10">
            <SectionLabel number="06">Visuals</SectionLabel>
            <h2 className="mt-4 text-3xl font-medium tracking-tight">
              {project.title} / gallery
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {gallery.map((item, index) => (
                <figure
                  key={`${item.alt}-${index}`}
                  className="overflow-hidden border border-white/[0.08] bg-[#090a0d]"
                >
                  <div className="relative aspect-[16/10]">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <ProjectImagePlaceholder
                        title={project.title}
                        theme={project.theme}
                        label={`Gallery / ${String(index + 1).padStart(2, "0")}`}
                      />
                    )}
                  </div>
                  {item.caption && (
                    <figcaption className="border-t border-white/[0.06] px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-white/45">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>

          {project.caseStudy.technicalDetails &&
            project.caseStudy.technicalDetails.length > 0 && (
              <section className="grid gap-8 border-t border-white/[0.08] pt-10 lg:grid-cols-[.65fr_1.35fr]">
                <div>
                  <SectionLabel number="07">Implementation</SectionLabel>
                  <h2 className="mt-4 max-w-xs text-3xl font-medium tracking-tight">
                    Engineering notes.
                  </h2>
                </div>
                <ul className="space-y-3">
                  {project.caseStudy.technicalDetails.map((detail) => (
                    <li
                      key={detail}
                      className="border-l border-blue-200/40 pl-4 text-sm leading-6 text-white/65"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          <section className="grid gap-8 border-t border-white/[0.08] pt-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <SectionLabel number="08">Reflection</SectionLabel>
              <h2 className="mt-4 max-w-xs text-3xl font-medium tracking-tight">
                What the work reinforced.
              </h2>
            </div>
            <ul className="space-y-4">
              {project.caseStudy.learnings.map((learning) => (
                <li
                  key={learning}
                  className="border-b border-white/[0.08] pb-4 text-base leading-7 text-white/65"
                >
                  {learning}
                </li>
              ))}
            </ul>
          </section>

          <nav
            aria-label="Project navigation"
            className="grid gap-3 border-t border-white/[0.08] pt-8 sm:grid-cols-2"
          >
            <Link
              href={`/projects/${previousProject.id}`}
              className="group flex min-h-24 flex-col justify-center border border-white/[0.08] p-5 transition hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                Previous project
              </span>
              <span className="mt-2 flex items-center justify-between text-sm text-white/80">
                {previousProject.title}
                <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              </span>
            </Link>
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex min-h-24 flex-col justify-center border border-white/[0.08] p-5 transition hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                Next project
              </span>
              <span className="mt-2 flex items-center justify-between text-sm text-white/80">
                {nextProject.title}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </nav>

          <section className="flex flex-col items-start justify-between gap-6 border border-blue-200/15 bg-blue-200/[0.03] p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/70">
                Have a product in mind?
              </p>
              <h2 className="mt-3 text-2xl font-medium">
                Let&apos;s make the next one thoughtful.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center gap-2 border border-white/15 px-4 text-sm text-white/75 transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Project index
              </Link>
              <Link
                href="/#contact"
                className="inline-flex min-h-11 items-center gap-2 bg-white px-4 text-sm font-medium text-black transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
