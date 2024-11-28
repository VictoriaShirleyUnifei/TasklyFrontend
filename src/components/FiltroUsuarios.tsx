import React from "react";

interface FiltroUsuarioProps {
  textoFiltro: string;
  definirTextoFiltro: (texto: string) => void;
}

const FiltroUsuario: React.FC<FiltroUsuarioProps> = ({ textoFiltro, definirTextoFiltro }) => {
  return (
    <div className="flex items-center mb-6 w-full">
      <div className="relative w-full max-w-[325px]">
        <input
          id="input-filtro-usuario"
          type="text"
          value={textoFiltro}
          onChange={(e) => definirTextoFiltro(e.target.value)}
          placeholder="Digite o nome, email ou cargo"
          className="pl-12 pr-90 py-3 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F0CF8B] focus:border-[#F0CF8B] w-full bg-white text-gray-700 placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10.5 18.5A8 8 0 1010.5 2a8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FiltroUsuario;
