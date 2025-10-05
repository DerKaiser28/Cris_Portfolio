"use client";
import { useEffect, useRef, useState } from "react";
import { Pacifico } from "next/font/google";
import { useRouter } from "next/navigation";
import SocialBox from "@/components/SocialBox";

const PacificoFont = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
  weight: "400",
});

export default function ExperienceSelector() {
  const tiles = [
    { key: "professional", label: "Professional", src: "./pro.JPG", objectPosition: "center 21%", url: "/portfolio/professional/about" },
    { key: "personal", label: "Personal", src: "./per.jpg", objectPosition: "center 20%", url: "/portfolio/personal/about" },
  ];

  const router = useRouter();

  const refs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia("(min-width: 768px)");
    const onMM = () => setIsDesktop(mm.matches);
    onMM();
    mm.addEventListener?.("change", onMM);

    const updateActive = () => {
      if (mm.matches) {
        // Desktop: hover handles color; clear mobile state
        setActiveIdx(null);
        return;
      }
      // Find which card center is closest to viewport center
      const vhCenter = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const d = Math.abs(center - vhCenter);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIdx(best);
    };

    // Run now and on scroll/resize
    updateActive();
    const opts = { passive: true };
    window.addEventListener("scroll", updateActive, opts);
    window.addEventListener("resize", updateActive, opts);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      mm.removeEventListener?.("change", onMM);
    };
  }, []);

  return (
    <section className="h-auto md:h-screen w-full p-16 max-md:p-4">
      {/* Heading */}
      <div className="flex justify-center">
         <SocialBox></SocialBox>
      </div>
     

      <p className={`mb-6 md:mb-10 text-center text-4xl md:text-6xl font-bold ${PacificoFont.className}`}>
        Hi I'm Cris Grace!
      </p>
      <p className={`mb-6 md:mb-10 text-center text-2xl md:text-4xl font-bold ${PacificoFont.className}`}>
       Discover My Sides
      </p>

      {/* Write-up */}
      <p className="block mx-auto my-6 md:my-2 max-w-2xl text-center text-sm text-zinc-400">
        I designed this portfolio with two distinct modes. <b>Personal</b> gives you a glimpse
        into my story, interests, and creative side it’s a more relaxed way to get to know me.  
        <b>Professional</b> is focused on my work, projects, and skills, tailored for recruiters, 
        collaborators, and anyone interested in what I can build. Choose the mode that best fits 
        what you’re looking for I wanted to make it easy for you to explore both sides of me.
      </p>

      {/* Cards */}
      <div className="grid h-[calc(100%-8rem)] grid-cols-1 md:justify-items-center gap-8 md:grid-cols-2 p-16 max-md:p-0">
        {tiles.map(({ key, label, src, objectPosition, url }, i) => (
          <div
            key={key}
            ref={(el) => (refs.current[i] = el)}
            className="group relative w-full h-full md:w-3/4 overflow-hidden rounded-2xl cursor-pointer shadow-lg
                       md:h-3/4 max-md:aspect-square
                       md:first:justify-self-end md:last:justify-self-start"
             onClick={() => router.push(url)}
          >
            {/* Image */}
            <img
              src={src}
              alt={label}
              style={{ objectPosition }}
              className={`h-full w-full object-cover transform transition duration-300 ease-out
                          filter grayscale
                          ${!isDesktop && activeIdx === i ? "grayscale-0" : ""}
                          md:grayscale md:group-hover:grayscale-0
                          md:group-hover:scale-105`}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent 
                            transition duration-300 group-hover:from-black/40 group-hover:via-black/10" />

            {/* Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="px-6 py-3 rounded-full text-white text-lg font-semibold tracking-wide
                           backdrop-blur-sm bg-white/20 shadow-md
                           transform transition duration-300
                           md:group-hover:scale-110 md:group-hover:bg-white/30 md:group-hover:shadow-lg"
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
