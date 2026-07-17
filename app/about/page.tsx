import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import LocationLedger from "@/components/LocationLedger";
import ZoomableImage from "@/components/ZoomableImage";
import { company, philosophy, team, stats } from "@/lib/data";

export const metadata = {
  title: "Giới thiệu",
  description:
    "Được sáng lập vào năm 2009 bởi Nguyễn Dương Huy, ARTFIVE DESIGN CORPORATION là công ty thiết kế nội thất, kiến trúc và xây dựng trọn gói tại Thành phố Hồ Chí Minh.",
};

/*
  GHI CHÚ — cần bổ sung trong lib/data.js:

  1) Mỗi phần tử trong mảng `team` cần thêm trường `image`:
     { name: "Nguyễn Dương Huy", role: "...", bio: "...", image: "/images/team/nguyen-duong-huy.jpg" }
     Ảnh chân dung thật, tỉ lệ dọc ~4:5, đặt trong /public/images/team/.

  2) `certifications` (mảng text cũ) không còn được dùng ở trang này — đã thay
     bằng mảng `licenses` bên dưới, gắn trực tiếp với 2 văn bản pháp lý thật.
     Nếu bạn vẫn dùng `certifications` ở nơi khác thì không sao, không ảnh hưởng.

  3) Copy 2 ảnh giấy tờ vào /public/images/licenses/:
       giay-chung-nhan-dkkd.png
       chung-chi-nang-luc-xay-dung.png
     (đã đính kèm sẵn trong outputs/images/licenses của lần trả lời này)

  4) Ảnh minh hoạ phần "Câu chuyện" — đổi historyImage bên dưới thành ảnh thật
     (studio, văn phòng, hoặc công trình tiêu biểu).
*/

const historyImage = "/images/leader/NguyenDuongHuy.svg"; // TODO: thay bằng ảnh thật

const licenses = [
  {
    title: "Giấy chứng nhận đăng ký doanh nghiệp",
    number: "0309190959",
    image: "/images/licenses/giay-chung-nhan-dkkd.png",
    issuedBy: "Phòng Đăng ký kinh doanh — Sở Kế hoạch & Đầu tư TP.HCM",
    facts: [
      { label: "Tên công ty", value: "Công ty Cổ phần Thiết kế Nghệ thuật Số Năm (Art Five Design Corporation)" },
      { label: "Đăng ký lần đầu", value: "10/07/2009" },
      { label: "Vốn điều lệ", value: "39.000.000.000 đồng" },
      { label: "Người đại diện pháp luật", value: "Nguyễn Dương Huy — Tổng Giám đốc" },
    ],
  },
  {
    title: "Chứng chỉ năng lực hoạt động xây dựng",
    number: "HCM-00082692",
    image: "/images/licenses/chung-chi-nang-luc-xay-dung.png",
    issuedBy: "Sở Xây dựng Thành phố Hồ Chí Minh",
    facts: [
      { label: "Hiệu lực đến", value: "21/06/2034" },
      { label: "Thiết kế, thẩm tra thiết kế công trình nhà công nghiệp", value: "Hạng III" },
      { label: "Thi công xây dựng công trình dân dụng, nhà công nghiệp", value: "Hạng III" },
      { label: "Thi công lắp đặt thiết bị công trình dân dụng, nhà công nghiệp", value: "Hạng III" },
    ],
  },
];

