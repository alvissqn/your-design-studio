import { useState, useEffect } from "react";
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
  Filter,
  Plus,
  Eye,
  Check,
  X,
  Trash2,
  Building,
  Building2,
  Home as HomeIcon,
  Trees,
  Mountain,
  MapPin,
  Calendar,
  DollarSign,
  User,
  ExternalLink,
  Star,
  UploadCloud,
  Navigation,
  RefreshCw,
  Minus,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/locations/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      filter: (search.filter as string) || "all",
    };
  },
  head: () => ({
    meta: [
      { title: "MapZest — Quản lý Bất động sản" },
      { name: "description", content: "Quản lý và duyệt danh sách bất động sản." },
    ],
  }),
  component: LocationsPage,
});

type BDS = {
  id: string;
  title: string;
  type: string;
  price: string;
  area: string;
  address: string;
  city: string;
  user: string;
  role: string;
  time: string;
  status: "published" | "pending" | "rejected" | "archived";
  isFeatured?: boolean;
  icon: any;
  images: string[];
  description: string;
  utilities: string[];
  furniture?: string;
  legal?: string;
  handover?: string;
  lat?: number;
  lng?: number;
  createDate?: string;
};

const mockData: BDS[] = [
  {
    id: "#P12580",
    title: "Duplex Thông tầng Cao cấp View Landmark 81 - Metropole Thủ Thiêm",
    type: "Căn hộ",
    price: "12.8 tỷ",
    area: "168 m²",
    address: "Đại lộ Mai Chí Thọ, Thủ Thiêm",
    city: "Hồ Chí Minh",
    user: "Nguyễn Văn A",
    role: "Môi giới",
    time: "2 giờ trước",
    status: "pending",
    isFeatured: true,
    icon: Building,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Căn hộ Duplex thông tầng siêu vip view panorama triệu đô ôm trọn Landmark 81 và sông Sài Gòn quyến rũ. Bố trí kính hộp chịu lực Low-E chống nóng cách âm tuyệt mỹ, nội thất đá cẩm thạch sang trọng, đèn rèm rọi tự động thông minh cao cấp. Tận hưởng tiện ích sảnh riêng sang trọng cao cấp.",
    utilities: ["Bể bơi vô cực", "Phòng Gym hiện đại", "Chỗ đỗ xe ô tô riêng", "Thang máy tốc độ cao", "An ninh chuyên nghiệp 24/7", "Ban công ngắm cảnh riêng"],
    furniture: "Đầy đủ nội thất cao cấp",
    legal: "Đang làm sổ / Có hợp đồng mua bán",
    handover: "Bán đứt",
    lat: 10.77340,
    lng: 106.72300,
    createDate: "20:10:00 6/6/2026",
  },
  {
    id: "#P12579",
    title: "Căn hộ Vinhomes Central Park",
    type: "Căn hộ",
    price: "6.2 tỷ",
    area: "86 m²",
    address: "Nguyễn Hữu Cảnh, Phường 22",
    city: "Hồ Chí Minh",
    user: "Trần Thị B",
    role: "Môi giới",
    time: "4 giờ trước",
    status: "pending",
    isFeatured: false,
    icon: Building,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Căn hộ 2 phòng ngủ, tầng cao view Landmark 81 cực đẹp. Đầy đủ nội thất cao cấp nhập khẩu, đang có hợp đồng thuê giá cao.",
    utilities: ["Phòng gym", "Hồ bơi", "Công viên 14ha", "Trường học Vinschool", "Bệnh viện Vinmec"],
  },
  {
    id: "#P12578",
    title: "Nhà phố mặt tiền Quận 1",
    type: "Nhà phố",
    price: "15.8 tỷ",
    area: "110 m²",
    address: "Đinh Tiên Hoàng, Đa Kao",
    city: "Hồ Chí Minh",
    user: "Lê Minh C",
    role: "Chủ sở hữu",
    time: "6 giờ trước",
    status: "published",
    isFeatured: true,
    icon: HomeIcon,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Nhà phố đắc địa mặt tiền Đinh Tiên Hoàng, Quận 1. Diện tích 5x22m, 1 trệt 3 lầu sân thượng. Hiện đang cho thuê làm văn phòng đại diện ổn định.",
    utilities: ["Mặt tiền đường lớn", "Khu kinh doanh sầm uất", "Sân thượng", "Chỗ đậu xe"],
  },
  {
    id: "#P12577",
    title: "Đất nền dự án Long Hậu",
    type: "Đất nền",
    price: "2.1 tỷ",
    area: "100 m²",
    address: "Đường số 4, KDC Long Hậu",
    city: "Long An",
    user: "Phạm Văn D",
    role: "Môi giới",
    time: "8 giờ trước",
    status: "pending",
    isFeatured: false,
    icon: Trees,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Đất nền thổ cư 100%, sổ đỏ riêng xây dựng tự do. Hạ tầng hoàn thiện, đường nhựa 12m, vỉa hè cây xanh mát mẻ.",
    utilities: ["Đường nhựa lớn", "Sổ đỏ riêng", "Gần khu công nghiệp", "Điện nước âm"],
  },
  {
    id: "#P12576",
    title: "Căn hộ The Sun Avenue",
    type: "Căn hộ",
    price: "4.3 tỷ",
    area: "75 m²",
    address: "Mai Chí Thọ, An Phú",
    city: "Hồ Chí Minh",
    user: "Hoàng Thị E",
    role: "Môi giới",
    time: "10 giờ trước",
    status: "published",
    isFeatured: false,
    icon: Mountain,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Căn hộ The Sun Avenue của Novaland mặt tiền Mai Chí Thọ. Thiết kế 2 phòng ngủ, 2WC hiện đại, bàn giao đầy đủ nội thất cơ bản chất lượng tốt.",
    utilities: ["Hồ bơi tràn bờ", "Trung tâm thương mại", "Khu BBQ", "Khu vui chơi trẻ em"],
  },
  {
    id: "#P12575",
    title: "Biệt thự sân vườn Cam Ranh",
    type: "Biệt thự",
    price: "18.5 tỷ",
    area: "420 m²",
    address: "Bãi Dài, Cam Lâm",
    city: "Khánh Hòa",
    user: "Trịnh Văn G",
    role: "Chủ đầu tư",
    time: "1 ngày trước",
    status: "published",
    isFeatured: true,
    icon: Building2,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Biệt thự nghỉ dưỡng 5 sao ven biển Bãi Dài Cam Ranh. Thiết kế sang trọng kiến trúc Địa Trung Hải, hồ bơi tràn bờ riêng tư.",
    utilities: ["Sát biển", "Hồ bơi riêng", "Sân vườn rộng", "Dịch vụ 5 sao", "Sân Golf"],
  },
  {
    id: "#P12574",
    title: "Văn phòng Landmark 81",
    type: "Văn phòng",
    price: "120 triệu/tháng",
    area: "150 m²",
    address: "Điện Biên Phủ, Phường 22",
    city: "Hồ Chí Minh",
    user: "Đặng Thị H",
    role: "Doanh nghiệp",
    time: "2 ngày trước",
    status: "published",
    isFeatured: false,
    icon: Building,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Mặt bằng văn phòng cao cấp tại tòa nhà cao nhất Việt Nam Landmark 81. Hỗ trợ đầy đủ tiện ích sảnh đón khách sang trọng, thẻ từ thang máy an ninh tuyệt đối.",
    utilities: ["Thang máy tốc độ cao", "View toàn cảnh thành phố", "Phòng họp chung", "Lễ tân chuyên nghiệp"],
  },
  {
    id: "#P12573",
    title: "Đất nền biệt thự Đà Lạt",
    type: "Đất nền",
    price: "12.5 tỷ",
    area: "280 m²",
    address: "Đường Hùng Vương, Phường 9",
    city: "Lâm Đồng",
    user: "Vũ Văn I",
    role: "Chủ sở hữu",
    time: "3 ngày trước",
    status: "rejected",
    isFeatured: false,
    icon: Trees,
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Đất xây dựng biệt thự view thung lũng thông reo tuyệt đẹp. Khu vực yên tĩnh, dân trí cao, pháp lý rõ ràng sổ hồng chính chủ.",
    utilities: ["View thung lũng", "Sổ hồng riêng", "Khí hậu ôn đới", "Đường ô tô vào tận nơi"],
  },
];

