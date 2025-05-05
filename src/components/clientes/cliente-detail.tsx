"use client"

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Building, 
  Calendar, 
  Mail, 
  Phone, 
  User, 
  Clock, 
  DollarSign, 
  Briefcase, 
  MessageSquare
} from "lucide-react"
import { Cliente } from "@/types/cliente"
import { ClienteForm } from "./cliente-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const statusMap = {
  lead: { label: "Lead", class: "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-800/30 dark:text-blue-500" },
  prospect: { label: "Prospect", class: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-800/30 dark:text-yellow-500" },
  cliente: { label: "Cliente", class: "bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-800/30 dark:text-green-500" },
  inativo: { label: "Inativo", class: "bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-800/30 dark:text-gray-500" },
}

interface ClienteDetailProps {
  cliente: Cliente
}

export function ClienteDetail({ cliente: initialCliente }: ClienteDetailProps) {
  const [cliente, setCliente] = useState<Cliente>(initialCliente)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const handleClienteUpdate = (updatedCliente: Cliente) => {
    setCliente(updatedCliente)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className={statusMap[cliente.status].class}>
          {statusMap[cliente.status].label}
        </Badge>
        
        <ClienteForm cliente={cliente} onUpdate={handleClienteUpdate}>
          <Button variant="outline">Editar Cliente</Button>
        </ClienteForm>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Nome</p>
                <p>{cliente.nome}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{cliente.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Telefone</p>
                <p>{cliente.telefone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Empresa</p>
                <p>{cliente.empresa}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Cargo</p>
                <p>{cliente.cargo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dados Financeiros e Histórico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Valor Total</p>
                <p>{formatCurrency(cliente.valorTotal)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Último Contato</p>
                <p>{formatDate(cliente.ultimoContato)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Cliente Desde</p>
                <p>{formatDate(cliente.criadoEm)}</p>
              </div>
            </div>
            <div className="flex items-start pt-2">
              <MessageSquare className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Observações</p>
                <p className="text-sm">{cliente.observacoes || "Nenhuma observação registrada."}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="oportunidades">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          <TabsTrigger value="interacoes">Interações</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>
        <TabsContent value="oportunidades">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades de Venda</CardTitle>
              <CardDescription>
                Gerencie oportunidades de negócio com este cliente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                {cliente.status === "lead" || cliente.status === "prospect" ? (
                  <p>Nenhuma oportunidade cadastrada para este cliente.</p>
                ) : (
                  <p>Este cliente já possui {cliente.valorTotal > 0 ? "contratos ativos" : "nenhum contrato ativo"}.</p>
                )}
                <Button variant="outline" className="mt-4">
                  Adicionar Oportunidade
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interacoes">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Interações</CardTitle>
              <CardDescription>
                Registro de chamadas, emails e reuniões com o cliente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhuma interação registrada recentemente.</p>
                <Button variant="outline" className="mt-4">
                  Registrar Nova Interação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documentos">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>
                Contratos, propostas e outros documentos relacionados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum documento anexado.</p>
                <Button variant="outline" className="mt-4">
                  Anexar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}