"use client";

import { useEffect, useState, useRef } from "react";
import { Pacifico } from "next/font/google";

// Font loader MUST be called at module scope
const pacifico = Pacifico({
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
  weight: "400",
});
// import { usePathname } from "next/navigation"; // 
import Link from "next/link";
import SocialBox from "@/components/SocialBox";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RainbowNav({ items = [], basePath = "/portfolio/personal" }) {
  const [open, setOpen] = useState(false);

  // used to trigger mount animation for the overlay's animated X
  const [overlayMounted, setOverlayMounted] = useState(false);

  // preserve scroll position when menu opens and lock background
  const scrollYRef = useRef(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (open) {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
    } else {
      // restore
      document.body.style.position = "";
      const top = document.body.style.top || "0px";
      document.body.style.top = "";
      document.body.style.width = "";
      const scrollTo = Math.abs(parseInt(top || "0", 10));
      if (!Number.isNaN(scrollTo)) {
        window.scrollTo(0, scrollTo);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [open]);

  // Drive overlay-mounted state so the X animates after mount and remains during open
  useEffect(() => {
    let t;
    let raf;
    if (open) {
      // set on next frame so transitions run
      raf = requestAnimationFrame(() => setOverlayMounted(true));
    } else {
      // allow exit animation to finish before clearing
      t = setTimeout(() => setOverlayMounted(false), 520);
    }
    return () => {
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  // Use the active pathname so the nav updates reactively on client-side navigation
  const pathname = usePathname();
  const onPersonal = pathname ? pathname.startsWith("/portfolio/personal") : basePath?.startsWith("/portfolio/personal");

  const personalGradient = `from-red-500 via-orange-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-pink-500`;
  const professionalGradient = `from-teal-400 via-cyan-400 via-sky-400 to-blue-500`;

  const switchLabel = onPersonal ? "Professional" : "Personal";
  const switchHref = onPersonal
    ? "/portfolio/professional/about"
    : "/portfolio/personal/about";

  // Mode change handling: when onPersonal changes, set modeChanging so items hide while
  // the nav layout animates, then reveal them after the layout finishes.
  const [modeChanging, setModeChanging] = useState(false);
  const prevMode = useRef(onPersonal);
  useEffect(() => {
    if (prevMode.current === undefined) prevMode.current = onPersonal;
    if (prevMode.current !== onPersonal) {
      prevMode.current = onPersonal;
      setModeChanging(true);
      // approximate time for spring layout to settle, reveal items after 520ms
      const t = setTimeout(() => setModeChanging(false), 520);
      return () => clearTimeout(t);
    }
  }, [onPersonal]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0 },
  };

  // Don't mutate document.body overflow: keep a single scrollbar on the document.
  // Previously we toggled `document.body.style.overflow` when the mobile menu
  // opened which caused nested scrollbars (overlay scrolling while body was hidden).
  // Removing that keeps scrolling on the body only.

  const toHref = (slug) =>
    `${basePath}${slug.startsWith("/") ? "" : "/"}${slug.replace(/^\/+/, "")}`;

  return (
    <>
      {/* ===== Sticky header for desktop, normal flow for mobile ===== */}
      <header className="inset-x-0 z-[200] md:fixed md:top-4">
        <div className="relative mx-auto max-w-screen-lg">
          {/* ===== Desktop pill navbar ===== */}
          <div className="hidden md:flex justify-center">
            <div className="inline-flex rounded-full p-[2px] relative overflow-visible">
              {/* two gradient layers that crossfade for smooth transitions */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
              <motion.nav layout className="rounded-full bg-zinc-900 shadow overflow-hidden relative z-10" transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 } }}>
                <AnimatePresence mode="wait">
                  <motion.ul layout initial="hidden" animate={!modeChanging ? 'show' : 'hidden'} exit={{ opacity: 0, y: 6 }} variants={containerVariants} className="m-0 p-0 list-none flex items-stretch justify-center" transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 }, default: { duration: 0.35 } }}>
                  {/* On PERSONAL -> switch on LEFT (owns left rounded edge) */}
                  {/** Brand on left when PROFESSIONAL (free side), else left switch shown earlier */}
                  {!onPersonal && !modeChanging && (
                    <motion.li layout className="flex items-center" variants={itemVariant} initial="hidden" animate={!modeChanging ? 'show' : 'hidden'} transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 } }}>
                      <span
                        className={`text-sm pl-5 ${pacifico.className}`}
                      >
                       Cris Grace
                      </span>
                      <span className="h-6 border-r border-zinc-700 mx-3" />
                    </motion.li>
                  )}

                  {onPersonal && !modeChanging && (
                    <motion.li layout className="flex items-center" variants={itemVariant} initial="hidden" animate={!modeChanging ? 'show' : 'hidden'} transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 } }}>
                      <Link
                        href={switchHref}
                        className="block rounded-none text-sm px-5 py-3 rounded-l-full transition-colors hover:bg-zinc-800"
                      >
                        <b>{switchLabel}</b>
                      </Link>
                      <span className="h-6 border-l border-zinc-700 mx-2" />
                    </motion.li>
                  )}

                  {items.map(({ slug, label }, idx) => {
                    // Preserve nice pill hovers on ends:
                    // - If switch is LEFT (personal), last internal item gets RIGHT rounded edge.
                    // - If switch is RIGHT (professional), first internal item gets LEFT rounded edge.
                    const isFirst = idx === 0 && !onPersonal; // professional view
                    const isLast = idx === items.length - 1 && onPersonal; // personal view
                      return (
                      <motion.li key={slug} layout className="flex" variants={itemVariant} initial="hidden" animate={!modeChanging ? 'show' : 'hidden'} transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 } }}>
                          <Link
                            href={toHref(slug)}
                            className={[
                                "block rounded-none transition-colors hover:bg-zinc-800",
                                "text-sm px-5 py-3",
                              ].join(" ")}
                          >
                            <b>{label}</b>
                          </Link>
                        </motion.li>
                      );

                  })}

                  {/** Brand on right when PERSONAL (free side) */}
                  {onPersonal && !modeChanging && (
                    <motion.li layout className="flex items-center" variants={itemVariant} initial="hidden" animate={!modeChanging ? 'show' : 'hidden'} transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 } }}>
                      <span className="h-6 border-r border-zinc-700 mx-3"></span>
                      <span
                        className={`text-sm pr-5 ${pacifico.className}`}
                      >
                       Cris Grace
                      </span>
                    </motion.li>
                  )}

                  {/* On PROFESSIONAL -> switch on RIGHT (owns right rounded edge) */}
                  {!onPersonal && !modeChanging && (
                    <motion.li layout className="flex items-center" variants={itemVariant} initial="hidden" animate={!modeChanging ? 'show' : 'hidden'} transition={{ layout: { type: 'spring', stiffness: 160, damping: 22 } }}>
                      <span className="h-6 border-l border-zinc-700 mx-2" />
                      <Link
                        href={switchHref}
                        className="block rounded-none text-sm px-5 py-3 rounded-r-full transition-colors hover:bg-zinc-800"
                      >
                        <b>{switchLabel}</b>
                      </Link>
                    </motion.li>
                  )}
                  </motion.ul>
                </AnimatePresence>
              </motion.nav>
            </div>
          </div>

          {/* ===== Mobile hamburger ===== */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden mt-10 ml-auto mr-5 flex flex-col justify-center items-center space-y-1.5"
          >
                {/* three lines where each line stacks the two gradients and then the transforming line on top */}
                <span className="relative block h-0.5 w-7">
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-500 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-500 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`relative block h-0.5 w-7 rounded-full transition-transform duration-500 ${open ? 'translate-y-2 rotate-45' : ''}`} />
                </span>

                <span className="relative block h-0.5 w-7">
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-500 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-500 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`relative block h-0.5 w-7 rounded-full transition-opacity duration-350 ${open ? 'opacity-0' : 'opacity-100'}`} />
                </span>

                <span className="relative block h-0.5 w-7">
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-500 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
                  <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-500 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`relative block h-0.5 w-7 rounded-full transition-transform duration-500 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
                </span>
          </button>

          {/* Removed extra spacer to reduce gap below hamburger icon */}
        </div>
      </header>

      {/* ===== Mobile full-screen overlay with animation ===== */}
      <AnimatePresence
        onExitComplete={() => setOverlayMounted(false)}
      >
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: "-5%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "5%" }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            // render the mobile menu in-flow (not fixed) so the document/body
            // scrollbar is the only scrollbar. This prevents nested scrollbars.
            className="md:hidden fixed inset-0 z-[200] bg-black overflow-auto"
          >
            <div
              className="w-full min-h-screen relative flex flex-col"
              style={{ paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px) + 96px)" }}
            >
              {/* Heading */}
              <div className="px-8 pt-8 flex items-center justify-between">
                <h2 className="text-5xl font-bold tracking-tight">Menu</h2>
                {/* Animated X (same markup/styles as the hamburger) */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="md:hidden flex flex-col justify-center items-center space-y-1.5"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {/** compute active state only after mount so we animate from hamburger -> X */}
                  {(() => {
                    const active = overlayMounted && open;
                    return (
                      <>
                        <span className="relative block h-0.5 w-7">
                          <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
                          <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
                          <span className={`relative block h-0.5 w-7 rounded-full transition-transform duration-300 ${active ? 'translate-y-2 rotate-45' : ''}`} />
                        </span>
                        <span className="relative block h-0.5 w-7">
                          <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
                          <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
                          <span className={`relative block h-0.5 w-7 rounded-full transition-opacity duration-200 ${active ? 'opacity-0' : 'opacity-100'}`} />
                        </span>
                        <span className="relative block h-0.5 w-7">
                          <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-100' : 'opacity-0'}`} />
                          <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${onPersonal ? 'opacity-0' : 'opacity-100'}`} />
                          <span className={`relative block h-0.5 w-7 rounded-full transition-transform duration-300 ${active ? '-translate-y-2 -rotate-45' : ''}`} />
                        </span>
                      </>
                    );
                  })()}
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col justify-start items-start px-8 pt-4">
                <ul className="w-full">
                  {items.map(({ slug, label }, i) => (
                    <motion.li
                      key={slug}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={toHref(slug)}
                        onClick={() => setOpen(false)}
                        className="block py-3 text-3xl font-semibold tracking-tight hover:text-zinc-300"
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Divider + Switch link (smaller) */}
                  <li className="border-t border-zinc-800 mt-6 pt-4">
                    <Link
                      href={switchHref}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-xl font-medium tracking-tight hover:text-zinc-300"
                    >
                      {switchLabel}
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* SocialBox above footer; placed at the bottom of the menu via mt-auto and extra margin for spacing */}
              <div className="w-full max-w-screen-sm px-4 mt-auto mx-auto mt-10">
                <div className="flex justify-center">
                  <SocialBox />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
