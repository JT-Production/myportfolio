import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center rounded-full bg-[#141414] border border-white/5 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-text-secondary select-none",
          className
        )
      )}
    >
      {children}
    </span>
  );
}
