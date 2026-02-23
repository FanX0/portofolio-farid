"use client";

import { useEffect, useRef } from "react";

export function useBreakpointReload(breakpoint: string = "(min-width: 80rem)") {
  const wasMatch = useRef<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint);

    wasMatch.current = mediaQuery.matches;

    const handleChange = (event: MediaQueryListEvent) => {
      if (wasMatch.current !== event.matches) {
        window.location.reload();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);
}
