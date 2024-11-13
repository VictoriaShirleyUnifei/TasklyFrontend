'use client';

import React, { useState } from 'react';
import Filtro from '@/components/Filtro';
import Tabela from '@/components/Tabela';
import EditProjectModal from '@/components/ModalEditar';
import DeleteProjectModal from '@/components/ModalExcluir';
import IncluirProjetoModal from '@/components/ModalIncluir';
import Toast from '@/components/Toast';
import { FaPlus } from 'react-icons/fa';
import BaseLayout from '@/components/BaseLayout';

interface LinhaTabela {
  nome?: string;
  descricao?: string;
  cliente?: string;
  time?: string;
  inicio: string;
  final: string;
}

const ProjetosPage: React.FC = () => {
  const [textoFiltro, definirTextoFiltro] = useState<string>('');
  const [dados, setDados] = useState<LinhaTabela[]>([
    { nome: 'Projeto A', descricao: 'Descrição do Projeto A', cliente: 'Cliente A', time: 'Time A', inicio: '2023-01-01', final: '2023-12-31' },
    { nome: 'Projeto B', descricao: 'Descrição do Projeto B', cliente: 'Cliente B', time: 'Time B', inicio: '2023-02-01', final: '2023-11-30' },
  ]);
  const [projetoSelecionado, setProjetoSelecionado] = useState<LinhaTabela | null>(null);
  const [projetoParaExcluir, setProjetoParaExcluir] = useState<LinhaTabela | null>(null);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const dadosFiltrados = dados.filter(
    (item) =>
      item.nome?.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.cliente?.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.time?.toLowerCase().includes(textoFiltro.toLowerCase())
  );

  const handleSave = (updatedProject: LinhaTabela) => {
    setDados((prevDados) =>
      prevDados.map((proj) => (proj.nome === projetoSelecionado?.nome ? updatedProject : proj))
    );
    setProjetoSelecionado(null);
    triggerToast('Projeto editado com sucesso!');
  };

  const handleDeleteProject = (projectId: string) => {
    setDados((prevDados) => prevDados.filter((proj) => proj.nome !== projectId));
    setProjetoParaExcluir(null);
    triggerToast('Projeto excluído com sucesso!');
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const existingProjectNames = dados.map((proj) => proj.nome);

  return (
    <BaseLayout title="Gerenciamento de Projetos">
      <h2 className="text-3xl font-bold text-customYellow font-poppins mt-1">Projetos Cadastrados</h2>

      <Filtro textoFiltro={textoFiltro} definirTextoFiltro={definirTextoFiltro} />

      <Tabela
        dados={dadosFiltrados}
        onEditClick={setProjetoSelecionado}
        onDeleteClick={setProjetoParaExcluir}
      />

      <button
        onClick={() => setMostrarModal(true)}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
      >
        <FaPlus /> <span>Incluir Projeto</span>
      </button>

      {projetoSelecionado && (
        <EditProjectModal
          project={projetoSelecionado}
          existingProjectNames={existingProjectNames}
          onClose={() => setProjetoSelecionado(null)}
          onSave={handleSave}
        />
      )}

      {projetoParaExcluir && (
        <DeleteProjectModal
          project={projetoParaExcluir}
          onClose={() => setProjetoParaExcluir(null)}
          onDelete={handleDeleteProject}
        />
      )}

      {mostrarModal && (
        <IncluirProjetoModal
          onClose={() => setMostrarModal(false)}
          onSave={(novoProjeto) => {
            setDados([...dados, novoProjeto]);
            setMostrarModal(false);
            triggerToast('Projeto incluído com sucesso!');
          }}
        />
      )}

      <Toast message={toastMessage} show={showToast} />
    </BaseLayout>
  );
};

export default ProjetosPage;
