"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects, sectors, Project } from "@/lib/data";

export default function PortfolioFilter() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("sector") || "all";
  const [active, setActive] = useState<string>(initial);

  useEffect(() => {
    setActive(searchParams.get("sector") || "all");
  }, [searchParams]);

  const filtered: Project[] = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.sector.includes(active));
  }, [active]);

  const filters = [{ slug: "all", name: "Tất cả" }, ...sectors];

  return (
    <div>
      <div
        className="flex flex-wrap gap-x-8 gap-y-4 pb-10 border-b border-line"
        role="group"
        aria-label="Lọc dự án theo lĩnh vực"
      >
        {filters.map((f) => (
          <button
            key={f.slug}
            onClick={() => setActive(f.slug)}
            aria-pressed={active === f.slug}
            className={`eyebrow pb-1 border-b transition-colors duration-300 ${
              active === f.slug
                ? "text-bronze border-bronze"
                : "text-charcoal/45 border-transparent hover:text-charcoal/80"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-16">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}>
            <ProjectCard project={p} priority={i < 3} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-charcoal/50 pt-16 text-center">
          Chưa có dự án trong lĩnh vực này.
        </p>
      )}
    </div>
  );
}
