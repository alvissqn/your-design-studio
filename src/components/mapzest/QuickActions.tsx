import { FileCheck2, Star, Bell, UserPlus, Tags, Download } from "lucide-react";

const actions = [
  { icon: FileCheck2, label: "Duyệt tin đăng", tone: "info" },
  { icon: Star, label: "Thêm tin nổi bật", tone: "warning" },
  { icon: Bell, label: "Tạo thông báo", tone: "purple" },
  { icon: UserPlus, label: "Thêm người dùng", tone: "success" },
  { icon: Tags, label: "Thêm danh mục", tone: "info" },
  { icon: Download, label: "Xuất báo cáo", tone: "warning" },
];

const toneBg: Record<string, string> = {
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  purple: "bg-purple-soft text-purple",
};

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 h-full">
      <h3 className="font-semibold mb-4">Thao tác nhanh</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary transition"
            >
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${toneBg[a.tone]}`}>
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="text-[11px] text-center leading-tight">{a.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
