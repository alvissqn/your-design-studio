import { Users, Home, Clock, Filter, Wallet, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Người dùng", value: "12,458", delta: "12.5%", tone: "info" },
  { icon: Home, label: "Tin đăng", value: "24,589", delta: "8.3%", tone: "success" },
  { icon: Clock, label: "Tin chờ duyệt", value: "128", delta: "5.7%", tone: "warning" },
  { icon: Filter, label: "Leads mới", value: "1,326", delta: "15.8%", tone: "purple" },
  { icon: Wallet, label: "Doanh thu", value: "256,580,000đ", delta: "18.6%", tone: "success" },
] as const;

const toneBg: Record<string, string> = {
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  purple: "bg-purple-soft text-purple",
};

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-start gap-4">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${toneBg[s.tone]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <div className="text-xl font-bold tracking-tight">{s.value}</div>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-success">
                    <TrendingUp className="h-3 w-3" />
                    {s.delta}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">So với tuần trước</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
