"use client";

import React, { useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import ModalIncluirUsuario from "@/components/ModalIncluirUsuario"; // Modal para incluir usuário
import ModalEditarUsuario from "@/components/ModalEditarUsuario"; // Modal para editar usuário
import ModalDeleteUsuario from "@/components/ModalDeleteUsuario"; // Modal para remover usuário
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";
import { FaPlus } from "react-icons/fa";
import FiltroUsuarios from "@/components/FiltroUsuarios";
import TabelaUsuario from "@/components/TabelaUsuarios";
import { usuariosMock } from "@/mocks/usuariosMock";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  permissao: string;
}

const ManterUsuarios: React.FC = () => {
  const [textoFiltro, setTextoFiltro] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock.map((user) => ({
    ...user,
    id: user.id.toString(),
  })));

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<Usuario | null>(null);
  const [mostrarModalIncluir, setMostrarModalIncluir] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(textoFiltro.toLowerCase())
  );

  const handleIncluirUsuario = (novoUsuario: Omit<Usuario, "id">) => {
    const novoUsuarioComId = { ...novoUsuario, id: Date.now().toString() };
    setUsuarios((prevUsuarios) => [...prevUsuarios, novoUsuarioComId]);
    setMostrarModalIncluir(false);
    triggerToast("Usuário incluído com sucesso!");
  };

  const handleEditarUsuario = (usuarioEditado: Usuario) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === usuarioEditado.id ? usuarioEditado : usuario
      )
    );
    setUsuarioSelecionado(null);
    triggerToast("Usuário editado com sucesso!");
  };

  const handleRemoverUsuario = (usuarioId: string) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.filter((usuario) => usuario.id !== usuarioId)
    );
    setUsuarioParaExcluir(null);
    triggerToast("Usuário removido com sucesso!");
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <BaseLayout title="Manter Usuários">
        <div className="flex-1 space-y-4">
          <FiltroUsuarios textoFiltro={textoFiltro} setTextoFiltro={setTextoFiltro} />

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
              onSave={handleEditarUsuario}
            />
          )}

          {usuarioParaExcluir && (
            <ModalDeleteUsuario
              usuario={usuarioParaExcluir}
              onClose={() => setUsuarioParaExcluir(null)}
              onDelete={() => handleRemoverUsuario(usuarioParaExcluir.id)}
            />
          )}
        </div>
      </BaseLayout>

      <Footer />

      {showToast && <Toast message={toastMessage} show={showToast} />}
    </div>
  );
};

export default ManterUsuarios;
