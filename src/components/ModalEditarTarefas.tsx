// EditarTarefaModal.tsx
import React, { useState } from "react";

interface Tarefa {
  titulo: string;
  descricao: string;
  prazo: string;
  responsavel: string;
  status: string;
  projeto: string;
}

interface EditarTarefaModalProps {
  tarefa: Tarefa;
  onClose: () => void;
  onSave: (updatedTarefa: Tarefa) => void;
}

const EditarTarefaModal: React.FC<EditarTarefaModalProps> = ({ tarefa, onClose, onSave }) => {
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao);
  const [prazo, setPrazo] = useState(tarefa.prazo);
  const [responsavel, setResponsavel] = useState(tarefa.responsavel);
  const [status, setStatus] = useState(tarefa.status);
  const [projeto, setProjeto] = useState(tarefa.projeto);

  const handleSave = () => {
    onSave({ titulo, descricao, prazo, responsavel, status, projeto });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Editar Tarefa</h2>

        {/* Similar to the IncluirTarefaModal component with pre-filled values */}
        {/*...*/}
      </div>
    </div>
  );
};

export default EditarTarefaModal;
