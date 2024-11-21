import React from "react";

interface DeleteStatusModalProps {
  status: { nome: string };
  onClose: () => void;
  onDelete: (statusId: string) => void;
}

const DeleteStatusModal: React.FC<DeleteStatusModalProps> = ({ status, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(status.nome);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Excluir Status</h2>
        <p>Tem certeza de que deseja excluir o status <strong>{status.nome}</strong>?</p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Excluir Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStatusModal;
