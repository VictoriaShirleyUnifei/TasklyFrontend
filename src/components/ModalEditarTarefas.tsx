import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Ícone de "X" para fechar
import Toast from "./Toast";

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: string;
  prazo: string;
  projeto: string;
}

interface EditTaskModalProps {
  tarefa: Tarefa;
  onSave: (updatedTarefa: Tarefa) => void;
  onCancel: () => void; // Adicione esta linha se não estiver definida
  onEditField: (updatedField: any) => void;
  title: string;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  tarefa,
  onClose,
  onSave,
}) => {
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao || "");
  const [responsavel, setResponsavel] = useState(tarefa.responsavel);
  const [status, setStatus] = useState(tarefa.status);
  const [prazo, setPrazo] = useState(tarefa.prazo);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Atualiza os campos quando a tarefa fornecida mudar
  useEffect(() => {
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao || "");
    setResponsavel(tarefa.responsavel);
    setStatus(tarefa.status);
    setPrazo(tarefa.prazo);
  }, [tarefa]);

  // Função para validar e salvar as alterações
  const validateAndSave = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validações de campos obrigatórios
    if (!titulo || !responsavel || !prazo) {
      setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    // Salvar as alterações
    const updatedTarefa = {
      ...tarefa,
      titulo,
      descricao,
      responsavel,
      status,
      prazo,
    };

    onSave(updatedTarefa);
    setSuccessMessage("Alterações salvas com sucesso!");

    // Fechar o modal após um curto tempo
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Editar Tarefa</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        {successMessage && <Toast message={successMessage} show={true} />}

        {/* Campos de edição */}
        <label className="block text-gray-700 font-semibold mb-2">
          Título *
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">
          Descrição
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">
          Responsável *
        </label>
        <input
          type="text"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">
          Status *
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        >
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select>

        <label className="block text-gray-700 font-semibold mb-2">
          Prazo *
        </label>
        <input
          type="date"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={validateAndSave}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
