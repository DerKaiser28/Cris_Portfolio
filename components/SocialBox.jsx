"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaInstagram, FaSteam } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

export default function SocialLinks() {
  const pathname = usePathname();
  const isPersonal = pathname?.startsWith("/portfolio/personal");

  const personalGradient = `from-red-500 via-orange-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 to-pink-500`;
  const professionalGradient = `from-teal-400 via-cyan-400 via-sky-400 to-blue-500`;

  return (
    <div className={`inline-flex rounded-full p-[2px] relative overflow-visible mb-6`}>
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${personalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${isPersonal ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${professionalGradient} animate-gradient-x transition-opacity duration-1000 ease-in-out ${isPersonal ? 'opacity-0' : 'opacity-100'}`} />
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
