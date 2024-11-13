// App.tsx
"use client";

import React, { useState } from "react";
import Filtro from "@/components/Filtro";
import Tabela from "@/components/Tabela";
import EditProjectModal from "@/components/ModalEditar";
import Sidebar from "@/components/Sidebar";
import Botao from "@/components/Botao";

interface LinhaTabela {
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
}

const App: React.FC = () => {
  const [textoFiltro, definirTextoFiltro] = useState<string>("");
  const [dados, setDados] = useState<LinhaTabela[]>([
    { nome: "Projeto A", descricao: "Descrição do Projeto A", cliente: "Cliente A", time: "Time A", inicio: "2023-01-01", final: "2023-12-31" },
    { nome: "Projeto B", descricao: "Descrição do Projeto B", cliente: "Cliente B", time: "Time B", inicio: "2023-02-01", final: "2023-11-30" },
  ]);
  const [projetoSelecionado, setProjetoSelecionado] = useState<LinhaTabela | null>(null);

  // Filtrar os dados de acordo com o texto do filtro
  const dadosFiltrados = dados.filter(
    (item) =>
      item.nome.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.cliente.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.time.toLowerCase().includes(textoFiltro.toLowerCase())
  );

  // Função chamada ao clicar em editar, para abrir o modal com o projeto selecionado
  const handleEditClick = (projeto: LinhaTabela) => {
    setProjetoSelecionado(projeto);
  };

  // Função chamada ao salvar as alterações do projeto no modal
  const handleSave = (updatedProject: LinhaTabela) => {
    setDados((prevDados) =>
      prevDados.map((proj) =>
        proj.nome === updatedProject.nome ? updatedProject : proj
      )
    );
    setProjetoSelecionado(null); // Fecha o modal
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-4">
        <Filtro textoFiltro={textoFiltro} definirTextoFiltro={definirTextoFiltro} />

        <Tabela dados={dadosFiltrados} onEditClick={handleEditClick} />

        {projetoSelecionado && (
          <EditProjectModal
            project={projetoSelecionado}
            onClose={() => setProjetoSelecionado(null)}
            onSave={handleSave}
          />
        )}
                <Botao/>

      </div>
    </div>
  );
};

export default App;
