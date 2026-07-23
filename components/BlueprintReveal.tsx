"use client";

/**
 * BlueprintReveal
 * ----------------------------------------------------------------------
 * A luxury, interactive "case study" section: one large hero photograph
 * sits at the centre of a dark architectural stage, surrounded by 5
 * clickable floor/area notes. Clicking a note opens a panel (a bottom
 * sheet on mobile, a centred dialog on desktop) with a title, a short
 * description and a 5-photo gallery for that floor.
 *
 * The component keeps the same name/export as the previous "blueprint
 * wipe" version so it can be dropped into existing pages without
 * touching imports elsewhere — only the props shape has changed to
 * become data-driven (see the usage guide at the bottom of this file).
 */

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** A single photo used either as the hero image or inside a gallery. */
export interface BlueprintImage {
  src: string;
  alt?: string;
}

/** One floating, clickable annotation around the hero photograph. */
export interface BlueprintNote {
  /** Stable identifier, also used as the React key. */
  id: string;
  /** Two-digit badge shown on the floating card, e.g. "01". */
  number: string;
  /** Short label shown on the floating card itself. */
  tag: string;
  /** Heading shown inside the opened panel. */
  title: string;
  /** Short supporting copy shown inside the opened panel. */
  description: string;
  /** Gallery photos shown inside the opened panel (ideally 5). */
  images: BlueprintImage[];
  /**
   * Desktop anchor point for the floating card, as a percentage of the
   * stage (e.g. { top: "8%", left: "6%" }). Ignored on mobile, where
   * notes collapse into a horizontal chip row beneath the photograph.
   */
  position: { top: string; left: string };
}

/** Optional "Dự án Đặc trưng" copy block, shown inside the header. */
export interface BlueprintFeatured {
  /** Small uppercase kicker, e.g. "Dự án Đặc trưng". */
  eyebrow?: string;
  /** Short descriptive paragraph about the project. */
  description: string;
  /** Href for the "Xem chi tiết dự án" link. */
  linkHref: string;
  /** Optional label override for the link. */
  linkLabel?: string;
}

export interface BlueprintRevealProps {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  /** Section title, set in the display serif. */
  title: string;
  /** Optional location line under the title. */
  location?: string;
  /** The large centred photograph. */
  mainImage: BlueprintImage;
  /** Exactly (or roughly) 5 clickable notes placed around the photo. */
  notes: BlueprintNote[];
  /**
   * Optional "Dự án Đặc trưng" description + link, rendered inside the
   * header beneath the title/location row (replaces the old standalone
   * section that used to sit below this component on the homepage).
   */
  featured?: BlueprintFeatured;
}

