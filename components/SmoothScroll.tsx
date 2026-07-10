"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Safety net for GSAP's ScrollTrigger `pin: true` (used by BlueprintReveal).
  // Pinning inserts a "pin-spacer" wrapper and inline `position: fixed`
  // styles directly into the DOM, outside React's control. If a pinned
  // section's own cleanup doesn't finish before Next.js swaps in the next
  // page, the pinned element can be left stuck on screen, floating over
  // the new page's content. Killing every ScrollTrigger on every route
  // change guarantees nothing is ever left behind, regardless of which
  // component created it.
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Defensive guard: some browser extensions (Google Translate, Grammarly,
    // password managers) insert their own nodes into the DOM outside React's
    // control. When React later tries to remove/reorder a node it thinks it
    // owns, the browser throws "Failed to execute 'removeChild'/'insertBefore'
    // on 'Node'" because the extension already moved or removed it.
    //
    // This only swallows the specific NotFoundError that occurs when the
    // call actually fails -- it always attempts the real DOM operation first
    // via try/catch, so normal React-owned operations (including GSAP/
    // ScrollTrigger cleanup) are never silently skipped. A parentNode-check
    // approach instead can accidentally block legitimate removes/inserts and
    // leave stale nodes visible on screen, so it must not be used here.
    if (typeof Node === "function" && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        try {
          return originalRemoveChild.call(this, child) as T;
        } catch (e) {
          if (e instanceof DOMException && e.name === "NotFoundError") {
            return child;
          }
          throw e;
        }
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(
        newNode: T,
        referenceNode: Node | null
      ): T {
        try {
          return originalInsertBefore.call(this, newNode, referenceNode) as T;
        } catch (e) {
          if (e instanceof DOMException && e.name === "NotFoundError") {
            return newNode;
          }
          throw e;
        }
      };
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Only apply smooth scroll on devices that can handle it well
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if (prefersReduced || isMobile || isLowPower) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // Higher lerp = snappier, less trailing lag behind the wheel
      lerp: 0.15,
    });

    // Keep ScrollTrigger's internal scroll position in sync with Lenis's
    // virtual (transformed) scroll instead of the native window scroll.
    // Without this, ScrollTrigger and Lenis calculate positions
    // independently, which can make pinned sections (like BlueprintReveal)
    // end at the wrong scroll offset and never fully unpin.
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}