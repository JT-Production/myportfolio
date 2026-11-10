const themeAccents: Record<string, string> = {
  fintech: "#5b9cff",
  "mobile-banking": "#6f8cff",
  creator: "#b47cff",
  ai: "#55b9d1",
  learning: "#e1b45e",
  "real-estate": "#78b99c",
  memex: "#a48aff",
  leonardo: "#e47e73",
  "girl-pocket": "#e284b4",
  pess: "#77a9d8",
  event: "#72c4a0",
  api: "#8eb2e8",
  north: "#74a4c8",
  casino: "#d0a268",
  marketplace: "#d09b64",
  creative: "#d487a8",
  admin: "#73a3d8",
};

type ProjectImagePlaceholderProps = {
  title: string;
  label?: string;
  theme: string;
};

export function ProjectImagePlaceholder({
  title,
  label = "Project visual",
  theme,
}: ProjectImagePlaceholderProps) {
  const accent = themeAccents[theme] ?? "#8aa5c5";

  return (
    <div
      role="img"
      aria-label={`Concept visual placeholder for ${title}; not a product screenshot`}
      className="relative flex h-full min-h-48 w-full items-end overflow-hidden bg-[#090d14] p-6 sm:p-8"
      style={{
        backgroundImage: `radial-gradient(ellipse at 75% 30%, ${accent}30, transparent 40%), linear-gradient(135deg, #0d1119, #080a0f 70%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.09) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom right, black, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-[12%] top-[15%] h-28 w-28 rotate-12 border border-white/15 sm:h-40 sm:w-40"
        style={{
          boxShadow: `16px 16px 0 -1px #090d14, 17px 17px 0 0 ${accent}70, 32px 32px 0 -1px #090d14, 33px 33px 0 0 ${accent}35`,
        }}
      />
      <div className="relative z-10 max-w-full">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          {label} / screenshot not supplied
        </p>
        <p className="truncate text-xl font-medium tracking-tight text-white sm:text-2xl">
          {title}
        </p>
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-12"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}
