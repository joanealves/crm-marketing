"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  Settings, 
  BarChart, 
  Mail, 
  Menu, 
  X 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive: boolean
}

function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 mb-1",
          isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  )
}

export function Sidebar() {
  const [pathname, setPathname] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const routePathname = usePathname()
  
  useEffect(() => {
    setPathname(routePathname || "")
    setMounted(true)
  }, [routePathname])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Users size={20} />, label: "Clientes", href: "/clientes" },
    { icon: <Briefcase size={20} />, label: "Negócios", href: "/negocios" },
    { icon: <Calendar size={20} />, label: "Tarefas", href: "/tarefas" },
    { icon: <Mail size={20} />, label: "Campanhas", href: "/campanhas" },
    { icon: <BarChart size={20} />, label: "Relatórios", href: "/relatorios" },
    { icon: <Settings size={20} />, label: "Configurações", href: "/configuracoes" },
  ]

  if (!mounted) {
    return (
      <div className="fixed inset-y-0 left-0 z-40 w-64 bg-background border-r md:relative">
        <div className="flex h-16 items-center px-4 py-4 border-b">
          <h1 className="text-xl font-bold">CRM Pro</h1>
        </div>
        <div className="py-4 px-4">
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <div key={index} className="w-full h-10 mb-1 bg-muted/30 rounded-md"></div>
            ))}
          </nav>
        </div>
      </div>
    )
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </Button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-4 py-4 border-b">
          <h1 className="text-xl font-bold">CRM Pro</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <X size={20} />
          </Button>
        </div>
        <div className="py-4 px-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href || pathname?.startsWith(`${item.href}/`)}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}