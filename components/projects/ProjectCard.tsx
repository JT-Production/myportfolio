"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../types";
import { Tag } from "../ui/Tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position inside card for glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col h-full rounded-3xl overflow-hidden shadow-2xl  transition-shadow duration-500"
    >
      {/* Dynamic Mouse Glow Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px  opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.04),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b rounded-3xl border-white/[0.04] bg-neutral-900">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={false}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 py-4 px-5 sm:p-">
        {/* <span className="text-[10px] sm:text-xs font-semibold  tracking-widest text-white/50 uppercase mb-2">
          {project.category}
        </span> */}

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
          {project.title}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed font-medium mb-6 flex-1">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] mt-auto">
          <a
            href={"/projects/" + project.id}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-white transition-colors duration-300"
          >
            View Project
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-text-secondary hover:text-white transition-colors"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
