import Image from "next/image";
import ContactForm from "@/components/ContactForm";
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
              <p className="font-serif text-2xl text-charcoal leading-snug text-balance mb-5">
                {company.hq}
              </p>
              <a
                href={company.hqMapUrl}
                target="_blank"
                rel="noreferrer"
                className="eyebrow inline-flex items-center gap-3 border-b border-bronze/30 pb-1 text-bronze transition-colors hover:border-bronze"
              >
                Chỉ đường trên Google Maps
                <span aria-hidden>↗</span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionEyebrow>Văn phòng Chi nhánh</SectionEyebrow>
              <a
                href={company.hqMapUrl}
                target="_blank"
                rel="noreferrer"
                className="font-serif text-2xl leading-snug text-charcoal text-balance transition-colors hover:text-bronze"
              >
                {company.branch}
              </a>
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
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="studio-location relative overflow-hidden border-t border-[#d9d0c4] py-20 md:py-28 lg:py-32">
        <div className="container-x relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-7">
                <div className="mb-8 flex items-center gap-6">
                  <span className="h-px w-16 bg-[#9b876b]" aria-hidden />
                  <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-charcoal/75 md:text-xs">
                    Vị trí ARTFIVE DESIGN
                  </p>
                </div>
                <h2 className="font-serif text-[3.25rem] leading-[0.98] tracking-[-0.035em] text-charcoal sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                  Ghé thăm studio
                  <span className="mt-2 block italic text-[#9a8261]">
                    tại Him Lam.
                  </span>
                </h2>
              </div>

              <div className="lg:col-span-5 lg:pb-2">
                <p className="max-w-xl font-serif text-lg leading-[1.7] text-charcoal/70">
                  Trụ sở chính của ARTFIVE DESIGN tọa lạc tại Khu đô thị mới Him
                  Lam, Phường Tân Hưng, Quận 7, Thành phố Hồ Chí Minh.
                </p>
                <a
                  href={company.hqMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-8 border border-[#a58d6c] bg-ivory/55 px-7 py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-[#735f45] transition-all duration-300 hover:bg-[#8b7355] hover:text-ivory md:px-9 md:py-5"
                >
                  Mở trong Google Maps
                  <span className="text-base leading-none" aria-hidden>
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 overflow-hidden rounded-[14px] border border-[#d5ccc0] bg-[rgba(250,248,244,0.88)] shadow-[0_24px_70px_rgba(83,65,42,0.08)] md:mt-16 lg:grid lg:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="relative flex flex-col border-b border-[#d5ccc0] p-7 md:p-10 lg:min-h-[650px] lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-5">
                  <span
                    className="flex h-8 w-8 items-center justify-center text-2xl text-[#9a8261]"
                    aria-hidden
                  >
                    ⌖
                  </span>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#806a4e]">
                    Trụ sở chính
                  </p>
                </div>

                <div className="my-7 h-px bg-[#b9aa96]" />

                <div>
                  <p className="font-serif text-2xl tracking-[0.03em] text-charcoal">
                    ARTFIVE DESIGN
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-charcoal/70">
                    Studio
                  </p>
                </div>

                <div className="mt-9 space-y-6 text-sm leading-7 text-charcoal/70">
                  <div className="grid grid-cols-[22px_1fr] gap-4">
                    <span className="font-serif text-xl text-[#9a8261]" aria-hidden>
                      ⌖
                    </span>
                    <p>
                      Tầng 3, Biệt thự Tân Hưng,
                      <br />
                      24 Đường Số 10, KĐTM Him Lam,
                      <br />
                      Phường Tân Hưng, Quận 7,
                      <br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="grid grid-cols-[22px_1fr] gap-4 transition-colors hover:text-bronze"
                  >
                    <span className="font-serif text-lg text-[#9a8261]" aria-hidden>
                      ☎
                    </span>
                    <span>{company.phone}</span>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="grid grid-cols-[22px_1fr] gap-4 transition-colors hover:text-bronze"
                  >
                    <span className="font-serif text-lg text-[#9a8261]" aria-hidden>
                      ✉
                    </span>
                    <span>{company.email}</span>
                  </a>
                  <div className="grid grid-cols-[22px_1fr] gap-4">
                    <span className="font-serif text-lg text-[#9a8261]" aria-hidden>
                      ◷
                    </span>
                    <span>{company.hours}</span>
                  </div>
                </div>

                <div className="my-8 h-px bg-[#b9aa96]" />

                <div className="relative mt-auto overflow-hidden rounded-xl bg-[#f1ebe2] px-6 py-7">
                  <Image
                    src="/images/villa-hero-isolated.webp"
                    alt=""
                    fill
                    sizes="320px"
                    className="pointer-events-none object-contain object-right-bottom opacity-[0.12] grayscale"
                  />
                  <div className="relative z-10 max-w-[220px]">
                    <p className="font-serif text-3xl leading-none text-[#9a8261]" aria-hidden>
                      “
                    </p>
                    <p className="mt-1 font-serif text-sm italic leading-6 text-charcoal/65">
                      Chúng tôi luôn sẵn sàng chào đón bạn đến không gian sáng tạo
                      của ARTFIVE.
                    </p>
                  </div>
                </div>
              </aside>

              <div className="relative min-h-[400px] overflow-hidden bg-[#ebe8e1] md:min-h-[520px] lg:min-h-[650px]">
                <iframe
                  src={company.hqMapEmbed}
                  title="Google Maps — Trụ sở chính ARTFIVE DESIGN tại Him Lam, Quận 7"
                  className="studio-map absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={company.hqMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group absolute right-5 top-5 z-20 md:right-7 md:top-7"
                  aria-label="Mở vị trí ARTFIVE DESIGN trên Google Maps"
                >
                  <span className="inline-flex items-center gap-5 rounded-lg border border-[#d8d0c5] bg-[#fffdf9]/95 px-5 py-3 font-serif text-sm text-charcoal shadow-[0_8px_24px_rgba(45,36,26,0.09)] transition-colors group-hover:text-bronze">
                    Mở trong Maps
                    <span aria-hidden>↗</span>
                  </span>
                </a>
              </div>

            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
