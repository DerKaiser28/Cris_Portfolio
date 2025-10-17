import { Montserrat } from "next/font/google";
import "./globals.css";
import SocialLinksFooter from "@/components/SocialBoxFooter";

const MontserratSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Cris Grace Portfolio",
  description: "Showcasing my work and projects",
};

export default function RootLayout({ children }) {
  const FOOTER_H = 64 // matches h-16

  return (
    <html lang="en" className="bg-black">
      <body
        className={`${MontserratSans.className} antialiased min-h-dvh bg-black text-zinc-100 overscroll-none`}
      >
        <main
          className="bg-black"              
          style={{
            paddingBottom: `calc(${FOOTER_H}px + env(safe-area-inset-bottom, 0px))`,
          }}
        >
          {children}
        </main>

        {/* Sticky footer */}
          <footer
            role="contentinfo"
            className="fixed inset-x-0 bottom-0 border-t border-zinc-900
                      bg-black text-sm text-zinc-500
                      flex items-center justify-center h-16 px-4"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            {/* Mobile: only the line */}
            <span className="block md:hidden text-center w-full">
              © {new Date().getFullYear()} Cris Grace • Built with Next.js & Tailwind CSS • <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">Contact Me @ chrisgrace281@gmail.com</span>
            </span>

            {/* Desktop: line left, socials right */}
            <div className="hidden md:flex w-full items-center justify-between">
              <span>
                © {new Date().getFullYear()} Cris Grace • Built with Next.js & Tailwind CSS • <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">Contact Me @ chrisgrace281@gmail.com</span>
              </span>
              <SocialLinksFooter />
            </div>
          </footer>

      </body>
    </html>
  );
}
