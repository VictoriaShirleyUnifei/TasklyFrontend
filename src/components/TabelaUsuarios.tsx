"use client";
import { usuariosMock } from "@/mocks/usuariosMock";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  permissao: string;
}

interface TabelaUsuarioProps {
  dados?: Usuario[]; // Tornando a prop opcional
  onEditClick: (usuario: Usuario) => void;
  onDeleteClick: (usuario: Usuario) => void;
}

const TabelaUsuario: React.FC<TabelaUsuarioProps> = ({
  dados = usuariosMock, // Utilizando o mock como valor padrão
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
              Cargo
            </th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
              Permissão
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
                {item.nome}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {item.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {item.cargo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                {item.permissao}
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

export default TabelaUsuario;
