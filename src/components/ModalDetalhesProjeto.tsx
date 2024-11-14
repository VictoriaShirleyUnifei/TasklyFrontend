import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";
import IncluirTarefaModal from "./ModalIncluirTarefas";
import Toast from "./Toast";

interface Tarefa {
  titulo: string;
  responsavel: string;
  status: string;
  prazo: string;
}

interface ProjectDetailsModalProps {
  projectName: string;
  tarefas: Tarefa[];
  onClose: () => void;
  onEdit: (tarefa: Tarefa) => void;
  onDelete: (tarefa: Tarefa) => void;
  onDetail: (tarefa: Tarefa) => void;
  onIncluirTarefa: () => void;
  onSave: (tarefas: Tarefa[]) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  projectName,
  tarefas,
  onClose,
  onEdit,
  onDelete,
  onDetail,
  onIncluirTarefa,
  onSave
}) => {
  const [isIncluirTarefaOpen, setIsIncluirTarefaOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleIncluirTarefa = () => {
    setIsIncluirTarefaOpen(true);
  };

  const handleCloseIncluirTarefa = () => {
    setIsIncluirTarefaOpen(false);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSaveTarefa = (novaTarefa: Tarefa) => {
    // Atualiza a lista de tarefas no estado superior
    onSave([...tarefas, novaTarefa]);  // Adiciona a nova tarefa ao estado
    setIsIncluirTarefaOpen(false);
    triggerToast("Tarefa incluída com sucesso!");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        <h2 className="text-3xl font-bold mb-4 text-customYellow font-poppins mt-1">
          Detalhes do Projeto: {projectName}
        </h2>

        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Tarefas do Projeto</h3>

        <ul className="space-y-4">
          {tarefas.map((tarefa, index) => (
            <li key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
              <div>
                <p className="text-lg font-semibold text-blue-500">{tarefa.titulo}</p>
                <p>Responsável: {tarefa.responsavel}</p>
                <p>Status: {tarefa.status}</p>
                <p>Prazo: {tarefa.prazo}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => onEdit(tarefa)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(tarefa)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
                <button onClick={() => onDetail(tarefa)} className="text-gray-500 hover:text-gray-700">
                  <FaEye />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Fechar
          </button>

          <button
            onClick={handleIncluirTarefa}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-200"
          >
            <FaPlus /> <span>Incluir Tarefa</span>
          </button>
        </div>
      </div>

      {isIncluirTarefaOpen && (
        <IncluirTarefaModal
          onClose={handleCloseIncluirTarefa}
          onSave={handleSaveTarefa}
        />
      )}

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default ProjectDetailsModal;
