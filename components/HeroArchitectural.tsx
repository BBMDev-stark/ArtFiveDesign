"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Art-direction constants — kept local to this component so the rest of
 * the site's design tokens (ink/champagne/ivory in tailwind.config) are
 * untouched. Values match the reference brief exactly. */
const C = {
  bg: "#0B0B0B",
  bg2: "#111111",
  champagne: "#C8B08A",
  text: "#F5F1EB",
  muted: "rgba(245,241,235,0.58)",
  grid: "rgba(255,255,255,0.03)",
  divider: "rgba(255,255,255,0.06)",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** 5 numbered annotations that point out from the house photo itself.
 * left/top = the exact anchor point ON the building (as a % of the frame,
 * which has zero letterboxing for slot 0 since the frame's aspect ratio
 * matches the source image exactly). angle = tilt of the connector line
 * fanning out from that point toward the label, in degrees. */
const annotations = [
  {
    id: "01",
    label: "Hệ Mái",
    title: "Hệ Mái Bằng Hiện Đại",
    description:
      "Thiết kế mái bằng hiện đại, tối ưu thoát nước và cách nhiệt, phù hợp với khí hậu Việt Nam.",
    left: "40%",
    top: "6%",
    angle: -8,
  },
  {
    id: "02",
    label: "Mặt Dựng Kính",
    title: "Mặt Dựng Kính",
    description:
      "Hệ kính lớn tối ưu ánh sáng tự nhiên và tầm nhìn, kết hợp với khung nhôm cao cấp.",
    left: "60%",
    top: "24%",
    angle: -4,
  },
  {
    id: "03",
    label: "Tường Bê Tông",
    title: "Tường Bê Tông Hoàn Thiện",
    description:
      "Vật liệu bê tông hoàn thiện cao cấp, bền vững theo thời gian với vẻ đẹp hiện đại.",
    left: "78%",
    top: "44%",
    angle: 3,
  },
  {
    id: "04",
    label: "Sân Vườn Xanh",
    title: "Không Gian Xanh",
    description:
      "Không gian xanh được tích hợp hài hòa trong kiến trúc tổng thể, tạo sự cân bằng với thiên nhiên.",
    left: "81%",
    top: "65%",
    angle: 10,
  },
  {
    id: "05",
    label: "Ánh Sáng",
    title: "Hệ Thống Chiếu Sáng",
    description:
      "Hệ thống chiếu sáng thông minh, tôn vinh kiến trúc và không gian một cách tinh tế.",
    left: "26%",
    top: "89%",
    angle: 16,
  },
];

/**
 * 5 numbers on the left, each swaps the house photo on the right.
 * Slot 0 uses the client's own AI-generated villa render. The rest use
 * ARTFIVE's own completed projects.
 */
const houses = [
  { id: 0, src: "/images/TieuBieu2.svg", name: "Villa Concept" },
  { id: 1, src: "/images/TieuBieu1.svg", name: "Concept H.O. 2" },
  { id: 2, src: "/images/BenhVienSIH.svg", name: "Hospital SIH" },
  { id: 3, src: "/images/TieuBieu3.svg", name: "Pullman Hải Phòng" },
  { id: 4, src: "/images/TieuBieu4.svg", name: "Trụ sở CPV Food" },
  { id: 4, src: "/images/singapo.svg", name: "Bệnh viện Đa khoa Singapore" },
];

const stats = [
  { value: "15+", label: "Năm Kinh Nghiệm" },
  { value: "250+", label: "Dự Án Hoàn Thành" },
  { value: "98%", label: "Khách Hàng Hài Lòng" },
];

export default function HeroArchitectural() {
  const [activeHouse, setActiveHouse] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const active = annotations.find((a) => a.id === openId) ?? null;

  return (
    <section
      className="relative min-h-[100vh] lg:h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: C.bg }}
    >
      {/* Blueprint grid — nearly invisible, just a whisper of structure */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />

      {/* Ambient bloom — warm light bleeding softly into the dark field */}
      <div
        className="absolute top-[10%] right-[18%] h-[46rem] w-[46rem] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(200,176,138,0.10) 0%, transparent 68%)`,
          filter: "blur(60px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-[38%] h-[30rem] w-[30rem] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(200,176,138,0.06) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      {/* Top-left study badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="absolute left-6 top-24 lg:left-12 lg:top-28 z-20 hidden sm:flex items-center gap-3"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full border text-[9px] font-light"
          style={{ borderColor: "rgba(200,176,138,0.35)", color: C.champagne }}
        >
          A1
        </span>
        <span
          className="text-[9px] font-light uppercase"
          style={{ color: "rgba(245,241,235,0.4)", letterSpacing: "0.38em" }}
        >
          Nghiên cứu Khối lượng
        </span>
      </motion.div>

      <div className="relative z-10 h-full pt-28 lg:pt-0 pb-8 lg:pb-0 flex flex-col lg:block">
        {/* Mobile & tablet title */}
        <div className="lg:hidden px-6 mb-8">
          <p
            className="text-[9px] font-light uppercase mb-3"
            style={{ color: "rgba(200,176,138,0.85)", letterSpacing: "0.35em" }}
          >
            Thiết kế Kiến trúc & Nội thất · 2009
          </p>
          <h1
            className="font-serif text-[2.1rem] leading-[1.18] font-light tracking-tight"
            style={{ color: C.text }}
          >
            Không gian được xây dựng{" "}
            <em className="italic font-normal" style={{ color: C.champagne }}>
              để vượt qua mọi xu hướng
            </em>
          </h1>
        </div>

        {/* Left vertical nav — the 5 numbers, one per house photo */}
        <nav
          aria-label="Chọn phối cảnh biệt thự"
          className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 z-20"
        >
          {houses.map((h, i) => (
            <motion.button
              key={h.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 + i * 0.06 }}
              className="group flex items-center gap-4 text-left"
              onClick={() => setActiveHouse(i)}
              aria-label={`Xem ${h.name}`}
              aria-pressed={activeHouse === i}
            >
              <span
                className="h-px transition-all ease-[cubic-bezier(.16,1,.3,1)] duration-500"
                style={{
                  width: activeHouse === i ? "2.75rem" : "1rem",
                  backgroundColor:
                    activeHouse === i ? C.champagne : "rgba(245,241,235,0.2)",
                }}
              />
              <span
                className="text-[10px] font-light tabular-nums transition-colors duration-500"
                style={{
                  color: activeHouse === i ? C.champagne : "rgba(245,241,235,0.32)",
                  letterSpacing: "0.1em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </nav>

        {/* Left text content (desktop) — occupies the ~43% column, vertically
            centered against the villa's midline */}
        <div className="absolute left-[9%] xl:left-[18%] top-1/2 -translate-y-1/2 hidden lg:block max-w-[30%] xl:max-w-[420px] z-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="text-[10px] font-light uppercase mb-6"
            style={{ color: "rgba(200,176,138,0.85)", letterSpacing: "0.4em" }}
          >
            Thiết kế Kiến trúc &amp; Nội thất · TP. Hồ Chí Minh · 2009
          </motion.p>

          <h1
            className="font-serif leading-[1.14] mb-7"
            style={{
              color: C.text,
              fontWeight: 340,
              fontSize: "clamp(2.4rem, 3.1vw, 3.6rem)",
              letterSpacing: "-0.01em",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="block"
            >
              Không gian được xây dựng
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.45 }}
              className="block italic font-normal mt-1"
              style={{ color: C.champagne }}
            >
              để vượt qua mọi xu hướng
            </motion.em>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            className="font-light mb-9 max-w-[360px]"
            style={{ color: C.muted, fontSize: "15px", lineHeight: 1.9 }}
          >
            ARTFIVE DESIGN thiết kế và xây dựng nội thất y tế, khách sạn, văn
            phòng, công nghiệp và nhà ở trên khắp Việt Nam và Singapore.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            href="/portfolio"
            data-cursor
            className="group relative inline-flex items-center gap-3 border px-6 py-3 uppercase"
            style={{
              borderColor: "rgba(245,241,235,0.16)",
              color: C.champagne,
              fontSize: "10.5px",
              letterSpacing: "0.32em",
            }}
          >
            <span className="relative">
              Khám Phá Dự Án
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full"
                style={{ backgroundColor: C.champagne }}
              />
            </span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5"
            >
              →
            </span>
          </motion.a>
        </div>

        {/* Right side — the villa render, already isolated on black by the
            source image itself, so no heavy masking is needed */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[62%] w-full mt-6 lg:mt-0 px-6 lg:pl-0 lg:pr-8 xl:pr-12 lg:flex lg:flex-col lg:items-center lg:justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: EASE }}
            className="relative w-full sm:w-[92%] lg:w-[86%] xl:w-[82%] aspect-[4/3] lg:mr-[4%] xl:mr-[5%] lg:mt-[3%]"
          >
            {/* faint contact shadow for grounding */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-[3%] w-[55%] h-[10%] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 74%)",
                filter: "blur(14px)",
              }}
              aria-hidden
            />

            {/* the villa — source is already isolated on near-black, only a
                light edge-feather is needed as insurance, no hard crop */}
            <div
              className="absolute inset-0"
              style={{
                maskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 48%, black 78%, transparent 99%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 78% at 50% 48%, black 78%, transparent 99%)",
              }}
            >
              {houses.map((house, i) => (
                <div
                  key={house.id}
                  className={`absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                    activeHouse === i ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* very slow idle zoom */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 32, ease: "easeInOut", repeat: Infinity }}
                  >
                    <Image
                      src={house.src}
                      alt={house.name}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1024px) 94vw, 55vw"
                      className="object-contain"
                      style={{ filter: "brightness(0.97) contrast(1) saturate(0.92)" }}
                      quality={90}
                    />
                  </motion.div>

                  {/* faint warm bloom near the interior lights, kept subtle */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(50% 45% at 55% 45%, rgba(200,176,138,0.05) 0%, transparent 72%)",
                    }}
                  />
                </div>
              ))}
            </div>

          {/* minimal blueprint-style label, sits above the object like an exhibition placard */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="absolute -top-9 left-0 z-10"
          >
            <p
              className="text-[9px] uppercase font-light pb-1 border-b"
              style={{
                color: C.champagne,
                letterSpacing: "0.32em",
                borderColor: "rgba(200,176,138,0.3)",
              }}
            >
              {houses[activeHouse].name}
            </p>
          </motion.div>

          {/* Desktop annotations — thin diagonal connector from a point on
              the building out to a small numbered badge + label, matching
              the architectural-blueprint reference exactly */}
          <div className="hidden lg:block">
            {annotations.map((annot, idx) => (
              <motion.div
                key={annot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 1.1 + idx * 0.1 }}
                className="absolute z-20 flex items-center"
                style={{ left: annot.left, top: annot.top }}
              >
                {/* dot marker exactly on the building */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: C.champagne,
                    boxShadow: `0 0 7px 1.5px rgba(200,176,138,0.55)`,
                  }}
                  aria-hidden
                />
                {/* diagonal connector line, fanning outward */}
                <span
                  className="h-px origin-left"
                  style={{
                    width: "3.75rem",
                    marginLeft: "6px",
                    backgroundColor: "rgba(200,176,138,0.55)",
                    transform: `rotate(${annot.angle}deg)`,
                  }}
                  aria-hidden
                />
                {/* numbered badge */}
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[7.5px] font-light ml-2"
                  style={{ borderColor: "rgba(200,176,138,0.55)", color: C.champagne }}
                >
                  {annot.id}
                </span>
                {/* label + description — always visible, no box, no shadow */}
                <div className="ml-3 max-w-[185px]">
                  <p
                    className="text-[9.5px] font-light uppercase"
                    style={{ color: C.champagne, letterSpacing: "0.24em" }}
                  >
                    {annot.label}
                  </p>
                  <p
                    className="font-light mt-1"
                    style={{
                      color: "rgba(245,241,235,0.58)",
                      fontSize: "10.5px",
                      lineHeight: 1.65,
                    }}
                  >
                    {annot.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>

          {/* Mobile: annotation chips that open a modal */}
          <div className="lg:hidden mt-5 grid grid-cols-5 gap-2 px-1">
            {annotations.map((annot) => (
              <button
                key={annot.id}
                onClick={() => setOpenId(annot.id)}
                className="flex flex-col items-center gap-1.5 py-2.5 border"
                style={{ borderColor: "rgba(200,176,138,0.18)" }}
                aria-label={`Xem chi tiết: ${annot.title}`}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full border text-[9px]"
                  style={{ borderColor: "rgba(200,176,138,0.5)", color: C.champagne }}
                >
                  {annot.id}
                </span>
                <span
                  className="text-[8px] uppercase text-center leading-tight"
                  style={{ color: "rgba(245,241,235,0.55)", letterSpacing: "0.06em" }}
                >
                  {annot.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile modal for annotation detail */}
      <AnimatePresence>
        {isMobile && active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(11,11,11,0.75)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              className="relative w-full sm:max-w-sm border p-7"
              style={{ backgroundColor: C.bg2, borderColor: "rgba(200,176,138,0.18)" }}
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenId(null)}
                aria-label="Đóng"
                className="absolute top-4 right-4 text-lg leading-none"
                style={{ color: "rgba(245,241,235,0.5)" }}
              >
                ×
              </button>
              <p
                className="text-[9px] font-light mb-4"
                style={{ color: "rgba(200,176,138,0.55)", letterSpacing: "0.2em" }}
              >
                {active.id}
              </p>
              <h3
                className="font-serif text-xl mb-3"
                style={{ color: C.text, fontWeight: 380 }}
              >
                {active.title}
              </h3>
              <p
                className="font-light"
                style={{ color: C.muted, fontSize: "14px", lineHeight: 1.8 }}
              >
                {active.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom information strip — thin, spacious, architectural */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        className="absolute bottom-0 left-0 right-0 z-20 border-t backdrop-blur-[2px]"
        style={{ borderColor: C.divider, backgroundColor: "rgba(11,11,11,0.4)" }}
      >
        <div className="px-6 lg:px-12 py-4 lg:py-5">
          <div className="flex flex-wrap items-center justify-between gap-5 lg:gap-12">
            <div className="flex items-center gap-3">
              <span
                className="h-5 w-5 rounded-full border flex items-center justify-center text-[9px]"
                style={{ borderColor: "rgba(200,176,138,0.4)", color: C.champagne }}
              >
                ↓
              </span>
              <span
                className="text-[9px] uppercase"
                style={{ color: "rgba(245,241,235,0.4)", letterSpacing: "0.34em" }}
              >
                Scroll to Explore
              </span>
            </div>
            <div className="flex items-center gap-7 lg:gap-14">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2.5">
                  <span
                    className="font-serif"
                    style={{ color: C.text, fontSize: "15px", fontWeight: 340 }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[8.5px] uppercase"
                    style={{ color: "rgba(245,241,235,0.4)", letterSpacing: "0.24em" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}