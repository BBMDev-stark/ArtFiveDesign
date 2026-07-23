import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { sectors, projects, process, company } from "@/lib/data";

export const metadata = {
  title: "Chuyên môn",
  description:
    "Chuyên môn thiết kế và xây dựng của ARTFIVE DESIGN bao gồm y tế, khách sạn, văn phòng, công nghiệp, nhà ở và các dự án quốc tế.",
};

/*
  GHI CHÚ:
  1) `company` cần có trường `founded` (đã có sẵn, dùng ở trang Giới thiệu) để tính số năm kinh nghiệm.
  2) TOTAL_PROJECTS = 19 lấy theo số bạn cung cấp ("khoảng 19 dự án thành công").
     Sửa lại con số này nếu có số liệu chính xác hơn, hoặc đổi thành "19+" nếu muốn an toàn.
  3) ABOUT_LICENSES_PATH trỏ tới section chứng chỉ pháp lý ở trang Giới thiệu
     (mình đã gắn id="giay-phep" vào section đó). Đổi lại đường dẫn `/gioi-thieu`
     cho khớp với route thật của trang Giới thiệu trong project bạn (có thể là /about, /gioi-thieu, /ve-chung-toi...).
  4) Số dự án hiển thị trong mỗi lĩnh vực (`related.length`) lấy trực tiếp từ
     mảng `projects` có sẵn — không cần nhập tay, luôn khớp với dữ liệu thật.
*/

const TOTAL_PROJECTS = 19;
const ABOUT_LICENSES_PATH = "/gioi-thieu#giay-phep";
const CURRENT_YEAR = new Date().getFullYear();

const fullServiceScope = [
  "Tư vấn & thiết kế ý tưởng",
  "Thiết kế kỹ thuật & hồ sơ thi công",
  "Thi công trọn gói, một đầu mối",
  "Giám sát chất lượng & bàn giao",
];

const whyArtfive = [
  {
    title: "Pháp lý đầy đủ",
    description:
      "Chứng chỉ năng lực hoạt động xây dựng Hạng III do Sở Xây dựng TP.HCM cấp, đủ điều kiện thiết kế và thi công công trình dân dụng, nhà công nghiệp.",
    href: ABOUT_LICENSES_PATH,
    linkLabel: "Xem chứng chỉ",
  },
  {
    title: "Một đầu mối, trọn gói",
    description:
      "Từ ý tưởng thiết kế đến ngày bàn giao, khách hàng làm việc với một đội ngũ duy nhất — không cần điều phối giữa nhiều nhà thầu.",
  },
  {
    title: `${CURRENT_YEAR - company.founded}+ năm trong nghề`,
    description: `Thành lập từ năm ${company.founded}, đội ngũ ARTFIVE tích luỹ kinh nghiệm thực chiến qua nhiều loại hình công trình khác nhau.`,
  },
  {
    title: "Đa lĩnh vực, một kỷ luật thiết kế",
    description:
      "Cùng một quy trình kiểm soát chất lượng được áp dụng nhất quán, dù là phòng khám y tế hay biệt thự riêng.",
  },
];

