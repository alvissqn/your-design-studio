import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mapzest/Sidebar";
import { TopBar } from "@/components/mapzest/TopBar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { MapPin, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/geography/")({
  head: () => ({
    meta: [
      { title: "MapZest — Vùng Địa lý" },
      { name: "description", content: "Kích hoạt và quản lý các khu vực địa lý, tỉnh thành kinh doanh bất động sản." },
    ],
  }),
  component: GeographyPage,
});

type Region = {
  id: string;
  name: string;
  code: string;
  active: boolean;
  listingsCount: number;
};

const initialRegions: Region[] = [
  { id: "REG01", name: "Hồ Chí Minh", code: "HCM", active: true, listingsCount: 18452 },
  { id: "REG02", name: "Hà Nội", code: "HN", active: true, listingsCount: 5412 },
  { id: "REG03", name: "Long An", code: "LA", active: true, listingsCount: 567 },
  { id: "REG04", name: "Khánh Hòa", code: "KH", active: true, listingsCount: 1205 },
  { id: "REG05", name: "Đà Nẵng", code: "DN", active: false, listingsCount: 0 },
];

function GeographyPage() {
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");

  const handleToggleRegion = (id: string) => {
    setRegions(prev =>
      prev.map(r => (r.id === id ? { ...r, active: !r.active } : r))
    );
    const regionObj = regions.find(r => r.id === id);
    if (regionObj) {
      toast.success(`${!regionObj.active ? "Kích hoạt" : "Hủy kích hoạt"} vùng địa lý: ${regionObj.name}`);
    }
  };

  const handleAddRegion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) {
      toast.error("Vui lòng điền đầy đủ tên khu vực và mã tỉnh!");
      return;
    }

    const newReg: Region = {
      id: `REG0${regions.length + 1}`,
      name: newName,
      code: newCode.toUpperCase(),
      active: true,
      listingsCount: 0,
    };

    setRegions([...regions, newReg]);
    setNewName("");
    setNewCode("");
    toast.success(`Đã thêm khu vực địa lý mới: ${newName}`);
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
              <h1 className="text-2xl font-bold tracking-tight">Khu vực địa lý</h1>
              <p className="text-sm text-muted-foreground">
                Kích hoạt hoặc ngắt kết nối các khu vực hành chính (tỉnh/thành phố) để áp dụng phân tích bản đồ và bộ lọc dữ liệu.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-200">
            {/* Form Add */}
            <div className="col-span-12 md:col-span-4 bg-card rounded-xl border border-border p-5 h-fit">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-1.5">
                <Plus className="h-4 w-4 text-primary" /> Thêm khu vực mới
              </h3>
              <form onSubmit={handleAddRegion} className="space-y-4 text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-xs text-foreground">Tên tỉnh / thành phố *</label>
                  <Input
                    required
                    placeholder="Ví dụ: Hải Phòng"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-xs text-foreground">Mã tỉnh (viết tắt) *</label>
                  <Input
                    required
                    placeholder="Ví dụ: HP"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full cursor-pointer mt-2 text-xs">
                  Thêm vào danh sách
                </Button>
              </form>
            </div>

            {/* Table list */}
            <div className="col-span-12 md:col-span-8 bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/20">
                    <TableHead className="font-semibold text-foreground pl-5 w-[100px]">Mã ID</TableHead>
                    <TableHead className="font-semibold text-foreground">Khu vực / Tỉnh thành</TableHead>
                    <TableHead className="font-semibold text-foreground">Mã tỉnh</TableHead>
                    <TableHead className="font-semibold text-foreground text-center">Số lượng tin đăng</TableHead>
                    <TableHead className="font-semibold text-foreground">Trạng thái hoạt động</TableHead>
                    <TableHead className="font-semibold text-foreground pr-5 text-right w-[120px]">Bật/Tắt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regions.map(r => (
                    <TableRow key={r.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="pl-5 py-4 font-semibold text-foreground">{r.id}</TableCell>
                      <TableCell className="font-semibold text-foreground">{r.name}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-secondary/80 px-2 py-0.5 rounded text-muted-foreground font-mono">{r.code}</code>
                      </TableCell>
                      <TableCell className="text-center font-bold text-foreground">{r.listingsCount.toLocaleString()}</TableCell>
                      <TableCell>
                        {r.active ? (
                          <Badge className="bg-success-soft text-success border-0">Đang hoạt động</Badge>
                        ) : (
                          <Badge className="bg-secondary text-muted-foreground border-0">Ngừng kinh doanh</Badge>
                        )}
                      </TableCell>
                      <TableCell className="pr-5 py-4 text-right">
                        <Switch
                          checked={r.active}
                          onCheckedChange={() => handleToggleRegion(r.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
