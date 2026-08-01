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
      <section className="home-about-showcase">
        <div className="home-about-showcase__inner">
          <Reveal>
            <div className="home-about-showcase__heading">
              <div className="home-about-showcase__eyebrow">
                <span aria-hidden="true" />
                <p>Về chúng tôi</p>
              </div>
              <h2>
                Tầm nhìn<br />toàn cầu.
                <em>Sứ mệnh<br />địa phương.</em>
              </h2>
            </div>
          </Reveal>

          <div className="home-about-showcase__copy">
            <Reveal delay={0.1}>
              <p>
                Được sáng lập và lãnh đạo từ năm 2009 bởi Ông Nguyễn Dương Huy,
                ARTFIVE DESIGN CORPORATION là một công ty chuyên về thiết kế nội
                thất và xây dựng chuyên nghiệp.
              </p>
            </Reveal>

            <div className="home-about-showcase__divider" aria-hidden="true">
              <span />
              <i />
              <span />
            </div>

            <Reveal delay={0.2}>
              <p>
                Đội ngũ các nhà thiết kế trẻ, sáng tạo của chúng tôi mang đến cảm
                nhận thẩm mỹ đặc biệt, kết hợp với phong cách tinh tế, thanh lịch,
                đương đại — tiên phong trong việc áp dụng công nghệ và vật liệu mới,
                theo dõi các xu hướng nội thất toàn cầu, để tạo ra không gian sống có
                tính cách thực sự cho khách hàng.
              </p>
              <Link href="/about" className="home-about-showcase__link">
                <span>Câu chuyện của chúng tôi</span>
                <span aria-hidden="true">⟶</span>
              </Link>
            </Reveal>
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
                <div className="group border-b border-r border-line h-full flex flex-col transition-all duration-500 hover:bg-white/80">
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="eyebrow absolute left-5 top-5 text-ivory/70 tracking-widest3">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="p-7 md:p-10 lg:p-12 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-2xl lg:text-3xl text-charcoal mb-4 group-hover:text-bronze transition-colors duration-300">
                        {s.name}
                      </h3>
                      <p className="text-sm text-charcoal/50 leading-relaxed line-clamp-2">
                        {s.description}
                      </p>
                    </div>
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
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
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

      {/* BLUEPRINT REVEAL — includes the merged "Dự án Đặc trưng" copy
          block in its header (previously a separate section below it) */}
      <BlueprintReveal
        eyebrow="Từ Bản vẽ → Đến Công trình"
        title={signature.name}
        location={signature.location}
        mainImage={{ src: "/images/BenhVienSIH.webp", alt: "Bệnh viện Phụ sản Quốc tế Sài Gòn" }}
        notes={sihFloors}
        featured={{
          eyebrow: "Dự án Đặc trưng",
          description: signature.detail,
          linkHref: `/portfolio/${signature.slug}`,
        }}
      />

      {/* PROCESS SECTION */}
      <section className="home-process-showcase">
        <div className="home-process-showcase__inner">
          <Reveal className="home-process-showcase__intro">
            <div className="home-process-showcase__eyebrow">
              <span aria-hidden="true" />
              <p>Quy trình làm việc</p>
            </div>
            <h2>
              Quy trình thiết kế<br />
              xây dựng <em>chuyên nghiệp.</em>
            </h2>
            <p className="home-process-showcase__lead">
              Chúng tôi tin rằng một quy trình rõ ràng, khoa học chính là nền tảng
              để tạo nên những công trình bền vững, tinh tế và vượt thời gian.
            </p>
            <Link href="/about" className="home-process-showcase__link">
              <span>Tìm hiểu thêm về chúng tôi</span>
              <span aria-hidden="true">⟶</span>
            </Link>
          </Reveal>

          <div className="home-process-showcase__cards">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <article className="home-process-card group">
                  <div className="home-process-card__image">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1440px) 270px, (min-width: 768px) 245px, 78vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="home-process-card__body">
                    <div className="home-process-card__meta">
                      <span>{step.step}</span>
                      <i aria-hidden="true">{["◌", "✎", "◇", "⌂"][i]}</i>
                    </div>
                    <span className="home-process-card__rule" aria-hidden="true" />
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
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
                <div className="relative h-14 w-24 mb-5 rounded-md bg-ivory/95 p-2.5">
                  <Image
                    src={c.logo}
                    alt={c.name}
                    fill
                    sizes="200px"
                    className="object-contain p-1.5"
                  />
                </div>
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
            <p className="eyebrow text-champagne/80 mb-8 tracking-widest3">BẮT ĐẦU DỰ ÁN</p>
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
