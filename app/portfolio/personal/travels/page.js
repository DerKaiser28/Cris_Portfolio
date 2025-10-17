// app/travel/page.jsx
"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import * as THREE from "three";

// Client-only
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

/** ---------- Travel Data (Unchanged) ---------- */
const TRAVELS = [
  // --- India ---
  {
    slug: "bangalore",
    name: "Bengaluru",
    country: "India",
    flag: "🇮🇳",
    lat: 12.9716,
    lng: 77.5946,
    lived: true,
    description:
      "I was born, raised, and lived most of my life here in Bangalore!",
    photos: ["/travel/bangalore/1.JPG", "/travel/bangalore/2.JPG"],
  },
  {
    slug: "vizag",
    name: "Visakhapatnam",
    country: "India",
    flag: "🇮🇳",
    lat: 17.6868,
    lng: 83.2185,
    description:
      "It's almost like a second home to me—the place I've gone on vacation to the most!",
    photos: ["/travel/vizag/1.png", "/travel/vizag/2.png"],
  },
  {
    slug: "chennai",
    name: "Chennai",
    country: "India",
    flag: "🇮🇳",
    lat: 13.0827,
    lng: 80.2707,
    description:
      "Chennai is a nice city with GREAT seafood. Been here a few times!",
    photos: ["/travel/chennai/1.png"],
  },
  {
    slug: "kochi",
    name: "Kochi",
    country: "India",
    flag: "🇮🇳",
    lat: 9.9312,
    lng: 76.2673,
    description:
      "Been here a ton too, but mostly while getting to other places in Kerala. I have great memories here as a teen when my parents would bring me to Kochi for staycations!",
  },
  {
    slug: "trivandrum",
    name: "Thiruvananthapuram",
    country: "India",
    flag: "🇮🇳",
    lat: 8.5241,
    lng: 76.9366,
    description: "My mom’s side of the family is from here—it's a cool place!",
  },
  {
    slug: "mysore",
    name: "Mysuru",
    country: "India",
    flag: "🇮🇳",
    lat: 12.2958,
    lng: 76.6394,
    description: "My mom was born and raised here. The Mysore Palace is great.",
  },
  { slug: "mumbai", name: "Mumbai", country: "India", flag: "🇮🇳", lat: 19.076, lng: 72.8777 },
  { slug: "delhi", name: "New Delhi", country: "India", flag: "🇮🇳", lat: 28.6139, lng: 77.209 },
  {
    slug: "goa",
    name: "Goa",
    country: "India",
    flag: "🇮🇳",
    lat: 15.2993,
    lng: 74.124,
    description:
      "Been to Goa a couple of times, but my favorite was when I went on a trip with friends. One of those core memories was made here!",
    photos: ["/travel/goa/1.JPG", "/travel/goa/2.JPG"],
  },
  { slug: "lucknow", name: "Lucknow", country: "India", flag: "🇮🇳", lat: 26.8467, lng: 80.9462 },

  // --- Sri Lanka ---
  { slug: "colombo", name: "Colombo", country: "Sri Lanka", flag: "🇱🇰", lat: 6.9271, lng: 79.8612 },

  // --- Thailand ---
  {
    slug: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    lat: 13.7563,
    lng: 100.5018,
    description:
      "Bangkok is always a fun city to visit—the shopping scene is great, and I always have a great time. Although last time I ended up with an eye infection, which wasn't fun lol.",
    photos: ["/travel/bangkok/1.png", "/travel/bangkok/2.png"],
  },
  {
    slug: "phuket",
    name: "Phuket",
    country: "Thailand",
    flag: "🇹🇭",
    lat: 7.8804,
    lng: 98.3923,
    description: "Nice beaches!",
  },

  // --- Vietnam ---
  {
    slug: "hochiminh",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 10.8231,
    lng: 106.6297,
    photos: ["/travel/hochiminh/1.JPG", "/travel/hochiminh/2.JPG"],
    description:
      "Ho Chi Minh City was always a place I wanted to visit due to its connection to the Vietnam War, and as a lover of history it was a dream come true. This city had a profound impact on my view of the war and the world in general.",
  },
  {
    slug: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 21.0278,
    lng: 105.8342,
    description:
      "Hanoi is another city I enjoyed visiting. The Vietnam War museum was a pivotal part of my trip there.",
    photos: ["/travel/hanoi/1.jpg", "/travel/hanoi/2.png"],
  },
  {
    slug: "danang",
    name: "Da Nang",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 16.06,
    lng: 108.2111,
    description:
      "Da Nang will forever live with me because of the mountain we visited! One of the coolest places I've been to.",
    photos: ["/travel/danang/1.jpg", "/travel/danang/2.jpg"],
  },
  {
    slug: "haiphong",
    name: "Haiphong",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 20.8449,
    lng: 106.6881,
    description: "The cruise here was sooo much fun!",
    photos: ["/travel/haip/1.jpg", "/travel/haip/2.jpg"],
  },

  // --- Malaysia ---
  { slug: "kualalumpur", name: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾", lat: 3.139, lng: 101.6869 },

  // --- Singapore ---
  { slug: "singapore", name: "Singapore", country: "Singapore", flag: "🇸🇬", lat: 1.3521, lng: 103.8198 },

  // --- Japan ---
  { slug: "tokyo", name: "Tokyo", country: "Japan", flag: "🇯🇵", lat: 35.6762, lng: 139.6503 },
  { slug: "kyoto", name: "Kyoto", country: "Japan", flag: "🇯🇵", lat: 35.0116, lng: 135.7681 },
  { slug: "osaka", name: "Osaka", country: "Japan", flag: "🇯🇵", lat: 34.6937, lng: 135.5023 },

  // --- UAE ---
  { slug: "dubai", name: "Dubai", country: "UAE", flag: "🇦🇪", lat: 25.2048, lng: 55.2708 },

  // --- UK ---
  { slug: "london", name: "London", country: "United Kingdom", flag: "🇬🇧", lat: 51.5072, lng: -0.1276 },

  // --- France ---
  { slug: "paris", name: "Paris", country: "France", flag: "🇫🇷", lat: 48.8566, lng: 2.3522 },
  { slug: "lourdes", name: "Lourdes", country: "France", flag: "🇫🇷", lat: 43.0971, lng: -0.0477 },

  // --- Italy ---
  { slug: "rome", name: "Rome", country: "Italy", flag: "🇮🇹", lat: 41.9028, lng: 12.4964 },

  // --- Portugal ---
  { slug: "lisbon", name: "Lisbon", country: "Portugal", flag: "🇵🇹", lat: 38.7169, lng: -9.1399 },
  { slug: "fatima", name: "Fátima", country: "Portugal", flag: "🇵🇹", lat: 39.62, lng: -8.6431 },

  // --- Czech Republic ---
  { slug: "prague", name: "Prague", country: "Czech Republic", flag: "🇨🇿", lat: 50.0755, lng: 14.4378 },

  // --- Australia ---
  {
    slug: "melbourne",
    name: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    lat: -37.8136,
    lng: 144.9631,
    description:
      "Melbourne is probably my favorite city in Australia. We visited many cool areas around Melbourne, which will be etched in my brain!",
    photos: ["/travel/melbourne/1.JPG", "/travel/melbourne/2.jpg"],
  },
  {
    slug: "sydney",
    name: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    lat: -33.8688,
    lng: 151.2093,
    description: "Cool city!",
    photos: ["/travel/sydney/1.JPG", "/travel/sydney/2.JPG"],
  },
  {
    slug: "goldcoast",
    name: "Gold Coast",
    country: "Australia",
    flag: "🇦🇺",
    lat: -28.0167,
    lng: 153.4,
    description:
      "Going on a hot air balloon was probably the highlight of Gold Coast. It was a scenic moment!",
    photos: ["/travel/gcos/1.jpg", "/travel/gcos/2.jpg"],
  },
  {
    slug: "cairns",
    name: "Cairns",
    country: "Australia",
    flag: "🇦🇺",
    lat: -16.9186,
    lng: 145.7781,
    description:
      "We visited the Great Barrier Reef, which was cool—but man, there were a lot of creepy crawlies here.",
    photos: ["/travel/cairns/1.JPG", "/travel/cairns/2.JPG", "/travel/cairns/3.JPG"],
  },

  // --- Canada ---
  {
    slug: "kelowna",
    name: "Kelowna",
    country: "Canada",
    flag: "🇨🇦",
    lat: 49.888,
    lng: -119.496,
    lived: true,
    description:
      "Mountains, lakes, and endless summers. My Canadian home away from home. I lived here for 2 years of my life!",
    photos: [
      "/travel/kelowna/1.png",
      "/travel/kelowna/2.jpg",
      "/travel/kelowna/3.jpg",
      "/travel/kelowna/4.jpg",
      "/travel/kelowna/5.jpg",
      "/travel/kelowna/6.jpg",
    ],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    country: "Canada",
    flag: "🇨🇦",
    lat: 49.2827,
    lng: -123.1207,
    description: "Raincouver, as they call it. Been drenched every time I've been there.",
    photos: ["/travel/vancouver/1.JPG", "/travel/vancouver/2.jpg"],
  },

  // --- USA ---
  {
    slug: "nyc",
    name: "New York City",
    country: "United States",
    flag: "🇺🇸",
    lat: 40.7128,
    lng: -74.006,
    description:
      "The Big Apple. New York City is my favorite place to be at any given time. I love everything about this city—the bustling streets, the skyscrapers, the people, just everything. I fell in love with this city the first time I saw it in Spider-Man. When I visited NYC for the first time, I was awestruck, and it still happens every time I descend into the city.",
    photos: ["/travel/nyc/1.png", "/travel/nyc/2.jpg"],
  },
  { slug: "philadelphia", name: "Philadelphia", country: "United States", flag: "🇺🇸", lat: 39.9526, lng: -75.1652 },
  { slug: "buffalo", name: "Buffalo", country: "United States", flag: "🇺🇸", lat: 42.8864, lng: -78.8784 },
  {
    slug: "miami",
    name: "Miami",
    country: "United States",
    flag: "🇺🇸",
    lat: 25.7617,
    lng: -80.1918,
    description:
      "Nothing but vibes in Miami. Everything from the Latin culture to the vibrant beaches is just amazing.",
    photos: ["/travel/miami/1.jpg", "/travel/miami/2.jpg"],
  },
  {
    slug: "orlando",
    name: "Orlando",
    country: "United States",
    flag: "🇺🇸",
    lat: 28.5383,
    lng: -81.3792,
    description: "DISNEY WORLD!!!!!!!",
    photos: ["/travel/orlando/1.jpg", "/travel/orlando/2.jpg"],
  },
  {
    slug: "houston",
    name: "Houston",
    country: "United States",
    flag: "🇺🇸",
    lat: 29.7604,
    lng: -95.3698,
    description:
      "I'll be the first to say, I love everything about Texas, but Houston was kinda mid—extremely hot, and boy was it unwalkable.",
    photos: ["/travel/houston/1.JPG", "/travel/houston/2.JPG"],
  },
  {
    slug: "kansascity",
    name: "Kansas City",
    country: "United States",
    flag: "🇺🇸",
    lat: 39.0997,
    lng: -94.5786,
    description:
      "KAN-SAS CITY. GREAT BBQ, GREAT CITY, AND ARROWHEAD STADIUM. CHIEFS BY 100. FTC, FTR, FTB.",
    photos: ["/travel/kc/1.png", "/travel/kc/2.jpg"],
  },
  { slug: "lasvegas", name: "Las Vegas", country: "United States", flag: "🇺🇸", lat: 36.1699, lng: -115.1398 },
  {
    slug: "sanfrancisco",
    name: "San Francisco",
    country: "United States",
    flag: "🇺🇸",
    lat: 37.7749,
    lng: -122.4194,
    description:
      "The chillest city in the United States in my opinion—great seafood. Love it!",
    photos: ["/travel/sf/1.png", "/travel/sf/2.png", "/travel/sf/3.JPG"],
  },
  { slug: "losangeles", name: "Los Angeles", country: "United States", flag: "🇺🇸", lat: 34.0522, lng: -118.2437 },
  {
    slug: "west-yellowstone",
    name: "West Yellowstone",
    country: "United States",
    flag: "🇺🇸",
    lat: 44.6623,
    lng: -111.1048,
    description:
      "West Yellowstone is basically Red Dead Redemption 2 in real life—plus the most beautiful national park in the entire world!",
    photos: [
      "/travel/wt/1.JPG",
      "/travel/wt/2.JPG",
      "/travel/wt/3.JPG",
      "/travel/wt/4.JPG",
      "/travel/wt/5.JPG",
      "/travel/wt/6.jpg",
    ],
  },
  { slug: "washingtondc", name: "Washington D.C.", country: "United States", flag: "🇺🇸", lat: 38.9072, lng: -77.0369 },

  // --- Mexico ---
  {
    slug: "mexicocity",
    name: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    lat: 19.4326,
    lng: -99.1332,
    description:
      "Mexico ‘tint’ is real—10/10 city. Great food and tequila!",
    photos: ["/travel/mc/1.jpg", "/travel/mc/2.jpg", "/travel/mc/3.jpg", "/travel/mc/4.jpg", "/travel/mc/5.jpg"],
  },

  // --- Bahamas ---
  {
    slug: "nassau",
    name: "Nassau",
    country: "Bahamas",
    flag: "🇧🇸",
    lat: 25.0443,
    lng: -77.3504,
    description: "Crazy vibes, NGL!",
    photos: ["/travel/nassau/1.png", "/travel/nassau/2.png", "/travel/nassau/3.png"],
  },

  // --- Chile ---
  {
    slug: "santiago",
    name: "Santiago",
    country: "Chile",
    flag: "🇨🇱",
    lat: -33.4489,
    lng: -70.6693,
    description:
      "Santiago de Chile has been on my bucket list ever since I wrote my Extended Essay on Pinochet in IB. Beautiful city and such a great vibe all around.",
    photos: [
      "/travel/santiago/1.jpg",
      "/travel/santiago/2.jpg",
      "/travel/santiago/3.jpg",
      "/travel/santiago/4.jpg",
      "/travel/santiago/5.jpg",
      "/travel/santiago/6.jpg",
    ],
  },
];


function Separator() {
  return (
    <div className="h-px mx-auto max-w-6xl bg-gradient-to-r from-transparent via-rose-400/40 to-transparent my-8" />
  );
}

function Badge({ children, variant = "default" }) {
  const colors = {
    lived: "border-rose-400/40 bg-zinc-950/60 text-rose-300",
    visited: "border-amber-400/40 bg-zinc-950/60 text-amber-300"
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${colors[variant]}`}>
      {children}
    </span>
  );
}

function NavButton({ onClick, children, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-300 hover:text-zinc-100 hover:border-rose-400/40 hover:shadow-[0_0_18px_-6px_rgba(244,114,182,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

// NEW Lightbox Component
function Lightbox({ src, alt, onClose }) {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-7xl h-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image area
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-xl shadow-2xl transition-all"
          priority // Prioritize loading the modal image
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 transition"
          aria-label="Close image"
        >
          &times;
        </button>
      </div>
    </div>
  );
}


export default function TravelPage() {
  const globeRef = useRef(null);
  const containerRef = useRef(null);

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [idx, setIdx] = useState(0);
  // NEW state for lightbox
  const [enlargedImage, setEnlargedImage] = useState(null); 
  const selected = TRAVELS[idx];

  // Effect to handle dimension changes (Unchanged)
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({
        w: Math.max(220, Math.floor(width)),
        h: Math.max(320, Math.floor(height)),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Effect to disable globe controls (Unchanged)
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;

    const controls = g.controls?.();
    const cam = g.camera?.();
    if (!controls || !cam) return;

    controls.enabled = false;
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;

    controls.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null };
    controls.touches = { ONE: null, TWO: null };

    const target = controls.target || new THREE.Vector3(0, 0, 0);
    const distance = cam.position.distanceTo(target);
    controls.minDistance = distance;
    controls.maxDistance = distance;
    
    controls.minPolarAngle = controls.getPolarAngle?.() || 0;
    controls.maxPolarAngle = controls.getPolarAngle?.() || 0;

    controls.minAzimuthAngle = controls.getAzimuthalAngle?.() || 0;
    controls.maxAzimuthAngle = controls.getAzimuthalAngle?.() || 0;
  }, [dims.w, dims.h]);

  // Points data (Unchanged)
  const points = useMemo(
    () =>
      TRAVELS.map((t) => ({
        ...t,
        size: 0.8,
        color: t.lived ? "rgba(251,113,133,0.95)" : "rgba(251,191,36,0.95)",
      })),
    []
  );

  // Visible Labels calculation (Unchanged)
  const visibleLabels = useMemo(() => {
    const MIN_DISTANCE = 8;
    const visible = new Set();
    
    visible.add(idx);
    
    TRAVELS.forEach((city, i) => {
      if (i === idx) return;
      
      let isFarEnough = true;
      for (const visIdx of visible) {
        const visCityLat = TRAVELS[visIdx].lat;
        const visCityLng = TRAVELS[visIdx].lng;
        const distance = Math.sqrt(
          Math.pow(city.lat - visCityLat, 2) + 
          Math.pow(city.lng - visCityLng, 2)
        );
        if (distance < MIN_DISTANCE) {
          isFarEnough = false;
          break;
        }
      }
      
      if (isFarEnough) {
        visible.add(i);
      }
    });
    
    return Array.from(visible).map(i => TRAVELS[i]);
  }, [idx]);

  // FlyTo function (Unchanged)
  const flyTo = (i) => {
    const g = globeRef.current;
    if (!g) return;
    const t = TRAVELS[i];
    g.pointOfView({ lat: t.lat, lng: t.lng, altitude: 2.2 }, 1200);
  };

  // Initial Globe view setup (Unchanged)
  useEffect(() => {
    if (!dims.w || !dims.h) return;
    
    const timers = [50, 150, 300].map(delay => 
      setTimeout(() => {
        const g = globeRef.current;
        if (!g) return;
        const t = TRAVELS[idx];
        g.pointOfView({ lat: t.lat, lng: t.lng, altitude: 2.2 }, 0);
      }, delay)
    );
    
    return () => timers.forEach(t => clearTimeout(t));
  }, [dims.w, dims.h]);

  // Navigation functions (Unchanged)
  const prev = () => {
    const i = (idx - 1 + TRAVELS.length) % TRAVELS.length;
    setIdx(i);
    flyTo(i);
  };
  const next = () => {
    const i = (idx + 1) % TRAVELS.length;
    setIdx(i);
    flyTo(i);
  };

  return (
    <div className="min-h-dvh bg-black text-zinc-100">
      {/* Soft warm backdrop with glow - matching personal page */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black via-[#1a0908] to-black" />
      <div className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)] bg-[radial-gradient(60rem_30rem_at_50%_0%,rgba(244,114,182,0.08),transparent)]" />

      {/* Header (Unchanged) */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
            Travel
          </span>
        </h1>
        <p className="mt-4 text-lg text-zinc-300 leading-relaxed">
          I've been lucky to explore over 20 countries across 5 continents — each trip adding a new story, a new flavor, and a reminder of how big and beautiful the world really is. Every picture was taken by me!
        </p>
      </section>

      <Separator />

      {/* Main content */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Globe (Unchanged) */}
          <article className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-rose-400/40 hover:shadow-[0_0_28px_-10px_rgba(244,114,182,0.4)] transition">
            {/* Controls (Unchanged) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/50 flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-xs text-zinc-400">
                  <span className="text-rose-300 font-medium">{idx + 1}</span> / {TRAVELS.length}
                  <span className="mx-1 text-zinc-600">·</span>
                  <select
                  value={idx}
                  onChange={(e) => {
                    const i = parseInt(e.target.value);
                    setIdx(i);
                    flyTo(i);
                  }}
                  className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-300 hover:border-rose-400/40 focus:border-rose-400/40 focus:outline-none focus:ring-2 focus:ring-rose-400/20 transition-all cursor-pointer"
                >
                  {TRAVELS.map((city, i) => (
                    <option key={city.slug} value={i} className="bg-zinc-950 text-zinc-300">
                      {city.flag} {city.name}, {city.country}
                    </option>
                  ))}
                </select>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex justify-center gap-2">
                <NavButton onClick={prev}>← Prev</NavButton>
                <NavButton onClick={next}>Next →</NavButton>
              </div>
              </div>
            </div>

            <div
              ref={containerRef}
              className="relative h-[55vh] md:h-[65vh] pointer-events-none"
            >
              {dims.w > 0 && dims.h > 0 && (
                <Globe
                  ref={globeRef}
                  width={dims.w}
                  height={dims.h}
                  enablePointerInteraction={false}
                  pointOfView={{ lat: TRAVELS[0].lat, lng: TRAVELS[0].lng, altitude: 1.45 }}
                  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                  bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                  backgroundColor="rgba(0,0,0,0)"
                  showAtmosphere
                  atmosphereColor="rgba(251,113,133,0.5)"
                  atmosphereAltitude={0.22}
                  pointsData={points}
                  pointLat={(d) => d.lat}
                  pointLng={(d) => d.lng}
                  pointAltitude={() => 0.016}
                  pointColor={(d) => d.color}
                  pointRadius={(d) => 0.5}
                  labelsData={visibleLabels}
                  labelLat={(d) => d.lat}
                  labelLng={(d) => d.lng}
                  labelText={(d) => d.name}
                  labelSize={(d) => TRAVELS[idx].slug === d.slug ? 1.8 : 1.4}
                  labelDotRadius={() => 0}
                  labelColor={(d) => TRAVELS[idx].slug === d.slug ? "rgba(251,113,133,1)" : "rgba(251,191,36,0.85)"}
                />
              )}
            </div>
            
            <div className="flex justify-center items-center gap-2 m-5">
                  <Badge variant="lived">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-400 mr-1.5"></span>
                    Lived
                  </Badge>
                  <Badge variant="visited">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1.5"></span>
                    Visited
                  </Badge>
            </div>

            <div className="px-4 py-3 text-xs text-zinc-500 text-center border-t border-zinc-800/50">
              Use Prev/Next buttons to explore locations
            </div>
          </article>

          {/* Details (Modified for image click handler) */}
          <article className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 hover:border-rose-400/40 hover:shadow-[0_0_28px_-10px_rgba(244,114,182,0.4)] transition">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <span className={`inline-block h-3 w-3 rounded-full ${selected.lived ? 'bg-rose-400' : 'bg-amber-400'} shadow-lg`} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-medium text-zinc-100 tracking-tight flex items-center gap-2 mb-1">
                  <span className="text-2xl">{selected.flag}</span>
                  {selected.name}
                </h2>
                <p className="text-sm font-medium bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent mb-2">
                  {selected.country}
                </p>
                {selected.lived && (
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-rose-400/10 text-rose-300 border border-rose-400/30">
                    Lived here
                  </span>
                )}
              </div>
            </div>

            {selected.description ? (
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                {selected.description}
              </p>
            ) : (
              <p className="text-sm text-zinc-400 italic leading-relaxed mb-4">
                Whoops — I probably forgot to write one for this.
              </p>
            )}

            {selected.photos && selected.photos.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {selected.photos.map((src, i) => (
                  <div
                    key={`${selected.slug}-photo-${i}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl ring-2 ring-rose-400/30 shadow-[0_0_24px_-8px_rgba(244,114,182,0.4)] cursor-pointer hover:ring-rose-300 transition-shadow" 
                    onClick={() => setEnlargedImage({ src, alt: `${selected.name} photo ${i + 1}` })}
                  >
                    <Image
                      src={src}
                      alt={`${selected.name} photo ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 p-6 rounded-xl border border-zinc-800/50 bg-zinc-900/30 text-center">
                <p className="text-sm text-zinc-400 italic">
                  I was either too young or I just didn't take pictures on this trip.
                </p>
              </div>
            )}

            {/* Bottom controls (Unchanged) */}
            <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
              <div className="text-xs text-zinc-500">
                <span className="text-rose-300 font-medium">{idx + 1}</span>
                <span className="text-zinc-600 mx-1">/</span>
                <span className="text-zinc-400">{TRAVELS.length}</span>
              </div>
              <div className="flex gap-2">
                <NavButton onClick={prev}>← Prev</NavButton>
                <NavButton onClick={next}>Next →</NavButton>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* NEW Lightbox rendering */}
      {enlargedImage && (
        <Lightbox 
          src={enlargedImage.src} 
          alt={enlargedImage.alt} 
          onClose={() => setEnlargedImage(null)} 
        />
      )}
    </div>
  );
}