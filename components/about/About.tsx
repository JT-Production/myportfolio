"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Shipped" },
  { value: "100%", label: "Client Delight" },
];

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
              I am Joey, a senior Frontend and Design Engineer with a passion
              for constructing premium digital ecosystems. I believe code should
              not only function perfectly, but also look and feel beautiful. My
              process bridges high fidelity UI/UX design prototypes with custom
              engineering implementation.
            </p>

            <p className="text-base text-text-secondary leading-relaxed font-medium mb-10">
              Over the past 3+ years, I have worked with boutique creative
              agencies and leading product divisions. I specialize in React,
              TypeScript, Next.js, Framer Motion, and fine-tuning animation
              parameters for high performance.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 py-6 border-y border-white/[0.06]">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-text-secondary font-medium tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button href="#contact" variant="primary" size="md">
                Let's Work Together
              </Button>
              <Button
                href="#"
                variant="outline"
                size="md"
                icon={<Download className="w-4 h-4" />}
              >
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
