"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={twMerge(clsx("flex flex-col gap-3 mb-16", className))}
    >
      <h2 className="text-xs sm:text-4xl font-semibold tracking-[0.2em] text-white uppercase opacity-90">
        {title}
      </h2>
      {description && (
        <p className="text-xl sm:text-lg text-text-secondary font-medium tracking-tight leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
