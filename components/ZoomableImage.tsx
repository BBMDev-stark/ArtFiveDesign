"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

type ZoomableImageProps = {
  src: string;
  alt: string;
  /** classes applied to the inline (small) image */
  imageClassName?: string;
  /** classes applied to the button wrapping the inline image */
  wrapperClassName?: string;
  sizes?: string;
  /** overlays rendered on top of the inline image, e.g. frame border, name tag */
  children?: ReactNode;
  /** use for scanned documents / portrait certificates so the full page is visible when zoomed */
  fit?: "cover" | "contain";
};

/**
 * Wrap any <Image fill> content with this to get a click-to-enlarge lightbox.
 * Usage:
 *   <div className="relative aspect-[4/5]">
 *     <ZoomableImage src={member.image} alt={member.name} imageClassName="object-cover" />
 *   </div>
 */
export default function ZoomableImage({
  src,
  alt,
  imageClassName = "",
  wrapperClassName = "",
  sizes = "100vw",
  children,
  fit = "cover",
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block h-full w-full cursor-zoom-in ${wrapperClassName}`}
        aria-label={`Xem ảnh lớn: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`${fit === "cover" ? "object-cover" : "object-contain"} ${imageClassName}`}
        />
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-6 backdrop-blur-sm md:p-14"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="eyebrow absolute right-6 top-6 text-xs tracking-widest3 text-ivory/70 transition-colors hover:text-ivory md:right-10 md:top-10"
          >
            Đóng ✕
          </button>
          <div
            className="relative h-full w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}   