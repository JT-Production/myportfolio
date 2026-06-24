"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  size = "md",
  target,
  rel,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full active:scale-95 focus:outline-none focus:ring-1 focus:ring-white/20 select-none cursor-pointer";

  const variants = {
    primary:
      "bg-white text-black hover:bg-neutral-200 shadow-lg shadow-white/5 border border-white",
    secondary:
      "bg-bg-card text-white hover:bg-hover-accent border border-border-premium glassmorphism",
    outline:
      "bg-transparent text-white border border-border-premium hover:border-white hover:bg-white/5",
    ghost: "bg-transparent text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-5 text-base",
  };

  const content = (
    <span className="flex items-center gap-2">
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </span>
  );

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={twMerge(
            clsx(
              "group",
              baseStyles,
              variants[variant],
              sizes[size],
              className,
            ),
          )}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={twMerge(
          clsx("group", baseStyles, variants[variant], sizes[size], className),
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={twMerge(
        clsx("group", baseStyles, variants[variant], sizes[size], className),
      )}
    >
      {content}
    </motion.button>
  );
}
