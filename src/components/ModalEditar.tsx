// EditProjectModal.tsx
import React, { useState } from 'react';

interface Project {
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
}

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ project, onClose, onSave }) => {
  const [nome, setNome] = useState(project.nome);
  const [descricao, setDescricao] = useState(project.descricao);
  const [cliente, setCliente] = useState(project.cliente);
  const [time, setTime] = useState(project.time);
  const [final, setFinal] = useState(project.final);

  const validateAndSave = () => {
    if (!nome) {
      alert("O nome do projeto é obrigatório.");
      return;
    }
    if (new Date(final) < new Date(project.inicio)) {
      alert("A data de término não pode ser anterior à data de início.");
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
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">Alterar Projeto</h2>
        
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

        <label className="block text-sm font-semibold">Data de Início</label>
        <input
          type="text"
          value={project.inicio}
          className="w-full p-2 border rounded mb-4 bg-gray-200"
          disabled
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
