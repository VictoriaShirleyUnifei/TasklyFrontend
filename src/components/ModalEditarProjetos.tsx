import React, { useState } from 'react';
import Toast from './Toast';

interface ToastProps {
  message: string;
  onClose: () => void; // Adicione esta linha se a propriedade onClose for necessária
}

interface Project {
  id: string;
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
}

interface EditProjectModalProps {
  project: Project;
  existingProjectNames: string[];
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ project, existingProjectNames, onClose, onSave }) => {
  const [nome, setNome] = useState(project.nome);
  const [descricao, setDescricao] = useState(project.descricao);
  const [cliente, setCliente] = useState(project.cliente);
  const [time, setTime] = useState(project.time);
  const [final, setFinal] = useState(project.final);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateAndSave = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const isNameUnique = nome === project.nome || !existingProjectNames.includes(nome);
    if (!isNameUnique) {
      setErrorMessage("O nome do projeto deve ser único.");
      return;
    }

    if (new Date(final) < new Date(project.inicio)) {
      setErrorMessage("A data de término não pode ser anterior à data de início.");
      return;
    }

    onSave({
      ...project,
      nome,
      descricao,
      cliente,
      time,
      final,
    });

    setSuccessMessage("Alterações salvas com sucesso!");
  };

  return (
    <div>
      {successMessage && <Toast message={successMessage} show={false}  />}

      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-customYellow mb-4">Alterar Projeto</h2>
          
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}

          {/* Campos de input */}
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

          <label className="block text-gray-700 font-semibold mb-2">Cliente Externo Associado</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <label className="block text-gray-700 font-semibold mb-2">Time Responsável</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <label className="block text-gray-700 font-semibold mb-2">Data Final</label>
          <input
            type="date"
            value={final}
            onChange={(e) => setFinal(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
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
    </div>
  );
};

export default EditProjectModal;
