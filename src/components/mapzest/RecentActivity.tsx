import { Home, CheckCircle2, CreditCard, AlertTriangle, Calendar } from "lucide-react";

const items = [
  { icon: Home, tone: "info", title: "Nguyễn Văn A đã đăng tin mới", sub: "Biệt thự ven sông Thảo Điền", time: "2 giờ trước" },
  { icon: CheckCircle2, tone: "success", title: "Tin đăng #P12575 đã được duyệt", sub: "Căn hộ Masteri Thảo Điền", time: "3 giờ trước" },
  { icon: CreditCard, tone: "purple", title: "Trần Thị B đã mua gói Pro 6 tháng", sub: "Thanh toán thành công 9,900,000đ", time: "5 giờ trước" },
  { icon: AlertTriangle, tone: "warning", title: "Có 3 tin đăng bị báo cáo", sub: "Cần kiểm tra và xử lý", time: "6 giờ trước" },
  { icon: Calendar, tone: "info", title: "Lịch hẹn mới từ Phạm Anh Tuấn", sub: "Xem căn hộ Vinhomes Central Park", time: "7 giờ trước" },
];

const toneBg: Record<string, string> = {
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  purple: "bg-purple-soft text-purple",
};

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Hoạt động gần đây</h3>
        <button className="text-xs text-primary hover:underline">Xem tất cả</button>
      </div>
      <ul className="space-y-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <li key={i} className="flex gap-3">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${toneBg[it.tone]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{it.title}</div>
                <div className="text-xs text-muted-foreground truncate">{it.sub}</div>
              </div>
              <div className="text-[11px] text-muted-foreground whitespace-nowrap">{it.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
