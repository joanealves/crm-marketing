export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;  
  clienteId: string;
  clienteNome: string;
  data: string;
  status: "pendente" | "concluida";
  tipo: "reuniao" | "ligacao" | "email";
  prioridade: "alta" | "media" | "baixa";
}