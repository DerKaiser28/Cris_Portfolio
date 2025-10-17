// app/components/iconRegistry.tsx
import {
  FaJava, FaPython, FaJs, FaDocker, FaAws, FaNodeJs, FaVuejs, FaDatabase,
} from "react-icons/fa";
import {
  SiCplusplus, SiRedis, SiNextdotjs, SiNuxtdotjs, SiScikitlearn,
  SiKeras, SiFlask, SiFirebase, SiTailwindcss, SiPostgresql,
  SiGraphql, SiGooglecloud,
} from "react-icons/si";

export const ICONS = {
  FaJava, FaPython, FaJs, FaDocker, FaAws, FaNodeJs, FaVuejs, FaDatabase,
  SiCplusplus, SiRedis, SiNextdotjs, SiNuxtdotjs, SiScikitlearn,
  SiKeras, SiFlask, SiFirebase, SiTailwindcss, SiPostgresql,
  SiGraphql, SiGooglecloud,
};

// Fallback (simple square) if someone picks an unknown key
export function SafeIcon({ name, className }) {
  const Cmp = ICONS[name];
  if (Cmp) return <Cmp className={className} />;
  return <span className={`inline-block h-4 w-4 rounded-sm bg-zinc-600 ${className || ""}`} />;
}
