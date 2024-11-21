"use client";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LinhaTabela } from "@/app/projetos/page";

const statusStyles: Record<string, string> = {
  "Cinza (Pendentes)": "bg-gray-300 text-gray-700",
  "Amarelo (Em andamento)": "bg-yellow-200 text-yellow-800",
  "Verde (Concluídas)": "bg-green-200 text-green-800",
  "Vermelho (Urgentes)": "bg-red-200 text-red-800",
};

interface Status {
  id: string;
  nome: string;
  descricao: string;
  cor: keyof typeof statusStyles; // Nova propriedade para a cor do status
}

interface TabelaStatusProps {
  dados: Status[];
  onEditClick: (status: Status) => void;
  onDeleteClick: (status: Status) => void;
}

const TabelaStatus: React.FC<TabelaStatusProps> = ({
  dados = [],
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
        <thead style={{ backgroundColor: "#5F6368" }}>
          <tr>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dados.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
                <span
                  className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${statusStyles[item.cor]}`}
                >
                  {item.nome}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {item.descricao}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(item);
                  }}
                  className="text-white bg-customYellow hover:bg-yellow-600 px-3 py-2 rounded-md transition duration-150"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(item);
                  }}
                  className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md transition duration-150"
                  title="Excluir"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaStatus;
