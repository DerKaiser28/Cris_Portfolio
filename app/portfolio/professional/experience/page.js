
import React from "react";

/** ---------- Experience data ---------- */
const EXPERIENCES = [
  {
    org: "IEEE Conference Website",
    role: "Front-End Developer",
    period: "2023 - 2025",
    blurb:
      "Conference site with schedules, speaker profiles, submissions, and SEO-friendly pages.",
    highlights: ["Optimized LCP/CLS for fast loads on low-end devices."],
    stack: ["Vue.js", "Tailwind", "Vercel", "SEO", "Analytics"],
    url: "https://www.iccist.com/",
  },
  {
    org: "FLUX Event Website",
    role: "Lead Developer",
    period: "2025",
    blurb:
      "Public site + participant dashboard for registrations, and live updates.",
    highlights: [
      "Custom registration flows to work with payment method tailored to Christ University.",
      "3D models to bring to life the event's theme.",
      "Database to keep track of event registrations.",
    ],
    stack: ["Next.js", "React", "Tailwind", "Firebase", "Cloud Functions", "Vercel"],
    url: "https://fluxbyc.com/",
  },
  {
    org: "FLUX (Event Ops & Strategy)",
    role: "Organizing Committee / Core Planner",
    period: "2025",
    blurb:
      "Core member responsible for planning, coordination, and technical execution of FLUX — Christ University's annual IT fest.",
    highlights: [
      "Co-planned the entire event structure, timelines, and round formats with the committee.",
      "Owned tech operations: infra setup, check-in systems, dashboards, and contingency planning.",
      "Collaborated across teams (design, PR, finance, hospitality) to ensure smooth execution.",
    ],
    stack: ["Event Planning", "Ops", "Leadership", "Strategy", "Cross-Team Coordination"],
  },
  {
    org: "Mentor–Mentee Application — Christ (Deemed to be University)",
    role: "Full-stack Developer",
    period: "2024 - 2025",
    blurb:
      "Unified portal replacing paper workflows for students, mentors, and admins.",
    highlights: [
      "Modules for profiles, academics (grade charts), internships/awards.",
      "Session scheduling + logsheets, per-mentee PDF reports.",
      "Serverless backend with auth and role-based access.",
    ],
    stack: ["Next.js", "Tailwind", "Firebase", "Cloud Functions"],
    url: "https://mentor-app-client-1ov3.vercel.app/",
  },
  {
    org: "Farma — ML, Backend, DevOps",
    role: "Lead Engineer",
    period: "2024 — Present",
    blurb:
      "Cloud-native CV pipeline for plant disease detection with pro/admin portal.",
    highlights: [
      "Hierarchical CV: SAM/YOLO ➜ preprocessing ➜ EfficientNet/ResNet.",
      "Pub/Sub orchestration writing predictions to Firestore with rollbacks.",
      "GraphQL over Postgres + Redis caching; role-based verification & retraining.",
    ],
    stack: [
      "Next.js",
      "Tailwind",
      "Python",
      "PyTorch",
      "Node.js",
      "GCP",
      "Cloud Run/Functions",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Firebase",
    ],
    github: "",
  },
  {
    org: "POMPOWER — UPS Systems",
    role: "Embedded / IoT Integration",
    period: "2025 - Present",
    blurb:
      "Board-level integration for UPS inverter control with telemetry to the cloud.",
    highlights: [
      "Microcontroller firmware for control + safety interlocks.",
      "JSON telemetry uplink; diagnostics and remote actions.",
      "Prototyped PC/Cloud bridge for monitoring & OTA updates.",
    ],
    stack: ["Arduino/MCU", "UART/I²C/SPI", "Node", "AWS/GCP IoT", "Dashboards"],
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

function ExperienceCard({ xp }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 animate-pulse"
            aria-hidden
          />
          <div>
            {/* 🔹 Swapped order: Org first, then Role */}
            <h2 className="text-xl font-semibold text-white tracking-tight">
              {xp.org}
            </h2>
            <p className="text-sm text-cyan-300 font-medium">{xp.role}</p>
          </div>
        </div>
        <span className="text-xs text-zinc-400 whitespace-nowrap">{xp.period}</span>
      </div>

      {xp.blurb && <p className="mt-3 text-sm text-zinc-300">{xp.blurb}</p>}

      {xp.highlights?.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {xp.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {xp.stack?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {xp.stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </div>
      )}

      {(xp.github || xp.url) && (
        <div className="mt-6 flex gap-3">
          {xp.url && <ActionButton href={xp.url} label="Visit Site" />}
          {xp.github && <ActionButton href={xp.github} label="View Code" />}
        </div>
      )}
    </article>
  );
}

/** ---------- Page ---------- */
export const metadata = {
  title: "Experience | Cris Grace",
  description:
    "Roles and real-world impact across events, systems, and engineering projects.",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Gradient background (same as Skills page) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#061018] to-black" />
      <div className="pointer-events-none fixed -z-10 inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(56,189,248,0.10),transparent)]" />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Experience
          </h1>
          <p className="mt-3 text-zinc-400 text-lg">
            Real-world impact where I applied engineering, product, and ops.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIENCES.map((xp) => (
            <ExperienceCard key={`${xp.org}-${xp.role}`} xp={xp} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-500">
  If you’d like to see the full source code or implementation details for any
  project, feel free to <span className="text-cyan-400">contact me directly</span>.
</p>
        </div>
      </section>
    </div>
  );
}
