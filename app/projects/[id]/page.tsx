"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  GitBranch,
  Globe,
  Layers,
} from "lucide-react";
import { Navbar } from "../../../components/navbar/Navbar";
import { projects } from "../../../constants/projects";
import { Tag } from "../../../components/ui/Tag";
import { Button } from "../../../components/ui/Button";

type ProjectsDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function ProjectDetailPage({ params }: ProjectsDetailPageProps) {
  const resolvedParams = React.use(params);
  const project = projects.find(
    (projectItem) => projectItem.id === resolvedParams.id,
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-xl rounded-[32px] border border-white/10 bg-[#0b0b0b] p-10 shadow-2xl">
          <h1 className="text-3xl font-semibold text-white">
            Project not found
          </h1>
          <p className="mt-4 text-sm text-white/60">
            The project you were looking for does not exist or has been removed.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-40 sm:px-8 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid gap-12 mt-10 xl:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="space-y-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>

            <div className="space-y-4">
              <div className="inline-flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  {project.year}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                {project.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/70">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {project.category.includes("Web Development") && (
                <Button
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Live Website
                </Button>
              )}
              {/* {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  icon={<GitBranch className="w-4 h-4" />}
                >
                  GitHub
                </Button>
              )} */}
              {project.category.includes("UI UX") && (
                <Button
                  // href={project.behanceUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  icon={<Layers className="w-4 h-4" />}
                >
                  Figma
                </Button>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0a] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.25)]"
          >
            <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_32%)] pointer-events-none" />
            <Image
              src={project.image}
              alt={project.title}
              width={1120}
              height={840}
              className="rounded-[28px] object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <section className="mt-16 space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr]">
            <div className="space-y-4 rounded-[32px] border border-white/10 bg-[#0b0b0b] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
              <h2 className="text-3xl font-semibold text-white">
                Case Study Overview
              </h2>
              <p className="text-base leading-8 text-white/70">
                {project.description} This project merges thoughtful product
                structure with premium brand polish and a seamless content
                hierarchy.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-black/60 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-white/50">
                    Design focus
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Minimal UI paired with motion-led storytelling.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/60 p-6">
                  <p className="text-sm uppercase tracking-[0.28em] text-white/50">
                    Engineering
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    Responsive, accessible, and built for modern performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0b0b0b] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Scroll prompt
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                <div className="rounded-full bg-white/10 p-3 text-white">
                  <ChevronDown className="h-5 w-5 animate-bounce" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Scroll for more visuals
                  </p>
                  <p className="text-sm text-white/60">
                    Explore the project gallery and reference screens below.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Pictures
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Additional screens
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <Globe className="h-4 w-4" />
                Available live & gallery view
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {project.imageArr.map((image, index) => (
                <motion.div
                  key={`${project.id}-picture-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="overflow-hidden md:h-fit rounded-[28px] border border-white/10 bg-[#090909] shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={image || project.image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="object-contain  transition-transform duration-700 ease-out hover:scale-105"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
