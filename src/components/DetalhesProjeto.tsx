// src/components/DetalhesProjeto.tsx

import React, { useState } from "react";
import ModalIncluirTarefa from "./ModalIncluirTarefa";

interface Tarefa {
  id: string;
  nome: string;
  descricao: string;
  responsavel: string;
}

interface LinhaTabela {
  nome: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
  tarefas: Tarefa[];
}

interface DetalhesProjetoProps {
  projeto: LinhaTabela;
  onClose: () => void;
  onAddTarefa: (tarefa: Tarefa) => void;
}

const DetalhesProjeto: React.FC<DetalhesProjetoProps> = ({ projeto, onClose, onAddTarefa }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTarefa = (novaTarefa: Tarefa) => {
    onAddTarefa(novaTarefa);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Detalhes do Projeto - {projeto.nome}</h2>
        <p><strong>Cliente:</strong> {projeto.cliente}</p>
        <p><strong>Time:</strong> {projeto.time}</p>
        <p><strong>Data de Início:</strong> {projeto.inicio}</p>
        <p><strong>Data de Finalização:</strong> {projeto.final}</p>
        <h3 className="text-lg font-semibold mt-4">Tarefas</h3>
        <ul className="list-disc list-inside">
          {projeto.tarefas?.map((tarefa) => (
            <li key={tarefa.id}>{tarefa.nome} - {tarefa.responsavel}</li>
          ))}
        </ul>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Incluir Tarefa
        </button>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
          Fechar
        </button>

        {isModalOpen && (
          <ModalIncluirTarefa onClose={() => setIsModalOpen(false)} onSave={handleAddTarefa} />
        )}
      </div>
    </div>
  );
};

export default DetalhesProjeto;
