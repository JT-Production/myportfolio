import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects — Joey",
  description:
    "Case studies across product design, frontend, mobile, full-stack, and backend engineering.",
};

type ProjectsLayoutProps = {
  children: ReactNode;
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <section className="bg-[#050505] text-white">
      {children}
    </section>
  );
}
