import { Cliente } from "@/types/cliente";

export const clientes: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@empresa.com",
    telefone: "(11) 98765-4321",
    empresa: "Tech Solutions",
    cargo: "Diretor de TI",
    status: "ativo",
    valor: 120000,
    ultimoContato: "2025-04-28",
    proximoContato: "2025-05-15",
    notas: "Cliente de longa data, interessado em renovar contrato",
    avatar: ""
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    email: "maria.oliveira@startup.co",
    telefone: "(11) 91234-5678",
    empresa: "Startup Inovadora",
    cargo: "CEO",
    status: "lead",
    valor: 50000,
    ultimoContato: "2025-05-01",
    notas: "Interessada em nossa solução de CRM",
    avatar: ""
  },
  {
    id: "3",
    nome: "Pedro Santos",
    email: "pedro.santos@grande.corp",
    telefone: "(21) 99876-5432",
    empresa: "Grande Corporação",
    cargo: "Gerente Comercial",
    status: "oportunidade",
    valor: 200000,
    ultimoContato: "2025-04-15",
    proximoContato: "2025-05-05",
    notas: "Negociação em andamento para expansão do contrato",
    avatar: ""
  },
  {
    id: "4",
    nome: "Ana Costa",
    email: "ana.costa@empresa.com.br",
    telefone: "(31) 98765-1234",
    empresa: "Empresa Nacional",
    cargo: "Diretora Financeira",
    status: "ativo",
    valor: 75000,
    ultimoContato: "2025-04-20",
    proximoContato: "2025-05-20",
    notas: "Cliente satisfeita, possibilidade de cross-sell",
    avatar: ""
  },
  {
    id: "5",
    nome: "Carlos Mendes",
    email: "carlos.mendes@industria.ind.br",
    telefone: "(41) 99632-8520",
    empresa: "Indústria Brasileira",
    cargo: "Gerente de Operações",
    status: "inativo",
    valor: 0,
    ultimoContato: "2025-03-10",
    notas: "Contrato encerrado, tentar reconquistar",
    avatar: ""
  }
];
