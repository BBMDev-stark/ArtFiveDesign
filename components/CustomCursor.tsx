"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const latestPoint = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nextEnabled = finePointer && !reduceMotion;

    setEnabled(nextEnabled);
    document.documentElement.classList.toggle("custom-cursor", nextEnabled);

    return () => document.documentElement.classList.remove("custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const paint = () => {
      const { x, y } = latestPoint.current;
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
      );
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
      );
      frameRef.current = null;
    };

    const onMove = (event: PointerEvent) => {
      latestPoint.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(paint);
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const nextHovering = Boolean(
        target?.closest?.("a, button, [data-cursor]"),
      );
      if (nextHovering !== hoverRef.current) {
        hoverRef.current = nextHovering;
        setHovering(nextHovering);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[210] h-1.5 w-1.5 rounded-full bg-bronze"
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[210] rounded-full border border-bronze/60 transition-[transform,width,height,opacity] duration-200 ease-out ${
          hovering ? "h-12 w-12 opacity-100" : "h-7 w-7 opacity-60"
        }`}
      />
    </>
  );
}
