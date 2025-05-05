"use client"

import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { CampanhasList } from "@/components/campanha/campanhas-list"
import { CampanhaForm } from "@/components/campanha/campanha-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function CampanhasPage() {
  const [statusFilter, setStatusFilter] = useState("todas")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campanhas de Marketing</h1>
          <p className="text-muted-foreground">
            Gerencie suas campanhas de email e comunicação com clientes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="todas">Todas</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="ativa">Ativas</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rascunho">Rascunhos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="encerrada">Encerradas</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="agendada">Agendadas</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <CampanhaForm>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova Campanha
            </Button>
          </CampanhaForm>
        </div>
      </div>
      
      <CampanhasList statusFilter={statusFilter} />
    </div>
  )
}