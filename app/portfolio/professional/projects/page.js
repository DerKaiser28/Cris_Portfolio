// app/projects/page.jsx
import React from "react";


const PROJECTS = [
  {
    title: "POMPOWER Website",
    tagline: "Marketing site + CMS for blogs, gallery, and contact pipeline",
    period: "2025",
    blurb:
      "Built a fast, SEO-friendly site for POMPOWER with a headless CMS powering blogs and gallery uploads. Contact form routes inquiries to email with validation and spam controls.",
    highlights: [
      "Headless CMS for non-technical updates (blogs, gallery).",
      "Contact form → email pipeline with validation and rate limits.",
      "Responsive design with great LCP/CLS on low-end devices.",
    ],
    stack: ["Next.js", "Tailwind", "Vercel", "Sanity/Prismic", "Email API"],
    url: "https://pompower.vercel.app/", 
    github: "https://github.com/DerKaiser28/POMPOWER", 
  },
  {
    title: "Portfolio Website",
    tagline: "This site — modern, fast, CMS-ready",
    period: "2025",
    blurb:
      "Personal portfolio designed with a consistent cyan/zinc aesthetic, server-rendered components, and CMS-backed skills/experience. Includes projects, blog, and contact.",
    highlights: [
      "Server components with ISR + tag revalidation.",
      "Sanity-driven content for skills & experience.",
      "Accessible UI, keyboard-friendly and semantic.",
    ],
    stack: ["Next.js", "React", "Tailwind", "Vercel", "Sanity"],
    url: "", 
    github: "https://github.com/DerKaiser28/Cris_Portfolio", 
  },
  {
    title: "C-Bus Custom API Interface",
    tagline: "RS232 bridge so a Raspberry Pi can control legacy Wiser2 C-Bus",
    period: "2024",
    blurb:
      "Implemented a serial protocol bridge that exposes REST endpoints from the Pi so other devices on the LAN can call to interact with a Wiser2 C-BUS controller — enabling scenes, schedules, and diagnostics on modern stacks.",
    highlights: [
      "Serial (RS232) framing, parsing, and retries for noisy links.",
      "REST API surface: on/off, dimming, scenes, status polling.",
      "Service runs as a daemon with logs + watchdog restarts.",
    ],
    stack: ["Python", "Raspberry Pi", "RS232", "Systemd"],
    github: "https://github.com/DerKaiser28/CBUS_HOME_API", 
  },
];

/** ---------- Components ---------- */
function Badge({ children }) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[11px]">
      {children}
    </span>
  );
}

function ActionButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border border-cyan-400/30 bg-zinc-950/60 px-3 py-1.5 text-xs text-cyan-300 hover:text-cyan-100 hover:border-cyan-400/60 hover:bg-zinc-900/80 transition-colors"
    >
      {label}
    </a>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 animate-pulse"
            aria-hidden
          />
          <div>
            {/* Title first, tagline below (mirrors Experience org/role flip) */}
            <h2 className="text-xl font-semibold text-white tracking-tight">
              {p.title}
            </h2>
            {p.tagline && (
              <p className="text-sm text-cyan-300 font-medium">{p.tagline}</p>
            )}
          </div>
        </div>
        <span className="text-xs text-zinc-400 whitespace-nowrap">{p.period}</span>
      </div>

      {p.blurb && <p className="mt-3 text-sm text-zinc-300">{p.blurb}</p>}

      {p.highlights?.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {p.stack?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      )}

      {(p.url || p.github) && (
        <div className="mt-6 flex gap-3">
          {p.url && <ActionButton href={p.url} label="Visit Site" />}
          {p.github && <ActionButton href={p.github} label="View Code" />}
        </div>
      )}
    </article>
  );
}

/** ---------- Page ---------- */
export const metadata = {
  title: "Projects | Cris Grace",
  description:
    "Selected projects across web, embedded, and integrations — same cyan/zinc visual system.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Background (same vibe as Experience) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#061018] to-black" />
      <div className="pointer-events-none fixed -z-10 inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(56,189,248,0.10),transparent)]" />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Projects
          </h1>
          <p className="mt-3 text-zinc-400 text-lg">
            A few builds I’m proud of — shipped, maintained, and evolving.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={`${p.title}-${p.period}`} p={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500">
            If you’d like to see source code or implementation details,{" "}
            <span className="text-cyan-400">contact me directly</span>.
          </p>
        </div>
      </section>
    </div>
  );
}
