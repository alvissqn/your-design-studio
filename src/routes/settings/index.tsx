import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mapzest/Sidebar";
import { TopBar } from "@/components/mapzest/TopBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Settings,
  Wrench,
  MapPin,
  History,
  Check,
  Plus,
  Trash2,
  Lock,
  Globe,
  Bell,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || "general",
    };
  },
  head: () => ({
    meta: [
      { title: "MapZest — Cài đặt hệ thống" },
      { name: "description", content: "Cấu hình hệ thống, tiện ích, địa lý và nhật ký hoạt động." },
    ],
  }),
  component: SettingsPage,
});



type AuditLog = {
  id: string;
  user: string;
  action: string;
  ip: string;
  time: string;
};

const mockAuditLogs: AuditLog[] = [
  { id: "LOG01", user: "Admin (Hoàng Nguyễn)", action: "Duyệt tin đăng #P12580 (Biệt thự ven sông Thảo Điền)", ip: "192.168.1.15", time: "10 phút trước" },
  { id: "LOG02", user: "Moderator (Trần Long)", action: "Khóa tài khoản người dùng U010 (Đỗ Kim Oanh)", ip: "115.79.45.122", time: "1 giờ trước" },
  { id: "LOG03", user: "Admin (Hoàng Nguyễn)", action: "Cập nhật giá Gói Pro 12 tháng từ 4.2 triệu thành 4.5 triệu", ip: "192.168.1.15", time: "3 giờ trước" },
  { id: "LOG04", user: "Moderator (Trần Long)", action: "Ẩn tin đăng #P12573 do báo cáo sai lệch thông tin", ip: "115.79.45.122", time: "1 ngày trước" },
];

type NotificationItem = {
  id: string;
  title: string;
  content: string;
  time: string;
  type: "system" | "approval" | "report";
};

const initialNotifications: NotificationItem[] = [
  { id: "NT01", title: "Yêu cầu duyệt BĐS mới", content: "Môi giới Nguyễn Văn An vừa đăng 'Biệt thự ven sông Thảo Điền' cần phê duyệt.", time: "10 phút trước", type: "approval" },
  { id: "NT02", title: "Báo cáo vi phạm mới", content: "Người dùng Nguyễn Văn Hùng đã báo cáo tin đăng #P12580 sai vị trí thực tế.", time: "2 giờ trước", type: "report" },
  { id: "NT03", title: "Nâng cấp gói dịch vụ thành công", content: "Hệ thống tự động kích hoạt Gói Pro 12 tháng cho môi giới Trần Thị Bình.", time: "5 giờ trước", type: "system" },
];

function SettingsPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<string>(search.tab || "general");

  // General state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "MapZest AI",
    supportEmail: "support@mapzest.vn",
    supportPhone: "028 3930 1234",
    allowAgentRegistration: true,
    requireApproval: true,
  });



  // Audit Logs state
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cấu hình hệ thống chung đã được lưu thành công!");
  };



  return (
    <div className="flex min-h-screen bg-canvas text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Cài đặt hệ thống</h1>
              <p className="text-sm text-muted-foreground">
                Cấu hình thông tin hoạt động hệ thống, quản lý danh sách tiện ích BĐS, kích hoạt khu vực địa lý và tra cứu hoạt động thanh tra.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-border bg-card rounded-xl p-1 gap-1 border">
            {[
              { key: "general", label: "Cài đặt chung", icon: Settings },
              { key: "notifications", label: "Thông báo hệ thống", icon: Bell },
              { key: "audit", label: "Nhật ký hoạt động (Audit)", icon: History },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content: General settings */}
          {activeTab === "general" && (
            <div className="bg-card rounded-xl border border-border p-6 max-w-2xl animate-in fade-in duration-200">
              <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Thông tin dự án & Vận hành
              </h3>
              <form onSubmit={handleGeneralSave} className="space-y-5 text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-xs text-foreground">Tên nền tảng hiển thị</label>
                  <Input
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-xs text-foreground">Email hỗ trợ hệ thống</label>
                    <Input
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-xs text-foreground">Hotline chăm sóc khách hàng</label>
                    <Input
                      value={generalSettings.supportPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-4">
                  <h4 className="font-bold text-xs text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                    <Lock className="h-4 w-4 text-muted-foreground" /> Chính sách bảo mật & phân quyền
                  </h4>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div>
                      <div className="font-semibold text-foreground">Cho phép môi giới / agency đăng ký tài khoản tự do</div>
                      <div className="text-xs text-muted-foreground">Nếu tắt, tài khoản môi giới chỉ được tạo bởi Admin.</div>
                    </div>
                    <Switch
                      checked={generalSettings.allowAgentRegistration}
                      onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, allowAgentRegistration: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-semibold text-foreground">Bắt buộc Admin/Moderator duyệt tin đăng trước khi hiển thị công khai</div>
                      <div className="text-xs text-muted-foreground">Chính sách kiểm duyệt chất lượng tin đăng.</div>
                    </div>
                    <Switch
                      checked={generalSettings.requireApproval}
                      onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, requireApproval: checked })}
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <Button type="submit" className="cursor-pointer">
                    Lưu thông số cấu hình
                  </Button>
                </div>
              </form>
            </div>
          )}



          {/* Tab content: Audit logs */}
          {activeTab === "audit" && (
            <div className="bg-card rounded-xl border border-border overflow-hidden animate-in fade-in duration-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/20">
                    <TableHead className="font-semibold text-foreground pl-5 w-[100px]">Mã log</TableHead>
                    <TableHead className="font-semibold text-foreground">Tài khoản thao tác</TableHead>
                    <TableHead className="font-semibold text-foreground">Hành động ghi nhận</TableHead>
                    <TableHead className="font-semibold text-foreground">Địa chỉ IP</TableHead>
                    <TableHead className="font-semibold text-foreground pr-5">Thời gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map(log => (
                    <TableRow key={log.id} className="hover:bg-secondary/10 transition-colors text-xs">
                      <TableCell className="pl-5 py-4 font-semibold text-foreground">{log.id}</TableCell>
                      <TableCell className="font-bold text-foreground">{log.user}</TableCell>
                      <TableCell className="font-medium text-foreground">{log.action}</TableCell>
                      <TableCell><code className="bg-secondary/80 px-1.5 py-0.5 rounded text-muted-foreground font-mono">{log.ip}</code></TableCell>
                      <TableCell className="pr-5 py-4 text-muted-foreground">{log.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Tab content: Notifications */}
          {activeTab === "notifications" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-200">
              {/* Broadcast Form */}
              <div className="col-span-12 md:col-span-4 bg-card rounded-xl border border-border p-5 h-fit">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-1.5">
                  <Bell className="h-4 w-4 text-primary" /> Gửi thông báo hệ thống
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Thông báo đã được gửi tới toàn thể người dùng hệ thống!");
                }} className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <label className="font-semibold text-xs text-foreground">Tiêu đề thông báo *</label>
                    <Input required placeholder="Ví dụ: Bảo trì hệ thống định kỳ" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-xs text-foreground">Nội dung thông báo *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Nhập nội dung thông báo gửi đến toàn thể người dùng..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <Button type="submit" className="w-full cursor-pointer mt-2 text-xs">
                    Gửi thông báo (Broadcast)
                  </Button>
                </form>
              </div>

              {/* Notification list */}
              <div className="col-span-12 md:col-span-8 bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="font-semibold text-foreground pl-5 w-[120px]">Thời gian</TableHead>
                      <TableHead className="font-semibold text-foreground">Thông báo</TableHead>
                      <TableHead className="font-semibold text-foreground w-[120px]">Phân loại</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {initialNotifications.map(n => (
                      <TableRow key={n.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="pl-5 py-4 text-xs text-muted-foreground">{n.time}</TableCell>
                        <TableCell>
                          <div className="font-bold text-foreground text-xs sm:text-sm">{n.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{n.content}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            n.type === "approval" ? "bg-warning-soft text-warning border-warning/20" :
                            n.type === "report" ? "bg-danger-soft text-destructive border-destructive/20" :
                            "bg-info-soft text-info border-info/20"
                          }>
                            {n.type === "approval" ? "Phê duyệt" : n.type === "report" ? "Khiếu nại" : "Hệ thống"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
