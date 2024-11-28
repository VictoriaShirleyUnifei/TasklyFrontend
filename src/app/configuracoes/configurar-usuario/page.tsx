"use client";

import React, { useState } from "react";
import ModalIncluirUsuario from "@/components/ModalIncluirUsuario";
import ModalEditarUsuario from "@/components/ModalEditarUsuario";
import ModalDeleteUsuario from "@/components/ModalDeleteUsuario";
import Footer from "@/components/Footer";
import { FaPlus } from "react-icons/fa";
import FiltroUsuario from "@/components/FiltroUsuarios";
import TabelaUsuario from "@/components/TabelaUsuarios";
import { usuariosMock } from "@/mocks/usuariosMock";
import BaseLayout from "@/components/Generico/BaseLayout";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  permissao: string;
}

const ManterUsuarios: React.FC = () => {
  const [textoFiltro, setTextoFiltro] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>(
    usuariosMock.map((user) => ({
      ...user,
      id: user.id.toString(),
    }))
  );

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<Usuario | null>(null);
  const [mostrarModalIncluir, setMostrarModalIncluir] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const texto = textoFiltro.toLowerCase();
    return (
      usuario.nome.toLowerCase().includes(texto) ||
      usuario.email.toLowerCase().includes(texto) ||
      usuario.cargo.toLowerCase().includes(texto)
    );
  });

  const handleIncluirUsuario = (novoUsuario: Omit<Usuario, "id">) => {
    const emailExistente = usuarios.some(
      (usuario) => usuario.email.toLowerCase() === novoUsuario.email.toLowerCase()
    );

    if (emailExistente) {
      alert("O email do usuário já existe no sistema.");
      return;
    }

    const novoUsuarioComId = { ...novoUsuario, id: Date.now().toString() };
    setUsuarios((prevUsuarios) => [...prevUsuarios, novoUsuarioComId]);
    setMostrarModalIncluir(false);
    setToastMessage("Usuário incluído com sucesso!");
    setToastType("success");
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  const handleEditarUsuario = (usuarioEditado: Usuario): boolean => {
    const emailExistente = usuarios.some(
      (usuario) =>
        usuario.email.toLowerCase() === usuarioEditado.email.toLowerCase() &&
        usuario.id !== usuarioEditado.id
    );

    if (emailExistente) {
      alert("O email do usuário já existe no sistema.");
      return false; // Indica falha na validação
    }

    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === usuarioEditado.id ? usuarioEditado : usuario
      )
    );

    setToastMessage("Usuário editado com sucesso!");
    setToastType("success");
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);

    return true; // Indica sucesso
  };

  const verificarDependencias = (usuarioId: string): boolean => {
    // Simulação de verificação de dependências
    // Aqui, você pode adicionar lógica para verificar se o usuário está associado a tarefas ou projetos.
    // Retorne true se houver dependências e false caso contrário.
    // No exemplo, vamos assumir que o usuário com ID "2" possui dependências.
    return usuarioId === "2";
  };

  const handleRemoverUsuario = (usuarioId: string) => {
    if (verificarDependencias(usuarioId)) {
      alert("Não é possível remover o usuário. Ele possui tarefas ou projetos associados.");
      return;
    }

    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((usuario) => usuario.id !== usuarioId)
    );
    setUsuarioParaExcluir(null);
    setToastMessage("Usuário removido com sucesso!");
    setToastType("success");
    setTimeout(() => {
      setToastMessage(null);
      setToastType(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <BaseLayout title="Configurar Usuários">
        <div className="flex-1 space-y-4">
          <FiltroUsuario textoFiltro={textoFiltro} definirTextoFiltro={setTextoFiltro} />

          <TabelaUsuario
            dados={usuariosFiltrados}
            onEditClick={setUsuarioSelecionado}
            onDeleteClick={setUsuarioParaExcluir}
          />

          <button
            onClick={() => setMostrarModalIncluir(true)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition duration-200"
          >
            <FaPlus /> <span>Incluir Usuário</span>
          </button>

          {mostrarModalIncluir && (
            <ModalIncluirUsuario
              onClose={() => setMostrarModalIncluir(false)}
              onSave={handleIncluirUsuario}
            />
          )}

          {usuarioSelecionado && (
            <ModalEditarUsuario
              usuario={usuarioSelecionado}
              onClose={() => setUsuarioSelecionado(null)}
              onSave={(usuarioEditado) => {
                const isSaved = handleEditarUsuario(usuarioEditado);
                if (isSaved) {
                  setUsuarioSelecionado(null); // Fecha o modal somente em caso de sucesso
                }
              }}
            />
          )}

          {usuarioParaExcluir && (
            <ModalDeleteUsuario
              usuario={usuarioParaExcluir}
              onClose={() => setUsuarioParaExcluir(null)}
              onDelete={() => {
                handleRemoverUsuario(usuarioParaExcluir.id);
              }}
              verificarDependencias={verificarDependencias}
            />
          )}

          {toastMessage && toastType === "success" && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-transform transform bg-green-500`}
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

export default ManterUsuarios;
