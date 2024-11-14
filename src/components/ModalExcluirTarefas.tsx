// ExcluirTarefaModal.tsx
import React from "react";

interface ExcluirTarefaModalProps {
  tarefa: { titulo: string };
  onClose: () => void;
  onDelete: () => void;
}

const ExcluirTarefaModal: React.FC<ExcluirTarefaModalProps> = ({ tarefa, onClose, onDelete }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-customYellow mb-4">Excluir Tarefa</h2>
      <p>Tem certeza de que deseja excluir a tarefa "{tarefa.titulo}"?</p>
      <div className="flex justify-between mt-6">
        <button onClick={onClose} className="bg-gray-300 p-2 rounded-md">Cancelar</button>
        <button onClick={onDelete} className="bg-red-500 text-white p-2 rounded-md">Excluir</button>
      </div>
    </div>
  </div>
);

export default ExcluirTarefaModal;
