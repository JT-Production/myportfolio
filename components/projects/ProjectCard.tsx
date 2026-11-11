"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../types";
import { Tag } from "../ui/Tag";
import { ProjectImagePlaceholder } from "./ProjectImagePlaceholder";
import { optimizedCloudinaryUrl } from "../../lib/cloudinary/imageUrl";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#090a0d] shadow-2xl transition-colors duration-500 hover:border-white/20"
    >
      <Link
        href={`/projects/${project.id}`}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
        aria-label={`View ${project.title} case study`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06] bg-neutral-900">
          {project.image ? (
            <Image
              src={optimizedCloudinaryUrl(project.image, 1000)}
              alt={`${project.title} project cover`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <ProjectImagePlaceholder
              title={project.title}
              theme={project.theme}
              label="Case study cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70">
            {project.categories[0]}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {project.role.join(" / ")}
            </p>
            <h3 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="text-sm leading-6 text-text-secondary">
              {project.summary}
            </p>
          </div>

          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((technology) => (
                <Tag key={technology}>{technology}</Tag>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/70">
              View case study
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
