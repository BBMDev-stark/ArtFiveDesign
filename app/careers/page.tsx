import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { company } from "@/lib/data";

export const metadata = {
  title: "Tuyển dụng",
  description:
    "Gia nhập đội ngũ kiến trúc, thiết kế nội thất và xây dựng trọn gói của ARTFIVE DESIGN tại Thành phố Hồ Chí Minh.",
};

const values = [
  {
    title: "Khách hàng, không phải cái tôi",
    body: "Chúng tôi luôn lắng nghe trước khi thiết kế. Kết quả tốt nhất đến từ việc kết hợp tầm nhìn của khách hàng với chuyên môn của chúng tôi — không phải từ việc bảo vệ một ý tưởng duy nhất.",
    image: "/images/diengiai.jpg",
  },
  {
    title: "Một mái nhà, trách nhiệm đầy đủ",
    body: "Thiết kế, xây dựng và xưởng nội thất của riêng nằm trong một studio, để những người vẽ một không gian được kết nối với những người xây dựng nó.",
    image: "/images/thietke.jpg",
  },
  {
    title: "Xây dựng để được nhìn hai lần",
    body: "Quan hệ khách hàng lâu nhất của chúng tôi kéo dài hơn một thập kỷ. Chúng tôi thiết kế và xây dựng cho công trình vẫn trông đúng vào lần thứ hai, không chỉ bản render.",
    image: "/images/langnghe.jpg",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] bg-ink overflow-hidden">
        <Image
          src="/images/nen2.jpg"
          alt="Studio ARTFIVE DESIGN đang làm việc"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-16">
          <p className="eyebrow text-champagne mb-6">Tuyển dụng</p>
          <h1 className="font-serif text-ivory text-5xl md:text-7xl max-w-3xl text-balance">
            Xây dựng cùng chúng tôi.
          </h1>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
    <div className="lg:col-span-4">
      <Reveal>
        <SectionEyebrow>Làm việc tại đây</SectionEyebrow>
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight text-balance">
          Một studio thiết kế-xây dựng, do các nhà thiết kế điều hành
        </h2>
      </Reveal>

      {/* ẢNH MỚI — ngang, cùng chiều rộng với chữ */}
      <Reveal delay={0.15}>
        <div className="relative aspect-[4/3] w-full mt-10 overflow-hidden">
          <Image
            src="/images/doingu.jpg"
            alt="Đội ngũ ARTFIVE DESIGN làm việc tại studio"
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </div>
    <div className="lg:col-span-7 lg:col-start-6">
      <Reveal delay={0.1}>
        <p className="text-charcoal/65 leading-relaxed text-lg mb-4">
          ARTFIVE DESIGN được sáng lập năm {company.founded} bởi đội ngũ
          các nhà thiết kế trẻ, sáng tạo với cảm nhận thẩm mỹ chung và
          niềm tin tiên phong trong vật liệu và công nghệ xây dựng mới. Đội ngũ đó
          đã phát triển thành kiến trúc, thiết kế nội thất, xây dựng và
          xưởng sản xuất nội thất riêng — nhưng văn hóa studio mà nó bắt đầu vẫn chưa thay đổi.
        </p>
        <p className="text-charcoal/65 leading-relaxed text-lg">
          Vì thiết kế, xây dựng và sản xuất nằm trong một tổ chức,
          nhân viên của chúng tôi theo dõi dự án xuyên suốt — từ một
          bản vẽ phác thảo ban đầu đến một món nội thất đang được lắp đặt tại công trường.
        </p>
      </Reveal>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-line pt-16">
  {values.map((v, i) => (
    <Reveal key={v.title} delay={i * 0.1}>
      <div className="flex flex-col h-full">
        <span className="eyebrow text-bronze/50">0{i + 1}</span>
        <h3 className="font-serif text-2xl text-charcoal mt-4 mb-3">
          {v.title}
        </h3>
        <p className="text-sm text-charcoal/60 leading-relaxed mb-6">
          {v.body}
        </p>

        {/* ẢNH — luôn nằm sát đáy card, thẳng hàng giữa các cột */}
        <div className="relative aspect-[4/3] w-full overflow-hidden mt-auto">
          <Image
            src={v.image}
            alt={v.title}
            fill
            sizes="(min-width: 768px) 30vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </Reveal>
  ))}
</div>

</section>

      <section className="bg-charcoal text-ivory py-28 text-center">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-champagne mb-8">Cuộc trò chuyện Mở</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mx-auto text-balance mb-10">
              Chúng tôi không công bố danh sách vị trí cố định — hãy liên hệ và cho chúng tôi biết bạn làm gì.
            </h2>
            <p className="text-ivory/60 max-w-xl mx-auto mb-12 leading-relaxed">
              Kiến trúc sư, nhà thiết kế nội thất, quản lý dự án và những thợ mộc lành nghề
              luôn được chào đón để giới thiệu bản thân với đội ngũ của chúng tôi tại văn phòng Cao Thắng.
            </p>
            <Link
              href={`mailto:${company.email}?subject=Ứng tuyển`}
              className="eyebrow inline-flex border border-champagne/60 px-10 py-4 hover:bg-champagne hover:text-charcoal transition-colors duration-300"
            >
              Gửi Email cho Studio
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}