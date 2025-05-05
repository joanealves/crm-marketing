import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
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
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Entre com suas credenciais para acessar o sistema
          </p>
        </div>
        
        <LoginForm />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}