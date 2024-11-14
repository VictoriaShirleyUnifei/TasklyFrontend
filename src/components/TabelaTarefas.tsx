import React, { useState } from "react";
import { FaPlus, FaTrash, FaEye, FaEdit } from "react-icons/fa";
import DeleteTaskModal from "./ModalExcluirTarefas";

const statusStyles = {
  Pendente: "bg-gray-300 text-gray-700",
  "Em andamento": "bg-yellow-200 text-yellow-800",
  Concluída: "bg-green-200 text-green-800",
};

export interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: string;
  prazo: string;
  projeto: string; // Propriedade obrigatória
}

interface TabelaTarefasProps {
  tarefas: Tarefa[];
  onDelete: (tarefa: Tarefa) => void;
  onAdd: (tarefa: Tarefa) => void;
  onEdit: (tarefa: Tarefa) => void;
  onView: (tarefa: Tarefa) => void;
}


const TabelaTarefas: React.FC<TabelaTarefasProps> = ({
  tarefas,
  onDelete,
  onAdd,
  onEdit,
  onView,
}) => {
  const [novaTarefa, setNovaTarefa] = useState<Tarefa>({
    id: 0,
    titulo: "",
    descricao: "",
    prazo: "",
    responsavel: "",
    status: "Pendente",
    projeto: "", // Adicione esta linha
  });
  

  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false);

  // Abre o modal de exclusão e define a tarefa a ser excluída
  const openModal = (tarefa: Tarefa) => {
    setTarefaParaExcluir(tarefa);
    setIsModalOpen(true);
  };

  // Fecha o modal de exclusão
  const closeModal = () => {
    setIsModalOpen(false);
    setTarefaParaExcluir(null);
  };

  // Função de exclusão
  const handleDelete = () => {
    if (tarefaParaExcluir) {
      onDelete(tarefaParaExcluir);
      closeModal();
    }
  };

  const openIncludeModal = () => {
    setIsIncludeModalOpen(true);
  };

  const closeIncludeModal = () => {
    setIsIncludeModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNovaTarefa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaTarefa.titulo && novaTarefa.prazo && novaTarefa.responsavel) {
      onAdd({ ...novaTarefa, id: Date.now(), projeto: "NomeDoProjeto" }); // Inclua o nome do projeto
      setNovaTarefa({
        id: 0,
        titulo: "",
        descricao: "",
        prazo: "",
        responsavel: "",
        status: "Pendente",
        projeto: "", // Reinicialize com um valor padrão
      });
      closeIncludeModal();
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };
  

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-lg bg-white p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-200 border-b">
              Título
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-200 border-b">
              Descrição
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-200 border-b">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-200 border-b">
              Prazo
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-200 border-b">
              Responsável
            </th>
            <th className="px-4 py-2 text-center text-sm font-bold text-gray-700 bg-gray-200 border-b">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id} className="border-b">
              <td className="px-4 py-2 text-sm text-gray-800">
                {tarefa.titulo}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {tarefa.descricao}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[tarefa.status as keyof typeof statusStyles]
                  }`}
                >
                  {tarefa.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {tarefa.prazo}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {tarefa.responsavel}
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(tarefa)}
                  className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200"
                >
                  <FaEdit />
                </button>
                {
                  /*
                   <button
                  onClick={() => onView(tarefa)}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaEye />
                </button>*/ 
                }
                <button
                  onClick={() => openModal(tarefa)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center mt-4"
        onClick={openIncludeModal}
      >
        <FaPlus className="text-white" />
        <span className="ml-2">Incluir Tarefa</span>
      </button>

      {/* Modal de Inclusão de Tarefa */}
      {isIncludeModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Incluir Nova Tarefa</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título da tarefa *"
                  className="p-2 border rounded"
                  value={novaTarefa.titulo}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="descricao"
                  placeholder="Descrição detalhada da tarefa"
                  className="p-2 border rounded"
                  value={novaTarefa.descricao}
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="prazo"
                  className="p-2 border rounded"
                  value={novaTarefa.prazo}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="responsavel"
                  placeholder="Responsável *"
                  className="p-2 border rounded"
                  value={novaTarefa.responsavel}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="status"
                  className="p-2 border rounded"
                  value={novaTarefa.status}
                  onChange={handleInputChange}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Concluída">Concluída</option>
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={closeIncludeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Salvar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      <DeleteTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TabelaTarefas;
