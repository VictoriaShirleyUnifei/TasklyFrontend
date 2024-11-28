"use client";

import React, { useState } from "react";
import ModalIncluirCliente from "@/components/ModalIncluirCliente";
import ModalEditarCliente from "@/components/ModalEditarCliente";
import ModalExcluirCliente from "@/components/ModalExcluirCliente";
import FiltroCliente from "@/components/FiltroCliente";
import TabelaClientes from "@/components/TabelaClientes";
import Footer from "@/components/Footer";
import BaseLayout from "@/components/Generico/BaseLayout";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}

const ManterClientes: React.FC = () => {
  const [textoFiltro, setTextoFiltro] = useState<string>("");
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nome: "Cliente A",
      email: "clienteA@empresa.com",
      telefone: "(31) 99999-9999",
      endereco: "Rua A, 123",
      cnpj: "12.345.678/0001-00",
    },
    {
      id: "2",
      nome: "Cliente B",
      email: "clienteB@empresa.com",
      telefone: "(21) 98888-8888",
      endereco: "Rua B, 456",
      cnpj: "98.765.432/0001-11",
    },
  ]);

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [clienteParaExcluir, setClienteParaExcluir] = useState<Cliente | null>(null);
  const [mostrarModalIncluir, setMostrarModalIncluir] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const clientesFiltrados = clientes.filter((cliente) => {
    const texto = textoFiltro.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(texto) ||
      cliente.email.toLowerCase().includes(texto) ||
      cliente.telefone.includes(texto) ||
      cliente.cnpj.includes(texto)
    );
  });

  const handleIncluirCliente = (novoCliente: Omit<Cliente, "id">) => {
    const emailExistente = clientes.some(
      (cliente) => cliente.email.toLowerCase() === novoCliente.email.toLowerCase()
    );

    if (emailExistente) {
      alert("O email do cliente já existe no sistema.");
      return;
    }

    const novoClienteComId = { ...novoCliente, id: Date.now().toString() };
    setClientes((prevClientes) => [...prevClientes, novoClienteComId]);
    setMostrarModalIncluir(false);
    setToastMessage("Cliente incluído com sucesso!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleEditarCliente = (clienteEditado: Cliente): string | null => {
    const emailExistente = clientes.some(
      (cliente) =>
        cliente.email.toLowerCase() === clienteEditado.email.toLowerCase() &&
        cliente.id !== clienteEditado.id
    );

    if (emailExistente) {
      return "O email do cliente já existe no sistema.";
    }

    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.id === clienteEditado.id ? clienteEditado : cliente
      )
    );
    setToastMessage("Cliente editado com sucesso!");
    setTimeout(() => setToastMessage(null), 3000);

    return null; // Indica sucesso
  };

  const handleRemoverCliente = (clienteId: string) => {
    setClientes((prevClientes) =>
      prevClientes.filter((cliente) => cliente.id !== clienteId)
    );
    setClienteParaExcluir(null);
    setToastMessage("Cliente removido com sucesso!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <BaseLayout title="Manter Clientes">
        <div className="flex-1 space-y-4">
          
          <FiltroCliente textoFiltro={textoFiltro} definirTextoFiltro={setTextoFiltro} />

          <TabelaClientes
            dados={clientesFiltrados}
            onEditClick={setClienteSelecionado}
            onDeleteClick={setClienteParaExcluir}
          />

          <button
            onClick={() => setMostrarModalIncluir(true)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
          >
            <span>Incluir Cliente</span>
          </button>

          {mostrarModalIncluir && (
            <ModalIncluirCliente
              onClose={() => setMostrarModalIncluir(false)}
              onSave={handleIncluirCliente}
            />
          )}

          {clienteSelecionado && (
            <ModalEditarCliente
              cliente={clienteSelecionado}
              onClose={() => setClienteSelecionado(null)}
              onSave={(clienteEditado: Cliente) => {
                const error = handleEditarCliente(clienteEditado);
                if (error) {
                  alert(error);
                  return; // Não fecha o modal em caso de erro
                }
                setClienteSelecionado(null); // Fecha o modal somente em caso de sucesso
              }}
            />
          )}

          {clienteParaExcluir && (
            <ModalExcluirCliente
              cliente={clienteParaExcluir}
              onClose={() => setClienteParaExcluir(null)}
              onDelete={() => handleRemoverCliente(clienteParaExcluir.id)}
            />
          )}

          {toastMessage && (
            <div
              className="fixed top-4 right-4 p-4 rounded-md shadow-lg text-white bg-green-500"
            >
              <p>{toastMessage}</p>
            </div>
          )}
        </div>
      </BaseLayout>

      <Footer />
    </div>
  );
};

export default ManterClientes;
