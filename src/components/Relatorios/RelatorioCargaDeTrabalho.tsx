"use client"

import React, { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import dayjs from "dayjs";
import { tarefasMock, subtarefasMock } from "@/mocks/tarefasMock";
import BaseLayout from "../Generico/BaseLayout";

// Registrando componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RelatorioCargaTrabalho: React.FC = () => {
  const [tarefas, setTarefas] = useState(tarefasMock);
  const [subtarefas, setSubtarefas] = useState(subtarefasMock);
  const [tarefasExpandidas, setTarefasExpandidas] = useState<number[]>([]);
  const [filtros, setFiltros] = useState({
    projeto: "",
    status: "",
    dataCriacaoInicio: "",
    dataCriacaoFim: "",
  });
  const [tarefasFiltradas, setTarefasFiltradas] = useState(tarefasMock);

  // Remova ou comente essas funções de exportação:
  const exportarPDF = () => {
    alert("Exportar relatório em PDF - (Implementar lógica)");
  };

  const exportarExcel = () => {
    alert("Exportar relatório em Excel - (Implementar lógica)");
  };

  // Função para atualizar os filtros
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  // Aplicar filtros nas tarefas
  const aplicarFiltros = () => {
    const filtrado = tarefas.filter((tarefa) => {
      return (
        (filtros.projeto
          ? tarefa.projeto.toLowerCase().includes(filtros.projeto.toLowerCase())
          : true) &&
        (filtros.status
          ? tarefa.status.toLowerCase() === filtros.status.toLowerCase()
          : true) &&
        (filtros.dataCriacaoInicio
          ? dayjs(tarefa.prazo).isAfter(dayjs(filtros.dataCriacaoInicio))
          : true) &&
        (filtros.dataCriacaoFim
          ? dayjs(tarefa.prazo).isBefore(dayjs(filtros.dataCriacaoFim))
          : true)
      );
    });
    setTarefasFiltradas(filtrado);
  };

  // Limpar filtros aplicados
  const limparFiltros = () => {
    setFiltros({
      projeto: "",
      status: "",
      dataCriacaoInicio: "",
      dataCriacaoFim: "",
    });
    setTarefasFiltradas(tarefas);
  };

  // Toggle para expandir/contrair subtarefas
  const toggleExpandirSubtarefas = (tarefaId: number) => {
    setTarefasExpandidas((prev) =>
      prev.includes(tarefaId)
        ? prev.filter((id) => id !== tarefaId)
        : [...prev, tarefaId]
    );
  };

  // Função para calcular a quantidade de tarefas e subtarefas por responsável
  const calcularCargaTrabalhoPorResponsavel = (projeto: string) => {
    // Contar tarefas por responsável no projeto
    const tarefasNoProjeto = tarefas.filter((tarefa) => tarefa.projeto === projeto);
    const subtarefasNoProjeto = subtarefas.filter((subtarefa) => {
      const tarefa = tarefas.find((t) => t.id === subtarefa.tarefaId);
      return tarefa?.projeto === projeto;
    });

    // Criar um mapa para contar as tarefas por responsável
    const cargaTrabalho: { [key: string]: number } = {};

    // Contar tarefas principais
    tarefasNoProjeto.forEach((tarefa) => {
      cargaTrabalho[tarefa.responsavel] = (cargaTrabalho[tarefa.responsavel] || 0) + 1;
    });

    // Contar subtarefas
    subtarefasNoProjeto.forEach((subtarefa) => {
      cargaTrabalho[subtarefa.responsavel] = (cargaTrabalho[subtarefa.responsavel] || 0) + 1;
    });

    return cargaTrabalho;
  };

  // Gráficos por projeto com base nos dados filtrados
  const projetos = useMemo(
    () =>
      filtros.projeto
        ? Array.from(new Set(tarefasFiltradas.map((tarefa) => tarefa.projeto)))
        : Array.from(new Set(tarefas.map((tarefa) => tarefa.projeto))),
    [filtros.projeto, tarefasFiltradas, tarefas]
  );

  const graficosPorProjeto = projetos.map((projeto) => {
    const cargaTrabalho = calcularCargaTrabalhoPorResponsavel(projeto);

    const labels = Object.keys(cargaTrabalho);
    const data = Object.values(cargaTrabalho);

    return {
      projeto,
      data: {
        labels,
        datasets: [
          {
            label: `Carga de Trabalho - ${projeto}`,
            data,
            backgroundColor: labels.map((responsavel) => {
              // Defina uma cor para cada responsável (isso pode ser mais dinâmico se necessário)
              return responsavel === "Ana"
                ? "#1EC360" // Verde para Ana
                : responsavel === "Carlos"
                ? "#FFB61D" // Amarelo para Carlos
                : "#5F6368"; // Cinza para outros
            }),
          },
        ],
      },
    };
  });

  return (
    <BaseLayout title="Relatório de Carga de Trabalho">
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="projeto"
              placeholder="Projeto"
              value={filtros.projeto}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            />
            <select
              disabled
              name="status"
              value={filtros.status}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            >
              <option value="">Status</option>
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
            <input
              disabled
              type="date"
              name="dataCriacaoInicio"
              value={filtros.dataCriacaoInicio}
              onChange={handleFilterChange}
              className="p-2 border rounded-md cursor-default"
            />
            <input
              disabled
              type="date"
              name="dataCriacaoFim"
              value={filtros.dataCriacaoFim}
              onChange={handleFilterChange}
              className="p-2 border rounded-md cursor-default"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={aplicarFiltros}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Aplicar Filtros
            </button>
            <button
              onClick={limparFiltros}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Gráficos */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Gráficos por Projeto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {graficosPorProjeto.map(({ projeto, data }) => (
              <div
                key={projeto}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {projeto}
                </h3>
                <Bar
                  data={data}
                  options={{ responsive: true, maintainAspectRatio: true }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botões de exportação */}
        <div className="flex space-x-4 mt-4">
          <button
            disabled
            onClick={exportarPDF}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-not-allowed opacity-50"
          >
            <FaFilePdf className="inline mr-2" />
            Exportar PDF
          </button>
          <button
            disabled
            onClick={exportarExcel}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-not-allowed opacity-50"
          >
            <FaFileExcel className="inline mr-2" />
            Exportar Excel
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default RelatorioCargaTrabalho;
