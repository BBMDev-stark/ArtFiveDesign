import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProjectCard from "@/components/ProjectCard";
import LocationLedger from "@/components/LocationLedger";
import BlueprintReveal from "@/components/BlueprintReveal";
import HeroArchitectural from "@/components/HeroArchitectural";
import {
  company,
  stats,
  sectors,
  projects,
  process,
  clients,
  philosophy,
} from "@/lib/data";
import { sihFloors } from "@/lib/blueprint-data";

const featured = projects.filter((p) =>
  ["sih-hospital", "unilever-office", "himlam-tan-hung-villa", "pullman-hai-phong", "cpv-food-head-office", "singapore-general-hospital"].includes(p.slug)
);

const signature = projects.find((p) => p.slug === "sih-hospital")!;

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION - Architectural showcase with annotations */}
      <HeroArchitectural />

      {/* ABOUT SECTION */}
      <section className="section-spacing">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>Về Chúng tôi</SectionEyebrow>
                <h2 className="font-serif text-charcoal text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                  Tầm nhìn toàn cầu.<br />
                  <span className="italic text-bronze">Sứ mệnh địa phương.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-8">
              <Reveal delay={0.1}>
                <p className="font-serif text-xl md:text-2xl text-charcoal/85 leading-relaxed">
                  {philosophy.history}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-charcoal/60 text-lg leading-relaxed">
                  {philosophy.product}
                </p>
                <Link
                  href="/about"
                  className="eyebrow inline-block mt-6 text-bronze border-b border-bronze/30 pb-0.5 hover:border-bronze hover:pb-0 transition-all duration-300 tracking-widest3"
                >
                  Câu chuyện của chúng tôi
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-charcoal text-ivory section-spacing">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-champagne mb-4 tracking-tight">
                  {s.value}
                </p>
                <p className="text-sm text-ivory/50 leading-relaxed max-w-[22ch]">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section className="section-spacing">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow>Chuyên môn</SectionEyebrow>
          </Reveal>
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-16">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal max-w-2xl leading-[1.1] tracking-tight">
                Sáu lĩnh vực.<br />Một kỷ luật thiết kế.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-charcoal/55 text-lg max-w-md leading-relaxed mt-4 lg:mt-0">
                Đội ngũ thiết kế nội thất và kiến trúc của chúng tôi làm việc trên toàn bộ vòng đời của một công trình.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-line">
            {sectors.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                <div className="border-b border-r border-line p-7 md:p-10 lg:p-12 h-full min-h-[220px] md:min-h-[280px] flex flex-col justify-between group hover:bg-white/80 transition-all duration-500">
                  <span className="eyebrow text-charcoal/25 tracking-widest3">0{i + 1}</span>
                  <div className="mt-auto pt-6">
                    <h3 className="font-serif text-2xl lg:text-3xl text-charcoal mb-4 group-hover:text-bronze transition-colors duration-300">
                      {s.name}
                    </h3>
                    <p className="text-sm text-charcoal/50 leading-relaxed line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      {/* FEATURED PROJECTS - Full Width + Text tinh chỉnh */}
{/* CÁC CÔNG TRÌNH TIÊU BIỂU - 8 CARDS */}
<section className="section-spacing pt-0">
  <div className="container-x">
    <div className="flex justify-between items-end mb-12">
      <div>
        <SectionEyebrow>Dự án nổi bật</SectionEyebrow>
        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Các công trình tiêu biểu</h2>
      </div>
      <Link
        href="/portfolio"
        className="eyebrow hidden md:inline-flex items-center gap-2 text-bronze hover:text-charcoal transition-colors"
      >
        XEM TẤT CẢ DỰ ÁN →
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {projects.slice(0, 8).map((project, i) => (   // Lấy 8 dự án đầu tiên
        <Reveal key={project.slug} delay={i * 0.05}>
          <Link href={`/portfolio/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-5 bg-charcoal">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h3 className="font-serif text-xl text-charcoal group-hover:text-bronze transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-charcoal/60 mt-1">{project.location}</p>
            
            <div className="mt-3">
              <span className="inline-block text-[10px] uppercase tracking-widest border border-bronze/30 text-bronze px-3 py-1">
                {project.sector[0] || "Dự án"}
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  </div>
</section>

      {/* BLUEPRINT REVEAL */}
      <BlueprintReveal
        eyebrow="Từ Bản vẽ → Đến Công trình"
        title={signature.name}
        location={signature.location}
        mainImage={{ src: "/images/BenhVienSIH.svg", alt: "Bệnh viện SIH" }}
        notes={sihFloors}
      />

      <section className="bg-ink text-ivory pb-28 md:pb-36">
        <div className="container-x pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow dark>Dự án Đặc trưng</SectionEyebrow>
                <p className="text-ivory/60 leading-relaxed text-lg max-w-md">
                  {signature.detail}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.15}>
                <Link
                  href={`/portfolio/${signature.slug}`}
                  data-cursor
                  className="eyebrow text-ivory border-b border-champagne/40 pb-1 hover:text-champagne hover:border-champagne transition-all duration-300 tracking-widest3"
                >
                  Xem chi tiết dự án
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="section-spacing">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow>Cách chúng tôi làm việc</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-16 max-w-2xl leading-[1.1] tracking-tight">
              Quy trình thiết kế xây dựng chuyên nghiệp
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.12}>
                <div className="border-t-2 border-bronze pt-8">
                  <span className="font-serif text-5xl lg:text-6xl text-bronze/30 tracking-tight">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-xl lg:text-2xl text-charcoal mt-6 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-charcoal/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className="bg-charcoal text-ivory section-spacing">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow dark>Được Tin tưởng bởi</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-16 max-w-2xl leading-[1.1] tracking-tight">
              Đối tác lâu dài trong y tế, công nghiệp và khách sạn
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14">
            {clients.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 0.08}>
                <p className="font-serif text-xl lg:text-2xl text-ivory/90 mb-3">
                  {c.name}
                </p>
                <p className="text-xs text-ivory/40 leading-relaxed">
                  {c.note}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS SECTION */}
      <section className="section-spacing">
        <div className="container-x">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <Reveal>
              <SectionEyebrow>Bài viết</SectionEyebrow>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.1]">
                Ghi chú từ studio
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/insights"
                className="eyebrow text-bronze border-b border-bronze/30 pb-0.5 hover:border-bronze hover:pb-0 transition-all duration-300 tracking-widest3"
              >
                Tất cả bài viết
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 border-t border-line pt-12">
            {[
              {
                title: "Bài học từ quan hệ đối tác năm 2013 về bàn giao trọn gói",
                tag: "Thực hành",
              },
              {
                title: "Thiết kế sự bình yên vào mặt bằng lâm sàng",
                tag: "Y tế",
              },
              {
                title: "Tại sao chúng tôi tự sản xuất nội thất",
                tag: "Sản xuất",
              },
            ].map((post, i) => (
              <Reveal key={post.title} delay={i * 0.1}>
                <p className="eyebrow text-bronze/70 mb-5 tracking-widest3">{post.tag}</p>
                <h3 className="font-serif text-xl lg:text-2xl text-charcoal leading-snug hover:text-bronze transition-colors duration-300 cursor-pointer">
                  {post.title}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-ink text-ivory section-spacing text-center">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-champagne/80 mb-8 tracking-widest3">Bắt đầu Dự án</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto text-ivory tracking-tight">
              Hãy mang cùng sự kỷ luật đó đến công trình tiếp theo của bạn
            </h2>
            <div className="mt-14">
              <Link
                href="/contact"
                className="eyebrow inline-flex items-center gap-3 border border-champagne/40 px-12 py-5 text-champagne hover:bg-champagne hover:text-ink transition-all duration-500 tracking-widest3"
              >
                Liên hệ ngay
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}