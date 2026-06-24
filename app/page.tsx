"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Components
import { Navbar } from "../components/navbar/Navbar";
import { Hero } from "../components/hero/Hero";
import { Projects } from "../components/projects/Projects";
import { About } from "../components/about/About";
import { Timeline } from "../components/timeline/Timeline";
import { Testimonials } from "../components/testimonials/Testimonials";
import { Contact } from "../components/contact/Contact";
import { Footer } from "../components/footer/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Mouse Coordinates for Smooth Spring Glow
  const mouseX = useSpring(0, { damping: 50, stiffness: 400 });
  const mouseY = useSpring(0, { damping: 50, stiffness: 400 });

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track Mouse movement for ambient follow glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150); // Offset by half the glow diameter (300px)
      mouseY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Track scroll position to show Scroll to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
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

      {/* Main Portfolio Content */}
      <div className="relative min-h-screen bg-[#050505] overflow-hidden select-none font-sans">
        
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-[0%] z-[60]"
          style={{ scaleX }}
        />

        {/* Global Ambient Glow Follower (Desktop only) */}
        <motion.div
          className="pointer-events-none fixed z-30 w-[300px] h-[300px] rounded-full filter blur-[100px] opacity-10 bg-radial from-white to-transparent hidden md:block"
          style={{ x: mouseX, y: mouseY }}
        />

        {/* Static Ambient background highlights */}
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-white/[0.005] rounded-full filter blur-[150px] pointer-events-none" />
        <div className="absolute top-[60%] right-[-10%] w-[50vw] h-[50vw] bg-white/[0.005] rounded-full filter blur-[150px] pointer-events-none" />

        {/* Global Header Navigation */}
        <Navbar />

        {/* Page Main Content Sections */}
        <main>
          <Hero />
          <Projects />
          <About />
          <Timeline />
          <Testimonials />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Float Scroll-to-Top CTA */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-[#101010]/80 border border-white/10 text-white backdrop-blur-sm cursor-pointer shadow-lg transition-colors hover:bg-[#1a1a1a]"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
