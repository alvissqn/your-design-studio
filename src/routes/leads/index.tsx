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
  MessageSquare,
  Calendar,
  Heart,
  Target,
  Check,
  X,
  User,
  Phone,
  Mail,
  Send,
  Building,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/leads/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || "leads",
    };
  },
  head: () => ({
    meta: [
      { title: "MapZest — Quản lý Leads & Tương tác" },
      { name: "description", content: "Quản lý khách hàng tiềm năng, lịch hẹn và tin nhắn." },
    ],
  }),
  component: LeadsPage,
});

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  agent: string;
  status: "new" | "contacted" | "qualified" | "lost";
  date: string;
  notes: string;
};

const initialLeads: Lead[] = [
  { id: "L01", name: "Nguyễn Văn Hùng", phone: "0902 444 555", email: "hung.nguyen@example.com", property: "Biệt thự ven sông Thảo Điền", agent: "Nguyễn Văn An", status: "new", date: "10 phút trước", notes: "Khách cần xem nhà thực tế vào chiều thứ 7 này." },
  { id: "L02", name: "Phạm Minh Thư", phone: "0918 888 999", email: "thu.pham@example.com", property: "Căn hộ Vinhomes Central Park", agent: "Trần Thị Bình", status: "contacted", date: "1 giờ trước", notes: "Đã gọi điện tư vấn, khách đang cân nhắc khoản vay ngân hàng." },
  { id: "L03", name: "Lê Quốc Bảo", phone: "0987 111 222", email: "bao.le@example.com", property: "Nhà phố mặt tiền Quận 1", agent: "Lê Hoàng Cường", status: "qualified", date: "4 giờ trước", notes: "Khách VIP, đã duyệt hồ sơ tài chính, chuẩn bị đặt cọc." },
  { id: "L04", name: "Hoàng Thanh Sơn", phone: "0965 333 444", email: "son.hoang@example.com", property: "Đất nền dự án Long Hậu", agent: "Phạm Minh Đức", status: "new", date: "1 ngày trước", notes: "Khách để lại thông tin quan tâm trên form bản đồ." },
  { id: "L05", name: "Trịnh Mỹ Duyên", phone: "0932 777 888", email: "duyen.trinh@example.com", property: "Căn hộ The Sun Avenue", agent: "Hoàng Thu Hà", status: "lost", date: "3 ngày trước", notes: "Khách báo đã mua căn hộ khác khu vực Quận 9." },
];



type Appointment = {
  id: string;
  customer: string;
  phone: string;
  property: string;
  agent: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
};

const initialAppointments: Appointment[] = [
  { id: "A01", customer: "Nguyễn Văn Hùng", phone: "0902 444 555", property: "Biệt thự ven sông Thảo Điền", agent: "Nguyễn Văn An", date: "Thứ Bảy, 13/06/2026", time: "15:00", status: "scheduled" },
  { id: "A02", customer: "Phạm Minh Thư", phone: "0918 888 999", property: "Căn hộ Vinhomes Central Park", agent: "Trần Thị Bình", date: "Chủ Nhật, 14/06/2026", time: "09:30", status: "scheduled" },
  { id: "A03", customer: "Lê Quốc Bảo", phone: "0987 111 222", property: "Nhà phố mặt tiền Quận 1", agent: "Lê Hoàng Cường", date: "Hôm nay", time: "16:00", status: "completed" },
];

type FavoriteItem = {
  id: string;
  title: string;
  likes: number;
  views: number;
  agent: string;
};

const mockFavorites: FavoriteItem[] = [
  { id: "#P12580", title: "Biệt thự ven sông Thảo Điền", likes: 142, views: 12458, agent: "Nguyễn Văn An" },
  { id: "#P12579", title: "Căn hộ Vinhomes Central Park", likes: 128, views: 9823, agent: "Trần Thị Bình" },
  { id: "#P12578", title: "Nhà phố mặt tiền Quận 1", likes: 98, views: 8541, agent: "Lê Hoàng Cường" },
];

type SearchLog = {
  keyword: string;
  count: number;
  category: string;
};

const mockSearchLogs: SearchLog[] = [
  { keyword: "Biệt thự Thảo Điền Quận 2", count: 852, category: "Biệt thự" },
  { keyword: "Căn hộ 2 phòng ngủ giá rẻ", count: 654, category: "Căn hộ" },
  { keyword: "Đất nền sổ đỏ Long An", count: 423, category: "Đất nền" },
];

function LeadsPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<string>(search.tab || "leads");
  
  // Leads states
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("Nguyễn Văn An");



  // Appointments states
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const handleStatusChange = (id: string, newStatus: Lead["status"]) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, status: newStatus } : l))
    );
    toast.success(`Đã cập nhật trạng thái Lead ${id}`);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    setLeads(prev =>
      prev.map(l =>
        l.id === selectedLead.id ? { ...l, agent: selectedAgent, status: "contacted" } : l
      )
    );
    setIsAssignOpen(false);
    toast.success(`Đã phân bổ lead ${selectedLead.id} cho môi giới ${selectedAgent}`);
  };



  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.includes(searchQuery)
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
              <h1 className="text-2xl font-bold tracking-tight">Leads & Tương tác</h1>
              <p className="text-sm text-muted-foreground">
                Quản lý thông tin khách hàng có nhu cầu, kênh chat trực tiếp và lịch hẹn tham quan bất động sản.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-border bg-card rounded-xl p-1 gap-1 border">
            {[
              { key: "leads", label: "Khách hàng (Leads)", icon: Target },
              { key: "appointments", label: "Lịch hẹn xem nhà", icon: Calendar },
              { key: "favorites", label: "Yêu thích & Tìm kiếm", icon: Heart },
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

          {/* Tab Content: Leads */}
          {activeTab === "leads" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm lead theo tên khách, số điện thoại, BĐS quan tâm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="font-semibold text-foreground pl-5">Khách hàng</TableHead>
                      <TableHead className="font-semibold text-foreground">Bất động sản quan tâm</TableHead>
                      <TableHead className="font-semibold text-foreground">Môi giới phụ trách</TableHead>
                      <TableHead className="font-semibold text-foreground">Thời gian</TableHead>
                      <TableHead className="font-semibold text-foreground">Ghi chú yêu cầu</TableHead>
                      <TableHead className="font-semibold text-foreground">Trạng thái</TableHead>
                      <TableHead className="font-semibold text-foreground pr-5 text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map(l => (
                      <TableRow key={l.id} className="hover:bg-secondary/10 transition-colors text-xs sm:text-sm">
                        <TableCell className="pl-5 py-4">
                          <div className="font-semibold text-foreground">{l.name}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <span>SĐT: {l.phone}</span>
                            <span>•</span>
                            <span>{l.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-foreground flex items-center gap-1">
                            <Building className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {l.property}
                          </div>
                        </TableCell>
                        <TableCell>
                          {l.agent ? (
                            <div className="font-medium text-foreground">{l.agent}</div>
                          ) : (
                            <Badge className="bg-destructive text-destructive-foreground border-0">Chưa phân bổ</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{l.date}</TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground" title={l.notes}>
                          {l.notes}
                        </TableCell>
                        <TableCell>
                          {l.status === "new" && (
                            <Badge className="bg-destructive/10 text-destructive border-0">Lead mới</Badge>
                          )}
                          {l.status === "contacted" && (
                            <Badge className="bg-info-soft text-info border-0">Đang liên hệ</Badge>
                          )}
                          {l.status === "qualified" && (
                            <Badge className="bg-success-soft text-success border-0">Tiềm năng cao</Badge>
                          )}
                          {l.status === "lost" && (
                            <Badge className="bg-secondary text-muted-foreground border-0">Không chốt</Badge>
                          )}
                        </TableCell>
                        <TableCell className="pr-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedLead(l);
                                setIsAssignOpen(true);
                              }}
                              className="h-8 px-2 text-xs cursor-pointer border-border"
                            >
                              Phân bổ
                            </Button>
                            <Select
                              defaultValue={l.status}
                              onValueChange={(val) => handleStatusChange(l.id, val as Lead["status"])}
                            >
                              <SelectTrigger className="w-[110px] h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Lead mới</SelectItem>
                                <SelectItem value="contacted">Đã liên hệ</SelectItem>
                                <SelectItem value="qualified">Tiềm năng</SelectItem>
                                <SelectItem value="lost">Không chốt</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}



          {/* Tab Content: Appointments */}
          {activeTab === "appointments" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/20">
                      <TableHead className="font-semibold text-foreground pl-5">Khách hàng</TableHead>
                      <TableHead className="font-semibold text-foreground">Bất động sản đăng ký xem</TableHead>
                      <TableHead className="font-semibold text-foreground">Môi giới hỗ trợ</TableHead>
                      <TableHead className="font-semibold text-foreground">Ngày hẹn</TableHead>
                      <TableHead className="font-semibold text-foreground">Giờ hẹn</TableHead>
                      <TableHead className="font-semibold text-foreground">Trạng thái</TableHead>
                      <TableHead className="font-semibold text-foreground pr-5 text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map(a => (
                      <TableRow key={a.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="pl-5 py-4 font-semibold text-foreground">{a.customer}
                          <div className="text-[10px] text-muted-foreground mt-0.5">SĐT: {a.phone}</div>
                        </TableCell>
                        <TableCell className="font-medium text-foreground flex items-center gap-1 mt-2.5">
                          <Building className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          {a.property}
                        </TableCell>
                        <TableCell>{a.agent}</TableCell>
                        <TableCell className="font-medium text-foreground">{a.date}</TableCell>
                        <TableCell className="font-semibold text-foreground">{a.time}</TableCell>
                        <TableCell>
                          {a.status === "scheduled" && (
                            <Badge className="bg-warning-soft text-warning border-0">Chưa bắt đầu</Badge>
                          )}
                          {a.status === "completed" && (
                            <Badge className="bg-success-soft text-success border-0">Đã hoàn thành</Badge>
                          )}
                          {a.status === "cancelled" && (
                            <Badge className="bg-danger-soft text-destructive border-0">Đã hủy bỏ</Badge>
                          )}
                        </TableCell>
                        <TableCell className="pr-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {a.status === "scheduled" && (
                              <>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => {
                                    setAppointments(prev => prev.map(ap => ap.id === a.id ? { ...ap, status: "completed" } : ap));
                                    toast.success("Đã hoàn thành lịch hẹn!");
                                  }}
                                  className="h-8 w-8 rounded-md bg-success-soft text-success border-0 cursor-pointer"
                                  title="Đã xong"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => {
                                    setAppointments(prev => prev.map(ap => ap.id === a.id ? { ...ap, status: "cancelled" } : ap));
                                    toast.error("Đã hủy lịch hẹn!");
                                  }}
                                  className="h-8 w-8 rounded-md bg-danger-soft text-destructive border-0 cursor-pointer"
                                  title="Hủy lịch"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Tab Content: Favorites & Searches */}
          {activeTab === "favorites" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
              {/* Favorites Table */}
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Heart className="h-4.5 w-4.5 text-primary fill-primary" /> Top BĐS được yêu thích nhiều nhất
                </h3>
                <div className="overflow-hidden rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/20">
                        <TableHead className="font-semibold text-foreground">Bất động sản</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Yêu thích</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Lượt xem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockFavorites.map(f => (
                        <TableRow key={f.id} className="hover:bg-secondary/10 transition-colors">
                          <TableCell className="py-3 font-medium text-foreground">
                            {f.title}
                            <div className="text-[10px] text-muted-foreground">Mã: {f.id} • Môi giới: {f.agent}</div>
                          </TableCell>
                          <TableCell className="text-center font-bold text-foreground">{f.likes}</TableCell>
                          <TableCell className="text-center text-muted-foreground">{f.views.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Search Logs */}
              <div className="bg-card rounded-xl border border-border p-5 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Search className="h-4.5 w-4.5 text-primary" /> Từ khóa tìm kiếm phổ biến
                </h3>
                <div className="overflow-hidden rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/20">
                        <TableHead className="font-semibold text-foreground">Từ khóa tìm kiếm</TableHead>
                        <TableHead className="font-semibold text-foreground">Phân loại</TableHead>
                        <TableHead className="font-semibold text-foreground text-center">Tần suất</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSearchLogs.map((s, i) => (
                        <TableRow key={i} className="hover:bg-secondary/10 transition-colors">
                          <TableCell className="py-3 font-semibold text-foreground">"{s.keyword}"</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-secondary text-muted-foreground border-transparent text-xs">
                              {s.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-bold text-foreground">{s.count} lượt</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ASSIGN AGENT DIALOG */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Phân bổ Leads khách hàng</DialogTitle>
            <DialogDescription>
              Lựa chọn Môi giới phụ trách cuộc gọi tư vấn và dẫn khách hàng đi xem thực tế.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAssignSubmit} className="space-y-4 my-2 text-sm">
            <div className="space-y-2">
              <label className="font-semibold text-xs text-foreground">Chọn môi giới phụ trách</label>
              <Select
                value={selectedAgent}
                onValueChange={(val) => setSelectedAgent(val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nguyễn Văn An">Nguyễn Văn An (Đất Xanh Group)</SelectItem>
                  <SelectItem value="Trần Thị Bình">Trần Thị Bình (Vinhomes)</SelectItem>
                  <SelectItem value="Lê Hoàng Cường">Lê Hoàng Cường (Novaland)</SelectItem>
                  <SelectItem value="Phạm Minh Đức">Phạm Minh Đức (Khang Điền)</SelectItem>
                  <SelectItem value="Hoàng Thu Hà">Hoàng Thu Hà (Hưng Thịnh)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAssignOpen(false)} className="cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="cursor-pointer">
                Xác nhận
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
