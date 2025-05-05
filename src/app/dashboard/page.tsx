import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SalesChart } from "@/components/relatorios/SalesChart"
import { TopClients } from "@/components/clientes/top-clients"
import { UpcomingTasks } from "@/components/tarefas/UpcomingTasks"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu painel de controle CRM.
        </p>
      </div>
      
      <OverviewCards />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart className="md:col-span-4" />
        <RecentActivity className="md:col-span-3" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <TopClients />
        <UpcomingTasks />
      </div>
    </div>
  )
}