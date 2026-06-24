"use client";

import React from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  animateOnScroll?: boolean;
}

export function TestimonialCard({ testimonial, animateOnScroll = true }: TestimonialCardProps) {
  const scrollAnimationProps = animateOnScroll
    ? {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: "easeOut" as const },
      }
    : {};

  return (
    <motion.div
      {...scrollAnimationProps}
      whileHover={{ y: -6 }}
      className="flex flex-col justify-between p-8 bg-[#101010] border border-white/[0.06] rounded-[20px] shadow-xl hover:shadow-[0_15px_30px_rgba(255,255,255,0.01)] transition-all duration-300 h-full select-none"
    >
      <div className="flex flex-col gap-6">
        {/* Quote symbol */}
        <span className="text-4xl font-serif text-white/20 select-none leading-none">
          “
        </span>
        
        <p className="text-base sm:text-lg text-white font-medium leading-relaxed italic">
          {testimonial.quote}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 pt-6 mt-8 border-t border-white/[0.04]">
        <span className="text-sm font-semibold tracking-tight text-white">
          {testimonial.author}
        </span>
        <span className="text-xs text-text-secondary font-medium tracking-wide">
          {testimonial.role} at <span className="text-white">{testimonial.company}</span>
        </span>
      </div>
    </motion.div>
  );
}
