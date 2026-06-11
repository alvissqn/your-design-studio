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
  AlertTriangle,
  Check,
  X,
  Eye,
  Building,
  User,
  Clock,
  Search,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reports/")({
  head: () => ({
    meta: [
      { title: "MapZest — Báo cáo vi phạm" },
      { name: "description", content: "Quản lý và giải quyết các báo cáo vi phạm nội dung." },
    ],
  }),
  component: ReportsPage,
});

type Report = {
  id: string;
  propertyId: string;
  propertyName: string;
  reportedBy: string;
  reason: string;
  description: string;
  date: string;
  status: "pending" | "resolved" | "ignored";
};

const initialReports: Report[] = [
  { id: "REP01", propertyId: "#P12580", propertyName: "Biệt thự ven sông Thảo Điền", reportedBy: "Nguyễn Văn Hùng", reason: "Sai vị trí thực tế", description: "Bản đồ hiển thị biệt thự ở ngoài sông Sài Gòn thay vì trên đất liền Nguyễn Văn Hưởng.", date: "2 giờ trước", status: "pending" },
  { id: "REP02", propertyId: "#P12579", propertyName: "Căn hộ Vinhomes Central Park", reportedBy: "Trần Thế Anh", reason: "Tin giả/Đã bán", description: "Tôi đã gọi môi giới và họ báo căn hộ này đã bán từ tháng trước nhưng vẫn treo tin.", date: "5 giờ trước", status: "pending" },
  { id: "REP03", propertyId: "#P12578", propertyName: "Nhà phố mặt tiền Quận 1", reportedBy: "Lê Minh Cường", reason: "Sai thông tin giá", description: "Mô tả ghi 15.8 tỷ nhưng thực tế môi giới gọi báo giá thật là 17.5 tỷ.", date: "1 ngày trước", status: "pending" },
  { id: "REP04", propertyId: "#P12577", propertyName: "Đất nền dự án Long Hậu", reportedBy: "Đặng Thu Trang", reason: "Hình ảnh không khớp", description: "Hình ảnh là biệt thự sang trọng nhưng thực tế đây là đất nền trống chưa xây dựng.", date: "2 ngày trước", status: "resolved" },
  { id: "REP05", propertyId: "#P12576", propertyName: "Căn hộ The Sun Avenue", reportedBy: "Phạm Văn Long", reason: "Trùng lặp tin đăng", date: "3 ngày trước", description: "Căn hộ này đã được đăng trùng lặp 3 lần trên hệ thống bởi cùng một môi giới.", status: "ignored" },
];

function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleResolve = (id: string, action: "resolve" | "ignore") => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, status: action === "resolve" ? "resolved" : "ignored" } : r))
    );
    toast.success(action === "resolve" ? `Đã xử lý vi phạm: Ẩn tin đăng liên quan đến báo cáo ${id}` : `Đã bỏ qua báo cáo ${id}`);
  };

  const filteredReports = reports.filter(r => {
    if (activeFilter === "pending" && r.status !== "pending") return false;
    if (activeFilter === "resolved" && r.status !== "resolved") return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.propertyName.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q) ||
        r.reportedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-canvas text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Báo cáo vi phạm</h1>
              <p className="text-sm text-muted-foreground">
                Xem xét và giải quyết các khiếu nại, báo cáo từ người dùng về nội dung tin đăng sai lệch hoặc vi phạm chính sách.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "Tất cả khiếu nại" },
                { key: "pending", label: "Chờ xử lý", badge: reports.filter(r => r.status === "pending").length },
                { key: "resolved", label: "Đã xử lý" },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    activeFilter === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-bold ${
                      activeFilter === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-destructive text-destructive-foreground"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tin đăng, lý do hoặc người báo cáo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Table list */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/20">
                  <TableHead className="font-semibold text-foreground pl-5 w-[110px]">Mã báo cáo</TableHead>
                  <TableHead className="font-semibold text-foreground">Tin đăng bị khiếu nại</TableHead>
                  <TableHead className="font-semibold text-foreground">Người báo cáo</TableHead>
                  <TableHead className="font-semibold text-foreground w-[180px]">Lý do</TableHead>
                  <TableHead className="font-semibold text-foreground">Nội dung chi tiết</TableHead>
                  <TableHead className="font-semibold text-foreground">Trạng thái</TableHead>
                  <TableHead className="font-semibold text-foreground pr-5 text-right w-[150px]">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map(r => (
                  <TableRow key={r.id} className="hover:bg-secondary/10 transition-colors text-xs sm:text-sm">
                    <TableCell className="pl-5 py-4 font-semibold text-foreground">{r.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <Building className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        {r.propertyName}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">ID Tin: {r.propertyId}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        {r.reportedBy}
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" /> {r.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-destructive font-semibold text-xs">
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        {r.reason}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[240px] truncate text-muted-foreground" title={r.description}>
                      {r.description}
                    </TableCell>
                    <TableCell>
                      {r.status === "pending" && (
                        <Badge className="bg-warning-soft text-warning border-0">Chờ xem xét</Badge>
                      )}
                      {r.status === "resolved" && (
                        <Badge className="bg-success-soft text-success border-0">Đã ẩn tin đăng</Badge>
                      )}
                      {r.status === "ignored" && (
                        <Badge className="bg-secondary text-muted-foreground border-0">Đã bỏ qua</Badge>
                      )}
                    </TableCell>
                    <TableCell className="pr-5 py-4 text-right">
                      {r.status === "pending" ? (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleResolve(r.id, "resolve")}
                            className="h-8 w-8 rounded-md bg-success-soft text-success border-0 cursor-pointer"
                            title="Xác nhận vi phạm (Ẩn tin đăng)"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleResolve(r.id, "ignore")}
                            className="h-8 w-8 rounded-md bg-danger-soft text-destructive border-0 cursor-pointer"
                            title="Bỏ qua báo cáo"
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
        </main>
      </div>
    </div>
  );
}
