"use client";

export default function PageTransition({ children }) {
  // Simple non-animated page wrapper. Transitions removed per request.
  return (
    <div className="relative min-h-dvh bg-black w-full pb-4 md:pb-8">
      {children}
    </div>
  );
}