function LocationsPage() {
  const search = Route.useSearch();
  const [data, setData] = useState<BDS[]>(mockData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBDS, setSelectedBDS] = useState<BDS | null>(null);
  const [activeTab, setActiveTab] = useState<string>(search.filter || "all");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Filters state
  const [typeFilter, setTypeFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const handleToggleFeatured = (id: string) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.isFeatured;
          toast.success(
            nextVal
              ? `Đã đặt tin đăng "${item.title}" làm tin nổi bật!`
              : `Đã hủy trạng thái nổi bật của tin đăng "${item.title}".`
          );
          return { ...item, isFeatured: nextVal };
        }
        return item;
      })
    );
  };

  // States for Add New BĐS
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [newBDS, setNewBDS] = useState({
    title: "",
    type: "Căn hộ",
    price: "",
    area: "",
    address: "",
    city: "Hồ Chí Minh",
    description: "",
    utilities: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...urls].slice(0, 5));
    }
  };

  const handleStatusChange = (id: string, newStatus: BDS["status"]) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    toast.success(`Đã cập nhật trạng thái BĐS ${id} sang: ${
      newStatus === "published" ? "Đã duyệt & Đăng" : newStatus === "rejected" ? "Từ chối" : "Lưu trữ"
    }`);
  };



  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBDS.title || !newBDS.price || !newBDS.area || !newBDS.address) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    const createdBDS: BDS = {
      id: `#P${Math.floor(10000 + Math.random() * 90000)}`,
      title: newBDS.title,
      type: newBDS.type,
      price: newBDS.price,
      area: newBDS.area,
      address: newBDS.address,
      city: newBDS.city,
      user: "Quản trị viên",
      role: "Admin",
      time: "Vừa xong",
      status: "published",
      icon: newBDS.type === "Biệt thự" ? Building2 : newBDS.type === "Căn hộ" ? Building : HomeIcon,
      images: selectedImages.length > 0
        ? selectedImages
        : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
      description: newBDS.description || "Không có mô tả chi tiết.",
      utilities: newBDS.utilities ? newBDS.utilities.split(",").map(u => u.trim()) : [],
    };

    setData([createdBDS, ...data]);
    setIsAddOpen(false);
    setSelectedImages([]);
    setNewBDS({
      title: "",
      type: "Căn hộ",
      price: "",
      area: "",
      address: "",
      city: "Hồ Chí Minh",
      description: "",
      utilities: "",
    });
    toast.success("Đã tạo tin đăng bất động sản mới thành công!");
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Đã xóa vĩnh viễn tin đăng ${id}`);
  };

  // Lọc dữ liệu hiển thị
  const filteredData = data.filter((item) => {
    // Lọc theo tab trạng thái
    if (activeTab === "pending" && item.status !== "pending") return false;
    if (activeTab === "published" && item.status !== "published") return false;
    if (activeTab === "featured" && !item.isFeatured) return false;
    if (activeTab === "rejected" && item.status !== "rejected") return false;

    // Lọc theo loại BĐS
    if (typeFilter !== "all" && item.type !== typeFilter) return false;

    // Lọc theo tỉnh thành
    if (cityFilter !== "all" && item.city !== cityFilter) return false;

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.user.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
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
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Quản lý Bất động sản</h1>
              <p className="text-sm text-muted-foreground">
                Xem, duyệt và quản lý thông tin các bất động sản trên hệ thống MapZest.
              </p>
            </div>
            <Button onClick={() => setIsAddOpen(true)} className="cursor-pointer gap-2">
              <Plus className="h-4 w-4" /> Đăng tin BĐS mới
            </Button>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "Tất cả tin đăng" },
                { key: "pending", label: "Chờ duyệt", badge: data.filter(d => d.status === "pending").length },
                { key: "published", label: "Đã xuất bản" },
                { key: "featured", label: "Tin nổi bật", isFeatured: true },
                { key: "rejected", label: "Đã từ chối" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] rounded px-1.5 py-0.5 font-bold ${
                      activeTab === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-destructive text-destructive-foreground"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tiêu đề, địa chỉ, người đăng hoặc mã ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Loại BĐS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Mọi loại hình</SelectItem>
                    <SelectItem value="Căn hộ">Căn hộ</SelectItem>
                    <SelectItem value="Biệt thự">Biệt thự</SelectItem>
                    <SelectItem value="Nhà phố">Nhà phố</SelectItem>
                    <SelectItem value="Đất nền">Đất nền</SelectItem>
                    <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Tỉnh / Thành" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả khu vực</SelectItem>
                    <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                    <SelectItem value="Long An">Long An</SelectItem>
                    <SelectItem value="Khánh Hòa">Khánh Hòa</SelectItem>
                    <SelectItem value="Lâm Đồng">Lâm Đồng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Table list */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/20">
                    <TableHead className="font-semibold text-foreground pl-5">Tin đăng BĐS</TableHead>
                    <TableHead className="font-semibold text-foreground">Người đăng</TableHead>
                    <TableHead className="font-semibold text-foreground">Phân loại</TableHead>
                    <TableHead className="font-semibold text-foreground">Thông số</TableHead>
                    <TableHead className="font-semibold text-foreground">Khu vực</TableHead>
                    <TableHead className="font-semibold text-foreground">Trạng thái</TableHead>
                    <TableHead className="font-semibold text-foreground pr-5 text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        Không tìm thấy bất động sản nào phù hợp.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item) => {
                      const Icon = item.icon;
                      return (
                        <TableRow key={item.id} className="hover:bg-secondary/10 transition-colors">
                          <TableCell className="pl-5 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.images[0]}
                                alt={item.title}
                                className="w-16 h-12 rounded-lg object-cover bg-secondary border border-border"
                              />
                              <div className="min-w-0">
                                <div className="font-semibold text-foreground hover:text-primary transition truncate max-w-[240px]">
                                  {item.title}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                  <span>ID: {item.id}</span>
                                  {item.isFeatured && (
                                    <Badge variant="outline" className="text-[10px] text-amber-500 bg-amber-500/10 border-amber-500/20 py-0 px-1 font-bold">
                                      Nổi bật
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-foreground">{item.user}</div>
                            <div className="text-[11px] text-muted-foreground">{item.role}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Icon className="h-4 w-4" />
                              {item.type}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-foreground">{item.price}</div>
                            <div className="text-xs text-muted-foreground">{item.area}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs font-medium text-foreground">{item.address}</div>
                            <div className="text-[11px] text-muted-foreground">{item.city}</div>
                          </TableCell>
                          <TableCell>
                            {item.status === "published" && (
                              <Badge className="bg-success-soft text-success border-0 hover:bg-success-soft">Đã xuất bản</Badge>
                            )}
                            {item.status === "pending" && (
                              <Badge className="bg-warning-soft text-warning border-0 hover:bg-warning-soft">Chờ duyệt</Badge>
                            )}
                            {item.status === "rejected" && (
                              <Badge className="bg-danger-soft text-destructive border-0 hover:bg-danger-soft">Bị từ chối</Badge>
                            )}
                            {item.status === "archived" && (
                              <Badge className="bg-secondary text-muted-foreground border-0 hover:bg-secondary">Đã lưu trữ</Badge>
                            )}
                          </TableCell>
                          <TableCell className="pr-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {item.status === "pending" && (
                                <>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleStatusChange(item.id, "published")}
                                    className="h-8 w-8 rounded-md bg-success-soft hover:bg-success text-success hover:text-success-foreground border-0 cursor-pointer"
                                    title="Phê duyệt"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleStatusChange(item.id, "rejected")}
                                    className="h-8 w-8 rounded-md bg-danger-soft hover:bg-destructive text-destructive hover:text-destructive-foreground border-0 cursor-pointer"
                                    title="Từ chối duyệt"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleToggleFeatured(item.id)}
                                className={`h-8 w-8 rounded-md border border-border cursor-pointer transition ${
                                  item.isFeatured
                                    ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/30"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                                title={item.isFeatured ? "Hủy nổi bật" : "Đặt làm nổi bật"}
                              >
                                <Star className={`h-4 w-4 ${item.isFeatured ? "fill-amber-500" : ""}`} />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBDS(item);
                                  setIsDetailOpen(true);
                                }}
                                className="h-8 w-8 rounded-md hover:bg-secondary border border-border cursor-pointer text-muted-foreground hover:text-foreground"
                                title="Xem chi tiết"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleDelete(item.id)}
                                className="h-8 w-8 rounded-md hover:bg-destructive-soft hover:text-destructive border border-border cursor-pointer text-muted-foreground"
                                title="Xóa tin đăng"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL DIALOG */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          {selectedBDS && (
            <div className="space-y-4">
              <DialogHeader className="border-b border-border pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 font-semibold uppercase px-2 py-0.5">BẢN TIN ĐĂNG BÁN</Badge>
                  <Badge className={
                    selectedBDS.status === "pending" ? "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/10" :
                    selectedBDS.status === "published" ? "bg-success-soft text-success border-0 hover:bg-success-soft" :
                    selectedBDS.status === "rejected" ? "bg-danger-soft text-destructive border-0 hover:bg-danger-soft" :
                    "bg-secondary text-muted-foreground border-0 hover:bg-secondary"
                  }>
                    TRẠNG THÁI: {
                      selectedBDS.status === "pending" ? "CHỜ DUYỆT" :
                      selectedBDS.status === "published" ? "ĐÃ DUYỆT" :
                      selectedBDS.status === "rejected" ? "TỪ CHỐI" : "LƯU TRỮ"
                    }
                  </Badge>
                </div>
                <DialogTitle className="text-base font-bold text-foreground mt-1.5 flex items-center justify-between">
                  Cổng kiểm duyệt: {selectedBDS.title}
                </DialogTitle>
              </DialogHeader>

              {/* Photos */}
              <div className="grid grid-cols-12 gap-3 h-48 overflow-hidden rounded-xl relative">
                <div className="col-span-8 h-full relative">
                  <img
                    src={selectedBDS.images[0]}
                    alt="Main"
                    className="w-full h-full object-cover border border-border rounded-l-xl"
                  />
                  <span className="absolute bottom-2.5 left-3.5 bg-blue-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">
                    MẶC ĐỊNH HIỂN THỊ
                  </span>
                </div>
                <div className="col-span-4 h-full">
                  <img
                    src={selectedBDS.images[1] || selectedBDS.images[0]}
                    alt="Gallery"
                    className="w-full h-full object-cover border border-border rounded-r-xl"
                  />
                </div>
              </div>

              {/* Details Info Grid */}
              <div className="grid grid-cols-3 gap-4 border-y border-border py-3 text-center my-3 text-xs">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase font-semibold">Giá yêu cầu</div>
                  <div className="text-sm font-bold mt-1 text-primary">{selectedBDS.price}</div>
                </div>
                <div className="border-x border-border">
                  <div className="text-[11px] text-muted-foreground uppercase font-semibold">Diện tích</div>
                  <div className="text-sm font-bold mt-1 text-foreground">{selectedBDS.area}</div>
                </div>
                <div className="text-center">
                  <div className="text-[11px] text-muted-foreground uppercase font-semibold">Đăng bởi</div>
                  <div className="text-sm font-bold mt-1 text-foreground flex items-center justify-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {selectedBDS.user}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-sm mb-1.5 text-foreground">Mô tả chi tiết</h4>
                <p className="text-xs text-muted-foreground leading-relaxed bg-secondary/25 dark:bg-secondary/10 p-3 rounded-lg border border-border/40">
                  {selectedBDS.description}
                </p>
              </div>

              {/* Utilities */}
              <div>
                <h4 className="font-semibold text-sm mb-2 text-foreground">Tiện ích BĐS</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBDS.utilities && selectedBDS.utilities.map((u, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary text-foreground border-0 text-xs px-2.5 py-1">
                      {u}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <DialogFooter className="gap-2 sm:gap-0 mt-4 border-t border-border pt-4">
                <div className="flex gap-2 mr-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleToggleFeatured(selectedBDS.id);
                      setSelectedBDS(prev => prev ? { ...prev, isFeatured: !prev.isFeatured } : null);
                    }}
                    className={`gap-1.5 cursor-pointer text-xs h-9 ${
                      selectedBDS.isFeatured
                        ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20"
                        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Star className={`h-3.5 w-3.5 ${selectedBDS.isFeatured ? "fill-amber-500" : ""}`} />
                    {selectedBDS.isFeatured ? "Hủy nổi bật" : "Đặt nổi bật"}
                  </Button>
                </div>
                <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="cursor-pointer">
                  Đóng
                </Button>
                {selectedBDS.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-danger-soft hover:bg-destructive text-destructive hover:text-destructive-foreground border-0 cursor-pointer"
                      onClick={() => {
                        handleStatusChange(selectedBDS.id, "rejected");
                        setIsDetailOpen(false);
                      }}
                    >
                      Từ chối
                    </Button>
                    <Button
                      className="bg-success text-success-foreground hover:bg-success/90 border-0 cursor-pointer"
                      onClick={() => {
                        handleStatusChange(selectedBDS.id, "published");
                        setIsDetailOpen(false);
                      }}
                    >
                      Duyệt & Đăng
                    </Button>
                  </div>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ADD NEW DIALOG */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Đăng tin bất động sản mới</DialogTitle>
            <DialogDescription>
              Điền các thông số của bất động sản. Tin đăng sau khi tạo sẽ được hiển thị công khai ngay lập tức (vai trò Admin).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddNew} className="space-y-4 my-2 text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Tiêu đề tin đăng *</label>
              <Input
                required
                placeholder="Ví dụ: Căn hộ cao cấp Duplex Masteri Thảo Điền"
                value={newBDS.title}
                onChange={(e) => setNewBDS({ ...newBDS, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Loại BĐS</label>
                <Select
                  value={newBDS.type}
                  onValueChange={(val) => setNewBDS({ ...newBDS, type: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Căn hộ">Căn hộ</SelectItem>
                    <SelectItem value="Biệt thự">Biệt thự</SelectItem>
                    <SelectItem value="Nhà phố">Nhà phố</SelectItem>
                    <SelectItem value="Đất nền">Đất nền</SelectItem>
                    <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Tỉnh / Thành</label>
                <Select
                  value={newBDS.city}
                  onValueChange={(val) => setNewBDS({ ...newBDS, city: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                    <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                    <SelectItem value="Long An">Long An</SelectItem>
                    <SelectItem value="Khánh Hòa">Khánh Hòa</SelectItem>
                    <SelectItem value="Lâm Đồng">Lâm Đồng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Giá bán / Thuê *</label>
                <Input
                  required
                  placeholder="Ví dụ: 5.6 tỷ hoặc 15 triệu/tháng"
                  value={newBDS.price}
                  onChange={(e) => setNewBDS({ ...newBDS, price: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Diện tích *</label>
                <Input
                  required
                  placeholder="Ví dụ: 85 m²"
                  value={newBDS.area}
                  onChange={(e) => setNewBDS({ ...newBDS, area: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Địa chỉ chi tiết *</label>
              <Input
                required
                placeholder="Ví dụ: 159 Xa lộ Hà Nội, Thảo Điền, Quận 2"
                value={newBDS.address}
                onChange={(e) => setNewBDS({ ...newBDS, address: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Mô tả chi tiết</label>
              <textarea
                rows={3}
                placeholder="Thông tin chi tiết về phòng ngủ, nội thất, hướng nhà..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={newBDS.description}
                onChange={(e) => setNewBDS({ ...newBDS, description: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Hình ảnh bất động sản (Chọn tối đa 5 ảnh) *</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                id="file-upload"
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg p-4 hover:bg-secondary/40 transition cursor-pointer text-center bg-secondary/10"
              >
                <UploadCloud className="h-6 w-6 text-primary mb-1" />
                <span className="text-xs font-medium text-foreground">Chọn hình ảnh tải lên</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Click để chọn hoặc kéo thả nhiều tệp tin</span>
              </label>

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {selectedImages.map((url, i) => (
                    <div key={i} className="relative aspect-video rounded border border-border overflow-hidden">
                      <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setSelectedImages((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-0.5 right-0.5 h-4 w-4 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 cursor-pointer text-[8px] font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Tiện ích (phân cách bằng dấu phẩy)</label>
              <Input
                placeholder="Hồ bơi, Phòng Gym, Sân vườn, Thang máy..."
                value={newBDS.utilities}
                onChange={(e) => setNewBDS({ ...newBDS, utilities: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="cursor-pointer">
                Tạo tin đăng
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
