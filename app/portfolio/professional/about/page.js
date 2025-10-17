// app/portfolio/professional/about/page.jsx
import Image from "next/image";

export const metadata = {
  title: "About Me | Cris Grace",
  description:
    "Full-stack + ML engineer focused on pragmatic, production-grade systems.",
};

export default function ProfessionalAbout() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Global backdrop with a soft cyan/teal vignette */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#061018] to-black" />
      <div className="pointer-events-none fixed -z-10 inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(56,189,248,0.10),transparent)]" />

      {/* Intro (title + hero image) */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Hello, I’m{" "}
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                Cris Grace
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-300/95 leading-relaxed">
              I build things that connect ideas to reality, systems that learn, adapt, and scale without losing their soul. My work spans cloud platforms, ML pipelines, and full-stack apps, but the goal stays the same: make technology feel human and grounded in purpose.
            </p>

            {/* Quick links row */}
            <div className="mt-5 flex flex-wrap gap-3">
              <NavPill href="/portfolio/professional/skills" label="Skills" />
              <NavPill href="/portfolio/professional/experience" label="Experience" />
              <NavPill href="/portfolio/professional/projects" label="Projects" />
              <NavPill href="/portfolio/professional/achievements" label="Achievements" />
            </div>
          </div>

          {/* Hero image with accent ring + glow */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-2 ring-cyan-500/40 shadow-[0_0_40px_-10px_rgba(56,189,248,0.45)]">
            <Image
              src="/me2.jpg" 
              alt="Winning at Atria"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
              style={{ objectPosition: "center 50%" }}
              priority
            />
          </div>
        </div>
      </section>

      <Separator />

    
      <section className="mx-auto max-w-5xl px-6 py-8 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-start">
          
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-2 ring-teal-500/35 shadow-[0_0_36px_-12px_rgba(20,184,166,0.5)]">
            <Image
              src="/flux.png" // swap to your image
              alt="FLUX inauguration"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>

          {/* Text card with subtle cyan edge */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5 hover:border-cyan-500/40 hover:shadow-[0_0_28px_-10px_rgba(56,189,248,0.45)] transition">
            <h2 className="text-2xl font-medium bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              What I Do
            </h2>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              I build things that feel grounded software and systems that make technology a little more human. My work lives where ML meets web development: data pipelines that learn from feedback, APIs that stay dependable under stress, and products that connect complex ideas to real-world use.
            </p>
            <p className="mt-3 text-zinc-300 leading-relaxed">
             I enjoy the rhythm of building designing architectures that evolve, debugging edge cases that teach me something new, and finding simple answers in complicated systems. I believe good engineering isn’t about flashy features but about consistency, understanding, and a quiet kind of elegance.
            Whether it’s a full-stack platform, a vision model, or a cloud function, my goal stays the same: ship something reliable, useful, and built with intention.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights (snapshot of signature work) */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
          Highlights
        </h2>
        <ul className="mt-4 space-y-4">
          <Item
            title="Farma — ML-powered plant disease platform"
            detail="Developed for GKVK College — a hierarchical ML pipeline (SAM/YOLO → preprocessing → EfficientNet/ResNet) with custom web interfaces, a GraphQL API over Postgres + Redis, and Firebase Functions for role-based verification and retraining."
          />
          <Item
            title="Flux Event App"
            detail="Built with Next.js on the frontend and Cloud Functions for backend processing, handling event registration and integration with existing payment systems."
          />
          <Item
            title="Mentor–Mentee Portal"
            detail="Web platform built with Next.js and Firebase (Auth, Firestore, Functions, Storage) providing a unified interface for students, mentors, and administrators—with scheduling, logsheets, PDF reporting, and RBAC replacing manual paper workflows."
          />
        </ul>
        <div className="mt-4">
          <NavPill href="/portfolio/professional/projects" label="See All Projects →" />
        </div>
      </section>

      {/* “How I Work” principles */}
      <section className="mx-auto max-w-5xl px-6 py-8 bg-gradient-to-b from-black via-zinc-950/60 to-black rounded-3xl">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
          How I Work
        </h2>
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Pill title="Ship small, ship often">
            Thin vertical slices with observability. Production feedback beats theory.
          </Pill>
          <Pill title="Traceability by default">
            Versioned datasets/models, audit logs, and explicit rollbacks.
          </Pill>
          <Pill title="Pragmatic ML">
            Baselines first; complexity only if it moves a real metric.
          </Pill>
          <Pill title="Design for constraints">
            Real users, flaky networks, low-end devices, time pressure—baked into the plan.
          </Pill>
        </ul>
      </section>

      {/* Metrics (work-flavored) */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="sr-only">At a Glance</h2>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Metric label="Apps shipped" value="3" />
          <Metric label="Functions deployed" value="20+" />
          <Metric label="Major projects led" value="3" />
          <Metric label="Users served" value="500+" />
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 hover:border-teal-500/40 hover:shadow-[0_0_32px_-12px_rgba(20,184,166,0.5)] transition">
          <h2 className="text-lg font-medium text-zinc-100">Let’s work</h2>
          <p className="mt-2 text-zinc-300">
            Open to internships, research collaborations, and product-engineering roles.
            If you’ve got an ML + full-stack problem with real users, I’d love to talk.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/resume.pdf">View Resume</Button>
            <Button href="mailto:cris@example.com" variant="ghost">
              Email Me
            </Button>
            <Button href="https://www.linkedin.com/in/" variant="ghost">
              LinkedIn
            </Button>
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

function Item({ title, detail }) {
  return (
    <li className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 hover:border-cyan-500/40 hover:shadow-[0_0_24px_-10px_rgba(56,189,248,0.45)] transition">
      <div className="font-medium text-zinc-100">{title}</div>
      <p className="mt-1 text-sm text-zinc-400">{detail}</p>
    </li>
  );
}

function Pill({ title, children }) {
  return (
    <li className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5 hover:border-teal-500/40 hover:shadow-[0_0_24px_-10px_rgba(20,184,166,0.45)] transition">
      <div className="font-medium text-zinc-100">{title}</div>
      <p className="mt-2 text-sm text-zinc-400">{children}</p>
    </li>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 hover:border-cyan-500/40 hover:shadow-[0_0_24px_-10px_rgba(56,189,248,0.45)] transition">
      <div className="text-2xl font-semibold bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="mt-1 text-sm text-zinc-400">{label}</div>
    </div>
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
