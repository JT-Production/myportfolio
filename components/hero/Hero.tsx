"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#050505] overflow-hidden pt-28 pb-16">
      {/* Background light gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.015),transparent_50%)] pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Column (Headline + Label + CTA) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col gap-6 sm:gap-8 text-left"
        >
          {/* Label with pulse */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-normal sm:text-sm tracking-wide text-text-secondary">
              Available for new project
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl"
          >
            I'm a Frontend Engineer and Design Engineer,{" "}
            <span className="opacity-50">
              building seamless and interactive user experiences{" "}
            </span>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-row gap-4 pt-4 sm:items-center w-fit"
          >
            <Button
              href="#work"
              variant="primary"
              size="md"
              icon={<ArrowDown className="w-4.5 h-4.5" />}
            >
              View Work
            </Button>
            <Button
              href="#about"
              variant="outline"
              size="md"
              icon={<ArrowUpRight className="w-4.5 h-4.5" />}
              className="px-8 py-4.5"
            >
              Let's Talk
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column (Generous white space, decorative side text + line) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="lg:col-span-4 flex items-stretch gap-6 pl-0  lg:h-[350px] border-0 flex-row lg:flex-row-reverse md:translate-y-34"
        >
          {/* Decorative Vertical Line */}
          {/* <div className="w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden lg:block self-stretch" /> */}

          <div className="flex flex-col justify-end  w-full text-start lg:text-start gap-4 max-w-md lg:max-w-none">
            <span className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              Core Capabilities
            </span>
            <p className="md:text-md sm:text-base text-text-secondary leading-relaxed font-medium">
              Specializing in highly immersive front-end applications,
              interactive 3D WebGL scenes, customizable components, and
              pixel-perfect layouts.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
