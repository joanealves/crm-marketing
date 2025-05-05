export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  status: 'ativo' | 'inativo' | 'lead' | 'oportunidade';
  valor: number;
  ultimoContato: string;
  proximoContato?: string;
  notas?: string;
  avatar?: string;
}