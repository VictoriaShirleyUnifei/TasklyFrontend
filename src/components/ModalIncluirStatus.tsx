import React, { useState } from "react";

interface Status {
  nome: string;
  descricao: string;
  cor: string; // Adicionando a cor do status como uma propriedade
}

interface IncluirStatusModalProps {
  onClose: () => void;
  onSave: (status: Status) => void;
}

const statusStyles = {
  "Cinza (Pendentes)": "bg-gray-300 text-gray-700",
  "Amarelo (Em andamento)": "bg-yellow-200 text-yellow-800",
  "Verde (Concluídas)": "bg-green-200 text-green-800",
  "Vermelho (Urgentes)": "bg-red-200 text-red-800",
};

const IncluirStatusModal: React.FC<IncluirStatusModalProps> = ({ onClose, onSave }) => {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [cor, setCor] = useState<string>("Cinza (Pendentes)"); // Definindo a cor inicial como uma das chaves de statusStyles

  const handleSave = () => {
    if (!nome) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    onSave({ nome, descricao, cor });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Incluir Status</h2>

        <label className="block text-gray-700 font-semibold mb-2">Nome do Status *</label>
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

        <label className="block text-gray-700 font-semibold mb-2">Cor do Status *</label>
        <select
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        >
          {Object.keys(statusStyles).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

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
            Salvar Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncluirStatusModal;
