export const defaultSkillGroups = [
  {
    name: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Expo", "Expo Router", "React Navigation"],
  },
  {
    name: "Backend & data",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Supabase",
      "Firebase",
      "PostgreSQL",
    ],
  },
  {
    name: "State & APIs",
    skills: ["Zustand", "Redux", "Axios", "Fetch API"],
  },
  {
    name: "Product design",
    skills: [
      "Figma",
      "Design Systems",
      "Wireframing",
      "Prototyping",
      "Responsive UI",
    ],
  },
  {
    name: "Tools & deployment",
    skills: ["Git", "Vercel", "Hostinger", "Namecheap"],
  },
];

export const defaultSkills = defaultSkillGroups.flatMap((group, categoryIndex) =>
  group.skills.map((name, displayOrder) => ({
    name,
    category: group.name,
    description: "",
    isVisible: true,
    isFeatured: false,
    displayOrder: categoryIndex * 100 + displayOrder,
  })),
);
