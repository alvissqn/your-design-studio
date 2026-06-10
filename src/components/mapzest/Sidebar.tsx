import { useState } from "react";
import {
  LayoutDashboard, Building2, Tag, Wrench, MapPin, Users, UserCog,
  Target, MessageSquare, Calendar, Heart, Package, FileCheck, CreditCard,
  AlertTriangle, Bell, Settings, History, ChevronDown, ChevronRight, MapPinned,
} from "lucide-react";

type Item = { icon: any; label: string; badge?: number; children?: { label: string; badge?: number }[] };

const groups: { title?: string; items: Item[] }[] = [
  { items: [{ icon: LayoutDashboard, label: "Dashboard" }] },
  {
    title: "QUẢN LÝ NỘI DUNG",
    items: [
      {
        icon: Building2, label: "Bất động sản",
        children: [
          { label: "Chờ duyệt", badge: 128 },
          { label: "Tất cả tin đăng" },
          { label: "Tin nổi bật" },
        ],
      },
      { icon: Tag, label: "Danh mục" },
      { icon: Wrench, label: "Tiện ích" },
      { icon: MapPin, label: "Địa lý" },
    ],
  },
  {
    title: "QUẢN LÝ NGƯỜI DÙNG",
    items: [
      { icon: Users, label: "Người dùng" },
      { icon: UserCog, label: "Môi giới / Agency" },
    ],
  },
  {
    title: "TƯƠNG TÁC & KINH DOANH",
    items: [
      { icon: Target, label: "Leads" },
      { icon: MessageSquare, label: "Tin nhắn" },
      { icon: Calendar, label: "Lịch hẹn xem nhà" },
      { icon: Heart, label: "Yêu thích & Tìm kiếm" },
    ],
  },
  {
    title: "THANH TOÁN & GÓI DỊCH VỤ",
    items: [
      { icon: Package, label: "Gói dịch vụ" },
      { icon: FileCheck, label: "Đăng ký của người dùng" },
      { icon: CreditCard, label: "Thanh toán" },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      { icon: AlertTriangle, label: "Báo cáo vi phạm" },
      { icon: Bell, label: "Thông báo" },
      { icon: Settings, label: "Cài đặt hệ thống" },
      { icon: History, label: "Nhật ký hoạt động" },
    ],
  },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [expanded, setExpanded] = useState<string[]>(["Bất động sản"]);
  const toggle = (l: string) =>
    setExpanded((e) => (e.includes(l) ? e.filter((x) => x !== l) : [...e, l]));

  return (
    <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="h-16 px-5 flex items-center gap-2 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
          <MapPinned className="h-5 w-5 text-white" />
        </div>
        <div className="font-bold text-lg tracking-tight">
          MAP<span className="text-primary">ZEST</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-4 text-sm">
        {groups.map((g, i) => (
          <div key={i}>
            {g.title && (
              <div className="px-3 mb-1.5 text-[11px] font-semibold text-sidebar-muted tracking-wider">
                {g.title}
              </div>
            )}
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const isActive = active === it.label;
                const isOpen = expanded.includes(it.label);
                const Icon = it.icon;
                return (
                  <li key={it.label}>
                    <button
                      onClick={() => {
                        setActive(it.label);
                        if (it.children) toggle(it.label);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-secondary"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      <span className="flex-1 text-left">{it.label}</span>
                      {it.badge && (
                        <span className="text-[10px] bg-destructive text-destructive-foreground rounded px-1.5 py-0.5 font-semibold">
                          {it.badge}
                        </span>
                      )}
                      {it.children && (
                        isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {it.children && isOpen && (
                      <ul className="mt-0.5 ml-9 space-y-0.5">
                        {it.children.map((c) => (
                          <li key={c.label}>
                            <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sidebar-muted hover:text-foreground hover:bg-secondary">
                              <span>{c.label}</span>
                              {c.badge && (
                                <span className="text-[10px] bg-destructive text-destructive-foreground rounded px-1.5 py-0.5 font-semibold">
                                  {c.badge}
                                </span>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-info to-primary flex items-center justify-center text-white text-sm font-semibold">
            AD
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold">Admin</div>
            <div className="text-[11px] text-sidebar-muted">Super Administrator</div>
          </div>
          <ChevronDown className="h-4 w-4 text-sidebar-muted" />
        </button>
      </div>
    </aside>
  );
}
