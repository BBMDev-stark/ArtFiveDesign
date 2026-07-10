import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import ProjectCard from "@/components/ProjectCard";
import ProjectGallery from "@/components/ProjectGallery";
import { projects, sectors } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.excerpt,
  };
}

/*
  GHI CHÚ — 2 trường tuỳ chọn, KHÔNG bắt buộc, trang vẫn chạy nếu chưa có:

  1) project.gallery?: string[]  — thêm ảnh chi tiết công trình ngoài project.image.
     Có bao nhiêu ảnh, carousel sẽ có bấy nhiêu nút chấm để lướt qua.
  2) project.facts?: { label: string; value: string }[] — thông số bổ sung
     (diện tích, thời gian thi công...), tự nối vào khối thông số bên trái.
*/

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const sectorNames = project.sector
    .map((s) => sectors.find((sec) => sec.slug === s)?.name)
    .filter(Boolean);

  const related = projects
    .filter((p) => p.slug !== project.slug && p.sector.some((s) => project.sector.includes(s)))
    .slice(0, 3);

  const fallbackRelated =
    related.length > 0
      ? related
      : projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const galleryImages: string[] = Array.isArray((project as any).gallery)
    ? (project as any).gallery
    : [];
  const extraFacts: { label: string; value: string }[] = Array.isArray((project as any).facts)
    ? (project as any).facts
    : [];

  const specs = [
    { label: "Địa điểm", value: project.location },
    ...(project.client ? [{ label: "Khách hàng", value: project.client }] : []),
    { label: "Lĩnh vực", value: sectorNames.join(", ") },
    { label: "Phạm vi", value: "Thiết kế Nội thất & Thi công Trọn gói" },
    ...extraFacts,
  ];

  const carouselImages = [
    { src: project.image, alt: `Toàn cảnh ${project.name}` },
    ...galleryImages.map((src, i) => ({ src, alt: `${project.name} — ảnh ${i + 1}` })),
  ];

  return (
    <>
      {/* HERO — giảm chiều cao và cỡ chữ để đỡ bị to/zoom quá mức */}
      <section className="relative h-[58vh] min-h-[420px] w-full overflow-hidden bg-ink">
        <Image
          src={project.image}
          alt={`${project.name}, ${project.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/25" />
        <div className="relative h-full flex flex-col justify-end container-x pb-12">
          <Link
            href="/portfolio"
            className="eyebrow text-ivory/70 hover:text-champagne transition-colors mb-6 w-fit text-xs"
          >
            ← Tất cả Dự án
          </Link>
          <p className="eyebrow text-champagne mb-4 text-xs">{sectorNames.join(" · ")}</p>
          <h1 className="font-serif text-ivory text-3xl md:text-5xl lg:text-6xl max-w-3xl text-balance leading-[1.1]">
            {project.name}
          </h1>
          <p className="text-ivory/60 text-sm mt-4 tracking-wide">{project.location}</p>
        </div>
      </section>

      {/* OVERVIEW — thông số dự án + yêu cầu, cỡ chữ vừa phải, dễ đọc */}
      <section className="container-x py-16 md:py-24 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <dl className="divide-y divide-line border-t border-line">
                {specs.map((spec) => (
                  <div key={spec.label} className="py-4 flex flex-col gap-1">
                    <dt className="eyebrow text-charcoal/40 text-xs">{spec.label}</dt>
                    <dd className="font-serif text-lg text-charcoal leading-snug">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.1}>
              <SectionEyebrow>Yêu cầu</SectionEyebrow>
              <p className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-charcoal/85 text-balance">
                {project.detail}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY — carousel gọn, có nút lướt qua nhiều ảnh, không còn full-bleed to quá khổ */}
      <section className="container-x py-16 md:py-20">
  <Reveal>
    <SectionEyebrow>Hình ảnh dự án</SectionEyebrow>
    <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 max-w-lg leading-[1.15] tracking-tight">
      Chi tiết thi công &amp; hoàn thiện
    </h2>
  </Reveal>

  <Reveal delay={0.1}>
    <ProjectGallery images={carouselImages} />
  </Reveal>
</section>

      {/* Prev / next */}
      <section className="border-y border-line">
        <div className="container-x grid grid-cols-2">
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group py-10 pr-6 border-r border-line"
          >
            <p className="eyebrow text-charcoal/40 mb-2 text-xs">← Trước</p>
            <p className="font-serif text-lg md:text-xl text-charcoal group-hover:text-bronze transition-colors">
              {prev.name}
            </p>
          </Link>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group py-10 pl-6 text-right"
          >
            <p className="eyebrow text-charcoal/40 mb-2 text-xs">Tiếp →</p>
            <p className="font-serif text-lg md:text-xl text-charcoal group-hover:text-bronze transition-colors">
              {next.name}
            </p>
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="container-x py-24 md:py-32">
        <Reveal>
          <SectionEyebrow>Dự án Liên quan</SectionEyebrow>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-14 max-w-xl text-balance">
            Thêm từ lĩnh vực này
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {fallbackRelated.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}