export default function BlueprintReveal({
  eyebrow = "Từ Bản vẽ → Đến Công trình",
  title,
  location,
  mainImage,
  notes,
  featured,
}: BlueprintRevealProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = notes.find((n) => n.id === activeId) ?? null;

  // Currently zoomed gallery photo (full-screen lightbox on top of the panel).
  const [zoomedImage, setZoomedImage] = useState<BlueprintImage | null>(null);

  const close = useCallback(() => setActiveId(null), []);
  const closeZoom = useCallback(() => setZoomedImage(null), []);

  // Close on Escape for keyboard users. Escape closes the zoomed photo
  // first, then the panel, one press at a time.
  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (zoomedImage) {
        closeZoom();
      } else {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, zoomedImage, close, closeZoom]);

  // Lock body scroll while the panel (or the zoomed photo) is open.
  useEffect(() => {
    if (!activeId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [activeId]);

  // Reset any zoomed photo whenever the panel itself closes or switches
  // to a different floor, so re-opening never resumes on a stale zoom.
  useEffect(() => {
    setZoomedImage(null);
  }, [activeId]);

  return (
    <section
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#0A1118" }}
    >
      {/* Subtle architectural grid — a whisper of drafting structure */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,184,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,184,150,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Ambient bronze bloom */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[36rem] w-[60rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,184,150,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Header */}
      <div className="container-x relative z-10 mb-14 md:mb-20">
        <SectionEyebrow dark>{eyebrow}</SectionEyebrow>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-serif text-ivory text-4xl md:text-6xl max-w-2xl text-balance">
            {title}
          </h2>
          {location && (
            <p className="text-ivory/50 md:text-right md:mb-1">{location}</p>
          )}
        </div>

        {/* "Dự án Đặc trưng" copy — merged in from the old standalone
            section that used to sit below this component. */}
        {featured && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mt-10 md:mt-14 pt-10 border-t border-champagne/10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="lg:col-span-9">
              <SectionEyebrow dark>
                {featured.eyebrow ?? "Dự án Đặc trưng"}
              </SectionEyebrow>
              <p className="text-ivory/60 leading-relaxed text-lg max-w-none">
                {featured.description}
              </p>
            </div>
            <div className="lg:col-span-3 lg:col-start-10 flex items-start lg:items-end lg:justify-end">
              <Link
                href={featured.linkHref}
                data-cursor
                className="eyebrow text-ivory border-b border-champagne/40 pb-1 hover:text-champagne hover:border-champagne transition-all duration-300 tracking-widest3"
              >
                {featured.linkLabel ?? "Xem chi tiết dự án"}
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stage: hero photograph + floating notes (desktop/tablet) */}
      <div className="container-x relative z-10 hidden md:block">
        <div className="relative mx-auto max-w-6xl aspect-[16/10] md:aspect-[16/11] lg:aspect-[16/12]">
          {/* Hero photograph — no frame/border, sized generously so it
              reads as the dominant object on the stage. The outer div
              handles the "dim while a note is open" state; the inner
              motion.div handles the one-time scroll-in entrance. */}
          <div
            className="img-zoom absolute inset-x-[13%] inset-y-[2%] shadow-lifted"
            style={{
              filter: active ? "blur(2px)" : "none",
              opacity: active ? 0.35 : 1,
              transition: "opacity 0.5s ease, filter 0.5s ease",
            }}
          >
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: EASE }}
            >
              <Image
                src={mainImage.src}
                alt={mainImage.alt ?? title}
                fill
                sizes="(min-width: 1024px) 70vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/50 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Floating, clickable notes — each one gets a thin connector
              line + dot that reaches toward the photograph, so the note
              visually reads as "pinned" to the image rather than just
              floating loose in space. */}
          <div>
            {notes.map((note, index) => {
              const isActive = note.id === activeId;
              const isDimmed = !!activeId && !isActive;

              // Work out which side of the note the connector should
              // leave from, based on where the note sits on the stage.
              const leftNum = parseFloat(note.position.left);
              const topNum = parseFloat(note.position.top);
              const isNearHorizontalCenter = Math.abs(leftNum - 50) < 15;
              const side: "left" | "right" | "top" | "bottom" =
                isNearHorizontalCenter
                  ? topNum < 50
                    ? "bottom"
                    : "top"
                  : leftNum < 50
                  ? "right"
                  : "left";
              const isRow = side === "left" || side === "right";
              // Card always renders last in reading order for a11y; the
              // connector's dot/line are purely decorative and ordered
              // visually via flex `order` depending on which side they're on.
              const dotOrder = side === "right" || side === "bottom" ? 3 : 1;
              const cardOrder = side === "right" || side === "bottom" ? 1 : 3;

              return (
                // Positioning wrapper: owns the exact top/left anchor and
                // centring translate — untouched by the entrance animation
                // below, so notes always land exactly where `position` says.
                <div
                  key={note.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: note.position.top,
                    left: note.position.left,
                    opacity: isDimmed ? 0.28 : 1,
                    filter: isDimmed ? "saturate(0.5)" : "none",
                    transition: "opacity 0.5s ease, filter 0.5s ease",
                  }}
                >
                  {/* Entrance wrapper: fades/slides in once when scrolled
                      into view. Kept separate from the div above so this
                      can never get stuck hidden if a scroll calculation
                      goes wrong — worst case it simply renders instantly. */}
                  <motion.div
                    className="flex items-center"
                    style={{
                      flexDirection: isRow ? "row" : "column",
                      gap: "6px",
                    }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                      delay: index * 0.08,
                    }}
                  >
                  {/* dot, anchored on the photo side */}
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      order: dotOrder,
                      backgroundColor: "#C9B896",
                      boxShadow: isActive
                        ? "0 0 8px 2px rgba(201,184,150,0.7)"
                        : "0 0 6px 1.5px rgba(201,184,150,0.4)",
                    }}
                  />
                  {/* connector line */}
                  <span
                    aria-hidden
                    className="shrink-0"
                    style={{
                      order: 2,
                      backgroundColor: "rgba(201,184,150,0.5)",
                      width: isRow ? "38px" : "1px",
                      height: isRow ? "1px" : "38px",
                    }}
                  />
                  {/* the clickable card itself */}
                  <button
                    onClick={() => setActiveId(note.id)}
                    aria-haspopup="dialog"
                    aria-expanded={isActive}
                    aria-label={`Xem chi tiết: ${note.title}`}
                    className="group flex w-[240px] shrink-0 items-center gap-3 border px-4 py-3 text-left backdrop-blur-sm transition-all duration-500 ease-luxury"
                    style={{
                      order: cardOrder,
                      backgroundColor: "rgba(10,17,24,0.6)",
                      borderColor: isActive
                        ? "rgba(201,184,150,0.75)"
                        : "rgba(201,184,150,0.18)",
                    }}
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-light transition-colors duration-500"
                      style={{
                        borderColor: "rgba(201,184,150,0.55)",
                        color: "#C9B896",
                      }}
                    >
                      {note.number}
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="eyebrow text-champagne/80 text-[9px] tracking-widest2">
                        Xem chi tiết
                      </span>
                      <span className="font-serif text-ivory text-sm leading-snug group-hover:text-champagne transition-colors duration-300">
                        {note.tag}
                      </span>
                    </span>
                  </button>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: static photo + horizontal chip row beneath it */}
      <div className="container-x relative z-10 md:hidden">
        <div className="img-zoom relative aspect-[4/5] w-full rounded-sm shadow-lifted">
          <Image
            src={mainImage.src}
            alt={mainImage.alt ?? title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/60 via-transparent to-transparent" />
        </div>

        <div className="mt-6 -mx-6 flex gap-3 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveId(note.id)}
              aria-haspopup="dialog"
              className="flex shrink-0 items-center gap-2.5 border border-champagne/20 bg-[#0D141B] px-4 py-3 active:border-champagne/60 transition-colors"
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[9px] font-light"
                style={{ borderColor: "rgba(201,184,150,0.55)", color: "#C9B896" }}
              >
                {note.number}
              </span>
              <span className="whitespace-nowrap font-serif text-ivory text-sm">
                {note.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel: centred dialog on desktop, bottom sheet on mobile */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[100] flex items-end justify-center lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={close}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ backgroundColor: "rgba(5,8,12,0.82)" }}
            />

            {/* Panel */}
            <motion.div
              className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-2xl border-t lg:rounded-sm lg:border lg:max-w-3xl"
              style={{
                backgroundColor: "#0D141B",
                borderColor: "rgba(201,184,150,0.18)",
              }}
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle, mobile only */}
              <div className="flex justify-center pt-3 lg:hidden">
                <span className="h-1 w-10 rounded-full bg-champagne/25" />
              </div>

              <div className="relative p-7 md:p-10">
                {/* Close button */}
                <button
                  onClick={close}
                  aria-label="Đóng"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border text-ivory/60 transition-colors duration-300 hover:border-champagne/60 hover:text-champagne"
                  style={{ borderColor: "rgba(201,184,150,0.25)" }}
                >
                  <span className="text-lg leading-none">×</span>
                </button>

                <p className="eyebrow text-champagne/70 mb-3">
                  {active.number} · {title}
                </p>
                <h3 className="font-serif text-ivory text-2xl md:text-4xl max-w-xl text-balance mb-4">
                  {active.title}
                </h3>
                <p className="text-ivory/60 leading-relaxed max-w-xl mb-8">
                  {active.description}
                </p>

                {/* Gallery — click any photo to open it full-screen */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {active.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setZoomedImage(img)}
                      aria-label={`Phóng to ảnh: ${
                        img.alt ?? `${active.title} — ảnh ${i + 1}`
                      }`}
                      className="img-zoom group relative aspect-[4/3] cursor-zoom-in overflow-hidden border"
                      style={{ borderColor: "rgba(201,184,150,0.12)" }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt ?? `${active.title} — ảnh ${i + 1}`}
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                      />
                      {/* Hover affordance so it reads as clickable, not just decorative */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ backgroundColor: "rgba(10,17,24,0.35)" }}
                      >
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full border text-champagne"
                          style={{
                            borderColor: "rgba(201,184,150,0.55)",
                            backgroundColor: "rgba(10,17,24,0.6)",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="11" cy="11" r="7" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen photo lightbox. Rendered as its own top-level layer
          (a sibling of the panel above, not nested inside it) so its
          `position: fixed` always sizes against the viewport — nesting it
          inside the panel's motion.div would break that, since framer-motion
          animates the panel with a CSS transform, and any transformed
          ancestor becomes the containing block for fixed-position
          descendants instead of the viewport.
          z-index is kept BELOW the site's custom cursor (CustomCursor.tsx
          renders its dot/ring at z-[200]). The native browser cursor is
          hidden globally via `cursor: none` while custom-cursor is active,
          so if this overlay matched or exceeded z-[200] it would paint over
          the cursor dot/ring — leaving no cursor visible at all while a
          photo is zoomed in. */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={zoomedImage.alt ?? title}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={closeZoom}
          >
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ backgroundColor: "rgba(5,8,12,0.92)" }}
            />

            <button
              type="button"
              onClick={closeZoom}
              aria-label="Đóng ảnh"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border text-ivory/70 transition-colors duration-300 hover:border-champagne/60 hover:text-champagne md:right-8 md:top-8"
              style={{ borderColor: "rgba(201,184,150,0.3)" }}
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <motion.div
              className="relative z-10 h-full w-full max-w-5xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.alt ?? title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------------
 * USAGE
 * ------------------------------------------------------------------------
 *
 * import BlueprintReveal from "@/components/BlueprintReveal";
 *
 * <BlueprintReveal
 *   eyebrow="Từ Bản vẽ → Đến Công trình"
 *   title={signature.name}
 *   location={signature.location}
 *   mainImage={{ src: signature.image, alt: signature.name }}
 *   notes={[
 *     {
 *       id: "ground-floor",
 *       number: "01",
 *       tag: "Tầng trệt",
 *       title: "Tầng Trệt — Sảnh Chính",
 *       description: "Mô tả ngắn về khu vực sảnh chính tầng trệt...",
 *       images: [{ src: "/images/sih-lobby.jpg" }, ...],
 *       position: { top: "8%", left: "4%" },
 *     },
 *     // ...4 more notes
 *   ]}
 *   featured={{
 *     eyebrow: "Dự án Đặc trưng",
 *     description: signature.detail,
 *     linkHref: `/portfolio/${signature.slug}`,
 *   }}
 * />
 *
 * See lib/data.ts (sihFloors export) for a ready-made data set wired to
 * the SIH hospital project used on the homepage.
 * ---------------------------------------------------------------------- */
