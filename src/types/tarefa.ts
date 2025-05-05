export interface Tarefa {
    id: string;
    titulo: string;
    descricao?: string;
    clienteId?: string;
    clienteNome?: string;
    data: string;
    status: 'pendente' | 'concluida' | 'atrasada';
    tipo: 'ligacao' | 'email' | 'reuniao' | 'outro';
    prioridade: 'baixa' | 'media' | 'alta';
  }