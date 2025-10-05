// app/portfolio/layout.tsx
"use client";
import { usePathname } from "next/navigation";
import ResponsiveNav from "@/components/ResponsiveNav";
import PageTransition from "@/components/PageTransition";

export default function PortfolioLayout({ children }) {
  const pathname = usePathname();
  const onPersonal = pathname?.startsWith("/portfolio/personal");
  const basePath = onPersonal ? "/portfolio/personal" : "/portfolio/professional";
  const items = onPersonal
    ? [{ slug: "about", label: "About Me" }, { slug: "travels", label: "Travels" }, { slug: "experiences", label: "Experiences" }, { slug: "blog", label: "Blog" }]
    : [{ slug: "about", label: "About Me" }, { slug: "skills", label: "Skills" }, { slug: "experience", label: "Experience" }, { slug: "projects", label: "Projects" }, { slug: "achievements", label: "Achievements" }];

  return (
    <div className="relative min-h-dvh bg-black overflow-x-hidden">
      <ResponsiveNav items={items} basePath={basePath} />
      
      {/* add top padding on desktop so fixed nav doesn't overlap content; smaller on mobile */}
      <div className="md:pt-20">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
