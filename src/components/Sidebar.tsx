"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("");
  const [isConfigExpanded, setIsConfigExpanded] = useState(false);

  // Atualize a rota atual apenas no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentRoute(window.location.pathname);
    }
  }, []);

  // Função para verificar se a rota está ativa
  const isActive = (path: string) => currentRoute === path;

  // Função para alternar a expansão da sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Função para alternar a expansão do submenu de configurações
  const toggleConfigSubmenu = () => {
    setIsConfigExpanded(!isConfigExpanded);
  };

  return (
    <div
      className={`flex flex-col gap-6 ${
        isExpanded ? "w-64" : "w-20"
      } bg-secondary text-white min-h-screen transition-all duration-300`}
    >
      {/* Header da Sidebar */}
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" />
          {isExpanded && <div className="font-medium text-2xl">Taskly!</div>}
        </div>
        {/* Botão para alternar a expansão da sidebar */}
        <button onClick={toggleSidebar} className="text-white">
          {isExpanded ? (
            <FiChevronLeft size={20} />
          ) : (
            <FiChevronRight size={20} />
          )}
        </button>
      </div>

      {/* Menu da Sidebar - Ícones sempre visíveis e textos alinhados */}
      <div className="flex flex-col items-start gap-2 px-4">
        {/* Navegação para o Dashboard */}
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full ${
            isActive("/dashboard")
              ? "text-primary bg-white/10"
              : "hover:text-primary hover:bg-white/10"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          <MdOutlineDashboard size={24} />
          {isExpanded && <p className="pl-2">Dashboard</p>}
        </div>

        {/* Navegação para Projetos */}
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full ${
            isActive("/projetos")
              ? "text-primary bg-white/10"
              : "hover:text-primary hover:bg-white/10"
          }`}
          onClick={() => router.push("/projetos")}
        >
          <FaRegFolder size={24} />
          {isExpanded && <p className="pl-2">Projetos</p>}
        </div>

        {/* Navegação para Clientes */}
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full ${
            isActive("/clientes")
              ? "text-primary bg-white/10"
              : "hover:text-primary hover:bg-white/10"
          }`}
          onClick={() => router.push("/clientes")}
        >
          <BsPerson size={24} />
          {isExpanded && <p className="pl-2">Clientes</p>}
        </div>

        {/* Navegação para Relatórios */}
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer w-full ${
            isActive("/relatorios")
              ? "text-primary bg-white/10"
              : "hover:text-primary hover:bg-white/10"
          }`}
          onClick={() => router.push("/relatorios")}
        >
          <VscGraph size={24} />
          {isExpanded && <p className="pl-2">Relatórios</p>}
        </div>
      </div>
    </div>
  );
}
