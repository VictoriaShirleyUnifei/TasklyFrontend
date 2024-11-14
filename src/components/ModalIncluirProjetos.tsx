import React, { useState } from "react";

interface Projeto {
  nome: string;
  descricao: string;
  inicio: string;
  final: string;
}

interface IncluirProjetoModalProps {
  onClose: () => void;
  onSave: (projeto: Projeto) => void;
}

const IncluirProjetoModal: React.FC<IncluirProjetoModalProps> = ({ onClose, onSave }) => {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [inicio, setInicio] = useState<string>("");
  const [final, setFinal] = useState<string>("");

  const handleSave = () => {
    if (!nome || !inicio || !final) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (new Date(inicio) > new Date(final)) {
      alert("A data de início não pode ser posterior à data de término.");
      return;
    }
    onSave({ nome, descricao, inicio, final });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Incluir Projeto</h2>

        <label className="block text-gray-700 font-semibold mb-2">Nome do Projeto *</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">Data de Início *</label>
        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Data Final *</label>
        <input
          type="date"
          value={final}
          onChange={(e) => setFinal(e.target.value)}
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
            Salvar Projeto
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncluirProjetoModal;
