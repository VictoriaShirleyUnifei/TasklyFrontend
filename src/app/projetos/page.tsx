"use client";
import React, { useState } from "react";
import dayjs from "dayjs"; // Import dayjs para formatação de datas
import Filtro from "@/components/FiltroProjetos";
import Tabela from "@/components/TabelaProjetos";
import EditProjectModal from "@/components/ModalEditarProjetos";
import DeleteProjectModal from "@/components/ModalExcluirProjetos";
import Sidebar from "@/components/Sidebar";
import Toast from "@/components/Toast";
import IncluirProjetoModal from "@/components/ModalIncluirProjetos";
import Footer from "@/components/Footer";
import { FaPlus } from "react-icons/fa";
import IncluirTarefasModal from "@/components/ModalIncluirTarefas";
import EditarTarefasModal from "@/components/ModalEditarTarefas";
import ExcluirTarefasModal from "@/components/ModalExcluirTarefas";
import VerDetalhesTarefasModal from "@/components/ModalDetalhesTarefas";
import { tarefasMock } from "@/mocks/tarefasMock"; // Importando o mock de tarefas

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: string;
  prazo: string;
  projeto: string;
}

export interface LinhaTabela {
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
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

interface DeleteTaskModalProps {
  tarefa: Tarefa; // Adicione esta linha se a tarefa for necessária
  onClose: () => void;
  onDelete: () => void;
}


const App: React.FC = () => {
  const [textoFiltro, definirTextoFiltro] = useState<string>("");
  const [dados, setDados] = useState<LinhaTabela[]>([
    {
      nome: "Projeto A",
      descricao: "Descrição do Projeto A",
      cliente: "Cliente A",
      time: "Time A",
      inicio: "2023-01-01",
      final: "2023-12-31",
    },
    {
      nome: "Projeto B",
      descricao: "Descrição do Projeto B",
      cliente: "Cliente B",
      time: "Time B",
      inicio: "2023-02-01",
      final: "2023-11-30",
    },
  ]);

  // Formatando as datas
  const dadosFormatados = dados.map((item) => ({
    ...item,
    inicio: dayjs(item.inicio).format("DD/MM/YYYY"),
    final: dayjs(item.final).format("DD/MM/YYYY"),
  }));

  const [tarefasProjeto, setTarefasProjeto] = useState<Tarefa[]>([]);
  const [projetoSelecionado, setProjetoSelecionado] =
    useState<LinhaTabela | null>(null);
  const [projetoParaExcluir, setProjetoParaExcluir] =
    useState<LinhaTabela | null>(null);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [mostrarDetalhes, setMostrarDetalhes] = useState<boolean>(false);

  // Tarefas - Modal
  const [mostrarIncluirTarefa, setMostrarIncluirTarefa] = useState(false);
  const [mostrarEditarTarefa, setMostrarEditarTarefa] = useState(false);
  const [mostrarExcluirTarefa, setMostrarExcluirTarefa] = useState(false);
  const [mostrarDetalhesTarefa, setMostrarDetalhesTarefa] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa | null>(
    null
  );

  const dadosFiltrados = dadosFormatados.filter(
    (item) =>
      item.nome?.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.cliente?.toLowerCase().includes(textoFiltro.toLowerCase()) ||
      item.time?.toLowerCase().includes(textoFiltro.toLowerCase())
  );

  const handleEditClick = (projeto: LinhaTabela) => {
    setProjetoSelecionado(projeto);
  };

  const handleDetailClick = (projeto: LinhaTabela) => {
    // Filtrar as tarefas pelo projeto selecionado
    const tarefasDoProjeto = tarefasMock.filter(
      (tarefa) => tarefa.projeto === projeto.nome
    );
    setTarefasProjeto(tarefasDoProjeto);
    setMostrarDetalhes(true);
  };

  const handleSave = (updatedProject: LinhaTabela) => {
    setDados((prevDados) =>
      prevDados.map((proj) =>
        proj.nome === projetoSelecionado?.nome ? updatedProject : proj
      )
    );
    setProjetoSelecionado(null);
    triggerToast("Projeto editado com sucesso!");
  };

  const handleDeleteClick = (projeto: LinhaTabela) => {
    setProjetoParaExcluir(projeto);
  };

  const handleDeleteProject = (projectId: string) => {
    setDados((prevDados) =>
      prevDados.filter((proj) => proj.nome !== projectId)
    );
    setProjetoParaExcluir(null);
    triggerToast("Projeto excluído com sucesso!");
  };

  const handleSaveTarefa = (novaTarefa: Tarefa) => {
    setTarefasProjeto((prevTarefas) => [...prevTarefas, novaTarefa]);
    setMostrarIncluirTarefa(false);
    triggerToast("Tarefa incluída com sucesso!");
  };

  const handleEditTarefa = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setMostrarEditarTarefa(true);
  };

