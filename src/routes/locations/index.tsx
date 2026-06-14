import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  ChevronLeft,
  ChevronRight,
  Clock,
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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Căn hộ Duplex thông tầng siêu vip view panorama triệu đô ôm trọn Landmark 81 và sông Sài Gòn quyến rũ. Bố trí kính hộp chịu lực Low-E chống nóng cách âm tuyệt mỹ, nội thất đá cẩm thạch sang trọng, đèn rèm rọi tự động thông minh cao cấp. Tận hưởng tiện ích sảnh riêng sang trọng cao cấp.",
    utilities: ["Bể bơi vô cực", "Phòng Gym hiện đại", "Chỗ đỗ xe ô tô riêng", "Thang máy tốc độ cao", "An ninh chuyên nghiệp 24/7", "Ban công ngắm cảnh riêng"],
    furniture: "Full toàn bộ nội thất cao cấp",
    legal: "Sổ hồng chính chủ trao tay",
    handover: "Bán đứt",
    lat: 10.7734,
    lng: 106.723,
    createDate: "16:20:00 5/6/2026",
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
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2381f0db?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Căn hộ 2 phòng ngủ, tầng cao view Landmark 81 cực đẹp. Đầy đủ nội thất cao cấp nhập khẩu, đang có hợp đồng thuê giá cao.",
    utilities: ["Phòng gym hiện đại", "Bể bơi ngoài trời", "Công viên 14ha rộng lớn", "Trường học Vinschool", "Bệnh viện Vinmec"],
    furniture: "Đầy đủ nội thất cao cấp nhập khẩu",
    legal: "Đã có sổ hồng",
    handover: "Bán đứt kèm hợp đồng thuê",
    lat: 10.795,
    lng: 106.722,
    createDate: "14:15:00 5/6/2026",
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
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2381f0db?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Nhà phố đắc địa mặt tiền Đinh Tiên Hoàng, Quận 1. Diện tích 5x22m, 1 trệt 3 lầu sân thượng. Hiện đang cho thuê làm văn phòng đại diện ổn định.",
    utilities: ["Mặt tiền đường lớn", "Khu kinh doanh sầm uất", "Sân thượng rộng rãi", "Chỗ đậu xe ô tô riêng"],
    furniture: "Nội thất văn phòng cơ bản",
    legal: "Sổ hồng hoàn công đầy đủ",
    handover: "Bán đứt giao nhà ngay",
    lat: 10.79,
    lng: 106.696,
    createDate: "09:30:00 5/6/2026",
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
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Đất nền thổ cư 100%, sổ đỏ riêng xây dựng tự do. Hạ tầng hoàn thiện, đường nhựa 12m, vỉa hè cây xanh mát mẻ.",
    utilities: ["Đường nhựa lớn", "Sổ đỏ riêng từng nền", "Gần khu công nghiệp", "Điện nước âm hiện đại"],
    furniture: "Đất trống xây dựng tự do",
    legal: "Sổ đỏ thổ cư 100%",
    handover: "Bán đứt giao nền ngay",
    lat: 10.612,
    lng: 106.732,
    createDate: "08:00:00 5/6/2026",
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
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2381f0db?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Căn hộ The Sun Avenue của Novaland mặt tiền Mai Chí Thọ. Thiết kế 2 phòng ngủ, 2WC hiện đại, bàn giao đầy đủ nội thất cơ bản chất lượng tốt.",
    utilities: ["Hồ bơi tràn bờ", "Trung tâm thương mại", "Khu BBQ", "Khu vui chơi trẻ em"],
    furniture: "Đầy đủ nội thất cơ bản chất lượng tốt",
    legal: "Hợp đồng mua bán chính chủ",
    handover: "Bán đứt sang tên ngay",
    lat: 10.781,
    lng: 106.755,
    createDate: "07:30:00 5/6/2026",
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Biệt thự nghỉ dưỡng 5 sao ven biển Bãi Dài Cam Ranh. Thiết kế sang trọng kiến trúc Địa Trung Hải, hồ bơi tràn bờ riêng tư.",
    utilities: ["Sát biển", "Hồ bơi riêng biệt", "Sân vườn rộng lớn", "Dịch vụ chuẩn 5 sao", "Sân Golf đẳng cấp"],
    furniture: "Đầy đủ nội thất cao cấp tiêu chuẩn 5 sao",
    legal: "Sổ hồng sở hữu lâu dài",
    handover: "Bán đứt bàn giao ngay",
    lat: 12.062,
    lng: 109.215,
    createDate: "16:00:00 4/6/2026",
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
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430db094?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Mặt bằng văn phòng cao cấp tại tòa nhà cao nhất Việt Nam Landmark 81. Hỗ trợ đầy đủ tiện ích sảnh đón khách sang trọng, thẻ từ thang máy an ninh tuyệt đối.",
    utilities: ["Thang máy tốc độ cao", "View toàn cảnh thành phố", "Phòng họp chung hiện đại", "Lễ tân chuyên nghiệp"],
    furniture: "Bàn giao thô hoặc nội thất văn phòng cơ bản",
    legal: "Hợp đồng thuê dài hạn pháp lý rõ ràng",
    handover: "Cho thuê lâu dài từ 3 năm",
    lat: 10.794,
    lng: 106.722,
    createDate: "10:30:00 3/6/2026",
  },
  {
    id: "#P12573",
    title: "Đất nền biệt thự Đà Lạt",
    type: "Đất nền",
    price: "12.50 tỷ",
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
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Đất xây dựng biệt thự view thung lũng thông reo tuyệt đẹp. Khu vực yên tĩnh, dân trí cao, pháp lý rõ ràng sổ hồng chính chủ.",
    utilities: ["View thung lũng thông reo", "Sổ hồng riêng chính chủ", "Khí hậu ôn đới mát mẻ", "Đường ô tô lớn vào tận nơi"],
    furniture: "Đất xây dựng tự do",
    legal: "Sổ hồng chính chủ thổ cư 100%",
    handover: "Bán đứt giao đất ngay",
    lat: 11.94,
    lng: 108.46,
    createDate: "11:20:00 2/6/2026",
  },
];

