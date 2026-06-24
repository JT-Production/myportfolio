"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { experiences } from "../../constants/experience";

export function Timeline() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-24 sm:py-36 bg-[#050505] border-b border-white/5 relative"
    >
      <Container>
        <SectionHeading
          title="Work Experience"
          description="A chronological timeline of my professional journey in the design & engineering industry."
        />

        <div className="relative max-w-3xl ml-0 sm:ml-4">
          {/* Vertical progress line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

          {/* Timeline Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-12 sm:gap-16"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative pl-10 sm:pl-12 text-left"
              >
                {/* Dot */}
                <span className="absolute left-0 top-[6px] flex items-center justify-center">
                  {exp.current ? (
                    <span className="relative flex h-[15px] w-[15px]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-[15px] w-[15px] bg-green-500 border-2 border-[#050505]"></span>
                    </span>
                  ) : (
                    <span className="h-[15px] w-[15px] rounded-full border border-white/30 bg-[#050505] transition-colors hover:border-white duration-300" />
                  )}
                </span>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      {exp.role}
                    </h3>
                    <span className="text-xs sm:text-sm text-text-secondary font-medium">
                      at{" "}
                      <span className="text-white"> &nbsp; {exp.company}</span>
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-semibold tracking-wider text-white/50 uppercase mt-0.5">
                    {exp.year}
                  </span>

                  <p className="text-sm text-text-secondary leading-relaxed font-medium mt-2 max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
