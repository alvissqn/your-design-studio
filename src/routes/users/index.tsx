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
  Plus,
  UserCheck,
  UserX,
  ShieldAlert,
  Building,
  Mail,
  Phone,
  Shield,
  MapPin,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/users/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      role: (search.role as string) || "all",
    };
  },
  head: () => ({
    meta: [
      { title: "MapZest — Quản lý Người dùng" },
      { name: "description", content: "Quản lý vai trò và tài khoản người dùng." },
    ],
  }),
  component: UsersPage,
});

type UserObj = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "super_admin" | "admin" | "moderator" | "agent" | "contributor" | "user";
  status: "active" | "inactive" | "banned";
  listingsCount: number;
  agency?: string;
  joinDate: string;
  avatar: string;
};

const initialUsers: UserObj[] = [
  {
    id: "U001",
    name: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    phone: "0901 234 567",
    role: "agent",
    status: "active",
    listingsCount: 142,
    agency: "Đất Xanh Group",
    joinDate: "12/01/2026",
    avatar: "AN",
  },
  {
    id: "U002",
    name: "Trần Thị Bình",
    email: "binh.tran@example.com",
    phone: "0912 345 678",
    role: "agent",
    status: "active",
    listingsCount: 128,
    agency: "Vinhomes",
    joinDate: "05/02/2026",
    avatar: "TB",
  },
  {
    id: "U003",
    name: "Lê Hoàng Cường",
    email: "cuong.le@example.com",
    phone: "0983 456 789",
    role: "agent",
    status: "active",
    listingsCount: 115,
    agency: "Novaland",
    joinDate: "20/02/2026",
    avatar: "HC",
  },
  {
    id: "U004",
    name: "Phạm Minh Đức",
    email: "duc.pham@example.com",
    phone: "0974 567 890",
    role: "agent",
    status: "active",
    listingsCount: 98,
    agency: "Khang Điền",
    joinDate: "01/03/2026",
    avatar: "MD",
  },
  {
    id: "U005",
    name: "Hoàng Thu Hà",
    email: "ha.hoang@example.com",
    phone: "0965 678 901",
    role: "agent",
    status: "active",
    listingsCount: 87,
    agency: "Hưng Thịnh",
    joinDate: "10/03/2026",
    avatar: "TH",
  },
  {
    id: "U006",
    name: "Nguyễn Văn Admin",
    email: "admin@mapzest.vn",
    phone: "028 3930 1234",
    role: "super_admin",
    status: "active",
    listingsCount: 12,
    joinDate: "01/01/2026",
    avatar: "AD",
  },
  {
    id: "U007",
    name: "Trần Thế Long",
    email: "long.tran@example.com",
    phone: "0934 987 654",
    role: "moderator",
    status: "active",
    listingsCount: 0,
    joinDate: "15/01/2026",
    avatar: "TL",
  },
  {
    id: "U008",
    name: "Lê Thị Thảo",
    email: "thao.le@example.com",
    phone: "0945 876 543",
    role: "contributor",
    status: "active",
    listingsCount: 45,
    joinDate: "18/02/2026",
    avatar: "LT",
  },
  {
    id: "U009",
    name: "Vũ Quốc Hùng",
    email: "hung.vu@example.com",
    phone: "0909 876 543",
    role: "user",
    status: "inactive",
    listingsCount: 2,
    joinDate: "28/02/2026",
    avatar: "QH",
  },
  {
    id: "U010",
    name: "Đỗ Kim Oanh",
    email: "oanh.do@example.com",
    phone: "0919 765 432",
    role: "user",
    status: "banned",
    listingsCount: 0,
    joinDate: "05/03/2026",
    avatar: "KO",
  },
];

