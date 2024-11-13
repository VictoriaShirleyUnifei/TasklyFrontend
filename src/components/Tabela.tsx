// Tabela.tsx
import React from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

interface LinhaTabela {
  nome: string;
  descricao: string;
  cliente: string;
  time: string;
  inicio: string;
  final: string;
}

interface TabelaProps {
  dados: LinhaTabela[];
  onEditClick: (projeto: LinhaTabela) => void;
}

const Tabela: React.FC<TabelaProps> = ({ dados, onEditClick }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Nome do Projeto</th>
          <th className="py-2">Cliente</th>
          <th className="py-2">Time</th>
          <th className="py-2">Data de Início</th>
          <th className="py-2">Data Final</th>
          <th className="py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((projeto, index) => (
          <tr key={index} className="border-b">
            <td className="py-2">{projeto.nome}</td>
            <td className="py-2">{projeto.cliente}</td>
            <td className="py-2">{projeto.time}</td>
            <td className="py-2">{new Date(projeto.inicio).toLocaleDateString("pt-BR")}</td>
            <td className="py-2">{projeto.final === "N/A" ? "N/A" : new Date(projeto.final).toLocaleDateString("pt-BR")}</td>
            <td className="py-2 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => onEditClick(projeto)}
              >
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
              <button className="text-green-500 hover:text-green-700">
                <FaPlus />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabela;
