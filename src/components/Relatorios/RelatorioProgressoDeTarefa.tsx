"use client";

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
import { FaFilePdf, FaFileExcel, FaPlus, FaMinus } from "react-icons/fa";
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

const RelatorioProgressoDeTarefa: React.FC = () => {
  const [tarefas, setTarefas] = useState(tarefasMock);
  const [subtarefas, setSubtarefas] = useState(subtarefasMock);
  const [tarefasExpandidas, setTarefasExpandidas] = useState<number[]>([]);
  const [filtros, setFiltros] = useState({
    projeto: "",
    tarefa: "",
    responsavel: "",
    status: "",
    dataCriacaoInicio: "",
    dataCriacaoFim: "",
  });
  const [tarefasFiltradas, setTarefasFiltradas] = useState(tarefasMock);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const aplicarFiltros = () => {
    const filtrado = tarefas.filter((tarefa) => {
      return (
        (filtros.projeto
          ? tarefa.projeto.toLowerCase().includes(filtros.projeto.toLowerCase())
          : true) &&
        (filtros.tarefa
          ? tarefa.titulo.toLowerCase().includes(filtros.tarefa.toLowerCase())
          : true) &&
        (filtros.responsavel
          ? tarefa.responsavel
              .toLowerCase()
              .includes(filtros.responsavel.toLowerCase())
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

  const limparFiltros = () => {
    setFiltros({
      projeto: "",
      tarefa: "",
      responsavel: "",
      status: "",
      dataCriacaoInicio: "",
      dataCriacaoFim: "",
    });
    setTarefasFiltradas(tarefas);
  };

  const toggleExpandirSubtarefas = (tarefaId: number) => {
    setTarefasExpandidas((prev) =>
      prev.includes(tarefaId)
        ? prev.filter((id) => id !== tarefaId)
        : [...prev, tarefaId]
    );
  };

  const exportarPDF = () => {
    alert("Exportar relatório em PDF - (Implementar lógica)");
  };

  const exportarExcel = () => {
    alert("Exportar relatório em Excel - (Implementar lógica)");
  };

  // Gerando gráficos baseados no projeto filtrado
  const projetos = useMemo(
    () =>
      filtros.projeto
        ? Array.from(new Set(tarefasFiltradas.map((tarefa) => tarefa.projeto)))
        : Array.from(new Set(tarefas.map((tarefa) => tarefa.projeto))),
    [filtros.projeto, tarefasFiltradas, tarefas]
  );

  const graficosPorProjeto = projetos.map((projeto) => {
    const subtarefasProjeto = subtarefas.filter((subtarefa) => {
      const tarefaPai = tarefas.find((t) => t.id === subtarefa.tarefaId);
      return tarefaPai?.projeto === projeto;
    });

    const statusCount = {
      Pendente: subtarefasProjeto.filter((s) => s.status === "Pendente").length,
      "Em andamento": subtarefasProjeto.filter(
        (s) => s.status === "Em andamento"
      ).length,
      Concluída: subtarefasProjeto.filter((s) => s.status === "Concluída")
        .length,
    };

    return {
      projeto,
      data: {
        labels: ["Pendente", "Em andamento", "Concluída"],
        datasets: [
          {
            label: `Status das Subtarefas - ${projeto}`,
            data: [
              statusCount["Pendente"],
              statusCount["Em andamento"],
              statusCount["Concluída"],
            ],
            backgroundColor: ["#5F6368", "#FFB61D", "#1EC360"],
          },
        ],
      },
    };
  });

  return (
    <BaseLayout title="Relatório de Progresso de Tarefas">
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Filtros</h2>
          {/* Conteúdo do filtro permanece inalterado */}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="projeto"
              placeholder="Projeto"
              value={filtros.projeto}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="tarefa"
              placeholder="Tarefa"
              value={filtros.tarefa}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            />
            <input
              type="text"
              name="responsavel"
              placeholder="Responsável"
              value={filtros.responsavel}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            />
            <select
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
              type="date"
              name="dataCriacaoInicio"
              value={filtros.dataCriacaoInicio}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              name="dataCriacaoFim"
              value={filtros.dataCriacaoFim}
              onChange={handleFilterChange}
              className="p-2 border rounded-md"
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
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
          {/* Conteúdo da tabela permanece inalterado */}
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Ação</th>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Responsável</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Prazo</th>
              </tr>
            </thead>
            <tbody>
              {tarefasFiltradas.map((tarefa) => (
                <React.Fragment key={tarefa.id}>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-blue-500 cursor-pointer">
                      {tarefasExpandidas.includes(tarefa.id) ? (
                        <FaMinus
                          className="transition-transform"
                          onClick={() => toggleExpandirSubtarefas(tarefa.id)}
                        />
                      ) : (
                        <FaPlus
                          className="transition-transform"
                          onClick={() => toggleExpandirSubtarefas(tarefa.id)}
                        />
                      )}
                    </td>
                    <td className="px-4 py-2">{tarefa.titulo}</td>
                    <td className="px-4 py-2">{tarefa.responsavel}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tarefa.status === "Pendente"
                            ? "bg-gray-300 text-gray-700"
                            : tarefa.status === "Em andamento"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {tarefa.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {dayjs(tarefa.prazo).format("DD/MM/YYYY")}
                    </td>
                  </tr>
                  {tarefasExpandidas.includes(tarefa.id) &&
                    subtarefas
                      .filter((sub) => sub.tarefaId === tarefa.id)
                      .map((subtarefa) => (
                        <tr key={subtarefa.id} className="bg-gray-100 border-b">
                          <td className="px-4 py-2"></td>
                          <td className="pl-10 pr-4 py-2">
                            {subtarefa.titulo}
                          </td>
                          <td className="px-4 py-2">{subtarefa.responsavel}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                subtarefa.status === "Pendente"
                                  ? "bg-gray-300 text-gray-700"
                                  : subtarefa.status === "Em andamento"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-green-200 text-green-800"
                              }`}
                            >
                              {subtarefa.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            {dayjs(subtarefa.prazo).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* Seção dos gráficos */}
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

export default RelatorioProgressoDeTarefa;
