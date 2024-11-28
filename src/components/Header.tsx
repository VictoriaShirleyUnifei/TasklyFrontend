import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiCircleCheck, CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // Hook para navegação

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-end gap-4">
        <p>Perfil Administrador</p>
        <IoSettingsOutline
          size={28}
          className="cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-56">
          <ul className="text-sm">
            <li
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push("/configuracoes/configurar-status")}
            >
              <CiCircleCheck size={20} />
              Configurar Status
            </li>
            <li
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push("/configuracoes/configurar-usuario")}
            >
              <CiUser size={20} />
              Configurar Usuários
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
