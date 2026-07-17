import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { company } from "@/lib/data";

export const metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ với ARTFIVE DESIGN tại Thành phố Hồ Chí Minh để thảo luận về các dự án thiết kế kiến trúc, nội thất và xây dựng trọn gói.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative h-[45vh] min-h-[340px] bg-ink overflow-hidden">
        <Image
          src="/images/nen3.jpg"
          alt="Căn hộ Park Legend, Quận Tân Bình"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-16">
          <p className="eyebrow text-champagne mb-6">Liên hệ</p>
          <h1 className="font-serif text-ivory text-5xl md:text-7xl max-w-3xl text-balance">
            Hãy nói về dự án của bạn.
          </h1>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-14">
            <Reveal>
              <SectionEyebrow>Trụ sở Chính</SectionEyebrow>
              <p className="font-serif text-2xl text-charcoal leading-snug text-balance">
                {company.hq}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionEyebrow>Văn phòng Chi nhánh</SectionEyebrow>
              <p className="font-serif text-2xl text-charcoal leading-snug text-balance">
                {company.branch}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <SectionEyebrow>Xưởng Nội thất</SectionEyebrow>
              <p className="font-serif text-2xl text-charcoal leading-snug text-balance">
                {company.workshop}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <SectionEyebrow>Liên hệ Trực tiếp</SectionEyebrow>
              <a
                href={`mailto:${company.email}`}
                className="font-serif text-2xl text-charcoal hover:text-bronze transition-colors block mb-2"
              >
                {company.email}
              </a>
              <a
                href={`https://${company.website}`}
                className="font-serif text-2xl text-charcoal hover:text-bronze transition-colors block"
              >
                {company.website}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <form className="space-y-8" aria-label="Form liên hệ dự án">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="eyebrow text-charcoal/50 block mb-3">
                      Họ và Tên
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full bg-transparent border-b border-line focus:border-bronze py-3 text-charcoal outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="eyebrow text-charcoal/50 block mb-3">
                      Công ty
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full bg-transparent border-b border-line focus:border-bronze py-3 text-charcoal outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="email" className="eyebrow text-charcoal/50 block mb-3">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent border-b border-line focus:border-bronze py-3 text-charcoal outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="sector" className="eyebrow text-charcoal/50 block mb-3">
                      Lĩnh vực Dự án
                    </label>
                    <select
                      id="sector"
                      name="sector"
                      className="w-full bg-transparent border-b border-line focus:border-bronze py-3 text-charcoal outline-none transition-colors"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Chọn một
                      </option>
                      <option>Y tế</option>
                      <option>Khách sạn & Nhà hàng</option>
                      <option>Văn phòng & Doanh nghiệp</option>
                      <option>Công nghiệp</option>
                      <option>Căn hộ & Biệt thự</option>
                      <option>Quốc tế</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow text-charcoal/50 block mb-3">
                    Cho chúng tôi biết về dự án
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-line focus:border-bronze py-3 text-charcoal outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="eyebrow inline-flex border border-charcoal px-10 py-4 text-charcoal hover:bg-charcoal hover:text-ivory transition-colors duration-300"
                >
                  Gửi Liên hệ
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