  const handleDeleteTarefa = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setMostrarExcluirTarefa(true);
  };

  const handleDetailsTarefa = (tarefa: Tarefa) => {
    setTarefaSelecionada(tarefa);
    setMostrarDetalhesTarefa(true);
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-8 space-y-4">
          <h1 className="text-4xl font-bold text-customGray font-poppins">
            Gerenciamento de Projetos
          </h1>

          <h2 className="text-3xl font-bold text-customYellow font-poppins mt-1">
            Projetos Cadastrados
          </h2>

          <Filtro
            textoFiltro={textoFiltro}
            definirTextoFiltro={definirTextoFiltro}
          />

          <Tabela
            dados={dadosFiltrados}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onDetailClick={handleDetailClick}
          />

          <button
            onClick={() => setMostrarModal(true)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
          >
            <FaPlus /> <span>Incluir Projeto</span>
          </button>

          {projetoSelecionado && (
            <EditProjectModal
              project={projetoSelecionado as Project}
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
              // Usando Promise.resolve para retornar um Promise<boolean>
              checkDependencies={() => Promise.resolve(false)}
              isAdmin={isAdmin}
            />
          )}

          {mostrarModal && (
            <IncluirProjetoModal
              onClose={() => setMostrarModal(false)}
              onSave={(novoProjeto) => {
                // Aqui garantimos que 'novoProjetoCompleto' possui todas as propriedades de 'LinhaTabela'
                const novoProjetoCompleto: LinhaTabela = {
                  nome: novoProjeto.nome,
                  descricao: novoProjeto.descricao,
                  inicio: novoProjeto.inicio,
                  final: novoProjeto.final,
                  // Adicione valores para 'cliente' e 'time' que são obrigatórios em 'LinhaTabela'
                  cliente: "Cliente padrão", // Substitua pelo valor adequado ou pelo dado vindo do modal
                  time: "Time padrão", // Substitua pelo valor adequado ou pelo dado vindo do modal
                };

                setDados([...dados, novoProjetoCompleto]);
                setMostrarModal(false);
                triggerToast("Projeto incluído com sucesso!");
              }}
            />
          )}

          {mostrarIncluirTarefa && (
            <IncluirTarefasModal
              onClose={() => setMostrarIncluirTarefa(false)}
              onSave={handleSaveTarefa}
              tarefa={{
                id: 0, // ou algum valor padrão apropriado
                titulo: "",
                descricao: "",
                responsavel: "",
                status: "Pendente", // ou outro status padrão
                prazo: "",
                projeto: "", // ou o nome do projeto relacionado
              }}
            />
          )}

          {mostrarEditarTarefa && tarefaSelecionada && (
            <EditarTarefasModal
              tarefa={tarefaSelecionada}
              onClose={() => setMostrarEditarTarefa(false)}
              onSave={(tarefaAtualizada) => {
                setTarefasProjeto((prevTarefas) =>
                  prevTarefas.map((tarefa) =>
                    tarefa.id === tarefaSelecionada?.id
                      ? tarefaAtualizada
                      : tarefa
                  )
                );
                setMostrarEditarTarefa(false);
                triggerToast("Tarefa editada com sucesso!");
              }}
              onCancel={() => setMostrarEditarTarefa(false)}
              onEditField={(updatedField) => {
                // Aqui, updatedField é um objeto que inclui as atualizações de campo
                setTarefaSelecionada((prev) => ({
                  ...prev!,
                  ...updatedField,
                }));
              }}
              title="Editar Tarefa"
            />
          )}

          {mostrarExcluirTarefa && tarefaSelecionada && (
            <ExcluirTarefasModal
              isOpen={mostrarExcluirTarefa} // Adicione esta linha
              onClose={() => setMostrarExcluirTarefa(false)}
              onDelete={() => {
                setTarefasProjeto((prevTarefas) =>
                  prevTarefas.filter(
                    (tarefa) => tarefa.id !== tarefaSelecionada?.id
                  )
                );
                setMostrarExcluirTarefa(false);
                triggerToast("Tarefa excluída com sucesso!");
              }}
            />
          )}

          {mostrarDetalhesTarefa && tarefaSelecionada && (
            <VerDetalhesTarefasModal
              tarefa={tarefaSelecionada}
              onClose={() => setMostrarDetalhesTarefa(false)}
            />
          )}
        </div>
      </div>
      <Footer />
      {showToast && <Toast message={toastMessage} show={showToast} />}
    </div>
  );
};

export default App;
