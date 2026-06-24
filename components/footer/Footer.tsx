"use client";

import React from "react";
import { Container } from "../ui/Container";
import { socials } from "../../constants/socials";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "../ui/Icons";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Dribbble: DribbbleIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 bg-[#050505] border-t border-white/[0.04]">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Copyright */}
        <p className="text-xs sm:text-sm text-text-secondary font-medium tracking-wide">
          &copy; {currentYear} Joey. Built from scratch with Next.js, Tailwind v4, & Framer Motion.
        </p>

        {/* Right Side: Social links */}
        <div className="flex items-center gap-4">
          {socials.map((social) => {
            const IconComponent = iconMap[social.iconName];
            if (!IconComponent) return null;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label={`Visit my ${social.platform}`}
              >
                <IconComponent className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
