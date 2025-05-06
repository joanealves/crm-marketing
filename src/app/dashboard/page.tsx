"use client";

import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SalesChart } from "@/components/relatorios/SalesChart";
import { TopClients } from "@/components/clientes/top-clients";
import { UpcomingTasks } from "@/components/tarefas/UpcomingTasks";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral do seu negócio.
        </p>
      </div>
      <OverviewCards month={new Date().getMonth()} year={new Date().getFullYear()} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <TopClients />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UpcomingTasks />
        <RecentActivity />
      </div>
    </div>
  );
}