import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X, Eye, Building, Building2, Home, Trees, Mountain, Calendar, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type PendingRow = {
  icon: any;
  id: string;
  title: string;
  user: string;
  role: string;
  type: string;
  price: string;
  area: string;
  city: string;
  time: string;
  address?: string;
  description?: string;
  utilities?: string[];
  imageUrl?: string;
};

const initialRows: PendingRow[] = [
  { 
    icon: Building2, 
    id: "#P12580", 
    title: "Biệt thự ven sông Thảo Điền", 
    user: "Nguyễn Văn A", 
    role: "Môi giới", 
    type: "Biệt thự", 
    price: "28.5 tỷ", 
    area: "350 m²", 
    city: "Hồ Chí Minh", 
    time: "2 giờ trước",
    address: "Nguyễn Văn Hưởng, Thảo Điền, Quận 2",
    description: "Biệt thự đẳng cấp ven sông Sài Gòn tại khu Thảo Điền, Quận 2. Gồm 5 phòng ngủ, hồ bơi sân vườn rộng rãi, an ninh 24/7. Thích hợp để an cư lạc nghiệp.",
    utilities: ["Hồ bơi", "Sân vườn", "An ninh 24/7", "View sông", "Gara ô tô"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Building, 
    id: "#P12579", 
    title: "Căn hộ Vinhomes Central Park", 
    user: "Trần Thị B", 
    role: "Môi giới", 
    type: "Căn hộ", 
    price: "6.2 tỷ", 
    area: "86 m²", 
    city: "Hồ Chí Minh", 
    time: "4 giờ trước",
    address: "Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh",
    description: "Căn hộ 2 phòng ngủ, tầng cao view Landmark 81 cực đẹp. Đầy đủ nội thất cao cấp nhập khẩu, đang có hợp đồng thuê giá cao.",
    utilities: ["Phòng gym", "Hồ bơi", "Công viên 14ha", "Trường học Vinschool", "Bệnh viện Vinmec"],
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Home, 
    id: "#P12578", 
    title: "Nhà phố mặt tiền Quận 1", 
    user: "Lê Minh C", 
    role: "Chủ sở hữu", 
    type: "Nhà phố", 
    price: "15.8 tỷ", 
    area: "110 m²", 
    city: "Hồ Chí Minh", 
    time: "6 giờ trước",
    address: "Đinh Tiên Hoàng, Đa Kao, Quận 1",
    description: "Nhà phố đắc địa mặt tiền Đinh Tiên Hoàng, Quận 1. Diện tích 5x22m, 1 trệt 3 lầu sân thượng. Hiện đang cho thuê làm văn phòng đại diện ổn định.",
    utilities: ["Mặt tiền đường lớn", "Khu kinh doanh sầm uất", "Sân thượng", "Chỗ đậu xe"],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Trees, 
    id: "#P12577", 
    title: "Đất nền dự án Long Hậu", 
    user: "Phạm Văn D", 
    role: "Môi giới", 
    type: "Đất", 
    price: "2.1 tỷ", 
    area: "100 m²", 
    city: "Long An", 
    time: "8 giờ trước",
    address: "Đường số 4, KDC Long Hậu, Cần Giuộc",
    description: "Đất nền thổ cư 100%, sổ đỏ riêng xây dựng tự do. Hạ tầng hoàn thiện, đường nhựa 12m, vỉa hè cây xanh mát mẻ.",
    utilities: ["Đường nhựa lớn", "Sổ đỏ riêng", "Gần khu công nghiệp", "Điện nước âm"],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  { 
    icon: Mountain, 
    id: "#P12576", 
    title: "Căn hộ The Sun Avenue", 
    user: "Hoàng Thị E", 
    role: "Môi giới", 
    type: "Căn hộ", 
    price: "4.3 tỷ", 
    area: "75 m²", 
    city: "Hồ Chí Minh", 
    time: "10 giờ trước",
    address: "Mai Chí Thọ, An Phú, Quận 2",
    description: "Căn hộ The Sun Avenue của Novaland mặt tiền Mai Chí Thọ. Thiết kế 2 phòng ngủ, 2WC hiện đại, bàn giao đầy đủ nội thất cơ bản chất lượng tốt.",
    utilities: ["Hồ bơi tràn bờ", "Trung tâm thương mại", "Khu BBQ", "Khu vui chơi trẻ em"],
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
  },
];

export function PendingTable() {
  const [data, setData] = useState<PendingRow[]>(initialRows);
  const [selectedRow, setSelectedRow] = useState<PendingRow | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleApprove = (id: string, title: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Đã phê duyệt tin đăng "${title}" thành công!`);
  };

  const handleReject = (id: string, title: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    toast.error(`Đã từ chối tin đăng "${title}".`);
  };

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between p-5 pb-4">
        <h3 className="font-semibold">Tin đăng chờ duyệt</h3>
        <Link to="/locations" search={{ filter: "pending" }} className="text-xs text-primary hover:underline cursor-pointer">
          Xem tất cả
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground border-y border-border bg-secondary/40">
            <tr>
              <th className="text-left font-semibold px-5 py-2.5">Tin đăng</th>
              <th className="text-left font-semibold px-3 py-2.5">Người đăng</th>
              <th className="text-left font-semibold px-3 py-2.5">Loại BĐS</th>
              <th className="text-left font-semibold px-3 py-2.5">Giá</th>
              <th className="text-left font-semibold px-3 py-2.5">Khu vực</th>
              <th className="text-left font-semibold px-3 py-2.5">Thời gian</th>
              <th className="text-left font-semibold px-3 py-2.5">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground text-xs">
                  Không còn tin đăng nào đang chờ duyệt.
                </td>
              </tr>
            ) : (
              data.map((r) => {
                const Icon = r.icon;
                return (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {r.imageUrl ? (
                          <img
                            src={r.imageUrl}
                            alt={r.title}
                            className="w-14 h-11 rounded-md object-cover bg-secondary border border-border"
                          />
                        ) : (
                          <div className="h-11 w-14 rounded-md bg-secondary flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-medium truncate max-w-[200px]" title={r.title}>
                            {r.title}
                          </div>
                          <div className="text-[11px] text-muted-foreground">ID: {r.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium">{r.user}</div>
                      <div className="text-[11px] text-muted-foreground">{r.role}</div>
                    </td>
                    <td className="px-3 py-3">{r.type}</td>
                    <td className="px-3 py-3 font-semibold text-primary">{r.price}</td>
                    <td className="px-3 py-3">
                      <div>{r.area}</div>
                      <div className="text-[11px] text-muted-foreground">{r.city}</div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{r.time}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleApprove(r.id, r.title)}
                          className="h-7 w-7 rounded-md bg-success-soft text-success flex items-center justify-center hover:opacity-85 cursor-pointer"
                          title="Duyệt đăng"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(r.id, r.title)}
                          className="h-7 w-7 rounded-md bg-danger-soft text-destructive flex items-center justify-center hover:opacity-85 cursor-pointer"
                          title="Từ chối"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedRow(r);
                            setIsDetailOpen(true);
                          }}
                          className="h-7 w-7 rounded-md bg-info-soft text-info flex items-center justify-center hover:opacity-85 cursor-pointer"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PREVIEW DIALOG */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedRow && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mt-2">
                  <Badge className="bg-warning-soft text-warning border-0">
                    Đang chờ phê duyệt
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Gửi {selectedRow.time}
                  </span>
                </div>
                <DialogTitle className="text-lg font-bold mt-2 flex items-center justify-between">
                  <span>{selectedRow.title}</span>
                  <span className="text-primary font-bold">{selectedRow.price}</span>
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  {selectedRow.address || `${selectedRow.area}, ${selectedRow.city}`}
                </DialogDescription>
              </DialogHeader>

              {/* Body */}
              <div className="space-y-4 my-2">
                {selectedRow.imageUrl && (
                  <div className="h-40 overflow-hidden rounded-xl">
                    <img
                      src={selectedRow.imageUrl}
                      alt={selectedRow.title}
                      className="w-full h-full object-cover border border-border"
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 border-y border-border py-3 text-center text-xs">
                  <div>
                    <div className="text-muted-foreground font-medium">Loại hình</div>
                    <div className="font-bold mt-1 text-foreground">{selectedRow.type}</div>
                  </div>
                  <div className="border-x border-border">
                    <div className="text-muted-foreground font-medium">Diện tích</div>
                    <div className="font-bold mt-1 text-foreground">{selectedRow.area}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground font-medium">Người đăng</div>
                    <div className="font-bold mt-1 text-foreground flex items-center justify-center gap-1">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      {selectedRow.user} ({selectedRow.role})
                    </div>
                  </div>
                </div>

                {selectedRow.description && (
                  <div>
                    <h4 className="font-semibold text-xs mb-1 text-foreground">Mô tả chi tiết</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedRow.description}
                    </p>
                  </div>
                )}

                {selectedRow.utilities && selectedRow.utilities.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-xs mb-2 text-foreground">Tiện ích đi kèm</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRow.utilities.map((u, i) => (
                        <Badge key={i} variant="secondary" className="bg-secondary text-foreground border-0 text-[10px] px-2 py-0.5">
                          {u}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <DialogFooter className="gap-2 sm:gap-0 mt-4 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="cursor-pointer">
                  Đóng
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-danger-soft hover:bg-destructive text-destructive hover:text-destructive-foreground border-0 cursor-pointer"
                    onClick={() => {
                      handleReject(selectedRow.id, selectedRow.title);
                      setIsDetailOpen(false);
                    }}
                  >
                    Từ chối
                  </Button>
                  <Button
                    className="bg-success text-success-foreground hover:bg-success/90 border-0 cursor-pointer"
                    onClick={() => {
                      handleApprove(selectedRow.id, selectedRow.title);
                      setIsDetailOpen(false);
                    }}
                  >
                    Phê duyệt
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

