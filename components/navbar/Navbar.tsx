"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useScrollActive } from "../../hooks/useScrollActive";
import Image from "next/image";
import logo from "@/public/assets/joey_logo.png";
import { socials } from "@/constants/socials";
import { div } from "framer-motion/client";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position to update header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for nav indicators
  const activeSection = useScrollActive([
    "about",
    "work",
    "experience",
    "contact",
  ]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-4 left-0 right-0  w-[95%] mx-auto z-50 rounded-3xl transition-all  duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "py-  md:w-[70%] bg-[#050505]/75 backdrop-blur-md border-b border-white/5"
            : "py-1"
        }`}
      >
        {/* <Container className="flex items-center justify-between"> */}
        <div
          className={`flex items-center justify-between ${isScrolled ? "px-6" : "md:px-20"}`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Image
              src={logo}
              alt="Logo"
              width={1000}
              height={1000}
              className="w-28 md:w-36 h-20 object-contain"
            />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              if (isMobileMenuOpen) return;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-sm font-medium transition-colors hover:text-white py-2 px-1 text-text-secondary"
                >
                  {item.label}

                  {/* {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )} */}
                </a>
              );
            })}
            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Button
                // href="#contact"
                variant="outline"
                size="sm"
                // icon={<ArrowUpRight className="w-4 h-4" />}
                onClick={toggleMobileMenu}
                className="px-8 py-3"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="flex md:hidden items-center justify-center p-3 px-6 rounded-full border border-white/10 bg-[#101010]/80 text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        {/* </Container> */}
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-[73px] left-0 w-full bg-[#050505] border-b px-6 sm:px-12 lg:px-16 border-white/5 z-40  py-8  flex flex-col  shadow-2xl h-screen"
          >
            <div className="flex flex-col gap-4 md:px-40">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`md:text-6xl text-5xl group font-bol  py-5 border-b flex justify-between  mx-aut border-white/5 transition-colors ${
                      isActive ? "text-white " : "text-text-secondary"
                    }`}
                  >
                    {item.label}
                    {
                      <span
                        className={`inline-flex items-center justify-center w-26 h-16 rounded-full ${isActive ? "bg-white text-black" : "bg-white/5 border border-white/10"}  transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1`}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </span>
                    }
                  </a>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex justify-between text-white w-[95%] md:w-[75%] mx-auto py-10 items-center gap-5  backdrop-blur-md rounded-3xl"
            >
              {socials.map((item, i) => (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="flex items-center gap-2 "
                >
                  <p className="uppercase underline">{item.platform}</p>

                  <ArrowUpRight className="w-6 h-6" />
                  {/* </span> */}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
