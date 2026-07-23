// Sample data for <BlueprintReveal /> on the SIH Hospital case study.
//
// NOTE: unlike lib/data.ts (sourced strictly from the ARTFIVE company
// profile), the descriptions and gallery photos below are placeholders
// built from the assets currently in /public/images. Swap in real,
// floor-specific photography and finalised copy before shipping.

import type { BlueprintNote } from "@/components/BlueprintReveal";

export const sihFloors: BlueprintNote[] = [
  {
    id: "ground-floor",
    number: "01",
    tag: "Tầng trệt",
    title: "Tầng Trệt — Sảnh Chính",
    description:
      "Không gian đón tiếp đầu tiên của bệnh viện, nơi ánh sáng tự nhiên, vật liệu ấm và hệ dẫn đường rõ ràng cùng tạo nên cảm giác an tâm ngay từ bước chân đầu tiên.",
    images: [
      { src: "/images/BenhVienSIH1.webp", alt: "Sảnh chính tầng trệt SIH" },
      { src: "/images/BenhVienSIH2.webp", alt: "Khu vực tiếp đón" },
      { src: "/images/BenhVienSIH3.webp", alt: "Mặt bằng bố trí tầng trệt" },
      { src: "/images/BenhVienSIH4.webp", alt: "Phân khu chức năng" },
      { src: "/images/BenhVienSIH5.webp", alt: "Sơ đồ lối thoát hiểm" },
      { src: "/images/BenhVienSIH6.webp",},
    ],
    position: { top: "92%", left: "50%" },
  },
  {
    id: "ground-floor-overview",
    number: "02",
    tag: "Tầng trệt — Tổng quan",
    title: "Tầng Trệt — Tổng Quan Không Gian",
    description:
      "Toàn cảnh khu vực công cộng tầng trệt: quầy lễ tân, khu chờ và các điểm chuyển tiếp được thiết kế liền mạch, hài hoà giữa công năng bệnh viện và trải nghiệm khách sạn cao cấp.",
    images: [
      { src: "/images/BenhVienSIH1.webp", alt: "Sảnh chính tầng trệt SIH" },
      { src: "/images/BenhVienSIH2.webp", alt: "Khu vực tiếp đón" },
      { src: "/images/BenhVienSIH3.webp", alt: "Mặt bằng bố trí tầng trệt" },
    ],
    position: { top: "70%", left: "90%" },
  },
  {
    id: "floor-1-clinic",
    number: "03",
    tag: "Lầu 01 — Khoa Khám Bệnh",
    title: "Lầu 01 — Khoa Khám Bệnh",
    description:
      "Khu khám bệnh được tổ chức theo luồng di chuyển tối ưu cho bệnh nhân và gia đình, kết hợp vật liệu bền vững, dễ vệ sinh với bảng màu ấm áp làm dịu cảm giác lo lắng khi thăm khám.",
    images: [
      { src: "/images/Lau1.webp", alt: "Khoa khám bệnh lầu 1" },
      { src: "/images/Lau2.webp", alt: "Khu vực chờ khám" },
      { src: "/images/Lau3.webp", alt: "Mặt bằng khoa khám bệnh" },
    ],
    position: { top: "70%", left: "10%" },
  },
  {
    id: "floor-6-inpatient",
    number: "04",
    tag: "Lầu 06 — Khoa Lưu Trú",
    title: "Lầu 06 — Khoa Lưu Trú (Nội Trú)",
    description:
      "Các phòng bệnh Tiêu chuẩn, VIP và S.VIP được thiết kế như một không gian nghỉ dưỡng riêng tư, ưu tiên sự yên tĩnh, ánh sáng dịu và vật liệu cao cấp phù hợp cho quá trình hồi phục lâu dài.",
    images: [
      { src: "/images/1.webp", alt: "Hành lang khoa lưu trú" },
      { src: "/images/2.webp", alt: "Phòng bệnh tiêu chuẩn" },
      { src: "/images/3.webp", alt: "Mặt bằng khoa lưu trú" },
      { src: "/images/4.webp", alt: "Phân khu phòng bệnh" },
      { src: "/images/5.webp", alt: "Lối thoát hiểm khoa lưu trú" },
      { src: "/images/6.webp",},
    ],
    position: { top: "30%", left: "90%" },
  },
  {
    id: "technical-drawings",
    number: "05",
    tag: "Bản vẽ kỹ thuật",
    title: "Bản Vẽ Kỹ Thuật",
    description:
      "Bộ hồ sơ bản vẽ mặt bằng, phân khu chức năng và sơ đồ thoát hiểm — nền tảng kỹ thuật đứng sau mỗi không gian đã hoàn thiện của dự án.",
    images: [
      { src: "/images/blueprint/floor1-layout.jpg", alt: "Bản vẽ mặt bằng" },
      { src: "/images/blueprint/floor1-egress.jpg", alt: "Bản vẽ thoát hiểm" },
    ],
    position: { top: "30%", left: "5%" },
  },
];
