// projetosMock.ts

export interface Projeto {
    id: number;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    status: string;
    responsavel: string;
  }
  
  export const projetosMock: Projeto[] = [
    {
      id: 1,
      nome: "Projeto Alpha",
      descricao: "Desenvolvimento de um novo sistema de gerenciamento de tarefas.",
      dataInicio: "2024-06-01",
      dataFim: "2024-12-31",
      status: "Em Andamento",
      responsavel: "João Silva"
    },
    {
      id: 2,
      nome: "Projeto Beta",
      descricao: "Melhorias no sistema atual de relatórios.",
      dataInicio: "2024-07-15",
      dataFim: "2025-01-15",
      status: "Planejado",
      responsavel: "Maria Oliveira"
    },
    {
      id: 3,
      nome: "Projeto Gamma",
      descricao: "Criação de novos módulos para integração com sistemas externos.",
      dataInicio: "2024-05-20",
      dataFim: "2024-09-30",
      status: "Concluído",
      responsavel: "Carlos Pereira"
    }
  ];
  