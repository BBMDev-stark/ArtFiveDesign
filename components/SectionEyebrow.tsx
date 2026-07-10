export default function SectionEyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-5 mb-8">
      <span
        className={`h-[1px] w-10 ${dark ? "bg-champagne/50" : "bg-bronze/60"}`}
      />
      <span
        className={`eyebrow tracking-widest3 ${dark ? "text-champagne/80" : "text-bronze"}`}
      >
        {children}
      </span>
    </div>
  );
}
