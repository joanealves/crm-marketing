"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ClienteDetail } from "@/components/clientes/cliente-detail"
import { Cliente } from "@/types/cliente"
import { clientes } from "@/data/clientes"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClientePage() {
  const params = useParams()
  const [cliente, setCliente] = useState<Cliente | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundCliente = clientes.find(c => c.id === params.id)
    if (foundCliente) {
      setCliente(foundCliente)
    } else {
      setCliente(null)
    }
    setLoading(false)
  }, [params.id])
  

  if (loading) {
    return <div className="flex justify-center p-12">Carregando...</div>
  }

  if (!cliente) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Cliente não encontrado</h2>
        <Link href="/clientes">
          <Button variant="link" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a lista de clientes
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/clientes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold ml-4">{cliente.nome}</h1>
      </div>
      
      <ClienteDetail cliente={cliente} />
    </div>
  )
}