import Link from "next/link";
import Image from "next/image";
import { Project, sectors } from "@/lib/data";

export default function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const sectorNames = project.sector
    .map((s) => sectors.find((sec) => sec.slug === s)?.name)
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full"
      aria-label={`Xem dự án: ${project.name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5 mb-6 rounded-2xl">
        <Image
  src={project.image}
  alt={`${project.name}, ${project.location}`}
  fill
  priority={priority}
  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
/>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Phần text - Đã fix gọn */}
      <div className="px-1">
        <h3 className="font-serif text-lg lg:text-xl text-charcoal group-hover:text-bronze transition-colors duration-300 leading-tight line-clamp-2 mb-2">
          {project.name}
        </h3>
        
        <p className="text-sm text-charcoal/60 line-clamp-1 mb-3">
          {project.location}
        </p>

        {sectorNames && (
          <p className="eyebrow text-charcoal/40 text-[0.65rem] tracking-widest3 line-clamp-1">
            {sectorNames}
          </p>
        )}
      </div>
    </Link>
  );
}