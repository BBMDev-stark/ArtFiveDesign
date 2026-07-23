import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { clients, projects } from "@/lib/data";

export const metadata = {
  title: "Khách hàng",
  description:
    "Khách hàng và đối tác lâu dài của ARTFIVE DESIGN, bao gồm Tập đoàn C.P. Thái Lan, Unilever, Pullman và Bệnh viện Đa khoa Singapore.",
};

/*
  GHI CHÚ:
  Thêm logo thật vào /public/images/logos/ theo đúng tên file bên dưới,
  hoặc đổi lại đường dẫn `src` cho khớp với file bạn có.
  Nên dùng .svg hoặc .png nền trong suốt để logo hiển thị đẹp trên nền trắng.
*/
const partnerLogos = [
  { name: "BVsaigon", src: "/images/logo/bvsaigon.svg" },
  { name: "BVSingapore", src: "/images/logo/bvSingapore.svg" },
  { name: "CP", src: "/images/logo/CP.svg" },
  { name: "Him Lam", src: "/images/logo/himlam.svg" },
  { name: "Partners", src: "/images/logo/Partners.svg" },
  { name: "pullman", src: "/images/logo/pullman.svg" },
  { name: "Uni", src: "/images/logo/Uni.svg" },
  { name: "Qualgo", src: "/images/logo/Qualgo.svg" },
];

export default function ClientsPage() {
  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] bg-ink overflow-hidden">
        <Image
          src="/images/ECOGREEN7.webp"
          alt="Văn phòng Unilever, Bắc Ninh"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-16">
          <p className="eyebrow text-champagne mb-6">Khách hàng</p>
          <h1 className="font-serif text-ivory text-5xl md:text-7xl max-w-3xl text-balance">
            Tin cậy, được gia hạn qua từng dự án.
          </h1>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionEyebrow>Khách hàng & Đối tác Được chọn lọc</SectionEyebrow>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight text-balance">
                Từ nhà sản xuất đa quốc gia đến chủ nhà hàng độc lập
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <p className="text-charcoal/65 leading-relaxed text-lg">
                Quan hệ lâu nhất của chúng tôi là với Tập đoàn C.P. Thái Lan,
                nơi chúng tôi đã phục vụ như đối tác thiết kế, xây dựng và nội thất trọn gói
                tại Việt Nam từ năm 2013 — từ trụ sở văn phòng, phòng thí nghiệm, ký túc xá đến
                cơ sở sản xuất. Bên cạnh mối quan hệ đó, chúng tôi thực hiện các dự án cho
                các tổ chức y tế, thương hiệu tiêu dùng toàn cầu, tập đoàn khách sạn và doanh nghiệp địa phương.
              </p>
            </Reveal>
          </div>
        </div>

        {/* PARTNER LOGOS — marquee cuộn ngang tự động, nằm giữa đoạn giới thiệu và danh sách khách hàng */}
        <div className="relative overflow-hidden mb-20">
  <div className="flex w-max animate-marquee gap-6 pr-6">
    {[...partnerLogos, ...partnerLogos].map((logo, i) => (
      <div
        key={`${logo.name}-${i}`}
        className="flex-shrink-0 w-[180px] h-[100px] bg-white rounded-2xl border border-line flex items-center justify-center px-6"
      >
        <Image
          src={logo.src}
          alt={logo.name}
          width={120}
          height={48}
          className="object-contain max-h-[48px] w-auto"
        />
      </div>
    ))}
  </div>
  {/* mờ dần 2 mép trái/phải */}
  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
  <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />

  <style>{`
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
    .animate-marquee:hover {
      animation-play-state: paused;
    }
  `}</style>
</div>

        <div className="border-t border-line">
          {clients.map((c, i) => (
            <Reveal key={c.name}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-8 border-b border-line group">
                <p className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-bronze transition-colors">
                  {c.name}
                </p>
                <p className="text-sm text-charcoal/50 md:text-right">
                  {c.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal text-ivory py-28">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow dark>Tập đoàn C.P. Thái Lan</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl mb-8 max-w-2xl text-balance">
              Một khách hàng, thực hiện trên sáu tỉnh
            </h2>
            <p className="text-ivory/70 leading-relaxed max-w-2xl mb-10">
              Việc lựa chọn vật liệu cẩn thận, chi tiết ngay từ đầu dự án
              là điều cần thiết cho chất lượng của nó khi hoàn thành. ARTFIVE DESIGN
              tự hào được Tập đoàn C.P. Thái Lan chọn làm đối tác thiết kế, xây dựng và giải pháp nội thất trọn gói
              cho các dự án của tập đoàn trên khắp Việt Nam, từ năm 2013 đến nay.
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {projects
                .filter((p) => p.client === "Tập đoàn C.P. Thái Lan")
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/portfolio/${p.slug}`}
                    className="eyebrow text-champagne/80 border-b border-champagne/30 hover:border-champagne pb-1 transition-colors"
                  >
                    {p.name} — {p.location}
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}