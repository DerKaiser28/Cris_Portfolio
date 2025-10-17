// app/about/personal/page.jsx
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Me | Cris Grace",
  description: "A warm, personal look at who I am beyond the work.",
};

export default function PersonalAbout() {
  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Soft warm backdrop with glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#1a0908] to-black" />
      <div className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(244,114,182,0.08),transparent)]" />

      {/* Intro */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Hey, I’m{" "}
              <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                Cris Grace
              </span>
            </h1>
            <p className="mt-4 text-lg text-zinc-300 leading-relaxed">
              I’m a code-obsessed football nerd who loves to game, travel, and build things with friends. When I’m not deep in a match or a new city, I’m probably debugging something that doesn’t need to be fixed — just because I can’t leave a puzzle unsolved.
            </p>
          </div>

          {/* Hero image with warm ring */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-2 ring-rose-400/30 shadow-[0_0_40px_-10px_rgba(244,114,182,0.4)]">
            <Image
              src="/me.jpg"
              alt="A candid, cozy moment—warm light and calm vibes"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
              style={{ objectPosition: "center 21%" }}
              priority
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Who I Am (personal narrative + portrait) */}
      <section className="mx-auto max-w-5xl px-6 py-8 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-12 items-start">
          {/* Portrait */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-2 ring-amber-400/40 shadow-[0_0_36px_-12px_rgba(251,191,36,0.5)]">
            <Image
              src="/pc2.jpg"
              alt="Cris smiling—soft, warm portrait"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>

          {/* Text with warm accent */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 hover:border-rose-400/40 hover:shadow-[0_0_28px_-10px_rgba(244,114,182,0.4)] transition">
            <h2 className="text-2xl font-medium bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
              Who I Am
            </h2>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              I’m a code-obsessed football nerd who somehow ends up fixing bugs between Fortnite matches and late-night chats with friends. I love building things that feel alive—whether it’s a clean bit of UI, a weekend project that spirals, or a game night that turns into sunrise.
            </p>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              I care about the small stuff—the tone, the timing, the warmth—but I don’t let it slow me down. I like shipping, learning, and creating things that bring people together. Tech’s just my way of making the world feel a little more human.
            </p>
          </div>
        </div>
      </section>

      {/* Hobbies grid */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <h2 className="text-2xl font-medium bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
          Things I Enjoy
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {hobbies.map((h, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-rose-400/40 hover:shadow-[0_0_24px_-8px_rgba(244,114,182,0.4)] transition"
            >
              <div className="relative h-40">
                <Image
                  src={h.image}
                  alt={h.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  style={h.position ? { objectPosition: h.position } : {}}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-zinc-100">{h.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{h.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Separator() {
  return (
    <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-rose-400/40 to-transparent my-8" />
  );
}

const hobbies = [
  {
    title: "Gaming",
    image: "/gaming.jpg",
    alt: "A quiet gaming setup—screen glow and evening light",
    desc: "I’m a huge gamer and lifelong collector of consoles from retro handhelds to modern systems. Gaming has shaped how I think about design, storytelling, and tech.",
    position: "center 50%",
  },
  {
    title: "PC Building & Tinkering",
    image: "/pc.jpg",
    alt: "PC build details—clean cables, soft RGB, tidy layout",
    desc: "I built my first PC when I was 11 — cable-managed chaos and all. Since then, I’ve loved crafting clean, quiet builds and squeezing every bit of performance out of them.",
  },
  {
    title: "Events & Little Adventures",
    image: "/event.JPG",
    alt: "Friends, warm lights, and a little bustle—event vibes",
    desc: "I love spending time with friends — whether it’s dancing at Garba nights, heading out on a trek, or just making memories that turn ordinary days into something magical.",
  },
  {
    title: "Travel & Exploring",
    image: "/travel.png",
    alt: "Travel—golden hour streets and new places",
    desc: "I’ve been lucky to explore over 20 countries across 5 continents — each trip adding a new story, a new flavor, and a reminder of how big and beautiful the world really is.",
    position: "center 20%",
  },
  {
    title: "American Football",
    image: "/chiefs.jpg",
    alt: "American football — game-day lights and stadium energy",
    desc: "I’m a huge American football fan — the strategy, the energy, the teamwork. I’ve followed the Kansas City Chiefs for years, and nothing beats the rush of a good game day.",
    position: "center 40%",
  },
];
