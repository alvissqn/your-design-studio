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
  Search,
  Plus,
  Edit2,
  Trash2,
  Building,
  Building2,
  Home as HomeIcon,
  Trees,
  Mountain,
  Layers,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "MapZest — Quản lý Danh mục" },
      { name: "description", content: "Quản lý danh mục bất động sản." },
    ],
  }),
  component: CategoriesPage,
});

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  icon: any;
  color: string;
  status: "active" | "inactive";
};

const initialCategories: Category[] = [
  {
    id: "CAT1",
    name: "Căn hộ chung cư",
    slug: "can-ho-chung-cu",
    description: "Căn hộ cao cấp, trung cấp, duplex, penthouse tại các dự án đô thị.",
    count: 14258,
    icon: Building,
    color: "bg-info-soft text-info",
    status: "active",
  },
  {
    id: "CAT2",
    name: "Biệt thự / Villa",
    slug: "biet-thu-villa",
    description: "Biệt thự nghỉ dưỡng, biệt thự ven sông, biệt thự đơn lập, song lập.",
    count: 2489,
    icon: Building2,
    color: "bg-warning-soft text-warning",
    status: "active",
  },
  {
    id: "CAT3",
    name: "Nhà phố / Nhà riêng",
    slug: "nha-pho-nha-rieng",
    description: "Nhà mặt tiền kinh doanh, nhà trong hẻm xe hơi, nhà riêng lẻ thổ cư.",
    count: 5894,
    icon: HomeIcon,
    color: "bg-success-soft text-success",
    status: "active",
  },
  {
    id: "CAT4",
    name: "Đất nền dự án",
    slug: "dat-nen-du-an",
    description: "Đất nền thổ cư phân lô, đất nền dự án đô thị quy hoạch 1/500.",
    count: 1245,
    icon: Trees,
    color: "bg-purple-soft text-purple",
    status: "active",
  },
  {
    id: "CAT5",
    name: "Văn phòng / Mặt bằng",
    slug: "van-phong-mat-bang",
    description: "Mặt bằng kinh doanh bán lẻ, sàn văn phòng cho thuê tại tòa nhà thương mại.",
    count: 703,
    icon: Mountain,
    color: "bg-destructive/10 text-destructive",
    status: "active",
  },
];

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "Building",
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^a-z0-9\s])/g, "")
      .replace(/\s+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    setFormData(prev => ({ ...prev, name, slug }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Vui lòng điền tên danh mục!");
      return;
    }

    const newCat: Category = {
      id: `CAT${categories.length + 1}`,
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      count: 0,
      icon: Layers,
      color: "bg-secondary text-muted-foreground",
      status: "active",
    };

    setCategories([...categories, newCat]);
    setIsAddOpen(false);
    setFormData({ name: "", slug: "", description: "", icon: "Building" });
    toast.success("Đã tạo danh mục mới thành công!");
  };

  const handleEditClick = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: "Layers",
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !formData.name) return;

    setCategories(prev =>
      prev.map(cat =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: formData.name,
              slug: formData.slug,
              description: formData.description,
            }
          : cat
      )
    );
    setIsEditOpen(false);
    toast.success("Cập nhật danh mục thành công!");
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success("Đã xóa danh mục!");
  };

  const toggleStatus = (id: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id
          ? { ...cat, status: cat.status === "active" ? "inactive" : "active" }
          : cat
      )
    );
    toast.success("Đã cập nhật trạng thái danh mục");
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-2xl font-bold tracking-tight">Quản lý Danh mục</h1>
              <p className="text-sm text-muted-foreground">
                Tạo lập, phân loại danh mục sản phẩm bất động sản và các thuộc tính liên quan.
              </p>
            </div>
            <Button onClick={() => setIsAddOpen(true)} className="cursor-pointer gap-2">
              <Plus className="h-4 w-4" /> Thêm danh mục mới
            </Button>
          </div>

          {/* Search bar */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm danh mục theo tên hoặc đường dẫn slug..."
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
                  <TableHead className="font-semibold text-foreground pl-5 w-[250px]">Tên Danh mục</TableHead>
                  <TableHead className="font-semibold text-foreground w-[180px]">Đường dẫn (Slug)</TableHead>
                  <TableHead className="font-semibold text-foreground">Mô tả</TableHead>
                  <TableHead className="font-semibold text-foreground text-center w-[120px]">Số tin đăng</TableHead>
                  <TableHead className="font-semibold text-foreground w-[120px]">Trạng thái</TableHead>
                  <TableHead className="font-semibold text-foreground pr-5 text-right w-[120px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      Không tìm thấy danh mục nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <TableRow key={cat.id} className="hover:bg-secondary/10 transition-colors">
                        <TableCell className="pl-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${cat.color || "bg-secondary text-foreground"}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-semibold text-foreground">{cat.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-secondary/80 px-1.5 py-0.5 rounded text-muted-foreground">
                            {cat.slug}
                          </code>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[320px] truncate">
                          {cat.description || "Không có mô tả."}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-foreground">
                          {cat.count.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => toggleStatus(cat.id)}
                            className="cursor-pointer"
                          >
                            {cat.status === "active" ? (
                              <Badge className="bg-success-soft text-success border-0 hover:bg-success-soft">Đang hoạt động</Badge>
                            ) : (
                              <Badge className="bg-secondary text-muted-foreground border-0 hover:bg-secondary">Ngừng hoạt động</Badge>
                            )}
                          </button>
                        </TableCell>
                        <TableCell className="pr-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleEditClick(cat)}
                              className="h-8 w-8 rounded-md border border-border cursor-pointer text-muted-foreground hover:text-foreground"
                              title="Sửa"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => handleDelete(cat.id)}
                              className="h-8 w-8 rounded-md hover:bg-destructive-soft hover:text-destructive border border-border cursor-pointer text-muted-foreground"
                              title="Xóa"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
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
        </main>
      </div>

      {/* ADD DIALOG */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogDescription>Tạo danh mục chính để phân loại các tin đăng bất động sản.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="space-y-4 my-2 text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Tên danh mục *</label>
              <Input
                required
                placeholder="Ví dụ: Căn hộ Officetel"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Đường dẫn tĩnh (Slug)</label>
              <Input
                placeholder="can-ho-officetel"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Mô tả danh mục</label>
              <textarea
                rows={3}
                placeholder="Mô tả công dụng và phân loại của danh mục này..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="cursor-pointer">
                Hủy
              </Button>
              <Button type="submit" className="cursor-pointer">
                Tạo mới
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
            <DialogDescription>Cập nhật thông tin chi tiết danh mục bất động sản.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4 my-2 text-sm">
            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Tên danh mục *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Đường dẫn tĩnh (Slug)</label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-xs text-foreground">Mô tả danh mục</label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="cursor-pointer">
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
