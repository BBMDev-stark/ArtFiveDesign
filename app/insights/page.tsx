import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";

export const metadata = {
  title: "Bài viết",
  description:
    "Ghi chú từ studio ARTFIVE DESIGN về bàn giao trọn gói, thiết kế nội thất y tế và sản xuất nội thất.",
};

const posts = [
  {
    tag: "Thực hành",
    title: "Bài học từ quan hệ đối tác năm 2013 về bàn giao trọn gói",
    image: "/images/cplab-binhphuoc.jpg",
    body: [
      "Năm 2013, Tập đoàn C.P. Thái Lan đã chọn ARTFIVE DESIGN làm đối tác thiết kế, xây dựng và nội thất trọn gói tại Việt Nam. Hơn một thập kỷ và nhiều tỉnh sau — Bình Phước, Biên Hòa, Hà Nội, Kiên Giang, Bạc Liêu — mối quan hệ đó vẫn là nghiên cứu tình huống rõ ràng nhất về những gì bàn giao trọn gói thực sự đòi hỏi.",
      "Đó không phải là một hợp đồng lớn. Đó là một trụ sở văn phòng, rồi phòng thí nghiệm, rồi ký túc xá, rồi trại tôm giống — mỗi cái với yêu cầu khác nhau, địa điểm khác nhau, và cùng một khách hàng theo dõi tính nhất quán. Bài học là về quy trình, không phải thẩm mỹ: việc lựa chọn vật liệu cẩn thận, chi tiết ngay từ đầu dự án là điều bảo vệ chất lượng của nó vào lúc hoàn thành. Một đối tác trọn gói phải làm đúng bước đó mỗi lần, trên mọi loại công trình, nếu không mối quan hệ không thể tồn tại qua dự án thứ hai — chứ đừng nói dự án thứ mười.",
    ],
  },
  {
    tag: "Y tế",
    title: "Thiết kế sự bình yên vào mặt bằng lâm sàng",
    image: "/images/sih-lobby.jpg",
    body: [
      "Nội thất bệnh viện mang những ràng buộc mà công việc nhà ở và văn phòng không có: kiểm soát nhiễm trùng, khoảng trống thiết bị, quy trình làm việc của nhân viên, và một khách hàng mà theo định nghĩa không đang có ngày tốt nhất. Tại Bệnh viện SIH Quận 1, yêu cầu của chúng tôi bao gồm sảnh chính tầng trệt, tầng khám bệnh, khoa nội trú và các phòng bệnh VIP, Tiêu chuẩn, S.VIP — mỗi cái với chương trình chức năng riêng, tất cả cần cảm giác như một công trình nhất quán.",
      "Bản năng trong thiết kế lâm sàng thường là để chức năng chi phối mọi thứ và coi bầu không khí như một xa xỉ. Chúng tôi nhận thấy điều ngược lại hiệu quả hơn: bảng màu vật liệu bình yên và dẫn đường rõ ràng không phải là trang trí trên một bệnh viện đang hoạt động — chúng là một phần của cách bệnh viện vận hành, cho bệnh nhân và cho nhân viên di chuyển qua nó cả ngày.",
    ],
  },
  {
    tag: "Sản xuất",
    title: "Tại sao chúng tôi tự sản xuất nội thất",
    image: "/images/art5-workshop.jpg",
    body: [
      "ARTFIVE DESIGN vận hành xưởng sản xuất nội thất và gia công của riêng tại Phường Long Bình, Thành phố Thủ Đức — một quyết định được đưa ra sớm, khi studio vẫn chủ yếu là công ty thiết kế nội thất. Nó thay đổi ý nghĩa của 'trọn gói' trong thực tế. Một ý đồ thiết kế không phải vượt qua việc chuyển giao cho bên thứ ba có ưu tiên khác và khái niệm dung sai khác.",
      "Sản xuất nội bộ chậm hơn để thiết lập và khó hơn để vận hành so với việc đơn giản chỉ định nội thất từ danh mục. Nhưng đó là lý do chúng tôi có thể giữ một điểm trách nhiệm duy nhất từ bản vẽ đầu tiên đến bàn giao cuối cùng — đó là, cuối cùng, lời hứa mà một studio trọn gói thực sự đang thực hiện.",
    ],
  },
];

export default function InsightsPage() {
  return (
    <>
      <section className="relative h-[50vh] min-h-[380px] bg-ink overflow-hidden">
        <Image
          src="/images/art5-workshop.jpg"
          alt="Xưởng nội thất ARTFIVE"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
        <div className="relative h-full flex flex-col justify-end container-x pb-16">
          <p className="eyebrow text-champagne mb-6">Bài viết</p>
          <h1 className="font-serif text-ivory text-5xl md:text-7xl max-w-3xl text-balance">
            Ghi chú từ studio.
          </h1>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <Reveal>
          <p className="text-charcoal/60 max-w-2xl leading-relaxed mb-20">
            Góc nhìn ngắn từ ARTFIVE DESIGN về cách chúng tôi làm việc, viết cho
            những khách hàng muốn hiểu quy trình của chúng tôi, không chỉ
            xem những bức ảnh hoàn thành.
          </p>
        </Reveal>

        <div className="space-y-28">
          {posts.map((post, i) => (
            <article key={post.title} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 border-t border-line pt-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative aspect-[4/3] overflow-hidden mb-8">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <SectionEyebrow>{post.tag}</SectionEyebrow>
                  <h2 className="font-serif text-3xl md:text-4xl text-charcoal text-balance">
                    {post.title}
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 space-y-6">
                {post.body.map((p, j) => (
                  <Reveal key={j} delay={0.1 + j * 0.1}>
                    <p className="text-charcoal/70 leading-relaxed text-lg">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
