import { Suspense } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PortfolioFilter from "@/components/PortfolioFilter";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Dự án",
  description:
    "Danh mục dự án của ARTFIVE DESIGN bao gồm y tế, khách sạn, văn phòng, công nghiệp, nhà ở và các dự án quốc tế tại Việt Nam và Singapore.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] bg-ink overflow-hidden">
        <Image
          src="/images/ECO GREEN2.webp"
          alt="Sảnh Trụ sở CPV Food"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-16">
          <p className="eyebrow text-champagne mb-6">Dự án</p>
          <h1 className="font-serif text-ivory text-5xl md:text-7xl max-w-3xl text-balance">
            {projects.length} dự án, một tiêu chuẩn.
          </h1>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <Reveal>
          <Suspense fallback={null}>
            <PortfolioFilter />
          </Suspense>
        </Reveal>
      </section>
    </>
  );
}
