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
    <div className={`inline-flex rounded-full p-[1px] relative overflow-visible mt-1`}>
      <div
        className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-1000 ease-in-out bg-[length:200%_100%] animate-gradient-x`}
        style={{ backgroundImage: combinedGradient }}
      />
      <div className="flex items-center gap-3 text-white text-xs 
                      rounded-full px-3 py-1.5 bg-zinc-900 relative z-10">
        
        {/* GitHub */}
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <FaGithub className="cursor-pointer w-4 h-4 transform transition-transform hover:scale-110 hover:text-gray-400" />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-1.5 py-0.5 text-[10px] text-white">
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
          <FaLinkedin className="cursor-pointer w-4 h-4 transform transition-transform hover:scale-110 hover:text-blue-400" />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-1.5 py-0.5 text-[10px] text-white">
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
          <HiDocumentText className="cursor-pointer w-4 h-4 transform transition-transform hover:scale-110 hover:text-green-400" />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-1.5 py-0.5 text-[10px] text-white">
            Resume
          </span>
        </a>

        {/* Divider */}
        <span className="text-gray-500 text-sm">|</span>

        {/* Instagram */}
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center"
        >
          <FaInstagram className="cursor-pointer w-4 h-4 transform transition-transform hover:scale-110 hover:text-pink-400" />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-1.5 py-0.5 text-[10px] text-white">
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
          <FaSteam className="cursor-pointer w-4 h-4 transform transition-transform hover:scale-110 hover:text-blue-300" />
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform rounded bg-black px-1.5 py-0.5 text-[10px] text-white">
            Steam
          </span>
        </a>
      </div>
    </div>
  );
}
