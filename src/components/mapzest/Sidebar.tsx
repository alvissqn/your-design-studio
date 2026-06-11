import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Building2, Tag, Wrench, MapPin, Users, UserCog,
  Target, MessageSquare, Calendar, Heart, Package, FileCheck, CreditCard,
  AlertTriangle, Bell, Settings, History, ChevronDown, ChevronRight, MapPinned,
} from "lucide-react";

type Item = {
  icon: any;
  label: string;
  to?: string;
  search?: Record<string, any>;
  badge?: number;
  exact?: boolean;
  children?: { label: string; to: string; search?: Record<string, any>; badge?: number; exact?: boolean }[];
};

const groups: { title?: string; items: Item[] }[] = [
  { items: [{ icon: LayoutDashboard, label: "Dashboard", to: "/", exact: true }] },
  {
    title: "QUẢN LÝ NỘI DUNG",
    items: [
      {
        icon: Building2,
        label: "Bất động sản",
        children: [
          { label: "Chờ duyệt", to: "/locations", search: { filter: "pending" }, badge: 128, exact: true },
          { label: "Tất cả tin đăng", to: "/locations", exact: true },
          { label: "Tin nổi bật", to: "/locations", search: { filter: "featured" }, exact: true },
        ],
      },
      { icon: Tag, label: "Danh mục", to: "/categories" },
      { icon: Wrench, label: "Tiện ích", to: "/amenities" },
      { icon: MapPin, label: "Địa lý", to: "/geography" },
    ],
  },
  {
    title: "QUẢN LÝ NGƯỜI DÙNG",
    items: [
      { icon: Users, label: "Người dùng", to: "/users", exact: true },
      { icon: UserCog, label: "Môi giới / Agency", to: "/users", search: { role: "agent" }, exact: true },
    ],
  },
  {
    title: "TƯƠNG TÁC & KINH DOANH",
    items: [
      { icon: Target, label: "Leads", to: "/leads", exact: true },
      { icon: MessageSquare, label: "Realtime chat", to: "/chat" },
      { icon: Calendar, label: "Lịch hẹn xem nhà", to: "/leads", search: { tab: "appointments" }, exact: true },
      { icon: Heart, label: "Yêu thích & Tìm kiếm", to: "/leads", search: { tab: "favorites" }, exact: true },
    ],
  },
  {
    title: "THANH TOÁN & GÓI DỊCH VỤ",
    items: [
      { icon: Package, label: "Gói dịch vụ", to: "/packages", exact: true },
      { icon: FileCheck, label: "Đăng ký của người dùng", to: "/packages", search: { tab: "registrations" }, exact: true },
      { icon: CreditCard, label: "Thanh toán", to: "/packages", search: { tab: "payments" }, exact: true },
    ],
  },
  {
    title: "HỆ THỐNG",
    items: [
      { icon: AlertTriangle, label: "Báo cáo vi phạm", to: "/reports" },
      { icon: Bell, label: "Thông báo", to: "/settings", search: { tab: "notifications" }, exact: true },
      { icon: Settings, label: "Cài đặt hệ thống", to: "/settings", exact: true },
      { icon: History, label: "Nhật ký hoạt động", to: "/settings", search: { tab: "audit" }, exact: true },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSearch = location.search as Record<string, any>;

  // Hàm helper so khớp xem một link có đang active không
  const isLinkActive = (to: string, searchParams?: Record<string, any>, exact?: boolean) => {
    // Chuẩn hóa đường dẫn kết thúc bằng /
    const normalize = (p: string) => p.endsWith("/") ? p : p + "/";
    const pathMatch = normalize(currentPath) === normalize(to);
    
    if (!pathMatch) return false;

    if (exact) {
      if (searchParams) {
        return Object.entries(searchParams).every(([k, v]) => currentSearch[k] === v);
      }
      // Nếu exact = true và không có searchParams, tức là không được có các search param đặc trưng
      return !currentSearch.filter && !currentSearch.role && !currentSearch.tab;
    }
    
    return true;
  };

  const [expanded, setExpanded] = useState<string[]>(["Bất động sản"]);

  // Tự động mở rộng accordion khi có con của nó đang active
  useEffect(() => {
    groups.forEach((g) => {
      g.items.forEach((it) => {
        if (it.children) {
          const hasActiveChild = it.children.some((c) => isLinkActive(c.to, c.search, c.exact));
          if (hasActiveChild && !expanded.includes(it.label)) {
            setExpanded((prev) => [...prev, it.label]);
          }
        }
      });
    });
  }, [currentPath, currentSearch]);

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
                const isOpen = expanded.includes(it.label);
                const Icon = it.icon;

                // Nếu có children, check xem có con nào active hay không
                if (it.children) {
                  const isParentActive = it.children.some((c) => isLinkActive(c.to, c.search, c.exact));
                  return (
                    <li key={it.label}>
                      <button
                        onClick={() => toggle(it.label)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-left cursor-pointer ${
                          isParentActive
                            ? "bg-secondary text-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px] shrink-0" />
                        <span className="flex-1">{it.label}</span>
                        {it.badge && (
                          <span className="text-[10px] bg-destructive text-destructive-foreground rounded px-1.5 py-0.5 font-semibold">
                            {it.badge}
                          </span>
                        )}
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                      {isOpen && (
                        <ul className="mt-0.5 ml-9 space-y-0.5">
                          {it.children.map((c) => {
                            const isChildActive = isLinkActive(c.to, c.search, c.exact);
                            return (
                              <li key={c.label}>
                                <Link
                                  to={c.to}
                                  search={c.search}
                                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md transition cursor-pointer ${
                                    isChildActive
                                      ? "bg-primary text-primary-foreground font-semibold"
                                      : "text-sidebar-muted hover:text-foreground hover:bg-secondary"
                                  }`}
                                >
                                  <span>{c.label}</span>
                                  {c.badge && (
                                    <span className="text-[10px] bg-destructive text-destructive-foreground rounded px-1.5 py-0.5 font-semibold">
                                      {c.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                }

                // Nếu không có children, di chuyển trực tiếp
                const isItemActive = isLinkActive(it.to || "/", it.search, it.exact);
                return (
                  <li key={it.label}>
                    <Link
                      to={it.to || "/"}
                      search={it.search}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition cursor-pointer ${
                        isItemActive
                          ? "bg-primary text-primary-foreground shadow-sm font-semibold"
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary cursor-pointer">
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


