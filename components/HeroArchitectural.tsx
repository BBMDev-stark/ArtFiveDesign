"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const C = {
  bg: "#0B0B0B",
  panel: "#12110F",
  champagne: "#C8B08A",
  text: "#F5F1EB",
  muted: "rgba(245,241,235,0.58)",
  grid: "rgba(255,255,255,0.026)",
  divider: "rgba(255,255,255,0.09)",
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Annotation = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  side?: "left" | "right";
};

type Project = {
  id: number;
  slug: string;
  src: string;
  name: string;
  type: string;
  location: string;
  scope: string;
  summary: string;
  annotations: Annotation[];
};

/**
 * Copy is intentionally tied to what can be read from each showcase image.
 * The hotspot coordinates are percentages of the 4:3 image stage, so every
 * marker stays attached to its own project instead of reusing one layout.
 */
const projects: Project[] = [
  {
    id: 0,
    slug: "himlam-tan-hung-villa",
    src: "/images/TieuBieu2.webp",
    name: "Biệt thự Him Lam Tân Hưng",
    type: "Nhà ở",
    location: "Quận 7, TP. Hồ Chí Minh",
    scope: "Kiến trúc & Nội thất",
    summary:
      "Mặt tiền được tổ chức theo nhịp đứng rõ ràng, kết hợp các lớp mái, vòm và ánh sáng để tạo chiều sâu cho một khu đất đô thị hẹp.",
    annotations: [
      {
        id: "01",
        title: "Các lớp mái dốc",
        description:
          "Ba lớp mái tạo đường chân trời có thứ bậc, giúp khối nhà cao và hẹp có tỷ lệ cân bằng hơn.",
        x: 46,
        y: 18,
        side: "right",
      },
      {
        id: "02",
        title: "Nhịp vòm mặt tiền",
        description:
          "Hệ vòm lặp lại theo phương đứng liên kết các tầng và tạo những lớp bóng đổ rõ trên mặt đứng.",
        x: 49,
        y: 31,
        side: "right",
      },
      {
        id: "03",
        title: "Ánh sáng chân công trình",
        description:
          "Các điểm sáng thấp nhấn lối vào, bồn cây và mép sân thay vì chiếu phẳng toàn bộ mặt tiền.",
        x: 60,
        y: 87,
        side: "left",
      },
    ],
  },
  {
    id: 1,
    slug: "concept-ho2-cp-group",
    src: "/images/TieuBieu1.webp",
    name: "Concept H.O. 2",
    type: "Văn phòng",
    location: "Biên Hòa, Việt Nam",
    scope: "Thiết kế ý tưởng",
    summary:
      "Một nghiên cứu trụ sở doanh nghiệp, trong đó các lớp mặt đứng được dùng để điều tiết tỷ lệ khối và tạo nhận diện từ xa.",
    annotations: [
      {
        id: "01",
        title: "Khối chính",
        description:
          "Khối tích trung tâm được giữ liền mạch để hình ảnh trụ sở dễ nhận biết trong tổng thể khuôn viên.",
        x: 51,
        y: 33,
        side: "right",
      },
      {
        id: "02",
        title: "Lớp mặt đứng",
        description:
          "Các đường ngang và mảng đặc–rỗng chia nhỏ tỷ lệ công trình, đồng thời tạo chiều sâu thị giác.",
        x: 61,
        y: 50,
        side: "right",
      },
      {
        id: "03",
        title: "Khoảng tiếp cận",
        description:
          "Phần đế mở rộng tạo vùng chuyển tiếp rõ ràng giữa giao thông phía trước và lối vào chính.",
        x: 46,
        y: 72,
        side: "left",
      },
    ],
  },
  {
    id: 2,
    slug: "sih-hospital",
    src: "/images/BenhVienSIH.webp",
    name: "Bệnh viện SIH",
    type: "Y tế",
    location: "Quận 1, TP. Hồ Chí Minh",
    scope: "Thiết kế & Thi công nội thất",
    summary:
      "Công trình y tế được đọc như một tổ hợp nhiều lớp, với khối đế tiếp cận rõ ràng và nhịp mặt đứng giúp giảm cảm giác nặng của quy mô lớn.",
    annotations: [
      {
        id: "01",
        title: "Khối điều trị",
        description:
          "Khối cao tầng được chia theo các dải ngang đều, giúp tổng thể giữ nhịp điệu thống nhất.",
        x: 53,
        y: 31,
        side: "right",
      },
      {
        id: "02",
        title: "Nhịp mặt đứng",
        description:
          "Các mảng đặc–rỗng và đường đứng tạo chiều sâu, làm nhẹ bề mặt của khối công trình lớn.",
        x: 62,
        y: 49,
        side: "right",
      },
      {
        id: "03",
        title: "Khối đế tiếp cận",
        description:
          "Tầng đế tạo một đường dẫn thị giác liên tục tới khu vực đón và các không gian công cộng.",
        x: 44,
        y: 70,
        side: "left",
      },
    ],
  },
  {
    id: 3,
    slug: "pullman-hai-phong",
    src: "/images/TieuBieu3.webp",
    name: "Pullman Hải Phòng",
    type: "Khách sạn",
    location: "Thành phố Hải Phòng",
    scope: "Khu vực vận hành nội bộ",
    summary:
      "Hình ảnh giới thiệu cho thấy cách khối tháp, phần đế và cảnh quan được phân tầng để công trình quy mô lớn vẫn có điểm tiếp cận gần gũi.",
    annotations: [
      {
        id: "01",
        title: "Nhịp khối tháp",
        description:
          "Các đường ngang liên tục làm rõ tỷ lệ tầng và tạo nhịp đều cho khối lưu trú phía trên.",
        x: 52,
        y: 28,
        side: "right",
      },
      {
        id: "02",
        title: "Chuyển tiếp khối đế",
        description:
          "Phần đế mở rộng làm trung gian giữa chiều cao của tháp và tỷ lệ người tại mặt đất.",
        x: 58,
        y: 57,
        side: "right",
      },
      {
        id: "03",
        title: "Khoảng đón phía trước",
        description:
          "Khoảng trống và cây xanh phía trước tạo vùng đệm trước khi người dùng đi vào công trình.",
        x: 42,
        y: 73,
        side: "left",
      },
    ],
  },
  {
    id: 4,
    slug: "cpv-food-head-office",
    src: "/images/TieuBieu4.webp",
    name: "Trụ sở CPV Food",
    type: "Văn phòng · Công nghiệp",
    location: "Bình Phước, Việt Nam",
    scope: "Thiết kế & Thi công nội thất",
    summary:
      "Trụ sở được trình bày bằng các lớp khối rõ ràng, ưu tiên nhận diện doanh nghiệp và một vùng tiếp cận rộng trong khuôn viên công nghiệp.",
    annotations: [
      {
        id: "01",
        title: "Khối văn phòng",
        description:
          "Khối chính có hình học mạch lạc, tạo điểm nhận biết rõ giữa bối cảnh khuôn viên sản xuất.",
        x: 51,
        y: 34,
        side: "right",
      },
      {
        id: "02",
        title: "Mặt đứng nhận diện",
        description:
          "Màu sắc và các mảng đặc–rỗng được tổ chức thành một mặt tiền có tính nhận diện từ xa.",
        x: 60,
        y: 51,
        side: "right",
      },
      {
        id: "03",
        title: "Sảnh và khoảng đệm",
        description:
          "Khu vực trước sảnh tạo khoảng dừng, giúp tách luồng tiếp cận văn phòng khỏi hoạt động xung quanh.",
        x: 45,
        y: 71,
        side: "left",
      },
    ],
  },
  {
    id: 5,
    slug: "singapore-general-hospital",
    src: "/images/singapo.webp",
    name: "Bệnh viện Đa khoa Singapore",
    type: "Y tế · Quốc tế",
    location: "Singapore",
    scope: "Nội thất lâm sàng",
    summary:
      "Một dự án y tế quốc tế, nơi khả năng định hướng, tỷ lệ thân thiện và sự liên tục giữa các khu chức năng là trọng tâm trải nghiệm.",
    annotations: [
      {
        id: "01",
        title: "Phân tầng khối chức năng",
        description:
          "Các khối được đọc theo từng lớp cao độ, giúp quy mô lớn trở nên dễ nhận biết hơn từ bên ngoài.",
        x: 51,
        y: 31,
        side: "right",
      },
      {
        id: "02",
        title: "Liên kết giữa các khối",
        description:
          "Những đoạn kết nối làm rõ quan hệ giữa các phần công trình mà không biến tổng thể thành một khối đặc.",
        x: 61,
        y: 50,
        side: "right",
      },
      {
        id: "03",
        title: "Tầng đế công cộng",
        description:
          "Phần thấp của công trình tạo một mặt tiếp cận dễ đọc cho người bệnh, người nhà và nhân viên.",
        x: 44,
        y: 71,
        side: "left",
      },
    ],
  },
];

