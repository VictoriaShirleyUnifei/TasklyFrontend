"use client";

import React, { useState } from "react";
import dayjs from "dayjs"; // Import dayjs para formatação de datas
import Filtro from "@/components/FiltroStatus"; // Novo componente para filtro dos status
import Tabela from "@/components/TabelaStatus"; // Novo componente para a tabela de status
import EditStatusModal from "@/components/ModalEditarStatus"; // Modal para editar status
import DeleteStatusModal from "@/components/ModalExcluirStatus"; // Modal para excluir status
import IncluirStatusModal from "@/components/ModalIncluirStatus"; // Modal para incluir status
import Sidebar from "@/components/Sidebar";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import { FaPlus } from "react-icons/fa";
import BaseLayout from "@/components/Generico/BaseLayout";

const statusStyles = {
  "Cinza (Pendentes)": "bg-gray-300 text-gray-700",
  "Amarelo (Em andamento)": "bg-yellow-200 text-yellow-800",
  "Verde (Concluídas)": "bg-green-200 text-green-800",
  "Vermelho (Urgentes": "bg-red-200 text-red-800",
};

interface Status {
  id: string; // Alterado para 'string'
  nome: string;
  descricao: string;
  cor: string;
}

const ConfiguracoesStatus: React.FC = () => {
  const [textoFiltro, definirTextoFiltro] = useState<string>("");
  const [dados, setDados] = useState<Status[]>([
    {
      id: "1",
      nome: "Pendente",
      descricao: "Aguardando ação.",
      cor: "Cinza (Pendentes)",
    },
    {
      id: "2",
      nome: "Em andamento",
      descricao: "Em progresso.",
      cor: "Amarelo (Em andamento)",
    },
    {
      id: "3",
      nome: "Concluído",
      descricao: "Finalizado com sucesso.",
      cor: "Verde (Concluídas)",
    },
  ]);

  const [statusSelecionado, setStatusSelecionado] = useState<Status | null>(
    null
  );
  const [statusParaExcluir, setStatusParaExcluir] = useState<Status | null>(
    null
  );
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Filtro dos dados de status
  const dadosFiltrados = dados.filter((item) =>
    item.nome?.toLowerCase().includes(textoFiltro.toLowerCase())
  );

  const handleEditClick = (status: Status) => {
    setStatusSelecionado(status);
  };

  const handleSave = (updatedStatus: Status) => {
    setDados((prevDados) =>
      prevDados.map((status) =>
        status.id === statusSelecionado?.id ? updatedStatus : status
      )
    );
    setStatusSelecionado(null);
    triggerToast("Status editado com sucesso!");
  };

  const handleDeleteClick = (status: Status) => {
    setStatusParaExcluir(status);
  };

  const handleDeleteStatus = (statusId: string) => {
    setDados((prevDados) => prevDados.filter((status) => status.id !== statusId));
    setStatusParaExcluir(null);
    triggerToast("Status excluído com sucesso!");
  };

  const handleAddStatus = (novoStatus: Status) => {
    const novoStatusComId = { ...novoStatus, id: Date.now().toString() }; // Converte para string
    setDados((prevDados) => [...prevDados, novoStatusComId]);
    setMostrarModal(false);
    triggerToast("Status incluído com sucesso!");
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <BaseLayout title="Configurar Status">
        <div className="flex-1 space-y-4">
          <Filtro textoFiltro={textoFiltro} definirTextoFiltro={definirTextoFiltro} />

          <Tabela
            dados={dadosFiltrados}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
          >
            <FaPlus /> <span>Incluir Status</span>
          </button>

          {statusSelecionado && (
            <EditStatusModal
              status={statusSelecionado}
              onClose={() => setStatusSelecionado(null)}
              onSave={handleSave}
            />
          )}

          {statusParaExcluir && (
            <DeleteStatusModal
              status={statusParaExcluir}
              onClose={() => setStatusParaExcluir(null)}
              onDelete={() => handleDeleteStatus(statusParaExcluir.id)}
            />
          )}

          {mostrarModal && (
            <IncluirStatusModal
              onClose={() => setMostrarModal(false)}
              onSave={handleAddStatus}
            />
          )}
        </div>
      </BaseLayout>
      <Footer />
      {showToast && <Toast message={toastMessage} show={showToast} />}
    </div>
  );
};

export default ConfiguracoesStatus;
