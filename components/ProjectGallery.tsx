"use client";

/**
 * ProjectGallery
 * ----------------------------------------------------------------------
 * Renders the masonry image grid on the project detail page and adds a
 * click-to-view lightbox: clicking any thumbnail opens that photo full
 * size over a dark backdrop, with Prev/Next navigation, a close button,
 * keyboard support (Esc / ← / →), and body-scroll lock while open.
 */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export default function ProjectGallery({
  images,
}: {
  images: ProjectGalleryImage[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  // Keyboard support while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, showPrev, showNext]);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      {/* Masonry thumbnail grid — same layout as before, now clickable */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Xem ảnh lớn: ${img.alt}`}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl cursor-zoom-in"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-sm font-medium tracking-wide">
                {index === 0 ? "Toàn cảnh công trình" : `Chi tiết ${index}`}
              </p>
            </div>
          </button>
        ))}
      </div>

      {images.length > 8 && (
        <div className="text-center mt-10">
          <p className="eyebrow text-charcoal/50 text-xs tracking-widest">
            Kéo xuống để xem thêm hình ảnh • Scroll to explore
          </p>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={close}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ backgroundColor: "rgba(5,8,12,0.9)" }}
            />

            {/* Close button */}
            <button
              onClick={close}
              aria-label="Đóng"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border text-ivory/70 transition-colors duration-300 hover:border-champagne/60 hover:text-champagne"
              style={{ borderColor: "rgba(201,184,150,0.25)" }}
            >
              <span className="text-xl leading-none">×</span>
            </button>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Ảnh trước"
                  className="absolute left-3 md:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border text-ivory/70 transition-colors duration-300 hover:border-champagne/60 hover:text-champagne"
                  style={{ borderColor: "rgba(201,184,150,0.25)" }}
                >
                  <span className="text-xl leading-none">←</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-3 md:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border text-ivory/70 transition-colors duration-300 hover:border-champagne/60 hover:text-champagne"
                  style={{ borderColor: "rgba(201,184,150,0.25)" }}
                >
                  <span className="text-xl leading-none">→</span>
                </button>
              </>
            )}

            {/* Full-size image */}
            <motion.div
              className="relative z-10 mx-auto h-[80vh] w-[92vw] md:w-[85vw]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Caption + index counter */}
            <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center">
              <p className="font-serif text-ivory/90 text-sm md:text-base mb-1">
                {active.alt}
              </p>
              {images.length > 1 && (
                <p className="eyebrow text-champagne/70 text-xs">
                  {(activeIndex as number) + 1} / {images.length}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}