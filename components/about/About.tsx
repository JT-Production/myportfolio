"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

export function About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-36 bg-[#0B0B0B] border-b border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.01),transparent_40%)] pointer-events-none" />

      <Container>
        <SectionHeading
          title="About Me & Experience"
          description="Fusing code and art to create functional digital masterpieces."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          {/* Left Column (Portrait Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative aspect-[4/5] rounded-[20px] overflow-hidden bg-neutral-900 border border-white/10 group shadow-2xl"
          >
            <Image
              src="/assets/my_picture.jpg"
              alt="Joey headshot"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103 grayscale hover:grayscale-0"
              priority={false}
            />
            {/* Ambient inner shadow/gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
          </motion.div>

          {/* Right Column (Bio text + stats + CTA) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
              Designing interfaces that feel like second nature.
            </h3>

            <p className="text-base text-text-secondary leading-relaxed font-medium mb-6">
              I am Joey, a Full-Stack and Mobile Developer who enjoys turning
              product ideas into polished, working digital experiences. I work
              across interface design, web development, and native mobile
              development to bring products from concept to implementation.
            </p>

            <p className="text-base text-text-secondary leading-relaxed font-medium mb-10">
              My work includes React and Next.js web applications, React Native
              mobile apps, and product design for banking, commerce, and
              creative projects. I focus on building clear, responsive
              experiences that meet the needs of the people using them.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href="#contact" variant="primary" size="md">
                Let&apos;s Work Together
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
