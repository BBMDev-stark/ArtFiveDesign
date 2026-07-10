import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1917",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.art5corp.com"),
  title: {
    default: "ARTFIVE DESIGN — Thiết kế Kiến trúc & Nội thất Cao cấp",
    template: "%s | ARTFIVE DESIGN",
  },
  description:
    "ARTFIVE DESIGN CORPORATION là công ty thiết kế kiến trúc, nội thất và xây dựng trọn gói cao cấp tại Thành phố Hồ Chí Minh, thành lập năm 2009.",
  keywords: [
    "ARTFIVE DESIGN",
    "Thiết kế nội thất cao cấp",
    "Thiết kế kiến trúc",
    "Thi công trọn gói",
    "Nội thất sang trọng",
  ],
  authors: [{ name: "ARTFIVE DESIGN" }],
  creator: "ARTFIVE DESIGN",
  openGraph: {
    title: "ARTFIVE DESIGN — Thiết kế Kiến trúc & Nội thất Cao cấp",
    description:
      "Công ty thiết kế và xây dựng nội thất cao cấp tại TP.HCM. Chuyên về y tế, khách sạn, văn phòng và nhà ở.",
    siteName: "ARTFIVE DESIGN",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTFIVE DESIGN",
    description: "Thiết kế Kiến trúc & Nội thất Cao cấp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-ivory text-charcoal">
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:text-ivory focus:px-4 focus:py-2 eyebrow"
          >
            Chuyển đến nội dung
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
