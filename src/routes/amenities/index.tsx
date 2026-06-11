import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mapzest/Sidebar";
import { TopBar } from "@/components/mapzest/TopBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Wrench, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/amenities/")({
  head: () => ({
    meta: [
      { title: "MapZest — Quản lý Tiện ích" },
      { name: "description", content: "Quản lý danh sách các tiện ích nội khu và ngoại khu của bất động sản." },
    ],
  }),
  component: AmenitiesPage,
});

type Amenity = {
  id: string;
  name: string;
  category: "Nội khu" | "Ngoại khu";
  count: number;
};

const initialAmenities: Amenity[] = [
  { id: "AM01", name: "Hồ bơi tràn bờ", category: "Nội khu", count: 425 },
  { id: "AM02", name: "Phòng Gym hiện đại", category: "Nội khu", count: 382 },
  { id: "AM03", name: "Công viên cây xanh", category: "Nội khu", count: 512 },
  { id: "AM04", name: "Trường học liên cấp", category: "Ngoại khu", count: 215 },
  { id: "AM05", name: "Siêu thị / TTTM", category: "Ngoại khu", count: 320 },
];

function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities);
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityCat, setNewAmenityCat] = useState<"Nội khu" | "Ngoại khu">("Nội khu");

  const handleAddAmenity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmenityName.trim()) return;

    const newAm: Amenity = {
      id: `AM0${amenities.length + 1}`,
      name: newAmenityName,
      category: newAmenityCat,
      count: 0,
    };
    setAmenities([...amenities, newAm]);
    setNewAmenityName("");
    toast.success("Đã thêm tiện ích mới!");
  };

  const handleDeleteAmenity = (id: string) => {
    setAmenities(prev => prev.filter(am => am.id !== id));
    toast.success("Đã xóa tiện ích khỏi hệ thống.");
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
              <h1 className="text-2xl font-bold tracking-tight">Quản lý Tiện ích</h1>
              <p className="text-sm text-muted-foreground">
                Xem và thiết lập các tiện ích nội khu/ngoại khu phục vụ định giá và hiển thị thông tin bất động sản.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-200">
            {/* Form Add */}
            <div className="col-span-12 md:col-span-4 bg-card rounded-xl border border-border p-5 h-fit">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-1.5">
                <Plus className="h-4 w-4 text-primary" /> Thêm tiện ích mới
              </h3>
              <form onSubmit={handleAddAmenity} className="space-y-4 text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-xs text-foreground">Tên tiện ích *</label>
                  <Input
                    required
                    placeholder="Ví dụ: Gần ga Metro"
                    value={newAmenityName}
                    onChange={(e) => setNewAmenityName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-xs text-foreground">Nhóm phân loại</label>
                  <Select
                    value={newAmenityCat}
                    onValueChange={(val) => setNewAmenityCat(val as Amenity["category"])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nội khu">Nội khu (Có sẵn trong BĐS/dự án)</SelectItem>
                      <SelectItem value="Ngoại khu">Ngoại khu (Liên kết dịch vụ xung quanh)</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <TableHead className="font-semibold text-foreground pl-5 w-[80px]">Mã ID</TableHead>
                    <TableHead className="font-semibold text-foreground">Tên Tiện Ích</TableHead>
                    <TableHead className="font-semibold text-foreground">Loại</TableHead>
                    <TableHead className="font-semibold text-foreground text-center w-[120px]">Số tin sử dụng</TableHead>
                    <TableHead className="font-semibold text-foreground pr-5 text-right w-[100px]">Xóa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amenities.map(am => (
                    <TableRow key={am.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="pl-5 py-3.5 font-semibold text-foreground">{am.id}</TableCell>
                      <TableCell className="font-medium text-foreground">{am.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={am.category === "Nội khu" ? "bg-info-soft text-info border-info/20" : "bg-purple-soft text-purple border-purple/20"}>
                          {am.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-bold text-foreground">{am.count}</TableCell>
                      <TableCell className="pr-5 py-3.5 text-right">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteAmenity(am.id)}
                          className="h-8 w-8 rounded-md hover:bg-destructive-soft hover:text-destructive border border-border cursor-pointer text-muted-foreground"
                          title="Xóa"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
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
