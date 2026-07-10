import Link from "next/link";
import Image from "next/image";
import { company, nav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-x pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-20">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-10">
              <span className="relative block h-10 w-[120px]">
                <Image
                  src="/images/brand/logo-full.png"
                  alt="ARTFIVE DESIGN"
                  fill
                  sizes="120px"
                  className="object-contain brightness-0 invert"
                />
              </span>
            </Link>
            <p className="font-serif text-3xl lg:text-4xl leading-tight text-ivory/90 text-balance mb-10 max-w-lg">
              Hãy thiết kế điều xứng đáng với thương hiệu của bạn.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-champagne/40 px-8 py-4 text-champagne hover:bg-champagne hover:text-charcoal transition-all duration-500 tracking-widest3"
            >
              Bắt đầu cuộc trò chuyện
            </Link>
          </div>

          <div className="lg:col-span-2 lg:col-start-8">
            <p className="eyebrow text-ivory/40 mb-8 tracking-widest3">Điều hướng</p>
            <ul className="space-y-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/70 hover:text-champagne transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-ivory/40 mb-8 tracking-widest3">Liên hệ</p>
            <div className="space-y-4">
              <p className="text-sm text-ivory/70 leading-relaxed">
                {company.hq}
              </p>
              <p className="text-sm text-ivory/70 leading-relaxed">
                {company.branch}
              </p>
              <a
                href={`mailto:${company.email}`}
                className="text-sm text-champagne hover:text-ivory transition-colors duration-300 block mt-6"
              >
                {company.email}
              </a>
              <a
                href={`https://${company.website}`}
                className="text-sm text-champagne hover:text-ivory transition-colors duration-300 block"
              >
                {company.website}
              </a>
            </div>
          </div>
        </div>

        <div className="hairline-dark" />

        <div className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-xs text-ivory/40">
              © {new Date().getFullYear()} ARTFIVE DESIGN. Thành lập {company.founded}, Thành phố Hồ Chí Minh.
            </p>
            <p className="text-xs text-ivory/30 mt-2">
              Thiết kế Kiến trúc · Thiết kế Nội thất · Thi công Trọn gói · Sản xuất Nội thất
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="h-6 w-[1px] bg-ivory/10" />
            <span className="text-xs text-ivory/30 tracking-wider">ARTFIVE DESIGN CORPORATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
