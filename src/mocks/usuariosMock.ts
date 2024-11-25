export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    permissao: string;
  }
  
  // Mock de Usuários
  export const usuariosMock: Usuario[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      cargo: "Gerente",
      permissao: "Administrador",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      email: "maria.oliveira@empresa.com",
      cargo: "Analista",
      permissao: "Usuário",
    },
    {
      id: 3,
      nome: "Carlos Pereira",
      email: "carlos.pereira@empresa.com",
      cargo: "Desenvolvedor",
      permissao: "Usuário",
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@empresa.com",
      cargo: "Tester",
      permissao: "Usuário",
    },
  ];
  