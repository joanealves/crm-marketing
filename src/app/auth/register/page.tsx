import { RegisterForm } from "@/components/auth/register-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="container relative flex-col items-center justify-center h-screen max-w-lg mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="flex items-center text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para a página inicial
          </Button>
        </Link>
      </div>
      
      <div className="p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-muted-foreground">
            Preencha os campos abaixo para se registrar
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Já possui uma conta?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}