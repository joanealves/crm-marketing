"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash, Play, Pause, Eye } from "lucide-react"
import { CampanhaForm } from "@/components/campanha/campanha-form"

const campanhasData = [
  {
    id: "1",
    nome: "Promoção de Verão 2025",
    status: "ativa",
    tipo: "email",
    dataInicio: "2025-06-01",
    dataFim: "2025-06-30",
    destinatarios: 1250,
    taxaAbertura: "32%"
  },
  {
    id: "2",
    nome: "Pesquisa de Satisfação",
    status: "agendada",
    tipo: "email",
    dataInicio: "2025-05-15",
    dataFim: "2025-05-20",
    destinatarios: 850,
    taxaAbertura: "-"
  },
  {
    id: "3",
    nome: "Lançamento Nova Coleção",
    status: "rascunho",
    tipo: "notificacao",
    dataInicio: "",
    dataFim: "",
    destinatarios: 0,
    taxaAbertura: "-"
  },
  {
    id: "4",
    nome: "Black Friday Antecipada",
    status: "encerrada",
    tipo: "sms",
    dataInicio: "2025-04-10",
    dataFim: "2025-04-15",
    destinatarios: 2300,
    taxaAbertura: "47%"
  }
]

const statusColors = {
  ativa: "success",
  agendada: "warning",
  rascunho: "secondary",
  encerrada: "default"
}

// Tradução dos status para português
const statusTranslation = {
  ativa: "Ativa",
  agendada: "Agendada",
  rascunho: "Rascunho",
  encerrada: "Encerrada"
}

interface CampanhasListProps {
  statusFilter: string
}

export function CampanhasList({ statusFilter }: CampanhasListProps) {
  const campanhasFiltradas = statusFilter === "todas"
    ? campanhasData
    : campanhasData.filter(campanha => campanha.status === statusFilter)

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data de Início</TableHead>
            <TableHead>Data de Término</TableHead>
            <TableHead>Destinatários</TableHead>
            <TableHead>Taxa de Abertura</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campanhasFiltradas.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                Nenhuma campanha encontrada com os filtros atuais.
              </TableCell>
            </TableRow>
          ) : (
            campanhasFiltradas.map((campanha) => (
              <TableRow key={campanha.id}>
                <TableCell className="font-medium">{campanha.nome}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[campanha.status as keyof typeof statusColors] as any}>
                    {statusTranslation[campanha.status as keyof typeof statusTranslation]}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{campanha.tipo}</TableCell>
                <TableCell>{campanha.dataInicio || "-"}</TableCell>
                <TableCell>{campanha.dataFim || "-"}</TableCell>
                <TableCell>{campanha.destinatarios}</TableCell>
                <TableCell>{campanha.taxaAbertura}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CampanhaForm campanha={campanha}>
                          <div className="flex items-center w-full">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </div>
                        </CampanhaForm>
                      </DropdownMenuItem>
                      {campanha.status === "ativa" && (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pausar
                        </DropdownMenuItem>
                      )}
                      {(campanha.status === "rascunho" || campanha.status === "agendada") && (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Iniciar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}