function UsersPage() {
  const search = Route.useSearch();
  const [users, setUsers] = useState<UserObj[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRole, setActiveRole] = useState<string>(search.role || "all");
  
  const [selectedUser, setSelectedUser] = useState<UserObj | null>(null);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserObj["role"]>("user");

  // States for Add User
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "agent" as UserObj["role"],
    agency: "",
  });

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.phone) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }

    const createdUser: UserObj = {
      id: `U${Math.floor(100 + Math.random() * 900)}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: "active",
      listingsCount: 0,
      agency: newUser.role === "agent" ? newUser.agency : undefined,
      joinDate: new Date().toLocaleDateString("vi-VN"),
      avatar: newUser.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
    };

    setUsers([createdUser, ...users]);
    setIsAddUserOpen(false);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "agent",
      agency: "",
    });
    toast.success(`Đã tạo tài khoản thành viên mới: ${newUser.name}`);
  };

  const handleRoleChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id ? { ...u, role: selectedRole } : u
      )
    );
    setIsEditRoleOpen(false);
    toast.success(`Đã cập nhật vai trò của ${selectedUser.name} thành ${selectedRole.toUpperCase()}`);
  };

  const toggleStatus = (id: string, currentStatus: UserObj["status"]) => {
    let newStatus: UserObj["status"] = "active";
    if (currentStatus === "active") newStatus = "inactive";
    else if (currentStatus === "inactive") newStatus = "active";

    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: newStatus } : u))
    );
    toast.success(`Đã cập nhật trạng thái người dùng thành: ${newStatus}`);
  };

  const handleBanUser = (id: string, isBan: boolean) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: isBan ? "banned" : "active" } : u))
    );
    toast.warning(isBan ? `Đã khóa tài khoản người dùng ${id}` : `Đã mở khóa tài khoản người dùng ${id}`);
  };

  const filteredUsers = users.filter(u => {
    // Lọc theo vai trò
    if (activeRole === "agent" && u.role !== "agent") return false;
    if (activeRole === "moderator" && u.role !== "moderator") return false;
    if (activeRole === "admin" && u.role !== "admin" && u.role !== "super_admin") return false;

    // Lọc theo tìm kiếm
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        (u.agency && u.agency.toLowerCase().includes(q))
      );
    }

    return true;
  });

  const getRoleLabel = (role: UserObj["role"]) => {
    switch (role) {
      case "super_admin":
        return { text: "Super Admin", color: "bg-red-500/10 text-red-500 border-red-500/20" };
      case "admin":
        return { text: "Admin", color: "bg-red-500/10 text-red-500 border-red-500/20" };
      case "moderator":
        return { text: "Moderator", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
      case "agent":
        return { text: "Môi giới / Agency", color: "bg-primary/10 text-primary border-primary/20" };
      case "contributor":
        return { text: "Contributor", color: "bg-info/10 text-info border-info/20" };
      default:
        return { text: "Khách hàng", color: "bg-secondary text-muted-foreground border-transparent" };
    }
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
              <h1 className="text-2xl font-bold tracking-tight">Quản lý Người dùng</h1>
              <p className="text-sm text-muted-foreground">
                Quản lý phân quyền tài khoản, trạng thái khóa/mở khóa tài khoản người dùng và thông tin cá nhân.
              </p>
            </div>
            <Button onClick={() => setIsAddUserOpen(true)} className="cursor-pointer gap-2">
              <Plus className="h-4 w-4" /> Thêm thành viên mới
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "Tất cả thành viên" },
                { key: "agent", label: "Môi giới / Đối tác", badge: users.filter(u => u.role === "agent").length },
                { key: "moderator", label: "Kiểm duyệt viên" },
                { key: "admin", label: "Quản trị viên" },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveRole(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    activeRole === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-bold ${
                      activeRole === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary-foreground/20 text-muted-foreground"
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
                placeholder="Tìm người dùng theo tên, email, sđt hoặc agency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/20">
                  <TableHead className="font-semibold text-foreground pl-5">Người dùng</TableHead>
                  <TableHead className="font-semibold text-foreground">Liên hệ</TableHead>
                  <TableHead className="font-semibold text-foreground">Vai trò</TableHead>
                  <TableHead className="font-semibold text-foreground">Agency / Tổ chức</TableHead>
                  <TableHead className="font-semibold text-foreground text-center">Số tin đăng</TableHead>
                  <TableHead className="font-semibold text-foreground">Trạng thái</TableHead>
                  <TableHead className="font-semibold text-foreground pr-5 text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      Không tìm thấy người dùng nào phù hợp.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(u => {
                    const roleBadge = getRoleLabel(u.role);
                    return (
                      <TableRow key={u.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="pl-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-info to-primary flex items-center justify-center text-white text-xs font-semibold">
                              {u.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground flex items-center gap-1.5">
                                {u.name}
                              </div>
                              <div className="text-[10px] text-muted-foreground">Mã ID: {u.id} - Tham gia: {u.joinDate}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-foreground flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {u.email}
                          </div>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {u.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-xs ${roleBadge.color} border py-0.5 px-2`}>
                            {roleBadge.text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {u.agency ? (
                            <div className="text-xs font-medium text-foreground flex items-center gap-1">
                              <Building className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              {u.agency}
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-foreground">
                          {u.listingsCount}
                        </TableCell>
                        <TableCell>
                          {u.status === "active" && (
                            <Badge className="bg-success-soft text-success border-0 hover:bg-success-soft">Hoạt động</Badge>
                          )}
                          {u.status === "inactive" && (
                            <Badge className="bg-secondary text-muted-foreground border-0 hover:bg-secondary">Ngoại tuyến</Badge>
                          )}
                          {u.status === "banned" && (
                            <Badge className="bg-danger-soft text-destructive border-0 hover:bg-danger-soft">Bị khóa</Badge>
                          )}
                        </TableCell>
                        <TableCell className="pr-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(u);
                                setSelectedRole(u.role);
                                setIsEditRoleOpen(true);
                              }}
                              className="h-8 w-8 rounded-md border border-border cursor-pointer text-muted-foreground hover:text-foreground"
                              title="Phân quyền / Đổi vai trò"
                            >
                              <Shield className="h-3.5 w-3.5" />
                            </Button>
                            {u.status !== "banned" ? (
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleBanUser(u.id, true)}
                                className="h-8 w-8 rounded-md hover:bg-danger-soft hover:text-destructive border border-border cursor-pointer text-muted-foreground"
                                title="Khóa tài khoản"
                              >
                                <UserX className="h-3.5 w-3.5" />
                              </Button>
                            ) : (
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleBanUser(u.id, false)}
                                className="h-8 w-8 rounded-md hover:bg-success-soft hover:text-success border border-border cursor-pointer text-muted-foreground"
                                title="Mở khóa tài khoản"
                              >
                                <UserCheck className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>

      {/* EDIT ROLE DIALOG */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thay đổi vai trò người dùng</DialogTitle>
            <DialogDescription>
              Cấp quyền truy cập hệ thống của {selectedUser?.name}. Hãy cẩn trọng khi cấp quyền Admin.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRoleChangeSubmit} className="space-y-4 my-2 text-sm">
            <div className="space-y-2">
              <label className="font-semibold text-xs text-foreground">Chọn vai trò mới</label>
              <Select
                value={selectedRole}
                onValueChange={(val) => setSelectedRole(val as UserObj["role"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Khách hàng (User)</SelectItem>
                  <SelectItem value="contributor">Người đóng góp (Contributor)</SelectItem>
                  <SelectItem value="agent">Môi giới / Agency</SelectItem>
                  <SelectItem value="moderator">Kiểm duyệt viên (Moderator)</SelectItem>
                  <SelectItem value="admin">Quản trị viên (Admin)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsEditRoleOpen(false)} className="cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="cursor-pointer">
                Lưu quyền truy cập
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD USER DIALOG */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm thành viên mới</DialogTitle>
            <DialogDescription>
              Tạo tài khoản thành viên thủ công trong hệ thống. Tài khoản sau khi tạo sẽ được kích hoạt ngay lập tức.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUserSubmit} className="space-y-4 my-2 text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Tên đầy đủ *</label>
              <Input
                required
                placeholder="Ví dụ: Trần Minh Hoàng"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Email *</label>
                <Input
                  required
                  type="email"
                  placeholder="hoang.tran@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Số điện thoại *</label>
                <Input
                  required
                  placeholder="Ví dụ: 0905 123 456"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Vai trò thành viên</label>
              <Select
                value={newUser.role}
                onValueChange={(val) => setNewUser({ ...newUser, role: val as UserObj["role"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Khách hàng (User)</SelectItem>
                  <SelectItem value="contributor">Người đóng góp (Contributor)</SelectItem>
                  <SelectItem value="agent">Môi giới / Agency</SelectItem>
                  <SelectItem value="moderator">Kiểm duyệt viên (Moderator)</SelectItem>
                  <SelectItem value="admin">Quản trị viên (Admin)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newUser.role === "agent" && (
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Agency / Tổ chức môi giới</label>
                <Input
                  placeholder="Ví dụ: Đất Xanh Group, Vinhomes..."
                  value={newUser.agency}
                  onChange={(e) => setNewUser({ ...newUser, agency: e.target.value })}
                />
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)} className="cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="cursor-pointer">
                Tạo tài khoản
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
