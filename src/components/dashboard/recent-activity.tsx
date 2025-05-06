import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Phone, Mail } from "lucide-react"

interface Activity {
  id: string
  icon: React.ReactNode
  description: React.ReactNode
  timestamp: string
}

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: "1",
      icon: <MessageSquare className="h-4 w-4" />,
      description: (
        <span>
          <span className="font-medium">João Silva</span> respondeu ao email sobre o projeto X
        </span>
      ),
      timestamp: "Há 5 minutos",
    },
    {
      id: "2",
      icon: <Users className="h-4 w-4" />,
      description: (
        <span>
          <span className="font-medium">Maria Oliveira</span> foi adicionada como nova cliente
        </span>
      ),
      timestamp: "Há 2 horas",
    },
    {
      id: "3",
      icon: <Phone className="h-4 w-4" />,
      description: (
        <span>
          Ligação com <span className="font-medium">Pedro Santos</span> marcada para amanhã
        </span>
      ),
      timestamp: "Há 5 horas",
    },
    {
      id: "4",
      icon: <Mail className="h-4 w-4" />,
      description: (
        <span>
          Email enviado para <span className="font-medium">10 leads</span> da campanha de outono
        </span>
      ),
      timestamp: "Ontem",
    },
    {
      id: "5",
      icon: <MessageSquare className="h-4 w-4" />,
      description: (
        <span>
          <span className="font-medium">Ana Costa</span> solicitou uma proposta comercial
        </span>
      ),
      timestamp: "Há 2 dias",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-muted p-2">
                {activity.icon}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}