"use client";
import React from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Importe useRouter
import { LinhaTabela } from "@/app/projetos/page";

interface TabelaProps {
  dados: LinhaTabela[];
  onEditClick: (projeto: LinhaTabela) => void;
  onDeleteClick: (projeto: LinhaTabela) => void;
  onDetailClick: (projeto: LinhaTabela) => void;
}

const Tabela: React.FC<TabelaProps> = ({ dados, onEditClick, onDeleteClick, onDetailClick }) => {
  const router = useRouter(); // Use o hook useRouter

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white rounded-lg overflow-hidden border border-gray-200">
        <thead style={{ backgroundColor: "#5F6368" }}>
          <tr>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Cliente</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Início</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Final</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dados.map((item) => (
            <tr key={item.nome}>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm font-bold text-customYellow text-center cursor-pointer"
                onClick={() => onDetailClick(item)}
              >
                {item.nome}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.descricao}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.cliente}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.inicio}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">{item.final}</td>
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
                  onClick={() => router.push(`/projetos/${item.nome}`)}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md transition duration-150"
                  title="Detalhes"
                >
                  <FaEye />
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

export default Tabela;
