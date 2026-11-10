"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../components/navbar/Navbar";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { ProjectImagePlaceholder } from "../../components/projects/ProjectImagePlaceholder";
import { projects } from "../../constants/projects";

const requestedFilters = [
  "Product Design",
  "Web Development",
  "Mobile",
  "FinTech",
  "Web3",
  "AI & SaaS",
  "Backend",
];

const filters = [
  "All",
  ...requestedFilters.filter((filter) =>
    projects.some((project) => project.categories.includes(filter)),
  ),
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const featuredProject = projects[0];
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(activeFilter),
        );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "linear-gradient(to bottom right, black, transparent 70%)",
            }}
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_.95fr]">
            <div className="space-y-7">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-200/70">
                01 / Selected work
              </p>
              <h1 className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl">
                Product thinking, design craft, and engineering.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                A project archive across frontend, mobile, full-stack, backend,
                and product design. Each case study distinguishes confirmed
                work from details that still need source material.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#project-archive"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                >
                  Browse all {projects.length} projects
                  <ArrowDownRight className="h-4 w-4" />
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/75 transition hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                >
                  Get in touch <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                <span>Product design</span>
                <span>Frontend</span>
                <span>Mobile</span>
                <span>Full-stack & backend</span>
              </div>
            </div>

            {featuredProject && (
              <Link
                href={`/projects/${featuredProject.id}`}
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  {featuredProject.image ? (
                    <Image
                      src={featuredProject.image}
                      alt={`${featuredProject.title} project cover`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <ProjectImagePlaceholder
                      title={featuredProject.title}
                      theme={featuredProject.theme}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-100/70">
                      Featured / {featuredProject.categories[0]}
                    </p>
                    <h2 className="mt-3 text-2xl font-medium text-white sm:text-3xl">
                      {featuredProject.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                      {featuredProject.summary}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        <section
          id="project-archive"
          className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24"
        >
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-blue-200/65">
                02 / Project archive
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                Work, by discipline.
              </h2>
            </div>
            <p
              className="font-mono text-xs text-white/45"
              aria-live="polite"
            >
              {filteredProjects.length.toString().padStart(2, "0")} /{" "}
              {projects.length.toString().padStart(2, "0")} projects
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="mb-10 flex gap-2 overflow-x-auto pb-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`min-h-10 shrink-0 rounded-full border px-4 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${
                  activeFilter === filter
                    ? "border-blue-200/60 bg-blue-200/10 text-white"
                    : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
