"use client";

import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    name: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Expo", "Expo Router", "React Navigation"],
  },
  {
    name: "Backend & data",
    skills: ["Node.js", "Express.js", "MongoDB", "Supabase", "Firebase", "PostgreSQL"],
  },
  {
    name: "State & APIs",
    skills: ["Zustand", "Redux", "Axios", "Fetch API"],
  },
  {
    name: "Product design",
    skills: ["Figma", "Design Systems", "Wireframing", "Prototyping", "Responsive UI"],
  },
  {
    name: "Tools & deployment",
    skills: ["Git", "Vercel", "Hostinger", "Namecheap"],
  },
];

const pixels = Array.from({ length: 112 }, (_, index) => {
  const count = 112;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (count - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = goldenAngle * index;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return {
    x: `${(x * 94).toFixed(1)}px`,
    y: `${(y * 94).toFixed(1)}px`,
    z: `${(z * 94).toFixed(1)}px`,
    opacity: 0.3 + ((z + 1) / 2) * 0.7,
  };
});

export function TechStackOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = orbRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 14}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * -14}deg`);
  }

  function resetPointer(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--pointer-x", "0deg");
    event.currentTarget.style.setProperty("--pointer-y", "0deg");
  }

  return (
    <section
      id="toolkit"
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#080a0f] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-200/65">
              03 / Engineering toolkit
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight sm:text-5xl">
              The tools behind the work.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
              A practical toolkit spanning product design, frontend and mobile
              development, and backend systems.
            </p>

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {skillGroups.map((group, index) => (
                <details
                  key={group.name}
                  open={index === 0}
                  className="group border border-white/[0.08] bg-white/[0.02] open:bg-white/[0.035]"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300">
                    <span>{group.name}</span>
                    <span className="font-mono text-[10px] text-white/35">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </summary>
                  <ul className="flex flex-wrap gap-2 px-4 pb-4">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] text-white/55"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          <div
            ref={orbRef}
            className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#06080d] sm:min-h-[30rem]"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                maskImage:
                  "radial-gradient(ellipse at center, black, transparent 74%)",
              }}
            />
            <div
              className={`skills-orb-shell relative z-10 flex aspect-square w-[17rem] items-center justify-center sm:w-[22rem] ${
                isVisible ? "is-visible" : ""
              }`}
              style={{
                transform:
                  "rotateX(var(--pointer-y, 0deg)) rotateY(var(--pointer-x, 0deg))",
              }}
            >
              <div aria-hidden="true" className="pixel-orb relative h-full w-full">
                {pixels.map((pixel, index) => (
                  <span
                    key={index}
                    className="pixel-orb-block"
                    style={{
                      transform: `translate3d(${pixel.x}, ${pixel.y}, ${pixel.z})`,
                      opacity: pixel.opacity,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              <span>Tooling / 3D field</span>
              <span>Interaction ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
