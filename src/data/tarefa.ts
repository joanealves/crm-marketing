import { Tarefa } from "@/types/tarefa";
import { v4 as uuidv4 } from "uuid";

export const tarefas: Tarefa[] = [
  {
    id: uuidv4(),
    titulo: "Reunião de acompanhamento",
    descricao: "Verificar o andamento do projeto e definir próximos passos",
    clienteId: uuidv4(),
    clienteNome: "Empresa ABC Ltda",
    data: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), 
    status: "pendente",
    tipo: "reuniao",
    prioridade: "alta"
  },
  {
    id: uuidv4(),
    titulo: "Ligação de follow-up",
    descricao: "Verificar a satisfação com o último serviço prestado",
    clienteId: uuidv4(),
    clienteNome: "João Silva",
    data: new Date().toISOString(), 
    status: "pendente", 
    tipo: "ligacao",
    prioridade: "media"
  },
  {
    id: uuidv4(),
    titulo: "Enviar proposta comercial",
    descricao: "Enviar proposta atualizada conforme requisitos discutidos",
    clienteId: uuidv4(),
    clienteNome: "Empresa XYZ S.A.",
    data: new Date(new Date().getTime() - 48 * 60 * 60 * 1000).toISOString(), 
    status: "concluida",
    tipo: "email",
    prioridade: "alta" 
  }
];