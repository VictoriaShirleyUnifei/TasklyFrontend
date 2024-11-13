import React from "react";

interface FiltroProps {
  textoFiltro: string;
  definirTextoFiltro: (texto: string) => void;
}

const Filtro: React.FC<FiltroProps> = ({ textoFiltro, definirTextoFiltro }) => {
  return (
    <div className="flex items-center mb-4">
      <label htmlFor="input-filtro" className="mr-2 text-sm font-medium text-gray-700">
      </label>
      <div className="relative">
        <input
          id="input-filtro"
          type="text"
          value={textoFiltro}
          onChange={(e) => definirTextoFiltro(e.target.value)}
          placeholder="Digite o nome, cliente ou time"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
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

export default Filtro;
