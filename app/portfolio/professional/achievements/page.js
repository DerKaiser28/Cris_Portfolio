// app/achievements/page.jsx
import React from "react";
import Image from "next/image";

/** ---------- Achievement data ---------- */
const ACHIEVEMENTS = [
  {
    title: "Technical Team Award",
    subtitle: "Outstanding Contributor",
    date: "2025",
    issuer: "Samagra - Computer Science Association",
    blurb:
      "Recognized for outstanding technical leadership, reliability, and collaboration in major university initiatives.",
    highlights: [
      "Organized Events and Built Systems",
      "Contributed to quality, automation, and mentoring within the team",
    ],
    tags: ["Recognition", "Teamwork", "Impact"],
  },
  {
    title: "1st Prize — Hackathon (TECHXPLORE 2024)",
    subtitle: "National Level Fest",
    date: "Oct 2024",
    issuer: "Dhanwantari Academy for Management Studies",
    blurb:
      "Won first place at TECHXPLORE 2024, a national-level hackathon for innovative technical problem-solving and implementation.",
    highlights: [
      "Developed a fully functional prototype under 24 hours",
      "Integrated backend, frontend, and presentation workflow effectively",
    ],
    tags: ["Hackathon", "Innovation", "Product Development"],
  },
  {
    title: "1st Prize — Debate (TECHXPLORE 2024)",
    subtitle: "National Level Fest",
    date: "Oct 2024",
    issuer: "Dhanwantari Academy for Management Studies",
    blurb:
      "Secured 1st place in the national-level debate competition at TECHXPLORE 2024 for clarity, logic, and persuasive delivery.",
    highlights: [
      "Structured argumentation with strong evidence",
      "Clear articulation and impactful stage presence",
    ],
    tags: ["Debate", "Public Speaking", "National Level"],
  },
  {
    title: "Debug & Rebug",
    subtitle: "1st Place",
    date: "Sep 2024",
    issuer: "Atria Institute of Technology",
    blurb:
      "Debugging-focused event; secured first place by identifying and fixing complex defects under time pressure.",
    highlights: [
      "Fast fault isolation and systematic patching",
      "Clean write-ups explaining bug root causes and solutions",
    ],
    tags: ["Debugging", "Competition", "Problem Solving"],
  },
  {
    title: "IT Manager",
    subtitle: "1st Place",
    date: "Sep 2024",
    issuer: "Presidency College — Kalopsia",
    blurb:
      "Won the IT Manager track spanning technical, business, and managerial rounds testing leadership and decision-making.",
    highlights: [
      "Scenario-based planning and prioritization drills",
      "Effective communication under high-pressure simulations",
    ],
    tags: ["Leadership", "Strategy", "Management"],
  },
  {
    title: "IT Manager",
    subtitle: "1st Place",
    date: "Sep 2024",
    issuer: "Atria Institute of Technology",
    blurb:
      "Awarded best IT Manager for technical planning, stakeholder management, and operational excellence.",
    highlights: [
      "Stakeholder comms and risk handling",
      "SOPs and measurable success metrics across event stages",
    ],
    tags: ["Leadership", "Operations", "Planning"],
  },
  {
    title: "Web Development Competition",
    subtitle: "2nd Place",
    date: "Sep 2024",
    issuer: "Atria Institute of Technology",
    blurb:
      "Second place for building a responsive, accessible, and performant web application with clean design.",
    highlights: [
      "Core Web Vitals optimization and component reusability",
      "Semantic markup with strong UX principles",
    ],
    tags: ["Web", "Frontend", "Performance"],
  },
  {
    title: "Coding Competition",
    subtitle: "2nd Place",
    date: "Jun 2024",
    issuer: "Bishop Cotton Academy of Professional Management",
    blurb:
      "Placed second in a multi-round data structures and algorithms contest focusing on optimal problem-solving.",
    highlights: [
      "Efficient Greedy and DP implementations",
      "Time-bound coding under competitive conditions",
    ],
    tags: ["Algorithms", "DSA", "Competitive Programming"],
  },
  {
    title: "Treasure Hunt (Tech)",
    subtitle: "1st Place",
    date: "Jun 2024",
    issuer: "Bishop Cotton Academy of Professional Management",
    blurb:
      "Won first place in a tech-oriented treasure hunt combining logic, decoding, and rapid research.",
    highlights: [
      "Used pattern recognition and scripting to solve clues",
      "Balanced problem-solving with fast coordination",
    ],
    tags: ["Problem Solving", "Teamwork", "Tech Fest"],
  },
  {
    title: "Coding Competition",
    subtitle: "1st Place",
    date: "Apr 2024",
    issuer: "Maharani Lakshmi Ammanni College for Women (MLAC)",
    blurb:
      "Won first place for solving a multi-round coding challenge emphasizing algorithmic efficiency and accuracy.",
    highlights: [
      "High-performance solutions with clean code structure",
      "Explained reasoning and complexity effectively",
    ],
    tags: ["Algorithms", "DSA", "Competition"],
  },
  {
    title: "World Scholar’s Cup",
    subtitle: "Bangalore Event",
    date: "2019",
    issuer: "World Scholar’s Cup Foundation",
    blurb:
      "Participated and won medals across writing, debate, and quiz categories; qualified for the Global Rounds of the World Scholar’s Cup.",
    highlights: [
      "Excelled in multi-disciplinary rounds spanning art, literature, and science",
      "Represented school at regional and global levels",
    ],
    tags: ["Academics", "Debate", "Writing", "International"],
  },
  {
    title: "Sports Day Awards",
    subtitle: "Multiple Events",
    date: "2013 – 2017",
    issuer: "Canadian International School, Bangalore",
    blurb:
      "Won several gold and silver medals across athletics, relay, and team sports; recognized for consistent participation and teamwork.",
    highlights: [
      "Medals in athletics and team events",
      "Leadership roles in house-level coordination",
    ],
    tags: ["Sports", "Leadership", "Teamwork"],
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

function AchievementCard({ a }) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 animate-pulse" />
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">{a.title}</h2>
            {a.subtitle && <p className="text-sm text-cyan-300 font-medium">{a.subtitle}</p>}
            {a.issuer && <p className="text-xs text-zinc-400 mt-1">Issued by {a.issuer}</p>}
          </div>
        </div>
        <span className="text-xs text-zinc-400 whitespace-nowrap">{a.date}</span>
      </div>

      {a.blurb && <p className="mt-3 text-sm text-zinc-300">{a.blurb}</p>}

      {a.highlights?.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-zinc-200">
          {a.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {a.tags?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}

/** ---------- Page ---------- */
export const metadata = {
  title: "Achievements | Cris Grace",
  description:
    "Awards, recognitions, and milestones across academics, events, and innovation.",
};

export default function AchievementsPage() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#061018] to-black" />
      <div className="pointer-events-none fixed -z-10 inset-0 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(56,189,248,0.10),transparent)]" />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Achievements
          </h1>
          <p className="mt-3 text-zinc-400 text-lg">
            Milestones and recognitions across engineering, academics, and beyond.
          </p>
        </header>

        {/* Global banner image */}
        <div className="relative w-full h-72 md:h-96 mb-10 overflow-hidden rounded-2xl border border-zinc-800 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
          <Image
            src="/awards.jpg"
            alt="Achievements banner"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((a, i) => (
                <AchievementCard
                key={`${a.title}-${a.date}-${a.issuer || i}`}
                a={a}
                />
            ))}
            </div>

        <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500">
            If you’d like to verify any certificates or event results,{" "}
            <span className="text-cyan-400">feel free to reach out</span>.
        </p>
        </div>
      </section>
    </div>
  );
}
