import { Tarefa } from "@/types/tarefa";

export const tarefas: Tarefa[] = [
  {
    id: "1",
    titulo: "Ligar para João Silva",
    descricao: "Discutir renovação de contrato",
    clienteId: "1",
    clienteNome: "João Silva",
    data: "2025-05-15T14:00:00",
    status: "pendente",
    tipo: "ligacao",
    prioridade: "alta"
  },
  {
    id: "2",
    titulo: "Email de follow-up",
    descricao: "Enviar proposta comercial",
    clienteId: "2",
    clienteNome: "Maria Oliveira",
    data: "2025-05-03T10:00:00",
    status: "pendente",
    tipo: "email",
    prioridade: "media"
  },
  {
    id: "3",
    titulo: "Reunião de negociação",
    descricao: "Apresentar novo pacote de serviços",
    clienteId: "3",
    clienteNome: "Pedro Santos",
    data: "2025-05-05T15:30:00",
    status: "pendente",
    tipo: "reuniao",
    prioridade: "alta"
  },
  {
    id: "4",
    titulo: "Análise de satisfação",
    descricao: "Verificar feedback sobre implementação",
    clienteId: "4",
    clienteNome: "Ana Costa",
    data: "2025-05-10T11:00:00",
    status: "pendente",
    tipo: "ligacao",
    prioridade: "media"
  },
  {
    id: "5",
    titulo: "Tentativa de reconquista",
    descricao: "Apresentar nova proposta com desconto",
    clienteId: "5",
    clienteNome: "Carlos Mendes",
    data: "2025-05-12T09:00:00",
    status: "pendente",
    tipo: "email",
    prioridade: "baixa"
  }
];