import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-12">
        <div>Perfil Administrador</div>
        <div>
          <IoSettingsOutline size={28} />
        </div>
      </div>
    </>
  );
}