function LocationsPage() {
  const search = Route.useSearch();
  const [data, setData] = useState<BDS[]>(mockData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBDS, setSelectedBDS] = useState<BDS | null>(null);
  const navigate = useNavigate();
  const activeTab = search.filter || "all";

  const handleTabChange = (tabKey: string) => {
    navigate({
      search: (old) => ({
        ...old,
        filter: tabKey === "all" ? undefined : tabKey,
      }),
    });
  };

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Filters state
  const [typeFilter, setTypeFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mapTab, setMapTab] = useState<"street" | "satellite" | "hybrid">("street");
  const [zoomLevel, setZoomLevel] = useState(14);
  const [isPinging, setIsPinging] = useState(false);
  const [searchMapQuery, setSearchMapQuery] = useState("");

  useEffect(() => {
    if (selectedBDS) {
      setActiveImageIndex(0);
    }
  }, [selectedBDS]);

  const handleArchive = (id: string) => {
    handleStatusChange(id, "archived");
    setIsDetailOpen(false);
  };

  const handleRejectWithReason = (id: string) => {
    const reason = window.prompt("Nhập lý do từ chối kiểm duyệt:");
    if (reason !== null) {
      handleStatusChange(id, "rejected");
      toast.info(`Tin đăng bị từ chối với lý do: ${reason || "Không có lý do cụ thể"}`);
      setIsDetailOpen(false);
    }
  };

  const handleApprove = (id: string) => {
    handleStatusChange(id, "published");
    setIsDetailOpen(false);
  };

  const handleLocate = () => {
    setIsPinging(true);
    toast.success(`Đã định vị thành công tọa độ BDS tại khu vực: ${selectedBDS?.address || selectedBDS?.city}`);
    setTimeout(() => setIsPinging(false), 2000);
  };

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
    coordinates: "",
    furnitureLegal: "",
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

    // Phân tích tọa độ GPS nhập vào hoặc sinh ngẫu nhiên theo Thành phố
    let lat = 10.7734;
    let lng = 106.7230;
    
    if (newBDS.coordinates) {
      const parts = newBDS.coordinates.split(",");
      if (parts.length === 2) {
        const parsedLat = parseFloat(parts[0].trim());
        const parsedLng = parseFloat(parts[1].trim());
        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
          lat = parsedLat;
          lng = parsedLng;
        }
      }
    } else {
      // Tự động giả lập tọa độ ngẫu nhiên gần trung tâm thành phố được chọn
      const cityCoords: Record<string, { lat: number; lng: number }> = {
        "Hồ Chí Minh": { lat: 10.7734, lng: 106.7230 },
        "Hà Nội": { lat: 21.0285, lng: 105.8542 },
        "Long An": { lat: 10.6120, lng: 106.7320 },
        "Khánh Hòa": { lat: 12.2450, lng: 109.1940 },
        "Lâm Đồng": { lat: 11.9404, lng: 108.4583 },
      };
      
      const center = cityCoords[newBDS.city] || { lat: 10.7734, lng: 106.7230 };
      lat = center.lat + (Math.random() - 0.5) * 0.03;
      lng = center.lng + (Math.random() - 0.5) * 0.03;
    }

    // Phân tích nội thất & pháp lý
    let furniture = "Đầy đủ nội thất cao cấp";
    let legal = "Sổ hồng chính chủ trao tay";
    if (newBDS.furnitureLegal) {
      const parts = newBDS.furnitureLegal.split(",");
      if (parts[0]) furniture = parts[0].trim();
      if (parts[1]) legal = parts[1].trim();
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
        : [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
          ],
      description: newBDS.description || "Không có mô tả chi tiết.",
      utilities: newBDS.utilities ? newBDS.utilities.split(",").map(u => u.trim()) : ["Chỗ đỗ xe ô tô riêng", "Phòng Gym hiện đại", "An ninh 24/7"],
      furniture,
      legal,
      handover: "Bán đứt",
      lat,
      lng,
      createDate: new Date().toLocaleTimeString("vi-VN") + " " + new Date().toLocaleDateString("vi-VN"),
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
      coordinates: "",
      furnitureLegal: "",
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
                  onClick={() => handleTabChange(tab.key)}
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
        <DialogContent className="max-w-5xl w-[95vw] md:max-w-4xl lg:max-w-5xl overflow-y-auto max-h-[90vh]">
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

              {/* SLIDE HÌNH ẢNH (GIỐNG HÌNH 3) */}
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-primary" /> THƯ VIỆN HÌNH ẢNH CHI TIẾT
                  <span className="text-[9px] font-normal lowercase text-muted-foreground ml-2">Nhấn thumbnail để chọn hình hiển thị đại diện lộ trình</span>
                </div>
                
                {/* Ảnh chính lớn */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl border border-border bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                  <img
                    src={selectedBDS.images[activeImageIndex] || selectedBDS.images[0]}
                    alt="Main view"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  
                  {/* Banner Mặc định hiển thị khi đang chọn ảnh đầu tiên */}
                  {activeImageIndex === 0 && (
                    <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1.5 rounded shadow-lg uppercase tracking-wider">
                      MẶC ĐỊNH HIỂN THỊ
                    </span>
                  )}
                  
                  {/* Navigation Arrows trên ảnh lớn */}
                  {selectedBDS.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedBDS.images.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition cursor-pointer z-10"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveImageIndex((prev) => (prev === selectedBDS.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition cursor-pointer z-10"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Hàng ảnh thumbnail nhỏ */}
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {selectedBDS.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        activeImageIndex === idx
                          ? "border-blue-600 shadow-md scale-[1.02]"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      {/* Icon Ngôi sao nền xanh tròn ở góc trái ảnh đại diện (idx = 0) */}
                      {idx === 0 && (
                        <div className="absolute top-1 left-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                          <Star className="h-2.5 w-2.5 fill-white stroke-none" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* HAI CỘT CHÍNH (GIỐNG HÌNH 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                
                {/* Cột 1: Thông số kỹ thuật & Mô tả */}
                <div className="space-y-4">
                  <div className="bg-secondary/10 dark:bg-secondary/5 rounded-xl border border-border/80 p-4 space-y-4">
                    <div className="text-xs font-bold text-foreground pb-2 border-b border-border/50 uppercase tracking-wider">
                      THÔNG SỐ KỸ THUẬT CHI TIẾT
                    </div>
                    
                    <div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        NỘI DUNG MÔ TẢ CỦA MÔI GIỚI:
                      </div>
                      <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
                        {selectedBDS.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-border/50 text-xs">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Diện tích sử dụng:</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{selectedBDS.area}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Tình trạng nội thất:</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{selectedBDS.furniture || "Full toàn bộ nội thất cao cấp"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Pháp lý giấy tờ:</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{selectedBDS.legal || "Sổ hồng chính chủ trao tay"}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Hình thức bàn giao:</div>
                        <div className="text-sm font-semibold text-foreground mt-0.5">{selectedBDS.handover || "Bán đứt"}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      DANH SÁCH TIỆN ÍCH ĐI KÈM:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedBDS.utilities && selectedBDS.utilities.map((u, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-card border border-border/60 rounded-lg px-3 py-2 text-xs text-foreground shadow-xs">
                          <span className="text-emerald-500 font-bold text-base">✓</span>
                          <span className="truncate">{u}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cột 2: Bản đồ khảo sát tọa độ */}
                <div className="h-full">
                  <div className="bg-card rounded-xl border border-border/80 p-4 space-y-3 flex flex-col h-full min-h-[360px]">
                    <div className="flex items-center justify-between text-xs border-b border-border pb-2">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary animate-bounce" />
                        BẢN ĐỒ KHẢO SÁT TỌA ĐỘ VỊ TRÍ
                      </div>
                      <div className="text-[10px] text-blue-600 font-bold tracking-wider uppercase">
                        MẠNG LƯỚI ĐỘC QUYỀN MAPZEST
                      </div>
                    </div>

                    {/* Search & Locate bar */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <Input
                          placeholder="Tìm kiếm dự án, đường phố, quận huyện hoặc tọa độ"
                          className="pl-8 text-xs h-9 bg-secondary/20 border-border/80 focus:bg-background"
                          value={searchMapQuery}
                          onChange={(e) => setSearchMapQuery(e.target.value)}
                        />
                      </div>
                      <Button size="sm" onClick={handleLocate} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-9 px-3 text-xs cursor-pointer flex items-center gap-1">
                        <Navigation className="h-3 w-3 fill-white" /> Định vị
                      </Button>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-secondary/30 p-0.5 rounded-lg border border-border/40 text-xs self-start">
                      {(["street", "satellite", "hybrid"] as const).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setMapTab(tab)}
                          className={`px-3 py-1 rounded-md transition cursor-pointer font-medium ${
                            mapTab === tab
                              ? "bg-background text-foreground shadow-xs font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab === "street" ? "Xem Đường phố" : tab === "satellite" ? "Vệ tinh" : "Hỗn hợp"}
                        </button>
                      ))}
                    </div>

                    {/* Map Canvas wrapper */}
                    <div className="relative flex-1 min-h-[220px] rounded-lg border border-border overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-inner">
                      {/* Map Content */}
                      <div
                        className="w-full h-full relative transition-all duration-500 overflow-hidden"
                        style={{
                          backgroundColor:
                            mapTab === "street"
                              ? "#e8ecef"
                              : mapTab === "satellite"
                              ? "#111827"
                              : "#1f2937",
                          backgroundImage:
                            mapTab === "street"
                              ? "radial-gradient(#dee2e6 1.5px, transparent 1.5px)"
                              : "radial-gradient(#374151 1.5px, transparent 1.5px)",
                          backgroundSize: "24px 24px",
                        }}
                      >
                        {/* SVG Drawing for streets and river */}
                        <svg
                          className="absolute inset-0 w-full h-full opacity-90 transition-transform duration-300"
                          style={{
                            transform: `scale(${1 + (zoomLevel - 14) * 0.15})`,
                            transformOrigin: "center",
                          }}
                          viewBox="0 0 400 300"
                        >
                          {/* Sông ngòi */}
                          <path
                            d="M -50 180 Q 150 140, 220 220 T 450 180"
                            fill="none"
                            stroke={mapTab === "street" ? "#a5f3fc" : "#0e7490"}
                            strokeWidth="32"
                            strokeLinecap="round"
                            opacity="0.8"
                          />

                          {/* Công viên xanh */}
                          <rect
                            x="240"
                            y="70"
                            width="120"
                            height="70"
                            rx="12"
                            fill={mapTab === "street" ? "#dcfce7" : "#065f46"}
                            stroke={mapTab === "street" ? "#86efac" : "#047857"}
                            strokeWidth="1.5"
                            opacity="0.75"
                          />
                          <text
                            x="300"
                            y="105"
                            textAnchor="middle"
                            fill={mapTab === "street" ? "#15803d" : "#34d399"}
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                          >
                            Công viên Trung tâm
                          </text>

                          {/* Đường lớn */}
                          <path
                            d="M -20 200 L 420 200"
                            fill="none"
                            stroke={mapTab === "street" ? "#ffffff" : "#4b5563"}
                            strokeWidth="16"
                            opacity="0.9"
                          />
                          <path
                            d="M -20 200 L 420 200"
                            fill="none"
                            stroke={mapTab === "street" ? "#fef08a" : "#9ca3af"}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            opacity="0.9"
                          />
                          
                          <path
                            d="M 180 -20 L 180 320"
                            fill="none"
                            stroke={mapTab === "street" ? "#ffffff" : "#4b5563"}
                            strokeWidth="12"
                            opacity="0.9"
                          />

                          {/* Labels */}
                          <text
                            x="60"
                            y="196"
                            fill={mapTab === "street" ? "#475569" : "#d1d5db"}
                            fontSize="8"
                            fontWeight="600"
                            fontFamily="sans-serif"
                          >
                            {selectedBDS.address.toUpperCase().includes("MAI CHÍ THỌ") ? "ĐẠI LỘ MAI CHÍ THỌ" : `ĐƯỜNG ${selectedBDS.address.split(",")[0].toUpperCase()}`}
                          </text>
                          <text
                            x="15"
                            y="45"
                            fill={mapTab === "street" ? "#64748b" : "#9ca3af"}
                            fontSize="8"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                          >
                            KHU ĐÔ THỊ TRUNG TÂM
                          </text>
                        </svg>

                        {/* Marker & Tooltip (Tự động canh giữa bản đồ) */}
                        <div className="absolute top-[50%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                          {/* Tooltip đen */}
                          <div className="bg-black/90 text-white text-[10px] font-medium py-1.5 px-2.5 rounded shadow-lg border border-white/10 mb-1 flex items-center gap-1 max-w-[200px] whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            {selectedBDS.address.split(",")[0]}, {selectedBDS.city}
                          </div>

                          {/* Marker pin */}
                          <div className="relative">
                            <MapPin className="h-7 w-7 text-blue-600 fill-blue-100 filter drop-shadow animate-bounce" />
                            {isPinging && (
                              <span className="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping z-[-1]"></span>
                            )}
                            <span className="absolute top-[6px] left-[10px] w-2 h-2 rounded-full bg-blue-600"></span>
                          </div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-10">
                          <button
                            type="button"
                            onClick={() => setZoomLevel((prev) => Math.min(prev + 1, 18))}
                            className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-border flex items-center justify-center h-8 w-8 font-bold"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setZoomLevel((prev) => Math.max(prev - 1, 10))}
                            className="bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-border flex items-center justify-center h-8 w-8 font-bold"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Zoom scale info badge */}
                        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold py-1 px-2 rounded-md z-10 select-none shadow-sm flex items-center gap-1 border border-white/5">
                          <Navigation className="h-2.5 w-2.5 fill-white text-white rotate-45" /> Tỷ lệ Thu phóng: {zoomLevel}x
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* FOOTER ĐẸP KẾT HỢP HÌNH 2 & TÍNH NĂNG CŨ */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-border pt-4 text-xs">
                
                {/* Ngày tạo ở góc trái */}
                <div className="text-muted-foreground font-medium flex items-center gap-1.5 self-start sm:self-center">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  Ngày tạo: {selectedBDS.createDate || "16:20:00 5/6/2026"}
                </div>
                
                {/* Các nút hành động bên phải */}
                <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
                  
                  {/* Nút đặt nổi bật (Bảo toàn tính năng cũ) */}
                  <Button
                    variant="outline"
                    type="button"
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

                  {/* Nút Khóa/Ẩn tin tức (Hình 2) */}
                  {selectedBDS.status !== "archived" && (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => handleArchive(selectedBDS.id)}
                      className="cursor-pointer text-xs h-9 hover:bg-secondary/80"
                    >
                      Khóa/Ẩn tin tức
                    </Button>
                  )}

                  {/* Nút Từ chối có lý do (Hình 2) */}
                  {selectedBDS.status === "pending" && (
                    <Button
                      type="button"
                      className="bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/30 font-semibold cursor-pointer text-xs h-9"
                      onClick={() => handleRejectWithReason(selectedBDS.id)}
                    >
                      Từ chối có lý do
                    </Button>
                  )}

                  {/* Nút Kiểm định & Duyệt hiển thị / Duyệt & Đăng (Hình 2 + 1) */}
                  {selectedBDS.status === "pending" && (
                    <Button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer text-xs h-9"
                      onClick={() => handleApprove(selectedBDS.id)}
                    >
                      Kiểm định & Duyệt hiển thị
                    </Button>
                  )}

                  {/* Nút Đóng lại (Hình 2) */}
                  <Button
                    type="button"
                    className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 font-semibold cursor-pointer text-xs h-9"
                    onClick={() => setIsDetailOpen(false)}
                  >
                    Đóng lại
                  </Button>
                </div>
              </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Tọa độ GPS (Vĩ độ, Kinh độ) - Không bắt buộc</label>
                <Input
                  placeholder="Ví dụ: 10.7734, 106.7230"
                  value={newBDS.coordinates}
                  onChange={(e) => setNewBDS({ ...newBDS, coordinates: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-xs text-foreground">Nội thất / Pháp lý - Không bắt buộc</label>
                <Input
                  placeholder="Cách nhau bằng dấu phẩy. Ví dụ: Đầy đủ nội thất, Sổ hồng chính chủ"
                  value={newBDS.furnitureLegal}
                  onChange={(e) => setNewBDS({ ...newBDS, furnitureLegal: e.target.value })}
                />
              </div>
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
