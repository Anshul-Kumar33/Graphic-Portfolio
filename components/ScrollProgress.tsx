"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress = (scrollTop / documentHeight) * 100;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        z-[100]
        w-screen
        h-[3px]
        bg-[var(--border)]
        overflow-hidden
        pointer-events-none
      "
      aria-hidden="true"
    >
      <div
        className="
          absolute
          top-0
          left-0
          h-full
          bg-[var(--accent)]
          transition-[width]
          duration-150
          ease-out
        "
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
