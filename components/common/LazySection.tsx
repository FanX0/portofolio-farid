"use client";

import { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  height?: string; // Expected height to prevent layout shift
  offset?: string; // Intersection observer margin (e.g., "200px")
}

/**
 * Defer rendering of children until they enter the viewport.
 * This is effective for reducing initial Main-Thread work as it 
 * prevents the underlying JS chunks from being hydrated/evaluated 
 * until they are actually needed.
 */
export default function LazySection({ 
  children, 
  height = "400px", 
  offset = "200px" 
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: offset }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [offset]);

  return (
    <div ref={containerRef} style={{ minHeight: isInView ? "auto" : height }}>
      {isInView ? children : null}
    </div>
  );
}
