export const metadata = {
  title: "Skills | Cris Grace",
  description:
    "Technical skills and tooling: languages, frameworks, ML, infra — pragmatic and production-ready.",
};

import Skills from "@/components/SkillsPanel";

export default function ProfessionalSkills() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#061018] to-black" />
      <div className="pointer-events-none fixed -z-10 inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(56,189,248,0.08),transparent)]" />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Skills, what I{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                use
              </span>{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                and
              </span>{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                trust
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-300/95 leading-relaxed">
              Focused on building production systems that are observable, maintainable, and iterated on quickly.
              Below are the languages, libraries, and infrastructure I rely on when shipping work.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <NavPill href="/portfolio/professional/about" label="About" />
              <NavPill href="/portfolio/professional/experience" label="Experience" />
              <NavPill href="/portfolio/professional/projects" label="Projects" />
              <NavPill href="/portfolio/professional/achievements" label="Achievements" />
            </div>
          </div>

          <div className="rounded-2xl border border-teal-600/10 bg-zinc-950/60 p-4 text-sm">
            <div className="text-sm text-zinc-300">Primary focus</div>
            <div className="mt-2 font-medium text-zinc-100 bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Full-stack + ML engineering
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Production-grade APIs, model pipelines, and monitoring-forward operator workflows.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Skills mind map */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
          Skills
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Grouped by role and stage — things I reach for first.
        </p>

        <div className="mt-4">
          <Skills />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 hover:border-teal-500/40 hover:shadow-[0_0_32px_-12px_rgba(20,184,166,0.5)] transition">
          <h2 className="text-lg font-medium text-zinc-100">Want details?</h2>
          <p className="mt-2 text-zinc-300">
            If you want a deeper breakdown (architecture diagrams, code samples, or model benchmarks) I can prepare a tailored packet — just reach out.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/resume.pdf">View Resume</Button>
            <Button href="mailto:cris@example.com" variant="ghost">Email</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-8" />
  );
}

function NavPill({ href, label }) {
  return (
    <a
      href={href}
      className="rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:border-cyan-500/40 hover:shadow-[0_0_18px_-10px_rgba(56,189,248,0.5)] transition"
    >
      {label}
    </a>
  );
}

function Button({ href, children, variant = "solid" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-500/40";
  const solid =
    "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-sky-400 text-white shadow-[0_0_20px_-6px_rgba(56,189,248,0.5)]";
  const ghost =
    "bg-transparent border border-cyan-600/40 hover:border-cyan-400/60 text-cyan-300 hover:text-white";
  return (
    <a href={href} className={`${base} ${variant === "solid" ? solid : ghost}`}>
      {children}
    </a>
  );
}