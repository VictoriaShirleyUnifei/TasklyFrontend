// statusMock.ts

export interface Status {
    id: number;
    nome: string;
    descricao: string;
  }
  
  export const statusMock: Status[] = [
    {
      id: 1,
      nome: "Concluído",
      descricao: "A tarefa foi completada e está finalizada."
    },
    {
      id: 2,
      nome: "Em Andamento",
      descricao: "A tarefa está em progresso e ainda não foi concluída."
    },
    {
      id: 3,
      nome: "Atrasado",
      descricao: "A tarefa está fora do prazo estabelecido."
    },
    {
      id: 4,
      nome: "Planejado",
      descricao: "A tarefa está planejada, mas ainda não foi iniciada."
    },
    {
      id: 5,
      nome: "Cancelado",
      descricao: "A tarefa foi cancelada e não será realizada."
    }
  ];
  