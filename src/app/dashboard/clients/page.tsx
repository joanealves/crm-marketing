import { ClienteList } from "@/components/clientes/cliente-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ClienteForm } from "@/components/clientes/cliente-form"

export default function ClientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes, leads e oportunidades.
          </p>
        </div>
        <ClienteForm>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </ClienteForm>
      </div>
      
      <ClienteList />
    </div>
  )
}