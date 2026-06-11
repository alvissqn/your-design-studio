import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mapzest/Sidebar";
import { TopBar } from "@/components/mapzest/TopBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Package,
  FileCheck,
  CreditCard,
  Plus,
  Check,
  X,
  Edit2,
  DollarSign,
  TrendingUp,
  Percent,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/packages/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || "packages",
    };
  },
  head: () => ({
    meta: [
      { title: "MapZest — Gói dịch vụ & Doanh thu" },
      { name: "description", content: "Quản lý gói dịch vụ thành viên và lịch sử thanh toán." },
    ],
  }),
  component: PackagesPage,
});

type ServicePackage = {
  id: string;
  name: string;
  price: string;
  cycle: string;
  features: string[];
  activeUsers: number;
  status: "active" | "inactive";
};

const initialPackages: ServicePackage[] = [
  { id: "PKG1", name: "Gói Basic", price: "500,000đ", cycle: "Tháng", features: ["Đăng tối đa 10 tin", "Bản đồ cơ bản", "Hỗ trợ chat 24/7"], activeUsers: 342, status: "active" },
  { id: "PKG2", name: "Gói Pro 6 tháng", price: "2,500,000đ", cycle: "6 Tháng", features: ["Đăng tối đa 50 tin", "Bản đồ nâng cao (ghim màu)", "Ưu tiên hiển thị tin", "Báo cáo thống kê lượt xem"], activeUsers: 412, status: "active" },
  { id: "PKG3", name: "Gói Pro 12 tháng", price: "4,500,000đ", cycle: "12 Tháng", features: ["Không giới hạn tin đăng", "Full tính năng bản đồ GIS", "Đánh dấu pin nổi bật (Featured Pin)", "AI tự động viết mô tả BĐS", "CRM quản lý khách hàng VIP"], activeUsers: 567, status: "active" },
];

type Registration = {
  id: string;
  user: string;
  role: string;
  packageName: string;
  price: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
};

const initialRegistrations: Registration[] = [
  { id: "REG01", user: "Nguyễn Văn An", role: "Môi giới", packageName: "Gói Pro 12 tháng", price: "4,500,000đ", startDate: "12/01/2026", endDate: "12/01/2027", status: "active" },
  { id: "REG02", user: "Trần Thị Bình", role: "Môi giới", packageName: "Gói Pro 12 tháng", price: "4,500,000đ", startDate: "05/02/2026", endDate: "05/02/2027", status: "active" },
  { id: "REG03", user: "Lê Hoàng Cường", role: "Môi giới", packageName: "Gói Pro 6 tháng", price: "2,500,000đ", startDate: "20/02/2026", endDate: "20/08/2026", status: "active" },
  { id: "REG04", user: "Đỗ Minh Khang", role: "Doanh nghiệp", packageName: "Gói Pro 12 tháng", price: "4,500,000đ", startDate: "10/05/2026", endDate: "10/05/2027", status: "pending" },
  { id: "REG05", user: "Vũ Quốc Hùng", role: "User cá nhân", packageName: "Gói Basic", price: "500,000đ", startDate: "01/05/2026", endDate: "01/06/2026", status: "expired" },
];

type Payment = {
  id: string;
  invoiceNo: string;
  user: string;
  amount: string;
  method: "Chuyển khoản (VietQR)" | "Momo" | "Thẻ tín dụng";
  date: string;
  status: "success" | "pending" | "failed";
};

const initialPayments: Payment[] = [
  { id: "PAY01", invoiceNo: "INV-98562", user: "Nguyễn Văn An", amount: "4,500,000đ", method: "Chuyển khoản (VietQR)", date: "12/01/2026 10:15", status: "success" },
  { id: "PAY02", invoiceNo: "INV-98563", user: "Trần Thị Bình", amount: "4,500,000đ", method: "Momo", date: "05/02/2026 14:20", status: "success" },
  { id: "PAY03", invoiceNo: "INV-98564", user: "Lê Hoàng Cường", amount: "2,500,000đ", method: "Thẻ tín dụng", date: "20/02/2026 09:12", status: "success" },
  { id: "PAY04", invoiceNo: "INV-98565", user: "Đỗ Minh Khang", amount: "4,500,000đ", method: "Chuyển khoản (VietQR)", date: "10/06/2026 15:45", status: "pending" },
  { id: "PAY05", invoiceNo: "INV-98566", user: "Nguyễn Thu Thảo", amount: "500,000đ", method: "Momo", date: "10/06/2026 16:00", status: "failed" },
];

function PackagesPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<string>(search.tab || "packages");

  // State packages
  const [packages, setPackages] = useState<ServicePackage[]>(initialPackages);
  const [isEditPkgOpen, setIsEditPkgOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<ServicePackage | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "", cycle: "" });

  // State registrations
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [searchRegQuery, setSearchRegQuery] = useState("");

  // State payments
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchPayQuery, setSearchPayQuery] = useState("");

  const handleEditPkgClick = (pkg: ServicePackage) => {
    setEditingPkg(pkg);
    setFormData({ name: pkg.name, price: pkg.price, cycle: pkg.cycle });
    setIsEditPkgOpen(true);
  };

  const handleEditPkgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg || !formData.name || !formData.price) return;

    setPackages(prev =>
      prev.map(p =>
        p.id === editingPkg.id ? { ...p, name: formData.name, price: formData.price, cycle: formData.cycle } : p
      )
    );
    setIsEditPkgOpen(false);
    toast.success("Cập nhật thông tin gói thành công!");
  };

  const handleApproveReg = (regId: string) => {
    setRegistrations(prev =>
      prev.map(r => (r.id === regId ? { ...r, status: "active" } : r))
    );
    // Đồng bộ duyệt hóa đơn thanh toán
    setPayments(prev =>
      prev.map(p => {
        const reg = registrations.find(r => r.id === regId);
        if (reg && p.user === reg.user && p.status === "pending") {
          return { ...p, status: "success" };
        }
        return p;
      })
    );
    toast.success(`Đã kích hoạt thành công gói dịch vụ cho thành viên.`);
  };

  const handleRejectReg = (regId: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== regId));
    toast.error("Đã từ chối đơn đăng ký gói dịch vụ.");
  };

  const filteredRegistrations = registrations.filter(r =>
    r.user.toLowerCase().includes(searchRegQuery.toLowerCase()) ||
    r.packageName.toLowerCase().includes(searchRegQuery.toLowerCase())
  );

  const filteredPayments = payments.filter(p =>
    p.user.toLowerCase().includes(searchPayQuery.toLowerCase()) ||
    p.invoiceNo.toLowerCase().includes(searchPayQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-canvas text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Thanh toán & Gói dịch vụ</h1>
              <p className="text-sm text-muted-foreground">
                Quản lý các gói đăng ký dịch vụ của môi giới, phê duyệt yêu cầu kích hoạt và theo dõi lịch sử doanh thu hóa đơn.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-border bg-card rounded-xl p-1 gap-1 border">
            {[
              { key: "packages", label: "Cấu hình gói dịch vụ", icon: Package },
              { key: "registrations", label: "Yêu cầu đăng ký", icon: FileCheck },
              { key: "payments", label: "Hóa đơn & Thanh toán", icon: CreditCard },
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

          {/* Tab content: Packages Configuration */}
          {activeTab === "packages" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-card rounded-xl border border-border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                  {pkg.name.includes("Pro") && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                      PHỔ BIẾN
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Mã: {pkg.id}</div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                      <span className="text-xs text-muted-foreground">/ {pkg.cycle}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-6">
                      {pkg.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-success shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs border-t border-border pt-3">
                      <span className="text-muted-foreground">Lượt môi giới sử dụng:</span>
                      <span className="font-bold text-foreground">{pkg.activeUsers}</span>
                    </div>
                    <Button onClick={() => handleEditPkgClick(pkg)} variant="outline" className="w-full gap-1.5 cursor-pointer text-xs h-9">
                      <Edit2 className="h-3.5 w-3.5" /> Điều chỉnh cấu hình
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab content: Registrations */}
          {activeTab === "registrations" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm tên khách hàng hoặc tên gói đăng ký..."
                    value={searchRegQuery}
                    onChange={(e) => setSearchRegQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="font-semibold text-foreground pl-5">Môi giới / Đối tác</TableHead>
                      <TableHead className="font-semibold text-foreground">Gói đăng ký</TableHead>
                      <TableHead className="font-semibold text-foreground">Giá gói</TableHead>
                      <TableHead className="font-semibold text-foreground">Ngày bắt đầu</TableHead>
                      <TableHead className="font-semibold text-foreground">Ngày hết hạn</TableHead>
                      <TableHead className="font-semibold text-foreground">Trạng thái</TableHead>
                      <TableHead className="font-semibold text-foreground pr-5 text-right">Phê duyệt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map(reg => (
                      <TableRow key={reg.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="pl-5 py-4">
                          <div className="font-semibold text-foreground">{reg.user}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{reg.role}</div>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{reg.packageName}</TableCell>
                        <TableCell className="font-semibold text-foreground">{reg.price}</TableCell>
                        <TableCell>{reg.startDate}</TableCell>
                        <TableCell>{reg.endDate}</TableCell>
                        <TableCell>
                          {reg.status === "active" && (
                            <Badge className="bg-success-soft text-success border-0">Đang hoạt động</Badge>
                          )}
                          {reg.status === "pending" && (
                            <Badge className="bg-warning-soft text-warning border-0">Chờ duyệt</Badge>
                          )}
                          {reg.status === "expired" && (
                            <Badge className="bg-secondary text-muted-foreground border-0">Hết hạn</Badge>
                          )}
                        </TableCell>
                        <TableCell className="pr-5 py-4 text-right">
                          {reg.status === "pending" ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleApproveReg(reg.id)}
                                className="h-8 w-8 rounded-md bg-success-soft text-success border-0 cursor-pointer"
                                title="Duyệt nâng cấp"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleRejectReg(reg.id)}
                                className="h-8 w-8 rounded-md bg-danger-soft text-destructive border-0 cursor-pointer"
                                title="Từ chối"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Tab content: Payments */}
          {activeTab === "payments" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm theo mã hóa đơn, tên khách hàng..."
                    value={searchPayQuery}
                    onChange={(e) => setSearchPayQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="font-semibold text-foreground pl-5">Mã Hóa Đơn</TableHead>
                      <TableHead className="font-semibold text-foreground">Khách hàng</TableHead>
                      <TableHead className="font-semibold text-foreground">Số tiền</TableHead>
                      <TableHead className="font-semibold text-foreground">Phương thức thanh toán</TableHead>
                      <TableHead className="font-semibold text-foreground">Thời gian giao dịch</TableHead>
                      <TableHead className="font-semibold text-foreground pr-5">Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map(pay => (
                      <TableRow key={pay.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="pl-5 py-4 font-semibold text-foreground">{pay.invoiceNo}</TableCell>
                        <TableCell className="font-medium text-foreground">{pay.user}</TableCell>
                        <TableCell className="font-bold text-foreground">{pay.amount}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{pay.method}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{pay.date}</TableCell>
                        <TableCell className="pr-5 py-4">
                          {pay.status === "success" && (
                            <Badge className="bg-success-soft text-success border-0">Thành công</Badge>
                          )}
                          {pay.status === "pending" && (
                            <Badge className="bg-warning-soft text-warning border-0">Chờ xử lý</Badge>
                          )}
                          {pay.status === "failed" && (
                            <Badge className="bg-danger-soft text-destructive border-0">Thất bại</Badge>
                          )}
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

      {/* EDIT PACKAGE DIALOG */}
      <Dialog open={isEditPkgOpen} onOpenChange={setIsEditPkgOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Điều chỉnh cấu hình gói</DialogTitle>
            <DialogDescription>Chỉnh sửa các thông số giá và chu kỳ sử dụng dịch vụ của gói.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditPkgSubmit} className="space-y-4 my-2 text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Tên gói dịch vụ *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Giá thành gói *</label>
              <Input
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Chu kỳ sử dụng *</label>
              <Input
                required
                placeholder="Ví dụ: Tháng, 6 Tháng, 12 Tháng..."
                value={formData.cycle}
                onChange={(e) => setFormData({ ...formData, cycle: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsEditPkgOpen(false)} className="cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="cursor-pointer">
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
