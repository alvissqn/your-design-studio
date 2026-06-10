import { Bell, Calendar } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Tổng quan hệ thống MapZest</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card text-sm hover:bg-secondary">
          <span>01/06/2025 - 07/06/2025</span>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="relative h-10 w-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
            5
          </span>
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold">Admin</div>
            <div className="text-[11px] text-muted-foreground">Super Admin</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
