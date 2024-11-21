export interface Tarefa {
    id: number;
    titulo: string;
    descricao?: string;
    responsavel: string;
    status: string;
    prazo: string;
    projeto: string;
  }
  
  export interface Subtarefa {
    id: number;
    titulo: string;
    descricao?: string;
    prazo: string;
    responsavel: string;
    status: string;
    tarefaId: number;
  }
  
  // Mock de Tarefas
  export const tarefasMock: Tarefa[] = [
    {
      id: 1,
      titulo: "Planejamento de Testes",
      descricao: "Definir os casos de teste para o projeto",
      responsavel: "Beatriz",
      status: "Pendente",
      prazo: "2023-12-15",
      projeto: "Projeto A",
    },
    {
      id: 2,
      titulo: "Execução de Testes",
      descricao: "Testes unitários nos módulos principais",
      responsavel: "Carlos",
      status: "Em andamento",
      prazo: "2023-12-20",
      projeto: "Projeto B",
    },
  ];
  
  // Mock de Subtarefas
  export const subtarefasMock: Subtarefa[] = [
    {
      id: 1,
      titulo: "Configurar ambiente de teste",
      descricao: "Configurar servidores para teste",
      prazo: "2023-12-10",
      responsavel: "Ana",
      status: "Em andamento",
      tarefaId: 1,
    },
    {
      id: 2,
      titulo: "Preparar casos de teste",
      descricao: "Especificar cenários detalhados",
      prazo: "2023-12-12",
      responsavel: "João",
      status: "Pendente",
      tarefaId: 1,
    },
  ];
  