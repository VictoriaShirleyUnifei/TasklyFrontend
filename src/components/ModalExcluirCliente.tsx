import React from "react";

interface Cliente {
  id: string;
  nome: string;
}

interface ModalExcluirClienteProps {
  cliente: Cliente;
  onClose: () => void;
  onDelete: () => void;
}

const ModalExcluirCliente: React.FC<ModalExcluirClienteProps> = ({ cliente, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Excluir Cliente</h2>
        <p className="text-gray-700 mb-6">
          Tem certeza que deseja excluir o cliente <span className="font-bold">{cliente.nome}</span>?
          Esta ação não poderá ser desfeita.
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirCliente;
