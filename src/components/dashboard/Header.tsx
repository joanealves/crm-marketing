"use client"

import { Bell, Search, Sun, Moon, User, Settings,} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const notifications = [
  {
    id: 1,
    title: "Novo cliente adicionado",
    message: "João Silva foi adicionado como cliente.",
    time: "Há 5 minutos",
    read: false,
  },
  {
    id: 2,
    title: "Reunião agendada",
    message: "Reunião com Empresa ABC às 14:00.",
    time: "Há 30 minutos",
    read: false,
  },
  {
    id: 3,
    title: "Proposta aceita",
    message: "Cliente XYZ aceitou sua proposta.",
    time: "Há 2 horas",
    read: true,
  },
];

export function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="h-16 border-b bg-background px-4 flex items-center justify-between">
      <div className="flex items-center gap-4 md:w-72">
        <div className="relative flex-1 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full pl-8"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-normal flex justify-between items-center">
              <span>Notificações</span>
              <Button variant="ghost" size="sm" className="h-auto text-xs text-primary">
                Marcar todas como lidas
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0">
                <div className={`w-full p-2 cursor-pointer flex gap-2 ${notification.read ? 'opacity-60' : 'bg-primary/5'}`}>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-1 mr-1"></div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="w-full text-center text-primary text-sm py-1">
                Ver todas as notificações
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Escuro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <span>Sistema</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/user.png" alt="Usuário" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@empresa.com.br
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}