"use client";

import { useEffect, useRef, useState } from "react";
import { defaultSkillGroups } from "../../constants/skills";
import { defaultToolkit } from "../../constants/toolkit";
import { ContentRecord } from "../../lib/firebase/content";
import { usePublicContent } from "../../hooks/usePublicContent";

const pixels = Array.from({ length: 420 }, (_, index) => {
  const count = 420;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (count - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = goldenAngle * index;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return {
    x: `${Number((x * 190).toFixed(1))}px`,
    y: `${Number((y * 190).toFixed(1))}px`,
    z: `${Number((z * 190).toFixed(1))}px`,
    opacity: Number((0.28 + ((z + 1) / 2) * 0.72).toFixed(2)),
  };
});

const fallbackSkills = defaultSkillGroups.flatMap((group) =>
  group.skills.map((name, displayOrder) => ({
    id: name,
    name,
    category: group.name,
    displayOrder,
  })),
);

const fallbackToolkit = defaultToolkit.map((item, index) => ({
  ...item,
  id: item.name,
  displayOrder: index,
}));

export function TechStackOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { records: skills } = usePublicContent<ContentRecord>("skills", fallbackSkills);
  const { records: toolkit } = usePublicContent<ContentRecord>("toolkit", fallbackToolkit);
  const groupedSkills = new Map<string, string[]>();
  for (const item of skills) {
    const category = String(item.category ?? "Other");
    const group = groupedSkills.get(category);
    if (group) group.push(String(item.name ?? ""));
    else groupedSkills.set(category, [String(item.name ?? "")]);
  }
  const skillGroups = [
    ...Array.from(groupedSkills, ([name, groupSkills]) => ({
      name,
      skills: groupSkills,
    })),
    ...(toolkit.length > 0
      ? [
          {
            name: "Toolkit",
            skills: toolkit.map((item) => String(item.name ?? "")),
          },
        ]
      : []),
  ];

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
    event.currentTarget.style.setProperty("--pointer-x", `${x * 12}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * -12}deg`);
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
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-200/65">
            03 / Engineering toolkit
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
            The tools behind the work.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
            A practical toolkit spanning product design, frontend and mobile
            development, and backend systems.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="grid content-center gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {skillGroups.map((group, index) => (
              <article
                key={group.name}
                className="border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-white/85">
                    {group.name}
                  </h3>
                  <span className="font-mono text-[10px] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded border border-white/[0.08] bg-black/10 px-2.5 py-1 font-mono text-[10px] text-white/55"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div
            ref={orbRef}
            className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#06080d] sm:min-h-[36rem]"
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
              className={`skills-orb-shell relative z-10 flex aspect-square w-[min(88%,30rem)] items-center justify-center ${
                isVisible ? "is-visible" : ""
              }`}
              style={{
                transform:
                  "rotateX(var(--pointer-y, 0deg)) rotateY(var(--pointer-x, 0deg))",
              }}
            >
              <span className="skills-orbit-ring skills-orbit-ring-one" />
              <span className="skills-orbit-ring skills-orbit-ring-two" />
              <span className="skills-orbit-ring skills-orbit-ring-three" />
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
              <span
                aria-hidden="true"
                className="absolute z-20 font-mono text-[9px] uppercase tracking-[0.28em] text-blue-100/70"
              >
                Product / Engineering
              </span>
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              <span>Tooling / 3D field</span>
              <span>Hover to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
