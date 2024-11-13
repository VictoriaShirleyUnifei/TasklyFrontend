import React, { useState } from 'react';

interface Project {
  id: string;
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string; // Campo de data de início (não editável)
  final: string;
}

interface EditProjectModalProps {
  project: Project;
  existingProjectNames: string[]; // Lista de nomes de projetos existentes para validação de unicidade
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

  // Validação antes de salvar as alterações
  const validateAndSave = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Verifica se o nome do projeto é único (exclui o nome atual do projeto para permitir que o mesmo nome seja mantido)
    const isNameUnique = nome === project.nome || !existingProjectNames.includes(nome);
    if (!isNameUnique) {
      setErrorMessage("O nome do projeto deve ser único.");
      return;
    }

    // Verifica se a data de término é posterior ou igual à data de início
    if (new Date(final) < new Date(project.inicio)) {
      setErrorMessage("A data de término não pode ser anterior à data de início.");
      return;
    }

    // Salva as alterações se todas as validações passarem
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">Alterar Projeto</h2>
        
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        
        <label className="block text-sm font-semibold">Nome do Projeto *</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Nome do Projeto"
          required
        />
        
        <label className="block text-sm font-semibold">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Descrição"
        />

        <label className="block text-sm font-semibold">Cliente Externo Associado</label>
        <input
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Cliente Externo Associado"
        />

        <label className="block text-sm font-semibold">Time Responsável</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Time Responsável"
        />

        <label className="block text-sm font-semibold">Data Final</label>
        <input
          type="date"
          value={final}
          onChange={(e) => setFinal(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={validateAndSave}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Salvar Alterações
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
