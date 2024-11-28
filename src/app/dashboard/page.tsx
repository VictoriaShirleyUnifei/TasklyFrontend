"use client";
import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import Filtro from "@/components/FiltroProjetos";
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
import BaseLayout from "@/components/Generico/BaseLayout";

// Imports para o gráfico de barras
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registrando componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: string;
  prazo: string;
  projeto: string;
}

interface LinhaTabela {
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
}

const Dashboard: React.FC = () => {
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

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  // Calculando a quantidade de clientes
  const quantidadeDeClientes = useMemo(() => {
    const clientes = dados.map((projeto) => projeto.cliente);
    return new Set(clientes).size; // Usando Set para contar clientes únicos
  }, [dados]);

  // Calculando a quantidade de projetos
  const quantidadeDeProjetos = dados.length;

  // Contando o status das tarefas para o gráfico de barras
  const statusTarefas = tarefasMock.reduce(
    (acc, tarefa) => {
      acc[tarefa.status]++;
      return acc;
    },
    { Pendente: 0, "Em andamento": 0, Concluída: 0 }
  );

  // Dados do gráfico de barras
  const dadosGraficoBarras = {
    labels: ["Pendente", "Em andamento", "Concluída"],
    datasets: [
      {
        label: "Status das Tarefas",
        data: [
          statusTarefas.Pendente,
          statusTarefas["Em andamento"],
          statusTarefas.Concluída,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#FF4384", "#35A1EB", "#FFBE56"],
        borderWidth: 1,
      },
    ],
  };

  // Funções de manipulação do projeto
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <BaseLayout title="Dashboard">
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-1 space-y-4">

          {/* Exibindo quantidade de clientes e projetos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-md text-center">
              <h3 className="text-lg font-semibold">Quantidade de Clientes</h3>
              <p className="text-2xl font-bold">{quantidadeDeClientes}</p>
            </div>

            <div className="bg-white p-4 rounded shadow-md text-center">
              <h3 className="text-lg font-semibold">Quantidade de Projetos</h3>
              <p className="text-2xl font-bold">{quantidadeDeProjetos}</p>
            </div>
          </div>

          {/* Gráfico de Barras de Status das Tarefas */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-center">Status das Tarefas</h3>
            <div className="p-4 border rounded-lg shadow-sm bg-gray-50 w-[500px] h-64">
              <Bar
                data={dadosGraficoBarras}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </BaseLayout>
  );
};

export default Dashboard;
