import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tarefas } from "@/data/tarefa"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, PhoneIcon, MailIcon, VideoIcon } from "lucide-react"
import Link from "next/link"

export function UpcomingTasks() {
  const sortedTarefas = [...tarefas]
    .filter(tarefa => tarefa.status === "pendente")
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 5) 
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  const getTaskIcon = (type: string) => {
    switch (type) {
      case "ligacao":
        return <PhoneIcon className="h-4 w-4" />
      case "email":
        return <MailIcon className="h-4 w-4" />
      case "reuniao":
        return <VideoIcon className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge variant="default">Média</Badge>
      case "baixa":
        return <Badge variant="outline">Baixa</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Próximas Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTarefas.length > 0 ? (
            sortedTarefas.map((tarefa) => (
              <div key={tarefa.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                <div className="rounded-full bg-muted p-2">
                  {getTaskIcon(tarefa.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/tarefas/${tarefa.id}`} className="font-medium hover:underline truncate block">
                    {tarefa.titulo}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{tarefa.clienteNome}</span>
                    <span>•</span>
                    <span>{formatDate(tarefa.data)}</span>
                  </div>
                </div>
                <div>
                  {getPriorityBadge(tarefa.prioridade)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Nenhuma tarefa pendente encontrada
            </div>
          )}
          
          <div className="pt-2 text-center">
            <Link href="/tarefas" className="text-sm text-primary hover:underline">
              Ver todas as tarefas
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}