import React from "react";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold">Tem certeza que deseja excluir?</h2>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              onDelete(); // Aciona a função de exclusão
              onClose(); // Fecha o modal
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
