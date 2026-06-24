"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "../../components/navbar/Navbar";
import { projects } from "../../constants/projects";
import { Tag } from "../../components/ui/Tag";
import { Footer } from "@/components/footer/Footer";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category.includes(activeCategory));

  // Loading animation percentage increment
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // Wait for fade out
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Loading Intro Animation Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white"
          >
            <div className="flex flex-col gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight"
              >
                joey<span className="text-white/30">.</span>
              </motion.div>

              {/* Load Bar progress */}
              <div className="w-[180px] h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>

              <span className="text-[10px] tracking-[0.2em] font-semibold text-white/40 uppercase">
                {loadPercentage}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />

      <section
        id="project-grid"
        className="relative overflow-hidden border-t border-white/10 py-32 sm:py-30"
      >
        <div className="absolute inset-x-0 bottom-0 h-[260px] bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_45%)] opacity-60 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mb-12 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                Selected work
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Projects designed as premium case studies.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/60">
              Click any card to view the full project narrative with website
              access, GitHub, and gallery visuals.
            </p>
          </div>

          {/* Tabs to filter between Mobile Development, Web Developement and UI UX */}
          <div className="flex flex-wrap gap-2 mb-10">
            <div
              className={`cursor-pointer px-6 py-2 rounded-xl border border-white/5  text-white ${
                activeCategory === "all" ? "bg-white/10" : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </div>
            <div
              className={`cursor-pointer px-6 py-2 rounded-xl border border-white/5  text-white ${
                activeCategory === "Mobile Development" ? "bg-white/10" : ""
              }`}
              onClick={() => setActiveCategory("Mobile Development")}
            >
              Mobile Development
            </div>
            <div
              className={`cursor-pointer px-6 py-2 rounded-xl border border-white/5  text-white ${
                activeCategory === "Web Development" ? "bg-white/10" : ""
              }`}
              onClick={() => setActiveCategory("Web Development")}
            >
              Web Developement
            </div>
            <div
              className={`cursor-pointer px-6 py-2 rounded-xl border border-white/5  text-white ${
                activeCategory === "UI UX" ? "bg-white/10" : ""
              }`}
              onClick={() => setActiveCategory("UI UX")}
            >
              UI UX
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_30px_80px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-white/20"
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View ${project.title} details`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative overflow-hidden border-b border-white/10">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
                      {project.year}
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col gap-5 px-6 py-6 sm:px-7 sm:py-7">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-6 text-white/60">
                      {project.summary.slice(0, 150) + "..."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-white/10">
                    <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
                      View Project
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
