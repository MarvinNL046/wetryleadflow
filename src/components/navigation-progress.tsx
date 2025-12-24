"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset on route change complete
  useEffect(() => {
    setIsNavigating(false);
    setProgress(0);
  }, [pathname, searchParams]);

  // Listen for navigation start
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const href = link.getAttribute("href");
        // Only trigger for internal navigation links
        if (href && href.startsWith("/") && href !== pathname) {
          setIsNavigating(true);
          setProgress(10);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // Animate progress while navigating
  useEffect(() => {
    if (!isNavigating) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        // Slow down as we approach 90%
        const increment = Math.max(1, (90 - prev) / 10);
        return Math.min(90, prev + increment);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-[9999] h-1">
      <div
        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect */}
      <div
        className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-violet-400/50 to-transparent"
        style={{
          transform: `translateX(${progress < 100 ? 0 : 100}%)`,
          opacity: isNavigating ? 1 : 0
        }}
      />
    </div>
  );
}
