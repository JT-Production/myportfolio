"use client";

import { Container } from "../ui/Container";
import { socials } from "../../constants/socials";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 bg-[#050505] border-t border-white/[0.04]">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Side: Copyright */}
        <p className="text-xs sm:text-sm text-text-secondary font-medium tracking-wide">
          &copy; {currentYear} Joey. Built with 🤍.
        </p>

        {/* Right Side: Social links */}
        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label={`Visit my ${social.platform}`}
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </Container>
    </footer>
  );
}
