"use client";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}

interface TabelaClientesProps {
  dados: Cliente[];
  onEditClick: (cliente: Cliente) => void;
  onDeleteClick: (cliente: Cliente) => void;
}

const TabelaClientes: React.FC<TabelaClientesProps> = ({
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
              Nome
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Telefone
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Endereço
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              CNPJ
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dados.map((cliente) => (
            <tr key={cliente.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
                {cliente.nome}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {cliente.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {cliente.telefone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {cliente.endereco}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {cliente.cnpj}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(cliente);
                  }}
                  className="text-white bg-customYellow hover:bg-yellow-600 px-3 py-2 rounded-md transition duration-150"
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(cliente);
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

export default TabelaClientes;
