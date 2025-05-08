export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  status: "lead" | "prospect" | "cliente" | "inativo" | "ativo" | "oportunidade";
  valor: number;
  ultimoContato: string;
  proximoContato?: string;
  notas?: string;
  avatar?: string;
}