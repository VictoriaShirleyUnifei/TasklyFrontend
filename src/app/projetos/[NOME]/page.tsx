"use client";
import BaseLayout from "@/components/BaseLayout";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs"; // Import dayjs para formatação de datas
import TabelaTarefas from "@/components/TabelaTarefas";
import Toast from "@/components/Toast";
import { FiSearch } from "react-icons/fi";
import Modal from "@/components/ModalEditarTarefas";
import DeleteTaskModal from "@/components/ModalExcluirTarefas";

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: string;
  prazo: string;
  projeto: string;
}

export default function DetalhesProjeto() {
  const params = useParams();
  const NOME = Array.isArray(params.NOME) ? params.NOME[0] : params.NOME;
  const nomeProjetoDecodificado = decodeURIComponent(NOME || "Projeto Desconhecido");

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtros, setFiltros] = useState({ titulo: "", status: "", prazo: "", responsavel: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState<Tarefa>({
    id: 0,
    titulo: "",
    descricao: "",
    responsavel: "",
    status: "",
    prazo: "",
    projeto: nomeProjetoDecodificado,
  });
  const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState({ message: "", show: false });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(null);

  useEffect(() => {
    const tarefasMock: Tarefa[] = [
      {
        id: 1,
        titulo: "Testes",
        responsavel: "Ana",
        status: "Concluída",
        prazo: dayjs("2023-05-20").format("DD/MM/YYYY"), // Formata a data
        projeto: "Projeto A",
      },
      {
        id: 2,
        titulo: "Desenvolvimento",
        responsavel: "Carlos",
        status: "Em andamento",
        prazo: dayjs("2023-07-15").format("DD/MM/YYYY"), // Formata a data
        projeto: "Projeto B",
      },
      {
        id: 3,
        titulo: "Análise de Requisitos",
        responsavel: "Beatriz",
        status: "Pendente",
        prazo: dayjs("2023-08-01").format("DD/MM/YYYY"), // Formata a data
        projeto: "Projeto C",
      },
    ];

    setTarefas(tarefasMock);
  }, [NOME]);

  const handleAddTarefa = (novaTarefa: Tarefa) => {
    setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
    setShowToast({ message: "Tarefa salva com sucesso!", show: true });
    setTimeout(() => setShowToast({ message: "", show: false }), 3000);
  };

  const handleDelete = () => {
    if (tarefaParaExcluir) {
      setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== tarefaParaExcluir.id));
      setShowToast({ message: "Tarefa excluída com sucesso!", show: true });
      setShowDeleteModal(false);
      setTimeout(() => setShowToast({ message: "", show: false }), 3000);
      setTarefaParaExcluir(null);
    }
  };

  const handleEditTarefa = (tarefa: Tarefa) => {
    setTarefaAtual(tarefa);
    setShowEditModal(true);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({ ...prevFiltros, [name]: value }));
  };

  const handleSaveTarefa = () => {
    const newTarefa = { ...novaTarefa, id: Date.now() };
    handleAddTarefa(newTarefa);
    setNovaTarefa({ id: 0, titulo: "", descricao: "", responsavel: "", status: "", prazo: "", projeto: nomeProjetoDecodificado });
    setShowAddForm(false);
  };

  const handleSaveEdits = (updatedTarefa: Tarefa) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === updatedTarefa.id ? updatedTarefa : tarefa
      )
    );
    setTarefaAtual(null);
    setShowEditModal(false);
    setShowToast({ message: "Edição salva com sucesso!", show: true });
    setTimeout(() => setShowToast({ message: "", show: false }), 3000);
  };
  

  const handleCancelAdd = () => {
    setNovaTarefa({ id: 0, titulo: "", descricao: "", responsavel: "", status: "", prazo: "", projeto: nomeProjetoDecodificado });
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setTarefaAtual(null);
    setShowEditModal(false);
  };

  const openDeleteModal = (tarefa: Tarefa) => {
    setTarefaParaExcluir(tarefa);
    setShowDeleteModal(true);
  };

  const filteredTarefas = tarefas
    .filter((tarefa) => {
      return (
        (filtros.titulo ? tarefa.titulo.includes(filtros.titulo) : true) &&
        (filtros.status ? tarefa.status === filtros.status : true) &&
        (filtros.prazo ? tarefa.prazo === filtros.prazo : true) &&
        (filtros.responsavel ? tarefa.responsavel.includes(filtros.responsavel) : true)
      );
    })
    .sort((a, b) => (a.prazo < b.prazo ? -1 : a.prazo > b.prazo ? 1 : a.status.localeCompare(b.status)));

  return (
    <BaseLayout title={`${nomeProjetoDecodificado}`}>
      <div className="py-4">
        <h2 className="text-2xl font-bold mb-6 text-primary">Tarefas do Projeto</h2>

        <div className="flex items-center border rounded p-2 mb-4 bg-gray-100">
          <FiSearch className="mr-2 text-gray-400" />
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={filtros.titulo}
            onChange={handleFilterChange}
            className="p-2 w-full outline-none border-r"
          />
          <select
            name="status"
            value={filtros.status}
            onChange={handleFilterChange}
            className="p-2 border-r outline-none"
          >
            <option value="">Status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
          <input
            type="date"
            name="prazo"
            value={filtros.prazo}
            onChange={handleFilterChange}
            className="p-2 border-r outline-none"
          />
          <input
            type="text"
            name="responsavel"
            placeholder="Responsável"
            value={filtros.responsavel}
            onChange={handleFilterChange}
            className="p-2 w-full outline-none"
          />
        </div>

        {filteredTarefas.length > 0 ? (
          <TabelaTarefas
            tarefas={filteredTarefas}
            onAdd={handleAddTarefa}
            onDelete={openDeleteModal}
            onEdit={handleEditTarefa}
            onView={(tarefa) => console.log("Visualizar tarefa:", tarefa)}
          />
        ) : (
          <p></p>
        )}

        {/* Formulário para adicionar tarefa */}
        {showAddForm && (
          <div className="mt-6 p-4 border rounded shadow-lg bg-gray-50">
            <h3 className="text-xl font-bold mb-4">Adicionar Nova Tarefa</h3>
            <input
              type="text"
              placeholder="Título"
              value={novaTarefa.titulo}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
              className="p-2 w-full mb-4 border rounded"
            />
            <textarea
              placeholder="Descrição"
              value={novaTarefa.descricao}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
              className="p-2 w-full mb-4 border rounded"
            />
            <input
              type="text"
              placeholder="Responsável"
              value={novaTarefa.responsavel}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, responsavel: e.target.value })}
              className="p-2 w-full mb-4 border rounded"
            />
            <select
              value={novaTarefa.status}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, status: e.target.value })}
              className="p-2 w-full mb-4 border rounded"
            >
              <option value="">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
            <input
              type="date"
              value={novaTarefa.prazo}
              onChange={(e) => setNovaTarefa({ ...novaTarefa, prazo: e.target.value })}
              className="p-2 w-full mb-4 border rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTarefa}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {showToast.show && <Toast message={showToast.message} show={showToast.show} />}

        {/* Modais */}
        {showEditModal && tarefaAtual && (
        <Modal
            tarefa={tarefaAtual}
            onSave={handleSaveEdits}
            onCancel={handleCancelEdit}
            onEditField={(updatedField) => setTarefaAtual((prev) => ({ ...prev!, ...updatedField }))}
            title="Editar Tarefa"
            onClose={handleCancelEdit} 
          >
          {/* Conteúdo do Modal */}
        </Modal>
      )}
        {showDeleteModal && (
          <DeleteTaskModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </BaseLayout>
  );
}
