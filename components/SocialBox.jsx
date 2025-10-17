"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaInstagram, FaSteam } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

export default function SocialLinks() {
  const pathname = usePathname();
  const isPersonal = pathname?.startsWith("/portfolio/personal");

  // Combined gradient (personal then professional) so the border cycles through all colors
  const combinedGradient =
    'linear-gradient(90deg, #ef4444 0%, #f97316 12%, #eab308 24%, #22c55e 36%, #06b6d4 48%, #3b82f6 60%, #ec4899 72%, #2dd4bf 84%, #22d3ee 88%, #38bdf8 92%, #3b82f6 100%)';

  return (
    <div className={`inline-flex rounded-full p-[2px] relative overflow-visible mb-6`}>
      <div
        className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-1000 ease-in-out bg-[length:200%_100%] animate-gradient-x`}
        style={{ backgroundImage: combinedGradient }}
      />
      <div className="flex items-center gap-4 text-white text-2xl 
                      rounded-full px-6 py-3 bg-zinc-900 relative z-10">
        
        {/* GitHub */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <FaGithub className="cursor-pointer w-5 h-5 transform transition-transform hover:scale-125 hover:text-gray-400" />
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-2 py-1 text-xs text-white">
            GitHub
          </span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <FaLinkedin className="cursor-pointer w-5 h-5 transform transition-transform hover:scale-125 hover:text-blue-400" />
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-2 py-1 text-xs text-white">
            LinkedIn
          </span>
        </a>

        {/* Resume */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <HiDocumentText className="cursor-pointer w-5 h-5 transform transition-transform hover:scale-125 hover:text-green-400" />
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-2 py-1 text-xs text-white">
            Resume
          </span>
        </a>

        {/* Divider */}
        <span className="text-gray-400">|</span>

        {/* Instagram */}
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <FaInstagram className="cursor-pointer w-5 h-5 transform transition-transform hover:scale-125 hover:text-pink-400" />
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-2 py-1 text-xs text-white">
            Instagram
          </span>
        </a>

        {/* Steam */}
        <a
          href="https://steamcommunity.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <FaSteam className="cursor-pointer w-5 h-5 transform transition-transform hover:scale-125 hover:text-blue-300" />
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-2 py-1 text-xs text-white">
            Steam
          </span>
        </a>
      </div>
    </div>
  );
}
