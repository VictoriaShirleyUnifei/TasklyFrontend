import React from "react";

interface DeleteProjectModalProps {
  project: { nome: string };
  onClose: () => void;
  onDelete: (projectId: string) => void;
  checkDependencies: (projectId: string) => Promise<boolean>;
  isAdmin: boolean;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ project, onClose, onDelete, checkDependencies, isAdmin }) => {
  const handleDelete = async () => {
    if (!isAdmin) {
      alert("Apenas administradores podem excluir projetos.");
      return;
    }

    const hasDependencies = await checkDependencies(project.nome);
    if (hasDependencies) {
      alert("O projeto possui tarefas ou subtarefas associadas. A exclusão não pode ser concluída.");
      return;
    }

    onDelete(project.nome);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Excluir Projeto</h2>
        <p>Tem certeza de que deseja excluir o projeto <strong>{project.nome}</strong>?</p>
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
            Excluir Projeto
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
