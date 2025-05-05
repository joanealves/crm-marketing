export interface Venda {
    id: string;
    clienteId: string;
    clienteNome: string;
    valor: number;
    data: string;
    status: 'fechada' | 'pendente' | 'cancelada';
    produto: string;
  }