const locations = [
  { place: "Thành phố Hồ Chí Minh", tag: "Trụ sở · 10.78°N 106.70°E" },
  { place: "Singapore", tag: "1.35°N 103.82°E" },
  { place: "Hải Phòng", tag: "20.84°N 106.69°E" },
  { place: "Bình Phước", tag: "11.54°N 106.91°E" },
  { place: "Hà Nội", tag: "21.03°N 105.83°E" },
  { place: "Biên Hòa", tag: "10.96°N 106.84°E" },
  { place: "Bắc Ninh", tag: "21.19°N 106.08°E" },
  { place: "Kiên Giang", tag: "10.01°N 105.08°E" },
];

export default function LocationLedger({ dark = false }: { dark?: boolean }) {
  const items = [...locations, ...locations];
  const lineColor = dark ? "text-champagne/70" : "text-bronze";
  const textColor = dark ? "text-ivory/70" : "text-charcoal/70";

  return (
    <div
      className="w-full overflow-hidden border-y py-3"
      style={{
        borderColor: dark ? "rgba(220,211,192,0.18)" : "#DCD3C0",
      }}
      aria-label="Các thành phố nơi ARTFIVE DESIGN đã hoàn thành dự án"
    >
      <div className="ticker-track">
        {items.map((loc, i) => (
          <div
            key={i}
            className="flex items-center gap-3 pr-10 whitespace-nowrap"
          >
            <span className={`eyebrow ${lineColor}`}>{loc.place}</span>
            <span className={`text-xs font-sans ${textColor}`}>{loc.tag}</span>
            <span className="w-1 h-1 rounded-full bg-bronze/60 ml-7" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}
