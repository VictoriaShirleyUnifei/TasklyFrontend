import React from "react";

interface VerDetalhesTarefasModalProps {
  tarefa: Tarefa;
  onClose: () => void;
}

interface Tarefa {
  titulo: string;
  descricao: string;
  prazo: string;
  responsavel: string;
  status: string;
  projeto: string;
}

const VerDetalhesTarefasModal: React.FC<VerDetalhesTarefasModalProps> = ({ tarefa, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Detalhes da Tarefa</h2>
      <p><strong>Título:</strong> {tarefa.titulo}</p>
      <p><strong>Descrição:</strong> {tarefa.descricao}</p>
      <p><strong>Prazo:</strong> {tarefa.prazo}</p>
      <p><strong>Responsável:</strong> {tarefa.responsavel}</p>
      <p><strong>Status:</strong> {tarefa.status}</p>
      <p><strong>Projeto:</strong> {tarefa.projeto}</p>
      <div className="flex justify-end mt-6">
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">Fechar</button>
      </div>
    </div>
  </div>
);

export default VerDetalhesTarefasModal;
