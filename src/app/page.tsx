"use client";

import { SafeHydration } from '@/components/SafeHydration';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart2, Mail, Users, Calendar } from "lucide-react";
import Image from "next/image";
import CapaCrm from "../assets/capa_crm.png";
import CapaCampanhas from "../assets/crm_tarefas.png"
import CapaClientes from "../assets/capa_clients.png"

export default function Home() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Gestão de Clientes",
      description: "Acompanhe todos os seus clientes, leads e oportunidades em um só lugar."
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Tarefas e Lembretes",
      description: "Organize seu trabalho com tarefas prioritárias e lembretes de follow-up."
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary" />,
      title: "Dashboard Analítico",
      description: "Visualize métricas importantes e tome decisões baseadas em dados."
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "Campanhas de Marketing",
      description: "Crie e acompanhe campanhas de email marketing eficientes."
    }
  ];

  const testimonials = [
    {
      quote: "Este CRM simplificou nossa gestão de vendas e aumentou nossa produtividade em 30%.",
      author: "Maria Silva",
      role: "Gerente de Vendas, Tech Solutions"
    },
    {
      quote: "Interface intuitiva e relatórios completos. Exatamente o que precisávamos.",
      author: "Carlos Mendes",
      role: "Diretor Comercial, Empresa Nacional"
    }
  ];

  return (
    <SafeHydration>
      <div className="flex flex-col min-h-screen">
        <section className="bg-gradient-to-r from-primary/90 to-primary/70 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-950">
                  Gerencie seus clientes e vendas com simplicidade
                </h1>
                <p className="text-xl mb-8 text-cyan-950">
                  Uma solução completa de CRM para impulsionar seu negócio e melhorar o relacionamento com seus clientes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/register">
                    <Button variant="secondary" size="lg">
                      Começar Agora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="border-b-cyan-800 text-cyan-950 hover:text-primary hover:bg-white" size="lg">
                      Acessar Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-lg h-[200px] rounded-lg overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-white rounded-lg">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Image 
                    src={CapaCrm} 
                    alt="Dashboard Analítico"
                    className="object-contain"
                  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Recursos Poderosos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tudo o que você precisa para gerenciar seu negócio com eficiência e precisão.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Veja o CRM em Ação</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Interface intuitiva e moderna para otimizar sua gestão de relacionamento com clientes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Image 
                    src={CapaClientes} 
                    alt="Dashboard Analítico"
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Gestão de Clientes</h3>
                  <p className="text-sm text-muted-foreground">Visualize e organize todos os seus contatos.</p>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <Image 
                    src={CapaCrm} 
                    alt="Dashboard Analítico"
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Dashboard Analítico</h3>
                  <p className="text-sm text-muted-foreground">Acompanhe métricas importantes para seu negócio.</p>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Image 
                    src={CapaCampanhas} 
                    alt="Dashboard Analítico"
                    className="object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Campanhas de Marketing</h3>
                  <p className="text-sm text-muted-foreground">Crie e acompanhe suas campanhas de email.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/dashboard">
                <Button size="lg">
                  Acessar Demonstração
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">O que Nossos Clientes Dizem</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Veja como nosso CRM tem ajudado empresas a crescer.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-cyan-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl mb-8 text-cyan-950 max-w-2xl mx-auto">
              Registre-se hoje e comece a gerenciar seus clientes de forma mais eficiente.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/auth/register">
                <Button variant="secondary" size="lg">
                  Criar Conta
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="border-whitetext-cyan-950 hover:text-primary hover:bg-white" size="lg">
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <h3 className="text-xl font-bold mb-2">CRM Portfolio</h3>
                <p className="text-gray-400">Desenvolvido como projeto de portfólio</p>
              </div>
              <div className="flex gap-4">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Registro
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} CRM Portfolio. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </SafeHydration>
  );
}