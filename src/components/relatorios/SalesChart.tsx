"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { vendas } from "@/data/vendas"
import { useState } from "react"
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

interface SalesChartProps {
  className?: string
}

export function SalesChart({ className }: SalesChartProps) {
  const [period, setPeriod] = useState<"year" | "semester" | "quarter">("semester")
  
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  
  const vendasFechadas = vendas.filter(v => v.status === "fechada")
  
  const generateChartData = () => {
    if (period === "year") {
      const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
      return monthNames.map((month, index) => {
        const monthVendas = vendasFechadas.filter(v => {
          const vendaDate = new Date(v.data)
          return vendaDate.getMonth() === index && vendaDate.getFullYear() === currentYear
        })
        
        const total = monthVendas.reduce((acc, venda) => acc + venda.valor, 0)
        
        return {
          name: month,
          total
        }
      })
    }
    
    if (period === "semester") {
      const data = []
      for (let i = 5; i >= 0; i--) {
        let targetMonth = currentMonth - i
        let targetYear = currentYear
        
        if (targetMonth < 0) {
          targetMonth = 12 + targetMonth
          targetYear--
        }
        
        const monthVendas = vendasFechadas.filter(v => {
          const vendaDate = new Date(v.data)
          return vendaDate.getMonth() === targetMonth && vendaDate.getFullYear() === targetYear
        })
        
        const total = monthVendas.reduce((acc, venda) => acc + venda.valor, 0)
        
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        
        data.push({
          name: monthNames[targetMonth],
          total
        })
      }
      return data
    }
    
    if (period === "quarter") {
      const data = []
      for (let i = 2; i >= 0; i--) {
        let targetMonth = currentMonth - i
        let targetYear = currentYear
        
        if (targetMonth < 0) {
          targetMonth = 12 + targetMonth
          targetYear--
        }
        
        const monthVendas = vendasFechadas.filter(v => {
          const vendaDate = new Date(v.data)
          return vendaDate.getMonth() === targetMonth && vendaDate.getFullYear() === targetYear
        })
        
        const total = monthVendas.reduce((acc, venda) => acc + venda.valor, 0)
        
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        
        data.push({
          name: monthNames[targetMonth],
          total
        })
      }
      return data
    }
    
    return []
  }
  
  const chartData = generateChartData()

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

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return (
    <Card className={className}>
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
            size="sm"
            onClick={() => setPeriod("quarter")}
          >
            3M
          </Button>
          <Button 
            variant={period === "semester" ? "default" : "outline"} 
            size="sm"
            onClick={() => setPeriod("semester")}
          >
            6M
          </Button>
          <Button 
            variant={period === "year" ? "default" : "outline"} 
            size="sm"
            onClick={() => setPeriod("year")}
          >
            1A
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <div className="h-full">
          <Line data={data} options={{ responsive: true }} />
        </div>
      </CardContent>
    </Card>
  )
}
