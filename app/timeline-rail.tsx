"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function TimelineRail({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = rail.current;
      if (!node) return;
      const bounds = node.getBoundingClientRect();
      const progress = Math.max(0, Math.min(bounds.height, window.innerHeight / 2 - bounds.top));
      node.style.setProperty("--timeline-progress", `${progress}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div className="feature-list" ref={rail}>{children}</div>;
}
