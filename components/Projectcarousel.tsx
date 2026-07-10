"use client";

import { useState } from "react";
import Image from "next/image";

type CarouselImage = {
  src: string;
  alt: string;
};

export default function ProjectCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-charcoal/5">
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Ảnh trước"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-charcoal shadow-sm transition-colors hover:bg-ivory"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Ảnh tiếp theo"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-charcoal shadow-sm transition-colors hover:bg-ivory"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Xem ảnh ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-ivory" : "w-1.5 bg-ivory/50 hover:bg-ivory/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <p className="mt-3 text-xs text-charcoal/40 tracking-wide">
          {index + 1} / {images.length}
        </p>
      )}
    </div>
  );
}