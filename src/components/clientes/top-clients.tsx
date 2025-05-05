import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { clientes } from "@/data/clientes"
import { vendas } from "@/data/vendas"
import Link from "next/link"

export function TopClients() {
  // Calcular total de vendas por cliente
  const clientVendas = clientes.map(cliente => {
    const clienteVendas = vendas.filter(venda => 
      venda.clienteId === cliente.id && venda.status === "fechada"
    )
    
    const totalVendas = clienteVendas.reduce((acc, venda) => acc + venda.valor, 0)
    
    return {
      ...cliente,
      totalVendas,
      totalContratos: clienteVendas.length
    }
  })
  
  // Ordenar por total de vendas e pegar os top 5
  const topClients = [...clientVendas]
    .sort((a, b) => b.totalVendas - a.totalVendas)
    .slice(0, 5)
    
  // Formatar valor
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Melhores Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topClients.map((cliente) => (
            <div key={cliente.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={cliente.avatar} alt={cliente.nome} />
                <AvatarFallback>{cliente.nome.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Link href={`/clientes/${cliente.id}`} className="font-medium hover:underline truncate block">
                  {cliente.nome}
                </Link>
                <p className="text-xs text-muted-foreground truncate">
                  {cliente.empresa}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatCurrency(cliente.totalVendas)}</p>
                <p className="text-xs text-muted-foreground">
                  {cliente.totalContratos} contrato{cliente.totalContratos !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-4 text-center">
          <Link href="/clientes" className="text-sm text-primary hover:underline">
            Ver todos os clientes
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}