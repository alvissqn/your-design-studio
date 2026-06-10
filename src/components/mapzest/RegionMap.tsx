import { ChevronDown } from "lucide-react";

const pins = [
  { top: "30%", left: "20%", label: "2,156" },
  { top: "20%", left: "55%", label: "856" },
  { top: "60%", left: "40%", label: "12,458", big: true },
  { top: "70%", left: "75%", label: "1,850" },
  { top: "85%", left: "30%", label: "1,265" },
];

export function RegionMap() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Bất động sản theo khu vực</h3>
        <button className="flex items-center gap-1 h-8 px-3 rounded-md border border-border text-xs hover:bg-secondary">
          7 ngày qua <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      <div className="relative h-[200px] rounded-lg overflow-hidden bg-gradient-to-br from-info-soft via-success-soft to-warning-soft">
        <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M50,40 Q120,30 180,80 T320,100 Q360,140 350,180 L50,180 Z"
            fill="oklch(0.85 0.05 150)" stroke="oklch(0.65 0.06 150)" strokeWidth="1" />
        </svg>
        {pins.map((p, i) => (
          <div
            key={i}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center shadow-lg ring-4 ring-primary/20 ${
              p.big ? "h-12 w-12 text-xs" : "h-9 w-9 text-[10px]"
            }`}
            style={{ top: p.top, left: p.left }}
          >
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}
