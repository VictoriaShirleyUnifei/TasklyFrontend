import React, { useState, useEffect } from "react";
import { Tarefa } from "./Tarefa";

interface ModalIncluirTarefaProps {
  onClose: () => void;
  onSave: (tarefa: Tarefa) => void;
  tarefa: Tarefa; // Tarefa para edição ou para criação
}

const ModalIncluirTarefa: React.FC<ModalIncluirTarefaProps> = ({
  onClose,
  onSave,
  tarefa,
}) => {
  const [novaTarefa, setNovaTarefa] = useState<Tarefa>(tarefa);

  useEffect(() => {
    setNovaTarefa(tarefa);
  }, [tarefa]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNovaTarefa((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!novaTarefa.titulo || !novaTarefa.prazo || !novaTarefa.responsavel) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    onSave(novaTarefa);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-customYellow mb-4">
          {novaTarefa.id ? "Editar Tarefa" : "Incluir Tarefa"}
        </h2>

        <label className="block text-gray-700 font-semibold mb-2">Título *</label>
        <input
          type="text"
          name="titulo"
          value={novaTarefa.titulo}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
        <input
          type="text"
          name="descricao"
          value={novaTarefa.descricao}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">Prazo *</label>
        <input
          type="date"
          name="prazo"
          value={novaTarefa.prazo}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Responsável *</label>
        <input
          type="text"
          name="responsavel"
          value={novaTarefa.responsavel}
          onChange={handleInputChange}
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
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            {novaTarefa.id ? "Salvar Alterações" : "Salvar Tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalIncluirTarefa;
