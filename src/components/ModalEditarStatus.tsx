import React, { useState } from 'react';
import Toast from './Toast';

interface Status {
  id: string;
  nome: string;
  descricao: string;
  cor: keyof typeof statusStyles; // Definindo 'cor' como uma chave do 'statusStyles'
}

interface EditStatusModalProps {
  status: Status;
  onClose: () => void;
  onSave: (updatedStatus: Status) => void;
}

const statusStyles = {
  "Cinza (Pendentes)": "bg-gray-300 text-gray-700",
  "Amarelo (Em andamento)": "bg-yellow-200 text-yellow-800",
  "Verde (Concluídas)": "bg-green-200 text-green-800",
  "Vermelho (Urgentes)": "bg-red-200 text-red-800",
};

const EditStatusModal: React.FC<EditStatusModalProps> = ({ status, onClose, onSave }) => {
  const [nome, setNome] = useState(status.nome);
  const [descricao, setDescricao] = useState(status.descricao);
  const [cor, setCor] = useState<keyof typeof statusStyles>(status.cor);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateAndSave = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (nome.trim() === '') {
      setErrorMessage("O nome do status não pode estar vazio.");
      return;
    }

    onSave({
      ...status,
      nome,
      descricao,
      cor,
    });

    setSuccessMessage("Alterações salvas com sucesso!");
  };

  return (
    <div>
      {successMessage && <Toast message={successMessage} show={true} />}

      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-customYellow mb-4">Alterar Status</h2>

          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

          {/* Campo de entrada do nome do status */}
          <label className="block text-gray-700 font-semibold mb-2">Nome do Status *</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Campo de entrada da descrição do status */}
          <label className="block text-gray-700 font-semibold mb-2">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          {/* Campo de seleção da cor do status */}
          <label className="block text-gray-700 font-semibold mb-2">Cor do Status *</label>
          <select
            value={cor}
            onChange={(e) => setCor(e.target.value as keyof typeof statusStyles)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            {Object.keys(statusStyles).map((statusKey) => (
              <option key={statusKey} value={statusKey}>
                {statusKey}
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
              onClick={validateAndSave}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;
