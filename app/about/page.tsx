import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import LocationLedger from "@/components/LocationLedger";
import ZoomableImage from "@/components/ZoomableImage";
import LeadershipSection from "@/components/LeadershipSection";
import { company, stats } from "@/lib/data";

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

const founderPortrait = "/images/leader/NguyenDuongHuy-transparent-v2.png";

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

const experienceBody =
  "Chúng tôi cung cấp dịch vụ thiết kế và thi công kiến trúc, nội thất cho đa dạng loại hình công trình: nhà ở, căn hộ dân dụng, thương mại, bán lẻ, văn phòng và công trình y tế, theo phong cách sang trọng — với mong muốn mang đến những công trình đẳng cấp, được thiết kế phù hợp với nhu cầu riêng của từng khách hàng.";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[64vh] min-h-[540px] bg-ink overflow-hidden">
        <Image
          src="/images/OFFICE1.webp"
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
      <section className="about-story-showcase">
        <div className="about-story-showcase__inner">
          <div className="about-story-showcase__left">
            <Reveal>
              <div className="about-story-showcase__kicker">
                <span className="about-story-showcase__capital" aria-hidden="true"><i /><i /><i /></span>
                <p>Câu chuyện của chúng tôi</p>
              </div>
              <h2>
                Được sáng lập<br />
                năm {company.founded}<br />
                bởi<br />
                <em>{company.founder}</em>
              </h2>
            </Reveal>

            <Reveal delay={0.15} className="about-story-showcase__portrait-wrap">
              <Image
                src={founderPortrait}
                alt={`Ông ${company.founder}, người sáng lập ARTFIVE DESIGN`}
                fill
                priority
                sizes="(min-width: 1024px) 390px, 72vw"
                className="about-story-showcase__portrait"
              />
            </Reveal>
          </div>

          <div className="about-story-showcase__axis" aria-hidden="true">
            <span>✣</span>
          </div>

          <div className="about-story-showcase__copy">
            {[
              <>
                Được sáng lập năm 2009 bởi Nguyễn Dương Huy,<br />
                ARTFIVE DESIGN khởi nguồn từ niềm đam mê kiến trúc<br />
                và nội thất cùng khát vọng kiến tạo những không gian<br />
                sống tinh tế, bền vững và đầy cảm hứng.
              </>,
              <>
                Trải qua hơn một thập kỷ phát triển, chúng tôi không<br />
                ngừng hoàn thiện tư duy thiết kế và quy trình thi công,<br />
                để mỗi công trình đều mang dấu ấn riêng, phản ánh<br />
                gu thẩm mỹ và phong cách sống của từng khách hàng.
              </>,
              <>
                Hôm nay, ARTFIVE DESIGN tự hào là đơn vị thiết kế và<br />
                thi công kiến trúc – nội thất trọn gói, đồng hành cùng<br />
                khách hàng kiến tạo những không gian đẳng cấp, nơi<br />
                giá trị thẩm mỹ và công năng hòa quyện vẹn toàn.
              </>,
            ].map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.1}>
                <div className="about-story-showcase__copy-block">
                  <div className="about-story-showcase__rule" aria-hidden="true"><i /></div>
                  <p>{paragraph}</p>
                </div>
              </Reveal>
            ))}
            <div className="about-story-showcase__rule about-story-showcase__rule--final" aria-hidden="true"><i /></div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="about-philosophy-showcase">
        <span className="about-philosophy-showcase__vertical" aria-hidden="true">
          Artfive Design Corporation
        </span>
        <span className="about-philosophy-showcase__counter" aria-label="Phần 1 trên 4">
          <i /> <strong>01</strong> / 04
        </span>

        <div className="about-philosophy-showcase__inner">
          <div className="about-philosophy-showcase__visual">
            <Reveal>
              <div className="about-philosophy-showcase__eyebrow"><i /> Triết lý</div>
            </Reveal>

            <Reveal delay={0.15} className="about-philosophy-showcase__composite-wrap">
              <Image
                src="/images/philosophy-visual-composite-transparent.png"
                alt="Tầm nhìn toàn cầu, sứ mệnh địa phương — công trình Bệnh viện Phụ sản Quốc tế Sài Gòn"
                fill
                sizes="(min-width: 1280px) 930px, (min-width: 900px) 62vw, 94vw"
                className="about-philosophy-showcase__composite"
                priority
              />
            </Reveal>

            <Reveal delay={0.25} className="about-philosophy-showcase__action-wrap">
              <Link href="/careers" className="about-philosophy-showcase__action">
                <span>Khám phá văn hóa doanh nghiệp</span>
                <span aria-hidden="true">⟶</span>
              </Link>
            </Reveal>
          </div>

          <div className="about-philosophy-showcase__copy">
            <Reveal delay={0.1}>
              <p className="about-philosophy-showcase__lead">
                Chúng tôi hoàn toàn tập trung vào trải<br />
                nghiệm khách hàng, hiện tại và tương lai.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Chúng tôi luôn lắng nghe trước khi thiết kế. Đối với chúng tôi,<br />
                tiếng nói của khách hàng quan trọng nhất, không phải cái tôi<br />
                của chúng tôi. Thiết kế tốt nhất sinh ra từ việc kết hợp tầm<br />
                nhìn của nhà đầu tư với chuyên môn của ARTFIVE DESIGN.<br />
                Hợp tác là nguyên tắc nền tảng trong quy trình thiết kế<br />
                của chúng tôi.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Chúng tôi không chỉ tạo nên những công trình đẹp, mà còn<br />
                kiến tạo không gian sống mang giá trị bền vững – nơi thẩm mỹ,<br />
                công năng và cảm xúc được hòa quyện, phản ánh phong cách<br />
                sống và dấu ấn riêng của từng khách hàng.
              </p>
            </Reveal>
            <div className="about-philosophy-showcase__rule" aria-hidden="true"><i /></div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="about-experience-showcase">
        <aside className="about-experience-showcase__rail" aria-label="Thông tin thương hiệu">
          <Image
            src="/images/brand/logo-full.png"
            alt="Art Five Design Corporation"
            width={126}
            height={63}
            className="about-experience-showcase__logo"
          />
          <span className="about-experience-showcase__rail-line" aria-hidden="true" />
          <span className="about-experience-showcase__rail-copy">
            Architecture · Interior · Construction
          </span>
          <span className="about-experience-showcase__since">Since 2009</span>
        </aside>

        <div className="about-experience-showcase__inner">
          <div className="about-experience-showcase__headline">
            <Reveal>
              <h2>
                Nguồn cảm hứng<br />
                bất tận cho chúng tôi<br />
                sáng tạo và cống hiến<br />
                không ai khác chính là<br />
                <em>Bạn — khách hàng</em><br />
                của Art Five Design<br />
                Corporation.
              </h2>
              <Link href="#team" className="about-experience-showcase__link">
                <span>Về chúng tôi</span>
                <span aria-hidden="true">⟶</span>
              </Link>
            </Reveal>
          </div>

          <div className="about-experience-showcase__content">
            <Reveal delay={0.1}>
              <div className="about-experience-showcase__ornament" aria-hidden="true">
                <i /><b>✦</b><i />
              </div>
              <p>{experienceBody}</p>
            </Reveal>

            <Reveal delay={0.2} className="about-experience-showcase__image-wrap">
              <Image
                src="/images/OFFICEIRISPARTNERS.webp"
                alt="Không gian văn phòng do ARTFIVE DESIGN thực hiện"
                fill
                sizes="(min-width: 1280px) 665px, (min-width: 768px) 56vw, 92vw"
                className="about-experience-showcase__image"
              />
            </Reveal>
          </div>

          <Image
            src="/images/brand/art-five-signature-reference.png"
            alt=""
            width={192}
            height={179}
            className="about-experience-showcase__signature"
            aria-hidden="true"
          />
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

      <LeadershipSection />

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
