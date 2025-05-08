import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { vendas } from "@/data/vendas"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartDataItem {
  name: string;
  total: number;
}

export function SalesChart() {
  const [period, setPeriod] = useState<"year" | "semester" | "quarter">("semester")
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  const getMonthlySales = (month: number, year: number): number => {
    return vendas
      .filter(venda => {
        const vendaDate = new Date(venda.data)
        return vendaDate.getUTCMonth() === month && vendaDate.getUTCFullYear() === year && venda.status === "fechada"
      })
      .reduce((acc, venda) => acc + venda.valor, 0)
  }

  const generateChartData = useCallback((): ChartDataItem[] => {
    const currentDate = new Date()
    const currentYear = currentDate.getUTCFullYear()
    const currentMonth = currentDate.getUTCMonth()

    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    if (period === "year") {
      return monthNames.map((month, index) => {
        const total = getMonthlySales(index, currentYear)
        return { name: month, total }
      })
    }

    const periods = period === "semester" ? 6 : 3
    const data: ChartDataItem[] = []

    for (let i = periods - 1; i >= 0; i--) {
      let targetMonth = currentMonth - i
      let targetYear = currentYear

      if (targetMonth < 0) {
        targetMonth = 12 + targetMonth
        targetYear--
      }

      const total = getMonthlySales(targetMonth, targetYear)
      data.push({ name: monthNames[targetMonth], total })
    }

    return data
  }, [period]) 

  useEffect(() => {
    setChartData(generateChartData())
  }, [period, generateChartData]) 
  const data = {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        label: 'Vendas',
        data: chartData.map(item => item.total),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Evolução de Vendas</CardTitle>
          <CardDescription>
            {period === "year" && "Vendas do ano atual"}
            {period === "semester" && "Vendas dos últimos 6 meses"}
            {period === "quarter" && "Vendas dos últimos 3 meses"}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={period === "quarter" ? "default" : "outline"} 
            onClick={() => setPeriod("quarter")}>
            Trimestre
          </Button>
          <Button 
            variant={period === "semester" ? "default" : "outline"} 
            onClick={() => setPeriod("semester")}>
            Semestre
          </Button>
          <Button 
            variant={period === "year" ? "default" : "outline"} 
            onClick={() => setPeriod("year")}>
            Ano
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Line data={data} />
      </CardContent>
    </Card>
  )
}
