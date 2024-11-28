import React from "react";

interface DeleteUsuarioModalProps {
  usuario: { id: string; nome: string };
  onClose: () => void;
  onDelete: (usuarioId: string) => void;
  verificarDependencias: (usuarioId: string) => boolean; // Função para verificar dependências
}

const DeleteUsuarioModal: React.FC<DeleteUsuarioModalProps> = ({
  usuario,
  onClose,
  onDelete,
  verificarDependencias,
}) => {
  const handleDelete = () => {
    if (verificarDependencias(usuario.id)) {
      alert("Não é possível remover o usuário. Ele possui tarefas ou projetos associados.");
      return;
    }

    onDelete(usuario.id);
    onClose(); // Fecha o modal após a exclusão
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Excluir Usuário</h2>
        <p>
          Tem certeza de que deseja excluir o usuário <strong>{usuario.nome}</strong>?
        </p>
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
            Excluir Usuário
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUsuarioModal;