const experience = {
  headline:
    "Nguồn cảm hứng bất tận cho chúng tôi sáng tạo và cống hiến không ai khác chính là Bạn — khách hàng của Art Five Design Corporation.",
  body: "Chúng tôi cung cấp dịch vụ thiết kế và thi công kiến trúc, nội thất cho đa dạng loại hình công trình: nhà ở, căn hộ dân dụng, thương mại, bán lẻ, văn phòng và công trình y tế, theo phong cách sang trọng — với mong muốn mang đến những công trình đẳng cấp, được thiết kế phù hợp với nhu cầu riêng của từng khách hàng.",
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[64vh] min-h-[540px] bg-ink overflow-hidden">
        <Image
          src="/images/OFFICE1.svg"
          alt="Công việc nội thất studio ARTFIVE DESIGN"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-20 md:pb-28">
          <p className="eyebrow text-champagne/80 mb-6 tracking-widest3">Về Chúng tôi</p>
          <h1 className="font-serif text-ivory text-4xl md:text-6xl lg:text-7xl max-w-4xl text-balance leading-[1.1]">
            Một công ty thiết kế, không phải một studio thiết kế.
          </h1>
        </div>
      </section>

      <LocationLedger />

      {/* HISTORY */}
      <section className="section-spacing">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>Câu chuyện của chúng tôi</SectionEyebrow>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight tracking-tight mb-10">
                  Được sáng vào lập năm {company.founded}
                  <br />
                  bởi <span className="italic text-bronze">{company.founder}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <ZoomableImage
                    src={historyImage}
                    alt={`Studio ${company.founder ?? "ARTFIVE DESIGN"}`}
                    sizes="(min-width: 1024px) 35vw, 90vw"
                  />
                  <div className="absolute inset-0 border border-ivory/20 pointer-events-none" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-8 lg:pt-[7.5rem]">
              <Reveal delay={0.1}>
                <p className="text-lg text-charcoal/75 leading-relaxed">{philosophy.history}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-charcoal/65 leading-relaxed">{philosophy.product}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg text-charcoal/55 leading-relaxed">{philosophy.turnkey}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-charcoal text-ivory section-spacing">
  <div className="container-x">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <Reveal>
          <SectionEyebrow dark>Triết lý</SectionEyebrow>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
            {philosophy.globalLocal}
          </h2>
        </Reveal>

        {/* ẢNH MỚI — sát dưới tiêu đề */}
        <Reveal delay={0.15}>
          <div className="relative aspect-[16/9] w-full mt-8 overflow-hidden">
            <Image
              src="/images/BenhVienSIH2.svg"
              alt="Tầm nhìn toàn cầu của ARTFIVE DESIGN"
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 border border-ivory/20 pointer-events-none" />
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal delay={0.1}>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-ivory/85">
            {philosophy.clientExperience}
          </p>
        </Reveal>
      </div>
    </div>
  </div>
</section>

      {/* EXPERIENCE — nội dung mới, lấy khách hàng làm trung tâm */}
      <section className="section-spacing border-t border-line">
  <div className="container-x">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <Reveal>
          <SectionEyebrow>Kinh nghiệm của chúng tôi</SectionEyebrow>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal leading-snug tracking-tight text-balance">
            {experience.headline}
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
        <Reveal delay={0.1}>
          <p className="text-lg text-charcoal/65 leading-relaxed">{experience.body}</p>
        </Reveal>

        {/* ẢNH MỚI — sát dưới đoạn văn, cùng tỷ lệ với ảnh trên */}
        <Reveal delay={0.2}>
          <div className="relative aspect-[16/9] w-full mt-8 overflow-hidden">
            <Image
              src="/images/OFFICEIRISPARTNERS.svg"
              alt="Công trình tiêu biểu của ARTFIVE DESIGN"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 border border-charcoal/10 pointer-events-none" />
          </div>
        </Reveal>
      </div>
    </div>
  </div>
</section>

      {/* STATS */}
      <section className="section-spacing border-t border-line">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-bronze mb-3 tracking-tight">
                  {s.value}
                </p>
                <p className="text-sm text-charcoal/50 max-w-[24ch] leading-relaxed">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM — mỗi lãnh đạo có ảnh chân dung, click để phóng to */}
      <section className="section-spacing bg-paper">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow>Lãnh đạo</SectionEyebrow>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-16 max-w-xl leading-[1.1] tracking-tight">
              Đội ngũ đứng sau mọi dự án
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={(i % 4) * 0.08}>
                <article>
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal/5 mb-6">
                    <ZoomableImage
                      src={member.image}
                      alt={member.name}
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      imageClassName="grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                    >
                      <div className="absolute inset-3 border border-ivory/30 pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-ivory font-serif text-lg text-left">{member.name}</p>
                      </div>
                    </ZoomableImage>
                  </div>

                  <div className="border-t-2 border-bronze/40 pt-6">
                    <h3 className="font-serif text-2xl lg:text-3xl text-charcoal mb-2 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="eyebrow text-bronze/70 mb-6 tracking-widest3">{member.role}</p>
                    <p className="text-sm text-charcoal/60 leading-relaxed max-w-lg">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSES — 2 văn bản pháp lý thật, click để xem bản đầy đủ */}
      <section className="section-spacing" id="giay-phep">
        <div className="container-x">
          <Reveal>
            <SectionEyebrow>Pháp lý &amp; Năng lực</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-14 max-w-xl leading-[1.15] tracking-tight">
              Được cấp phép để thiết kế, xây dựng và bàn giao
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {licenses.map((license, i) => (
              <Reveal key={license.number} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-charcoal/[0.03] overflow-hidden">
                  {/* ảnh thu nhỏ, canh giữa — không còn chiếm gần hết thẻ */}
                  <div className="flex justify-center bg-ivory p-6">
                    <div className="relative aspect-[3/4] w-full max-w-[240px]">
                      <ZoomableImage
                        src={license.image}
                        alt={license.title}
                        sizes="240px"
                        fit="contain"
                      />
                    </div>
                  </div>

                  {/* thanh footer trong thẻ: chỉ còn nhãn số văn bản, đã bỏ nút tải */}
                  <div className="border-t border-line px-6 py-4">
                    <p className="text-xs uppercase tracking-wide text-charcoal/45">
                      Số {license.number}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-serif text-xl lg:text-2xl text-charcoal mb-1 tracking-tight">
                    {license.title}
                  </h3>
                  <p className="text-xs text-charcoal/45 mb-6">{license.issuedBy}</p>
                  <dl className="space-y-3">
                    {license.facts.map((fact) => (
                      <div key={fact.label} className="flex flex-col gap-0.5">
                        <dt className="text-xs uppercase tracking-wide text-charcoal/40">{fact.label}</dt>
                        <dd className="text-sm text-charcoal/75 leading-relaxed">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}