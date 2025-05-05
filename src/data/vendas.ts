import { Venda } from "@/types/venda";

export const vendas: Venda[] = [
  {
    id: "1",
    clienteId: "1",
    clienteNome: "João Silva",
    valor: 35000,
    data: "2025-01-15",
    status: "fechada",
    produto: "CRM Enterprise"
  },
  {
    id: "2",
    clienteId: "1",
    clienteNome: "João Silva",
    valor: 15000,
    data: "2025-02-20",
    status: "fechada",
    produto: "Módulo de Vendas"
  },
  {
    id: "3",
    clienteId: "4",
    clienteNome: "Ana Costa",
    valor: 25000,
    data: "2025-02-28",
    status: "fechada",
    produto: "CRM Professional"
  },
  {
    id: "4",
    clienteId: "3",
    clienteNome: "Pedro Santos",
    valor: 50000,
    data: "2025-03-10",
    status: "fechada",
    produto: "CRM Enterprise"
  },
  {
    id: "5",
    clienteId: "4",
    clienteNome: "Ana Costa",
    valor: 10000,
    data: "2025-04-05",
    status: "fechada",
    produto: "Módulo de Atendimento"
  },
  {
    id: "6",
    clienteId: "3",
    clienteNome: "Pedro Santos",
    valor: 20000,
    data: "2025-04-15",
    status: "fechada",
    produto: "Módulo de Marketing"
  },
  {
    id: "7",
    clienteId: "2",
    clienteNome: "Maria Oliveira",
    valor: 30000,
    data: "2025-05-01",
    status: "pendente",
    produto: "CRM Professional"
  }
];