"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { Container } from "../ui/Container";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "joeyofficial707@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section id="contact" className="py-28 sm:py-44 bg-[#050505] relative overflow-hidden border-b border-white/5">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.015),transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 text-left flex flex-col items-start gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-4 max-w-2xl"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-white/50 uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Let's build something exceptional together
          </h2>
        </motion.div>

        {/* Large Typographic Email with Interactive Clipboard action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full group/email relative py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-6 cursor-pointer mt-8"
          onClick={handleCopy}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-wider text-white/40 uppercase">
              Email Address
            </span>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white transition-all duration-300 break-all select-all">
              {emailAddress}
            </span>
          </div>

          {/* Copy Helper State Icons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 group-hover/email:bg-white group-hover/email:text-black transition-all duration-300 transform group-hover/email:scale-105">
              {copied ? (
                <Check className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Copy className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </div>
            
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="hidden sm:inline text-xs font-semibold tracking-wider text-green-400 uppercase"
                >
                  Copied to clipboard
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Alternative mailto click action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-6 items-center mt-4"
        >
          <a
            href={`mailto:${emailAddress}`}
            className="text-sm font-semibold text-text-secondary hover:text-white flex items-center gap-2 group transition-colors"
          >
            Or open default email client
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
