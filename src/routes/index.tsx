import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mapzest/Sidebar";
import { TopBar } from "@/components/mapzest/TopBar";
import { StatsCards } from "@/components/mapzest/StatsCards";
import { ListingsChart } from "@/components/mapzest/ListingsChart";
import { StatusDonut } from "@/components/mapzest/StatusDonut";
import { QuickActions } from "@/components/mapzest/QuickActions";
import { RecentActivity } from "@/components/mapzest/RecentActivity";
import { PendingTable } from "@/components/mapzest/PendingTable";
import { RegionMap } from "@/components/mapzest/RegionMap";
import { BottomTables } from "@/components/mapzest/BottomTables";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MapZest — Dashboard" },
      { name: "description", content: "Tổng quan hệ thống MapZest quản lý bất động sản." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-canvas text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 space-y-6">
          <StatsCards />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <ListingsChart />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <StatusDonut />
            </div>
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <QuickActions />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <PendingTable />
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <RecentActivity />
              <RegionMap />
            </div>
          </div>
          <BottomTables />
        </main>
      </div>
    </div>
  );
}
