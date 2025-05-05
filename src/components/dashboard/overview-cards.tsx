import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Calendar, Target } from "lucide-react"
import { clientes } from "@/data/clientes"
import { vendas } from "@/data/vendas"

export function OverviewCards() {
  const totalClientes = clientes.length
  const clientesAtivos = clientes.filter(c => c.status === "ativo").length
  
  const vendasFechadas = vendas.filter(v => v.status === "fechada")
  const totalVendas = vendasFechadas.reduce((acc, venda) => acc + venda.valor, 0)
  
  const vendasMesAtual = vendasFechadas.filter(v => {
    const vendaDate = new Date(v.data)
    const hoje = new Date()
    return vendaDate.getMonth() === hoje.getMonth() && vendaDate.getFullYear() === hoje.getFullYear()
  })
  
  const totalVendasMes = vendasMesAtual.reduce((acc, venda) => acc + venda.valor, 0)
  
  const txConversao = Math.round((clientesAtivos / totalClientes) * 100)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Clientes
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClientes}</div>
          <p className="text-xs text-muted-foreground">
            {clientesAtivos} ativos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Vendas Totais
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVendas)}
          </div>
          <p className="text-xs text-muted-foreground">
            {vendasFechadas.length} vendas fechadas
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Vendas do Mês
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVendasMes)}
          </div>
          <p className="text-xs text-muted-foreground">
            {vendasMesAtual.length} vendas este mês
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taxa de Conversão
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {txConversao}%
          </div>
          <p className="text-xs text-muted-foreground">
            {clientesAtivos} de {totalClientes} clientes
          </p>
        </CardContent>
      </Card>
    </div>
  )
}