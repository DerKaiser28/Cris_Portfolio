export default function PageTransition({ children }) {
  // Reduced padding: pb-4 for mobile, md:pb-8 for desktop, no top padding
  return <div className="w-full min-h-dvh bg-black pb-4 md:pb-8">{children}</div>;
}
