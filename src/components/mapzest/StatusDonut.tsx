import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Đã duyệt", value: 18752, pct: "76%", color: "oklch(0.68 0.16 150)" },
  { name: "Chờ duyệt", value: 3245, pct: "13%", color: "oklch(0.78 0.16 75)" },
  { name: "Hết hạn", value: 1523, pct: "6%", color: "oklch(0.75 0.02 260)" },
  { name: "Bị từ chối", value: 1069, pct: "4%", color: "oklch(0.62 0.22 25)" },
];

export function StatusDonut() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <h3 className="font-semibold mb-4">Tin đăng theo trạng thái</h3>
      <div className="flex items-center gap-4">
        <div className="relative h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={90} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                {data.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-xs text-muted-foreground">Tổng</div>
            <div className="text-2xl font-bold">24,589</div>
          </div>
        </div>
        <ul className="flex-1 space-y-3 text-sm">
          {data.map((d) => (
            <li key={d.name} className="flex items-start gap-2">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full shrink-0" style={{ background: d.color }} />
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.value.toLocaleString()} ({d.pct})</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
