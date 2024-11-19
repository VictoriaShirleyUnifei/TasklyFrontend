import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import DeleteTaskModal from "./ModalExcluirTarefas";
import dayjs from "dayjs";
import { FiSearch } from "react-icons/fi";
import Toast from "./Toast";

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
  projeto: string;
}

interface Subtarefa {
  id: number;
  titulo: string;
  descricao?: string;
  prazo: string;
  responsavel: string;
  status: string;
  tarefaId: number;
}

interface TabelaTarefasProps {
  tarefas: Tarefa[];
  onDelete: (tarefa: Tarefa) => void;
  onAdd: (tarefa: Tarefa) => void;
  onEdit: (tarefa: Tarefa) => void;
}

const TabelaTarefas: React.FC<TabelaTarefasProps> = ({ tarefas, onDelete, onAdd, onEdit }) => {
  const [novaTarefa, setNovaTarefa] = useState<Tarefa>({
    id: 0,
    titulo: "",
    descricao: "",
    prazo: "",
    responsavel: "",
    status: "Pendente",
    projeto: "",
  });

  const [tarefaParaExcluir, setTarefaParaExcluir] = useState<Tarefa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncludeModalOpen, setIsIncludeModalOpen] = useState(false);
  const [openSubtasks, setOpenSubtasks] = useState<number[]>([]);
  const [subtarefas, setSubtarefas] = useState<Subtarefa[]>([
    {
      id: 1,
      titulo: "Planejamento de Testes",
      descricao: "Definir os casos de teste para o projeto",
      prazo: "2023-08-10",
      responsavel: "Beatriz",
      status: "Pendente",
      tarefaId: 1,
    },
    {
      id: 2,
      titulo: "Execução de Testes Unitários",
      descricao: "Realizar testes unitários no módulo principal",
      prazo: "2023-08-15",
      responsavel: "Carlos",
      status: "Em andamento",
      tarefaId: 1,
    },
  ]);
  const [novaSubtarefa, setNovaSubtarefa] = useState<Subtarefa>({
    id: 0,
    titulo: "",
    descricao: "",
    prazo: "",
    responsavel: "",
    status: "Pendente",
    tarefaId: 0,
  });
  const [filtrosSubtarefas, setFiltrosSubtarefas] = useState({ titulo: "", status: "", responsavel: "" });
  const [subtarefaParaEditar, setSubtarefaParaEditar] = useState<Subtarefa | null>(null);
  const [subtarefaParaExcluir, setSubtarefaParaExcluir] = useState<Subtarefa | null>(null);
  const [isSubtaskDeleteModalOpen, setIsSubtaskDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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
      showToastMessage("Tarefa excluída com sucesso!");
    }
  };

  const openIncludeModal = () => {
    setIsIncludeModalOpen(true);
  };

  const closeIncludeModal = () => {
    setIsIncludeModalOpen(false);
    setNovaSubtarefa({
      id: 0,
      titulo: "",
      descricao: "",
      prazo: "",
      responsavel: "",
      status: "Pendente",
      tarefaId: 0,
    });
    setSubtarefaParaEditar(null);
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
      if (dayjs(novaTarefa.prazo).isBefore(dayjs())) {
        alert("A data de vencimento não pode ser anterior à data atual.");
        return;
      }
      onAdd({ ...novaTarefa, id: Date.now(), projeto: "NomeDoProjeto" });
      setNovaTarefa({
        id: 0,
        titulo: "",
        descricao: "",
        prazo: "",
        responsavel: "",
        status: "Pendente",
        projeto: "",
      });
      closeIncludeModal();
      showToastMessage("Tarefa incluída com sucesso!");
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const toggleSubtasksView = (tarefaId: number) => {
    setOpenSubtasks((prevOpenSubtasks) =>
      prevOpenSubtasks.includes(tarefaId)
        ? prevOpenSubtasks.filter((id) => id !== tarefaId)
        : [...prevOpenSubtasks, tarefaId]
    );
  };

  const handleAddSubtask = (tarefaId: number) => {
    setNovaSubtarefa({ ...novaSubtarefa, tarefaId });
    setIsIncludeModalOpen(true);
  };

  const handleSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaSubtarefa.titulo && novaSubtarefa.prazo && novaSubtarefa.responsavel) {
      if (dayjs(novaSubtarefa.prazo).isBefore(dayjs())) {
        alert("A data de vencimento não pode ser anterior à data atual.");
        return;
      }
      if (subtarefas.some(sub => sub.titulo.toLowerCase() === novaSubtarefa.titulo.toLowerCase() && sub.tarefaId === novaSubtarefa.tarefaId)) {
        alert("O título da subtarefa não pode estar duplicado dentro da mesma tarefa principal.");
        return;
      }
      if (subtarefaParaEditar) {
        setSubtarefas((prevSubtarefas) =>
          prevSubtarefas.map((sub) =>
            sub.id === subtarefaParaEditar.id ? { ...novaSubtarefa, id: subtarefaParaEditar.id } : sub
          )
        );
        showToastMessage("Subtarefa editada com sucesso!");
      } else {
        setSubtarefas((prevSubtarefas) => [...prevSubtarefas, { ...novaSubtarefa, id: Date.now() }]);
        showToastMessage("Subtarefa incluída com sucesso!");
      }
      closeIncludeModal();
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleEditSubtask = (subtarefa: Subtarefa) => {
    setNovaSubtarefa(subtarefa);
    setSubtarefaParaEditar(subtarefa);
    setIsIncludeModalOpen(true);
  };

  const handleDeleteSubtask = (subtarefa: Subtarefa) => {
    if (subtarefa.status === "Em andamento") {
      alert("A subtarefa em andamento não pode ser excluída.");
      return;
    }
    setSubtarefaParaExcluir(subtarefa);
    setIsSubtaskDeleteModalOpen(true);
  };

  const closeSubtaskDeleteModal = () => {
    setIsSubtaskDeleteModalOpen(false);
    setSubtarefaParaExcluir(null);
  };

  const confirmDeleteSubtask = () => {
    if (subtarefaParaExcluir) {
      setSubtarefas((prevSubtarefas) => prevSubtarefas.filter((sub) => sub.id !== subtarefaParaExcluir.id));
      closeSubtaskDeleteModal();
      showToastMessage("Subtarefa excluída com sucesso!");
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltrosSubtarefas((prevFiltros) => ({ ...prevFiltros, [name]: value }));
  };

  const filteredSubtarefas = subtarefas.filter((subtarefa) => {
    return (
      (filtrosSubtarefas.titulo ? subtarefa.titulo.toLowerCase().includes(filtrosSubtarefas.titulo.toLowerCase()) : true) &&
      (filtrosSubtarefas.status ? subtarefa.status.toLowerCase() === filtrosSubtarefas.status.toLowerCase() : true) &&
      (filtrosSubtarefas.responsavel ? subtarefa.responsavel.toLowerCase().includes(filtrosSubtarefas.responsavel.toLowerCase()) : true)
    );
  });

  return (
    <div className="relative overflow-x-auto rounded-lg shadow-lg bg-white p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700 bg-gray-200 border-b">Subtarefas</th>
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
            <React.Fragment key={tarefa.id}>
              <tr className="border-b">
                <td className="px-4 py-2 text-left text-sm font-bold text-gray-700">
                  <FaPlus
                    className="cursor-pointer text-blue-500"
                    onClick={() => toggleSubtasksView(tarefa.id)}
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{tarefa.titulo}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{tarefa.descricao}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusStyles[tarefa.status as keyof typeof statusStyles]
                    }`}
                  >
                    {tarefa.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">{tarefa.prazo}</td>
                <td className="px-4 py-2 text-sm text-gray-800">{tarefa.responsavel}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(tarefa)}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openModal(tarefa)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              {openSubtasks.includes(tarefa.id) && (
                <tr key={`subtasks-${tarefa.id}`} className="bg-gray-100">
                  <td colSpan={7} className="p-4">
                    <div className="flex flex-col">
                      <div className="flex items-center border rounded p-2 mb-4 bg-gray-100">
                        <FiSearch className="mr-2 text-gray-400" />
                        <input
                          type="text"
                          name="titulo"
                          placeholder="Digite o nome da subtarefa"
                          value={filtrosSubtarefas.titulo}
                          onChange={handleFilterChange}
                          className="p-2 w-full outline-none border-r"
                        />
                        <select
                          name="status"
                          value={filtrosSubtarefas.status}
                          onChange={handleFilterChange}
                          className="p-2 border-r outline-none"
                        >
                          <option value="">Status</option>
                          <option value="Pendente">Pendente</option>
                          <option value="Em andamento">Em andamento</option>
                          <option value="Concluída">Concluída</option>
                        </select>
                        <input
                          type="text"
                          name="responsavel"
                          placeholder="Responsável"
                          value={filtrosSubtarefas.responsavel}
                          onChange={handleFilterChange}
                          className="p-2 w-full outline-none"
                        />
                      </div>
                      <table className="min-w-full bg-white rounded-lg">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Título</th>
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Responsável</th>
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Prazo</th>
                            <th className="px-4 py-2 text-left text-sm font-bold text-gray-700">Status</th>
                            <th className="px-4 py-2 text-center text-sm font-bold text-gray-700">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSubtarefas
                            .filter((subtarefa) => subtarefa.tarefaId === tarefa.id)
                            .map((subtarefa) => (
                              <tr key={subtarefa.id} className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-800">{subtarefa.titulo}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{subtarefa.responsavel}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{subtarefa.prazo}</td>
                                <td className="px-4 py-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                      statusStyles[subtarefa.status as keyof typeof statusStyles]
                                    }`}
                                  >
                                    {subtarefa.status}
                                  </span>
                                </td>
                                <td className="px-4 py-2 text-center space-x-2">
                                  <button
                                    onClick={() => handleEditSubtask(subtarefa)}
                                    className="text-yellow-500 hover:text-yellow-700 transition-colors duration-200"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubtask(subtarefa)}
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
                        onClick={() => handleAddSubtask(tarefa.id)}
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition-colors duration-200 w-max self-end"
                      >
                        + Incluir Subtarefa
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
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
      {isIncludeModalOpen && novaSubtarefa.tarefaId === 0 && (
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

      {/* Modal de Inclusão/Edição de Subtarefa */}
      {isIncludeModalOpen && novaSubtarefa.tarefaId !== 0 && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {subtarefaParaEditar ? "Editar Subtarefa" : "Incluir Nova Subtarefa"}
            </h2>
            <form onSubmit={handleSubtaskSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título da subtarefa *"
                  className="p-2 border rounded"
                  value={novaSubtarefa.titulo}
                  onChange={(e) => setNovaSubtarefa({ ...novaSubtarefa, titulo: e.target.value })}
                  required
                />
                <input
                  type="text"
                  name="descricao"
                  placeholder="Descrição detalhada da subtarefa"
                  className="p-2 border rounded"
                  value={novaSubtarefa.descricao}
                  onChange={(e) => setNovaSubtarefa({ ...novaSubtarefa, descricao: e.target.value })}
                />
                <input
                  type="date"
                  name="prazo"
                  className="p-2 border rounded"
                  value={novaSubtarefa.prazo}
                  onChange={(e) => setNovaSubtarefa({ ...novaSubtarefa, prazo: e.target.value })}
                  required
                />
                <input
                  type="text"
                  name="responsavel"
                  placeholder="Responsável *"
                  className="p-2 border rounded"
                  value={novaSubtarefa.responsavel}
                  onChange={(e) => setNovaSubtarefa({ ...novaSubtarefa, responsavel: e.target.value })}
                  required
                />
                <select
                  name="status"
                  className="p-2 border rounded"
                  value={novaSubtarefa.status}
                  onChange={(e) => setNovaSubtarefa({ ...novaSubtarefa, status: e.target.value })}
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
                  {subtarefaParaEditar ? "Salvar Alterações" : "Salvar Subtarefa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exclusão de Subtarefa */}
      {isSubtaskDeleteModalOpen && subtarefaParaExcluir && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Tem certeza que deseja excluir?</h2>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={closeSubtaskDeleteModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={confirmDeleteSubtask}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      <DeleteTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default TabelaTarefas;
