import React, { useState } from "react";

interface Tarefa {
  titulo: string;
  responsavel: string;
  status: string; // Status pode ser Pendente, Concluída, etc.
  prazo: string;
  descricao?: string; // Campo Descrição opcional
}

interface IncluirTarefaModalProps {
  onClose: () => void;
  onSave: (novaTarefa: Tarefa) => void;
}

const IncluirTarefaModal: React.FC<IncluirTarefaModalProps> = ({ onClose, onSave }) => {
  const [titulo, setTitulo] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [prazo, setPrazo] = useState("");
  const [descricao, setDescricao] = useState(""); // Estado para Descrição
  const [status, setStatus] = useState("Pendente"); // Campo Status
  const [notificacao, setNotificacao] = useState<string | null>(null);

  const handleSubmit = () => {
    const novaTarefa: Tarefa = {
      titulo,
      responsavel,
      status, // Status selecionado pelo usuário
      prazo,
      descricao: descricao || undefined, // Descrição é opcional
    };

    // Chama a função de salvar passando a nova tarefa
    onSave(novaTarefa);

    // Notificação simples para o responsável
    setNotificacao(`Responsável ${responsavel} notificado sobre a tarefa: ${titulo}`);

    // Verifica se o status é "Pendente", para incluir a tarefa na lista de tarefas pendentes
    if (status === "Pendente") {
      console.log("Tarefa pendente adicionada à lista de tarefas pendentes.");
    }

    // Reseta os campos do modal após salvar a tarefa
    setTitulo("");
    setResponsavel("");
    setPrazo("");
    setDescricao(""); // Reseta o campo Descrição
    setStatus("Pendente"); // Reseta o status para "Pendente"
    
    // Fecha o modal após salvar
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Incluir Tarefa</h2>

        {/* Notificação simples para o responsável */}
        {notificacao && <p className="text-green-500 mb-4">{notificacao}</p>}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="titulo">
            Título *
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título da tarefa (deve ser claro e objetivo)"
          />
        </div>

        {/* Campo Descrição opcional */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="descricao">
            Descrição
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descrição detalhada da tarefa"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="prazo">
            Prazo *
          </label>
          <input
            type="date"
            id="prazo"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="responsavel">
            Responsável *
          </label>
          <input
            type="text"
            id="responsavel"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Responsável pela tarefa"
          />
        </div>

        {/* Campo Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="status">
            Status *
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pendente">Pendente</option>
            <option value="Concluída">Concluída</option>
            <option value="Em Andamento">Em Andamento</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncluirTarefaModal;
