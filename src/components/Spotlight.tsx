"use client";

import { useCallback, useRef } from "react";
import type { MouseEvent } from "react";

interface SpotlightPosition {
  rect: DOMRect;
  scrollX: number;
  scrollY: number;
}

export function useSpotlight<T extends HTMLElement>() {
  const position = useRef<SpotlightPosition | null>(null);

  const onMouseEnter = useCallback((event: MouseEvent<T>) => {
    position.current = {
      rect: event.currentTarget.getBoundingClientRect(),
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    };
  }, []);

  const onMouseMove = useCallback((event: MouseEvent<T>) => {
    // Refresh the cached rect if the page scrolled while hovering.
    if (
      !position.current ||
      position.current.scrollX !== window.scrollX ||
      position.current.scrollY !== window.scrollY
    ) {
      position.current = {
        rect: event.currentTarget.getBoundingClientRect(),
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };
    }

    const { rect } = position.current;
    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`
    );
  }, []);

  return { onMouseEnter, onMouseMove };
}

export default function Spotlight() {
  return (
    <div
      aria-hidden="true"
      className="spotlight pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
    />
  );
}
