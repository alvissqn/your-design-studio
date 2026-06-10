import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { d: "01/06", new: 420, approved: 220, rejected: 50 },
  { d: "02/06", new: 820, approved: 380, rejected: 90 },
  { d: "03/06", new: 1180, approved: 640, rejected: 130 },
  { d: "04/06", new: 760, approved: 540, rejected: 110 },
  { d: "05/06", new: 680, approved: 500, rejected: 100 },
  { d: "06/06", new: 640, approved: 450, rejected: 95 },
  { d: "07/06", new: 500, approved: 420, rejected: 90 },
];

export function ListingsChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Thống kê tin đăng</h3>
        <button className="flex items-center gap-1 h-8 px-3 rounded-md border border-border text-xs bg-card hover:bg-secondary">
          7 ngày qua <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.58 0.18 255)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="oklch(0.58 0.18 255)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gApp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.16 150)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.68 0.16 150)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.01 255)" />
            <XAxis dataKey="d" tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "oklch(0.55 0.02 260)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 255)", fontSize: 12 }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingBottom: 8 }} />
            <Area type="monotone" dataKey="new" name="Tin đăng mới" stroke="oklch(0.58 0.18 255)" strokeWidth={2.5} fill="url(#gNew)" />
            <Area type="monotone" dataKey="approved" name="Tin đã duyệt" stroke="oklch(0.68 0.16 150)" strokeWidth={2.5} fill="url(#gApp)" />
            <Area type="monotone" dataKey="rejected" name="Tin bị từ chối" stroke="oklch(0.62 0.22 25)" strokeWidth={2.5} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
