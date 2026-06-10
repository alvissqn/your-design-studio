import { ChevronDown } from "lucide-react";

const agents = [
  { name: "Nguyễn Văn An", count: 142, agency: "Đất Xanh Group" },
  { name: "Trần Thị Bình", count: 128, agency: "Vinhomes" },
  { name: "Lê Hoàng Cường", count: 115, agency: "Novaland" },
  { name: "Phạm Minh Đức", count: 98, agency: "Khang Điền" },
  { name: "Hoàng Thu Hà", count: 87, agency: "Hưng Thịnh" },
];

const popular = [
  { title: "Biệt thự Vinhomes Riverside", views: "12,458" },
  { title: "Căn hộ Masteri An Phú", views: "9,823" },
  { title: "Shophouse Sala Đại Quang Minh", views: "8,541" },
  { title: "Nhà phố Phú Mỹ Hưng", views: "7,892" },
  { title: "Đất nền Long Hậu", views: "6,734" },
];

const revenue = [
  { name: "Gói Pro 12 tháng", value: "98,500,000đ", pct: 42, color: "oklch(0.58 0.18 255)" },
  { name: "Gói Pro 6 tháng", value: "76,200,000đ", pct: 32, color: "oklch(0.68 0.16 150)" },
  { name: "Gói Basic 3 tháng", value: "45,800,000đ", pct: 18, color: "oklch(0.78 0.16 75)" },
  { name: "Tin nổi bật", value: "36,080,000đ", pct: 8, color: "oklch(0.65 0.18 295)" },
];

export function BottomTables() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Panel title="Top môi giới có nhiều tin đăng" action="Xem tất cả">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-semibold py-2 w-8">#</th>
              <th className="text-left font-semibold py-2">Môi giới</th>
              <th className="text-right font-semibold py-2">Số tin</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a, i) => (
              <tr key={a.name} className="border-b border-border last:border-0">
                <td className="py-2.5">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    i === 0 ? "bg-warning-soft text-warning" : i === 1 ? "bg-secondary text-foreground" : i === 2 ? "bg-danger-soft text-destructive" : "bg-secondary text-muted-foreground"
                  }`}>{i + 1}</span>
                </td>
                <td className="py-2.5">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground">{a.agency}</div>
                </td>
                <td className="py-2.5 text-right font-semibold">{a.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Top tin đăng được quan tâm" action="Xem tất cả">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-semibold py-2 w-8">#</th>
              <th className="text-left font-semibold py-2">Tin đăng</th>
              <th className="text-right font-semibold py-2">Lượt xem</th>
            </tr>
          </thead>
          <tbody>
            {popular.map((p, i) => (
              <tr key={p.title} className="border-b border-border last:border-0">
                <td className="py-2.5">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                    i === 0 ? "bg-warning-soft text-warning" : i === 1 ? "bg-secondary text-foreground" : i === 2 ? "bg-danger-soft text-destructive" : "bg-secondary text-muted-foreground"
                  }`}>{i + 1}</span>
                </td>
                <td className="py-2.5 font-medium truncate">{p.title}</td>
                <td className="py-2.5 text-right font-semibold">{p.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <Panel title="Doanh thu theo gói dịch vụ" filter>
        <ul className="space-y-4">
          {revenue.map((r) => (
            <li key={r.name}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="font-medium">{r.name}</span>
                <span className="font-semibold">{r.value}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function Panel({ title, action, filter, children }: { title: string; action?: string; filter?: boolean; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {action && <button className="text-xs text-primary hover:underline">{action}</button>}
        {filter && (
          <button className="flex items-center gap-1 h-8 px-3 rounded-md border border-border text-xs hover:bg-secondary">
            7 ngày qua <ChevronDown className="h-3 w-3" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
