"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Eye, EyeOff } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Conta criada com sucesso!",
        description: "Você foi redirecionado para o dashboard.",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nome completo
          </label>
          <Input
            id="name"
            placeholder="Digite seu nome completo"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <Input
            id="email"
            placeholder="Digite seu e-mail"
            type="email"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmar senha
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              required
            />
          </div>
        </div>
        
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Criar conta"}
        </Button>
      </form>
    </div>
  )
}