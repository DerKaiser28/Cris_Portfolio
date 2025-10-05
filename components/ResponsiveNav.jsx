"use client";

import { useEffect, useState } from "react";
import BodyPortal from "@/components/BodyPortal";
import RainbowNav from "@/components/RainbowNav";

/**
 * Renders RainbowNav inline on mobile, in a BodyPortal (fixed wrapper) on desktop.
 * Layouts can stay SSR; only this file is client.
 */
export default function ResponsiveNav({ items, basePath }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  if (isDesktop) {
    // Wrap with a fixed, full-width bar so the nav sits above the page
    return (
      <BodyPortal>
        <div className="fixed top-0 inset-x-0 z-[200]">
          <div className="mx-auto max-w-screen-lg px-4 pt-4">
            <RainbowNav items={items} basePath={basePath} />
          </div>
        </div>
      </BodyPortal>
    );
  }

  // Mobile/tablet inline (uses the nav's own sticky behavior)
  return <RainbowNav items={items} basePath={basePath} />;
}
