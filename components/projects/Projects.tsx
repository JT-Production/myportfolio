"use client";

import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projects } from "../../constants/projects";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { usePublicContent } from "../../hooks/usePublicContent";
import { Project } from "../../types";
import { ContentRecord } from "../../lib/firebase/content";
import { toProject } from "../../lib/content/project";

export function Projects() {
  const { records } = usePublicContent<ContentRecord>("projects", projects);
  const validProjects = records
    .map(toProject)
    .filter((project): project is Project => project !== null);

  return (
    <section
      id="work"
      className="py-24 sm:py-36 bg-[#050505] border-b border-white/5"
    >
      <Container>
        {/* Section Heading */}
        <SectionHeading
          title="Selected Projects"
          description="A selection of product, mobile, frontend, and full-stack work."
        />

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {validProjects.slice(0, 4).map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <div className="mt-20 flex justify-center">
          <Button
            href="/projects"
            variant="outline"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View All Projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
