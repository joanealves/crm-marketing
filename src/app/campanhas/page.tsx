"use client";

import { CampanhasList } from "@/components/campanha/campanhas-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CampanhaForm } from "@/components/campanha/campanha-form";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";

interface Campanha {
  id: string;
  nome: string;
  status: string;
  tipo: string;
  dataInicio: string;
  dataFim: string;
  destinatarios: number;
  taxaAbertura: string;
}

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([
    {
      id: "1",
      nome: "Promoção de Primavera",
      status: "ativa",
      tipo: "email",
      dataInicio: "2024-05-01",
      dataFim: "2024-05-31",
      destinatarios: 1000,
      taxaAbertura: "25%",
    },
    {
      id: "2",
      nome: "Liquidação de Inverno",
      status: "encerrada",
      tipo: "sms",
      dataInicio: "2024-06-01",
      dataFim: "2024-06-30",
      destinatarios: 500,
      taxaAbertura: "30%",
    },
  ]);

  const handleCampanhaCreated = (novaCampanha: Campanha) => {
    setCampanhas([...campanhas, novaCampanha]);
  };

  const handleCampanhaDeleted = (campanhaId: string) => {
    setCampanhas(campanhas.filter((campanha) => campanha.id !== campanhaId));
  };

  return (
    <div className="flex h-screen"> 
      <Sidebar />

      <div className="container mx-auto py-8 flex-1 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Campanhas</h1>
          <CampanhaForm onCampanhaCreated={handleCampanhaCreated}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Campanha
            </Button>
          </CampanhaForm>
        </div>

        <CampanhasList campanhas={campanhas} onCampanhaDeleted={handleCampanhaDeleted} />
      </div>
    </div>
  );
}