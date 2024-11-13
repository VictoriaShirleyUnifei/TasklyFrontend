"use client";
import React, { useState } from "react";
import Filtro from "@/components/Filtro";
import Tabela from "@/components/Tabela";
import EditProjectModal from "@/components/ModalEditar";
import DeleteProjectModal from "@/components/ModalExcluir";
import Sidebar from "@/components/Sidebar";
import Toast from "@/components/Toast";
import IncluirProjetoModal from "@/components/ModalIncluir";
import Footer from "@/components/Footer";
import { FaPlus } from "react-icons/fa";

interface LinhaTabela {
  nome?: string;
  descricao?: string;
  cliente?: string;
  time?: string;
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
  const [projetoParaExcluir, setProjetoParaExcluir] = useState<LinhaTabela | null>(null);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const dadosFiltrados = dados.filter(
    (item) =>
      item.nome?.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.cliente?.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.time?.toLowerCase().includes(textoFiltro.toLowerCase())
  );

  const handleEditClick = (projeto: LinhaTabela) => {
    setProjetoSelecionado(projeto);
  };

  const handleDetailClick = (projeto: LinhaTabela) => {
    console.log("Detalhes do Projeto:", projeto);
  };

  const handleSave = (updatedProject: LinhaTabela) => {
    setDados((prevDados) =>
      prevDados.map((proj) =>
        proj.nome === projetoSelecionado?.nome ? updatedProject : proj
      )
    );
    setProjetoSelecionado(null);
    triggerToast("Projeto editado com sucesso!");
  };

  const handleDeleteClick = (projeto: LinhaTabela) => {
    setProjetoParaExcluir(projeto);
  };

  const handleDeleteProject = (projectId: string) => {
    setDados((prevDados) => prevDados.filter((proj) => proj.nome !== projectId));
    setProjetoParaExcluir(null);
    triggerToast("Projeto excluído com sucesso!");
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const existingProjectNames = dados.map((proj) => proj.nome);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-8 space-y-4">
          <h1 className="text-4xl font-bold text-customGray font-poppins">Gerenciamento de Projetos</h1>
          
          <h2 className="text-3xl font-bold text-customYellow font-poppins mt-1">Projetos Cadastrados</h2>

          <Filtro textoFiltro={textoFiltro} definirTextoFiltro={definirTextoFiltro} />

          <Tabela
            dados={dadosFiltrados}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onDetailClick={handleDetailClick}
          />

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
          >
            <FaPlus /> <span>Incluir Projeto</span>
          </button>

          {projetoSelecionado && (
            <EditProjectModal
              project={projetoSelecionado}
              existingProjectNames={existingProjectNames}
              onClose={() => setProjetoSelecionado(null)}
              onSave={handleSave}
            />
          )}

          {projetoParaExcluir && (
            <DeleteProjectModal
              project={projetoParaExcluir}
              onClose={() => setProjetoParaExcluir(null)}
              onDelete={handleDeleteProject}
              checkDependencies={() => false}
              isAdmin={isAdmin}
            />
          )}

          {mostrarModal && (
            <IncluirProjetoModal
              onClose={() => setMostrarModal(false)}
              onSave={(novoProjeto) => {
                setDados([...dados, novoProjeto]);
                setMostrarModal(false);
                triggerToast("Projeto incluído com sucesso!");
              }}
            />
          )}

          <Toast message={toastMessage} show={showToast} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
