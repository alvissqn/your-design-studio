import { Check, X, Eye, Building, Building2, Home, Trees, Mountain } from "lucide-react";

const rows = [
  { icon: Building2, id: "#P12580", title: "Biệt thự ven sông Thảo Điền", user: "Nguyễn Văn A", role: "Môi giới", type: "Biệt thự", price: "28.5 tỷ", area: "TP. Thủ Đức", city: "Hồ Chí Minh", time: "2 giờ trước" },
  { icon: Building, id: "#P12579", title: "Căn hộ Vinhomes Central Park", user: "Trần Thị B", role: "Môi giới", type: "Căn hộ", price: "6.2 tỷ", area: "Bình Thạnh", city: "Hồ Chí Minh", time: "4 giờ trước" },
  { icon: Home, id: "#P12578", title: "Nhà phố mặt tiền Quận 1", user: "Lê Minh C", role: "Chủ sở hữu", type: "Nhà phố", price: "15.8 tỷ", area: "Quận 1", city: "Hồ Chí Minh", time: "6 giờ trước" },
  { icon: Trees, id: "#P12577", title: "Đất nền dự án Long Hậu", user: "Phạm Văn D", role: "Môi giới", type: "Đất", price: "2.1 tỷ", area: "Cần Giuộc", city: "Long An", time: "8 giờ trước" },
  { icon: Mountain, id: "#P12576", title: "Căn hộ The Sun Avenue", user: "Hoàng Thị E", role: "Môi giới", type: "Căn hộ", price: "4.3 tỷ", area: "Quận 2", city: "Hồ Chí Minh", time: "10 giờ trước" },
];

export function PendingTable() {
  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="flex items-center justify-between p-5 pb-4">
        <h3 className="font-semibold">Tin đăng chờ duyệt</h3>
        <button className="text-xs text-primary hover:underline">Xem tất cả</button>
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
            {rows.map((r) => {
              const Icon = r.icon;
              return (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-14 rounded-md bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{r.title}</div>
                        <div className="text-[11px] text-muted-foreground">ID: {r.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{r.user}</div>
                    <div className="text-[11px] text-muted-foreground">{r.role}</div>
                  </td>
                  <td className="px-3 py-3">{r.type}</td>
                  <td className="px-3 py-3 font-semibold">{r.price}</td>
                  <td className="px-3 py-3">
                    <div>{r.area}</div>
                    <div className="text-[11px] text-muted-foreground">{r.city}</div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{r.time}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="h-7 w-7 rounded-md bg-success-soft text-success flex items-center justify-center hover:opacity-80">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="h-7 w-7 rounded-md bg-danger-soft text-destructive flex items-center justify-center hover:opacity-80">
                        <X className="h-4 w-4" />
                      </button>
                      <button className="h-7 w-7 rounded-md bg-info-soft text-info flex items-center justify-center hover:opacity-80">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
