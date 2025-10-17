// app/components/SkillsPanelSSR.jsx
import {
  FaJava,
  FaPython,
  FaJs,
  FaDocker,
  FaAws,
  FaNodeJs,
  FaVuejs,
  FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiRedis,
  SiNextdotjs,
  SiNuxtdotjs,
  SiScikitlearn,
  SiKeras,
  SiFlask,
  SiFirebase,
  SiTailwindcss,
  SiPostgresql,
  SiGraphql,
  SiGooglecloud,
} from "react-icons/si";

/** ---------- Skill data with confidence (0–100) ---------- */
const SKILLS = [
  {
    title: "Languages",
    blurb: "Daily drivers for problem-solving and systems work.",
    items: [
      { name: "Java", Icon: FaJava, confidence: 80 },
      { name: "Python", Icon: FaPython, confidence: 90 },
      { name: "JavaScript", Icon: FaJs, confidence: 90 },
      { name: "C", Icon: FaDatabase, confidence: 60 },
      { name: "C++", Icon: SiCplusplus, confidence: 60 },
      { name: "MIPS", Icon: FaDatabase, confidence: 60 },
    ],
  },
  {
    title: "Frameworks",
    blurb: "Shipping UI + services with a pragmatic toolbelt.",
    items: [
      { name: "Next.js", Icon: SiNextdotjs, confidence: 85 },
      { name: "Tailwind", Icon: SiTailwindcss, confidence: 85 },
      { name: "Vue.js", Icon: FaVuejs, confidence: 90 },
      { name: "Nuxt.js", Icon: SiNuxtdotjs, confidence: 90 },
      { name: "Node.js", Icon: FaNodeJs, confidence: 90 },
      { name: "scikit-learn", Icon: SiScikitlearn, confidence: 60 },
      { name: "Keras", Icon: SiKeras, confidence: 60 },
      { name: "Flask", Icon: SiFlask, confidence: 85 },
    ],
  },
  {
    title: "Cloud & Infra",
    blurb: "Cloud-native services, containers, caches, observability.",
    items: [
      { name: "Docker", Icon: FaDocker, confidence: 80 },
      { name: "Redis", Icon: SiRedis, confidence: 90 },
      { name: "AWS", Icon: FaAws, confidence: 80 },
      { name: "GCP", Icon: SiGooglecloud, confidence: 90 },
      { name: "Firebase", Icon: SiFirebase, confidence: 95 },
    ],
  },
  {
    title: "Data & APIs",
    blurb: "Schemes, queries, and contracts between services.",
    items: [
      { name: "GraphQL", Icon: SiGraphql, confidence: 90 },
      { name: "PostgreSQL", Icon: SiPostgresql, confidence: 90 },
      { name: "NoSQL", Icon: FaDatabase, confidence: 95 },
    ],
  },
];

/** ---------- Helpers ---------- */
function confidenceTag(pct) {
  if (pct >= 90) return { label: "Expert", tw: "text-emerald-300" };
  if (pct >= 80) return { label: "Advanced", tw: "text-lime-300" };
  if (pct >= 70) return { label: "Proficient", tw: "text-amber-300" };
  if (pct >= 60) return { label: "Intermediate", tw: "text-orange-300" };
  return { label: "Learning", tw: "text-rose-300" };
}

/** ---------- Server Component ---------- */
export default function SkillsPanelSSR() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Technical Skills
        </h1>
        <p className="mt-3 text-zinc-400 text-lg">
          Server-rendered overview with gradient confidence bars
        </p>
      </header>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILLS.map((cat) => (
          <article
            key={cat.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            {/* Category header */}
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 animate-pulse"
                aria-hidden="true"
              />
              <h2 className="text-xl font-semibold text-white tracking-tight">
                {cat.title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{cat.blurb}</p>

            {/* Skills list */}
            <ul className="mt-5 space-y-4">
              {cat.items.map(({ name, Icon, confidence }) => {
                const tag = confidenceTag(confidence);
                return (
                  <li key={name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-800 p-2">
                          <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                        </span>
                        <span className="text-zinc-100 font-medium">{name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs ${tag.tw}`}>{tag.label}</span>
                        <span className="text-xs text-zinc-400 tabular-nums">
                          {confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="mt-2 h-3 w-full rounded-full overflow-hidden border border-zinc-800 bg-zinc-900"
                      role="progressbar"
                      aria-label={`${name} confidence`}
                      aria-valuenow={confidence}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="h-full rounded-full transition-[width] duration-700 bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {[
          { label: "Expert ≥ 90", tw: "text-emerald-300" },
          { label: "Advanced 80–89", tw: "text-lime-300" },
          { label: "Proficient 70–79", tw: "text-amber-300" },
          { label: "Intermediate 60–69", tw: "text-orange-300" },
          { label: "Learning < 60", tw: "text-rose-300" },
        ].map((l) => (
          <span
            key={l.label}
            className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs"
          >
            <span className={l.tw}>{l.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
