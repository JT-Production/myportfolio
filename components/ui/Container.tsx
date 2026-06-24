import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={twMerge(
        clsx("mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-16 w-full", className),
      )}
    >
      {children}
    </div>
  );
}