export default function HeroArchitectural() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"atmosphere" | "solutions">(
    "solutions",
  );
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const active = projects[activeIndex];
  const activeAnnotation =
    active.annotations.find((annotation) => annotation.id === activeNote) ?? null;

  useEffect(() => {
    setActiveNote(null);
  }, [activeIndex]);

  useEffect(() => {
    projects.slice(1).forEach((project) => {
      const image = new window.Image();
      image.src = project.src;
    });
  }, []);

  const selectProject = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const imageVariants = {
    enter: (travel: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : travel * 28,
      scale: reduceMotion ? 1 : 0.985,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (travel: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : travel * -22,
      scale: reduceMotion ? 1 : 1.01,
    }),
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: C.bg }}
      aria-label="Các dự án chọn lọc"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[7%] top-[14%] h-[44rem] w-[44rem] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(200,176,138,0.09), transparent 66%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1920px] flex-col px-5 pb-12 pt-28 sm:px-8 min-[1180px]:block min-[1180px]:px-0 min-[1180px]:pb-20 min-[1180px]:pt-0">
        <nav
          className="order-3 mt-7 flex gap-2 overflow-x-auto pb-2 min-[1180px]:absolute min-[1180px]:left-10 min-[1180px]:top-1/2 min-[1180px]:z-30 min-[1180px]:mt-0 min-[1180px]:w-[180px] min-[1180px]:-translate-y-1/2 min-[1180px]:flex-col min-[1180px]:gap-1 min-[1180px]:overflow-visible min-[1180px]:pb-0 xl:left-12"
          aria-label="Chọn dự án"
        >
          {projects.map((project, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => selectProject(index)}
                className="group flex shrink-0 items-center gap-3 border px-3 py-3 text-left min-[1180px]:w-full min-[1180px]:border-0 min-[1180px]:px-0"
                style={{
                  borderColor: selected
                    ? "rgba(200,176,138,0.45)"
                    : C.divider,
                  backgroundColor: selected
                    ? "rgba(200,176,138,0.06)"
                    : "transparent",
                }}
                aria-current={selected ? "true" : undefined}
              >
                <span className="relative hidden h-8 w-11 shrink-0 overflow-hidden min-[1180px]:block">
                  <AnimatePresence mode="wait">
                    {selected ? (
                      <motion.span
                        key={project.src}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={project.src}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover opacity-80"
                          aria-hidden
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="line"
                        className="absolute left-0 top-1/2 h-px -translate-y-1/2"
                        style={{
                          width: 15,
                          backgroundColor: "rgba(245,241,235,0.22)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className="text-[10px] tabular-nums"
                  style={{
                    color: selected ? C.champagne : "rgba(245,241,235,0.38)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className="block max-w-[125px] truncate text-[9px] uppercase transition-colors duration-300"
                    style={{
                      color: selected ? C.text : "rgba(245,241,235,0.36)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {project.name}
                  </span>
                  <span
                    className="mt-1 hidden text-[7px] uppercase min-[1180px]:block"
                    style={{
                      color: selected
                        ? "rgba(200,176,138,0.65)"
                        : "rgba(245,241,235,0.2)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {project.type}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="order-1 min-[1180px]:absolute min-[1180px]:left-[15%] min-[1180px]:top-1/2 min-[1180px]:z-20 min-[1180px]:w-[29%] min-[1180px]:max-w-[440px] min-[1180px]:-translate-y-1/2 xl:left-[17%]">
          <p
            className="mb-5 text-[9px] uppercase"
            style={{ color: C.champagne, letterSpacing: "0.34em" }}
          >
            Dự án chọn lọc · {String(activeIndex + 1).padStart(2, "0")}/
            {String(projects.length).padStart(2, "0")}
          </p>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: EASE }}
            >
              <p
                className="mb-3 text-[10px] uppercase"
                style={{ color: C.muted, letterSpacing: "0.24em" }}
              >
                {active.type}
              </p>
              <h1
                className="font-serif text-[2.45rem] leading-[1.04] sm:text-5xl lg:text-[clamp(2.6rem,3.15vw,4rem)]"
                style={{ color: C.text, fontWeight: 350 }}
              >
                {active.name}
              </h1>
              <p
                className="mt-6 max-w-[39ch] text-sm font-light leading-[1.85]"
                style={{ color: C.muted }}
              >
                {active.summary}
              </p>

              <dl
                className="mt-7 grid max-w-md grid-cols-2 gap-x-7 gap-y-5 border-t pt-5"
                style={{ borderColor: C.divider }}
              >
                <div>
                  <dt
                    className="text-[8px] uppercase"
                    style={{ color: "rgba(200,176,138,0.65)", letterSpacing: "0.22em" }}
                  >
                    Địa điểm
                  </dt>
                  <dd className="mt-1.5 text-xs" style={{ color: C.text }}>
                    {active.location}
                  </dd>
                </div>
                <div>
                  <dt
                    className="text-[8px] uppercase"
                    style={{ color: "rgba(200,176,138,0.65)", letterSpacing: "0.22em" }}
                  >
                    Phạm vi
                  </dt>
                  <dd className="mt-1.5 text-xs" style={{ color: C.text }}>
                    {active.scope}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/portfolio/${active.slug}`}
                className="group mt-8 inline-flex items-center gap-4 border px-6 py-3 text-[9px] uppercase"
                style={{
                  borderColor: "rgba(200,176,138,0.34)",
                  color: C.champagne,
                  letterSpacing: "0.27em",
                }}
              >
                Xem chi tiết dự án
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="order-2 mt-10 min-[1180px]:absolute min-[1180px]:bottom-[7%] min-[1180px]:right-[2%] min-[1180px]:top-[13%] min-[1180px]:mt-0 min-[1180px]:w-[59%] xl:right-[3%] xl:w-[58%]">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[1080px] min-[1180px]:h-full min-[1180px]:w-full">
            <div
              className="absolute right-0 top-0 z-50 flex items-center border p-1 backdrop-blur-md sm:right-[4%] sm:top-[3%]"
              style={{
                borderColor: "rgba(200,176,138,0.22)",
                backgroundColor: "rgba(11,11,11,0.64)",
              }}
              role="group"
              aria-label="Chế độ xem công trình"
            >
              {([
                ["atmosphere", "Không gian"],
                ["solutions", "Giải pháp"],
              ] as const).map(([mode, label]) => {
                const selected = viewMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setViewMode(mode);
                      if (mode === "atmosphere") setActiveNote(null);
                    }}
                    className="px-3 py-2 text-[8px] uppercase sm:px-4"
                    style={{
                      color: selected ? C.bg : "rgba(245,241,235,0.52)",
                      backgroundColor: selected ? C.champagne : "transparent",
                      letterSpacing: "0.18em",
                    }}
                    aria-pressed={selected}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0.01 : 0.58, ease: EASE }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    filter:
                      viewMode === "solutions"
                        ? "saturate(0.72) contrast(1.07) brightness(0.82)"
                        : "saturate(0.94) contrast(1.01) brightness(0.98)",
                  }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: EASE }}
                  style={{
                    maskImage:
                      "radial-gradient(ellipse 82% 80% at 50% 49%, black 76%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 82% 80% at 50% 49%, black 76%, transparent 100%)",
                  }}
                >
                  <Image
                    src={active.src}
                    alt={`Phối cảnh ${active.name}`}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 1179px) 100vw, 58vw"
                    className="object-contain"
                  />
                </motion.div>

                <motion.div
                  className="pointer-events-none absolute bottom-[6%] left-1/2 h-[13%] w-[58%] -translate-x-1/2 rounded-full blur-2xl"
                  animate={{
                    opacity: viewMode === "atmosphere" ? 0.52 : 0.2,
                    scaleX: viewMode === "atmosphere" ? 1 : 0.9,
                  }}
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(200,176,138,0.22), transparent 68%)",
                  }}
                  aria-hidden
                />

                <AnimatePresence>
                  {viewMode === "solutions" && (
                    <motion.div
                      className="pointer-events-none absolute inset-[7%] z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.55 }}
                      aria-hidden
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(200,176,138,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(200,176,138,0.055) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                          maskImage:
                            "radial-gradient(ellipse 70% 72% at 52% 50%, black, transparent 88%)",
                          WebkitMaskImage:
                            "radial-gradient(ellipse 70% 72% at 52% 50%, black, transparent 88%)",
                        }}
                      />
                      {!reduceMotion && (
                        <motion.div
                          className="absolute bottom-[4%] top-[4%] w-px"
                          initial={{ left: "16%", opacity: 0 }}
                          animate={{ left: "86%", opacity: [0, 0.8, 0] }}
                          transition={{ duration: 1.25, ease: EASE, delay: 0.1 }}
                          style={{
                            background:
                              "linear-gradient(to bottom, transparent, rgba(200,176,138,0.65), transparent)",
                            boxShadow: "0 0 22px rgba(200,176,138,0.32)",
                          }}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p
                  className="absolute left-3 top-1 z-20 border-b pb-1 text-[8px] uppercase sm:left-[8%] sm:top-[5%]"
                  style={{
                    color: C.champagne,
                    borderColor: "rgba(200,176,138,0.28)",
                    letterSpacing: "0.28em",
                  }}
                >
                  {viewMode === "solutions"
                    ? "Di chuyển trên công trình để khám phá thiết kế"
                    : "Phối cảnh tổng thể · Atmosphere view"}
                </p>

                <AnimatePresence>
                  {viewMode === "solutions" && activeAnnotation && (
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-20 hidden min-[1180px]:block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.3 }}
                      style={{
                        background: `radial-gradient(circle 92px at ${activeAnnotation.x}% ${activeAnnotation.y}%, transparent 0%, transparent 62%, rgba(0,0,0,0.18) 100%)`,
                        maskImage:
                          "radial-gradient(ellipse 82% 80% at 50% 49%, black 68%, transparent 100%)",
                        WebkitMaskImage:
                          "radial-gradient(ellipse 82% 80% at 50% 49%, black 68%, transparent 100%)",
                      }}
                      aria-hidden
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {viewMode === "solutions" && activeAnnotation && (
                    <motion.div
                      className="pointer-events-none absolute z-30 hidden h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full border min-[1180px]:block"
                      style={{
                        left: `${activeAnnotation.x}%`,
                        top: `${activeAnnotation.y}%`,
                        borderColor: "rgba(200,176,138,0.72)",
                        boxShadow:
                          "0 0 0 7px rgba(200,176,138,0.06), inset 0 0 28px rgba(200,176,138,0.08), 0 0 28px rgba(200,176,138,0.2)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: EASE }}
                      aria-hidden
                    >
                      <span
                        className="absolute left-1/2 top-[-8px] h-4 w-px -translate-x-1/2"
                        style={{ backgroundColor: C.champagne }}
                      />
                      <span
                        className="absolute bottom-[-8px] left-1/2 h-4 w-px -translate-x-1/2"
                        style={{ backgroundColor: C.champagne }}
                      />
                      <span
                        className="absolute left-[-8px] top-1/2 h-px w-4 -translate-y-1/2"
                        style={{ backgroundColor: C.champagne }}
                      />
                      <span
                        className="absolute right-[-8px] top-1/2 h-px w-4 -translate-y-1/2"
                        style={{ backgroundColor: C.champagne }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {viewMode === "solutions" && (
                    <motion.div
                      className="hidden min-[1180px]:block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {active.annotations.map((annotation, index) => {
                        const isOpen = activeNote === annotation.id;
                        const opensLeft = annotation.side === "left";
                        return (
                          <motion.div
                            key={annotation.id}
                            className="absolute z-40"
                            style={{
                              left: `${annotation.x}%`,
                              top: `${annotation.y}%`,
                              opacity:
                                activeNote && !isOpen ? 0.38 : 1,
                            }}
                            initial={{ opacity: 0, scale: 0.82 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: reduceMotion ? 0 : 0.38 + index * 0.1,
                              duration: reduceMotion ? 0.01 : 0.38,
                              ease: EASE,
                            }}
                            onMouseEnter={() => setActiveNote(annotation.id)}
                            onMouseLeave={() => setActiveNote(null)}
                          >
                            <button
                              type="button"
                              className={`absolute top-1/2 flex -translate-y-1/2 items-center whitespace-nowrap ${
                                opensLeft ? "flex-row-reverse" : "flex-row"
                              }`}
                              style={opensLeft ? { right: -7 } : { left: -7 }}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() =>
                                setActiveNote(isOpen ? null : annotation.id)
                              }
                              onFocus={() => setActiveNote(annotation.id)}
                              aria-expanded={isOpen}
                              aria-label={`Khám phá ${annotation.title}`}
                            >
                              <span
                                className="relative flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border"
                                style={{
                                  borderColor: isOpen
                                    ? C.champagne
                                    : "rgba(200,176,138,0.7)",
                                  backgroundColor: "rgba(11,11,11,0.78)",
                                  boxShadow: isOpen
                                    ? "0 0 0 6px rgba(200,176,138,0.09), 0 0 20px rgba(200,176,138,0.3)"
                                    : "0 0 0 3px rgba(200,176,138,0.05)",
                                }}
                              >
                                <span
                                  className="h-1 w-1 rotate-45 border"
                                  style={{ borderColor: C.champagne }}
                                />
                              </span>
                              <span
                                className="h-px w-5"
                                style={{ backgroundColor: "rgba(200,176,138,0.66)" }}
                                aria-hidden
                              />
                              <span
                                className="border px-3 py-2 text-[7.5px] uppercase backdrop-blur-md"
                                style={{
                                  color: isOpen ? C.champagne : C.text,
                                  borderColor: isOpen
                                    ? C.champagne
                                    : "rgba(200,176,138,0.28)",
                                  backgroundColor: isOpen
                                    ? "rgba(200,176,138,0.12)"
                                    : "rgba(11,11,11,0.72)",
                                  letterSpacing: "0.14em",
                                  boxShadow: "0 8px 26px rgba(0,0,0,0.24)",
                                }}
                              >
                                {annotation.title}
                              </span>
                            </button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {viewMode === "solutions" && activeAnnotation && (
                    <motion.aside
                      className="pointer-events-none absolute bottom-[7%] right-[2%] z-50 hidden w-[280px] min-[1180px]:block xl:right-[4%]"
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE }}
                      aria-live="polite"
                    >
                      <div
                        className="relative border px-5 py-5 backdrop-blur-xl"
                        style={{
                          borderColor: "rgba(200,176,138,0.3)",
                          backgroundColor: "rgba(12,11,10,0.92)",
                          boxShadow: "0 22px 60px rgba(0,0,0,0.38)",
                        }}
                      >
                        <span
                          className="absolute bottom-0 left-0 top-0 w-px"
                          style={{ backgroundColor: C.champagne }}
                          aria-hidden
                        />
                        <p
                          className="text-[7.5px] uppercase"
                          style={{ color: C.champagne, letterSpacing: "0.24em" }}
                        >
                          Chi tiết thiết kế
                        </p>
                        <h2
                          className="mt-3 font-serif text-xl leading-tight"
                          style={{ color: C.text }}
                        >
                          {activeAnnotation.title}
                        </h2>
                        <p
                          className="mt-3 text-[11px] font-light leading-[1.75]"
                          style={{ color: C.muted }}
                        >
                          {activeAnnotation.description}
                        </p>
                      </div>
                    </motion.aside>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {viewMode === "solutions" && (
              <motion.div
                className="relative z-30 mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 min-[1180px]:hidden"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
            {active.annotations.map((annotation) => {
              const isOpen = activeNote === annotation.id;
              return (
                <button
                  key={annotation.id}
                  type="button"
                  onClick={() => setActiveNote(isOpen ? null : annotation.id)}
                  className="border p-4 text-left"
                  style={{
                    borderColor: isOpen
                      ? "rgba(200,176,138,0.5)"
                      : C.divider,
                    backgroundColor: isOpen
                      ? "rgba(200,176,138,0.07)"
                      : "rgba(255,255,255,0.015)",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    className="inline-flex h-2 w-2 rotate-45 border"
                    style={{ borderColor: C.champagne }}
                    aria-hidden
                  />
                  <span
                    className="ml-3 text-[10px] uppercase"
                    style={{ color: C.text, letterSpacing: "0.08em" }}
                  >
                    {annotation.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 block overflow-hidden text-xs leading-relaxed"
                        style={{ color: C.muted }}
                      >
                        {annotation.description}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-px min-[1180px]:block"
          style={{ backgroundColor: C.divider }}
          aria-hidden
        />
      </div>
    </section>
  );
}
