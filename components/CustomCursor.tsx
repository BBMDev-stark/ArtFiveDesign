"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const init = useCallback(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const on = isFine && !prefersReduced;
    setEnabled(on);
    document.documentElement.classList.toggle("custom-cursor", on);
  }, []);

  useEffect(() => {
    init();
    return () => document.documentElement.classList.remove("custom-cursor");
  }, [init]);

  useEffect(() => {
    if (!enabled) return;

    let targetX = 0;
    let targetY = 0;
    let currentHovering = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor]"
      );
      currentHovering = Boolean(el);
      if (currentHovering !== hovering) {
        setHovering(currentHovering);
      }
    };

    // Optimized animation loop with reduced frequency
    let frameCount = 0;
    const tick = () => {
      frameCount++;
      // Update ring position every other frame for better performance
      if (frameCount % 2 === 0) {
        const lerp = 0.18;
        ringPositionRef.current.x += (targetX - ringPositionRef.current.x) * lerp;
        ringPositionRef.current.y += (targetY - ringPositionRef.current.y) * lerp;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPositionRef.current.x}px, ${ringPositionRef.current.y}px, 0) translate(-50%, -50%)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled, hovering]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-bronze"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-bronze/60 transition-[width,height,opacity] duration-300 ease-out ${
          hovering ? "h-12 w-12 opacity-100" : "h-7 w-7 opacity-60"
        }`}
      />
    </>
  );
}