export default function ExpertisePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[55vh] min-h-[480px] bg-ink overflow-hidden">
        <Image
          src="/images/BenhVienSIH5.webp"
          alt="Chi tiết nội thất lâm sàng"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-20 md:pb-28">
          <p className="eyebrow text-champagne/80 mb-6 tracking-widest3">Chuyên môn</p>
          <h1 className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl max-w-4xl text-balance leading-[1.1]">
            Một kỷ luật thiết kế, sáu lĩnh vực.
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-spacing pb-0">
        <div className="container-x">
          <Reveal>
            <p className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal/80 max-w-4xl leading-relaxed">
              Đội ngũ thiết kế và xây dựng của chúng tôi làm việc trên toàn bộ vòng đời của một công trình — từ phòng bệnh viện đến biệt thự riêng.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITY STATS — số liệu năng lực tổng quan, chứng chỉ dẫn sang trang Giới thiệu */}
      <section className="section-spacing">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-t border-line pt-12">
            <Reveal>
              <p className="font-serif text-4xl md:text-5xl text-bronze mb-2 tracking-tight">
                {CURRENT_YEAR - company.founded}+
              </p>
              <p className="text-sm text-charcoal/50">Năm kinh nghiệm</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-serif text-4xl md:text-5xl text-bronze mb-2 tracking-tight">
                {TOTAL_PROJECTS}+
              </p>
              <p className="text-sm text-charcoal/50">Dự án đã hoàn thành</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif text-4xl md:text-5xl text-bronze mb-2 tracking-tight">
                {sectors.length}
              </p>
              <p className="text-sm text-charcoal/50">Lĩnh vực chuyên môn</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link href={ABOUT_LICENSES_PATH} className="group block">
                <p className="font-serif text-4xl md:text-5xl text-bronze mb-2 tracking-tight group-hover:text-charcoal transition-colors">
                  Hạng III
                </p>
                <p className="text-sm text-charcoal/50 group-hover:text-bronze transition-colors border-b border-transparent group-hover:border-bronze/40 inline-block">
                  Chứng chỉ năng lực xây dựng →
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      {/* SECTORS */}
{sectors.map((sector, i) => {
  const related = projects.filter((p) => p.sector.includes(sector.slug));
  const reversed = i % 2 === 1;
  return (
    <section
      key={sector.slug}
      className={`border-t border-line ${i % 2 === 1 ? "bg-paper" : ""}`}
      id={sector.slug}
    >
      <div className="container-x py-20 md:py-28">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center`}
        >
          <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
            <Reveal>
              <div className="flex items-center gap-4 mb-4">
                <span className="eyebrow text-charcoal/25 tracking-widest3">0{i + 1}</span>
                {related.length > 0 && (
                  <span className="text-xs uppercase tracking-wide text-bronze/70">
                    {related.length} dự án tiêu biểu
                  </span>
                )}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6 tracking-tight leading-[1.1]">
                {sector.name}
              </h2>
              <p className="text-charcoal/60 leading-relaxed max-w-md mb-8">
                {sector.description}
              </p>

              {/* dịch vụ trọn gói */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 max-w-md">
                {fullServiceScope.map((service) => (
                  <li key={service} className="flex items-start gap-2 text-sm text-charcoal/55">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-bronze/60" />
                    {service}
                  </li>
                ))}
              </ul>

              {related.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {related.slice(0, 4).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/portfolio/${p.slug}`}
                        className="text-sm text-charcoal/60 hover:text-bronze border-b border-transparent hover:border-bronze/30 pb-1 transition-all duration-300"
                      >
                        {p.name} — {p.location}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/portfolio?sector=${sector.slug}`}
                className="eyebrow text-bronze border-b border-bronze/30 pb-0.5 hover:border-bronze hover:pb-0 transition-all duration-300 tracking-widest3"
              >
                Xem dự án {sector.name}
              </Link>
            </Reveal>
          </div>
          <div className={`lg:col-span-6 ${reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
})}

      {/* VÌ SAO CHỌN ARTFIVE */}
      <section className="section-spacing bg-paper border-t border-line">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow>Vì sao chọn ARTFIVE</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-16 max-w-xl leading-[1.15] tracking-tight">
              Năng lực được chứng minh qua từng công trình
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {whyArtfive.map((reason) => (
              <Reveal key={reason.title} delay={0.05}>
                <div className="border-t-2 border-bronze/40 pt-6 h-full flex flex-col">
                  <h3 className="font-serif text-xl text-charcoal mb-3 tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4">
                    {reason.description}
                  </p>
                  {reason.href && (
                    <Link
                      href={reason.href}
                      className="mt-auto text-xs eyebrow text-bronze border-b border-bronze/30 pb-0.5 hover:border-bronze hover:pb-0 transition-all duration-300 tracking-widest3 self-start"
                    >
                      {reason.linkLabel}
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-charcoal text-ivory section-spacing">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow dark>Cách chúng tôi làm việc</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-16 max-w-xl leading-[1.1] tracking-tight">
              Cùng một quy trình, mọi lĩnh vực
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.12}>
                <div className="border-t-2 border-champagne/40 pt-8">
                  <span className="font-serif text-5xl lg:text-6xl text-champagne/30 tracking-tight">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-xl lg:text-2xl mt-6 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ivory/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}