import React, { useState } from "react";

interface Usuario {
  nome: string;
  email: string;
  cargo: string;
  permissao: string;
}

interface IncluirUsuarioModalProps {
  onClose: () => void;
  onSave: (usuario: Usuario) => void;
}

const cargosDisponiveis = ["Gerente", "Analista", "Desenvolvedor", "Tester"];
const permissoesDisponiveis = ["Administrador", "Usuário"];

const IncluirUsuarioModal: React.FC<IncluirUsuarioModalProps> = ({ onClose, onSave }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cargo, setCargo] = useState<string>(cargosDisponiveis[0]);
  const [permissao, setPermissao] = useState<string>(permissoesDisponiveis[0]);

  const handleSave = () => {
    if (!nome || !email || !cargo || !permissao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Insira um email válido.");
      return;
    }
    onSave({ nome, email, cargo, permissao });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Incluir Usuário</h2>

        <label className="block text-gray-700 font-semibold mb-2">Nome do Usuário *</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Email do Usuário *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          required
        />

        <label className="block text-gray-700 font-semibold mb-2">Cargo *</label>
        <select
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        >
          {cargosDisponiveis.map((cargoOption) => (
            <option key={cargoOption} value={cargoOption}>
              {cargoOption}
            </option>
          ))}
        </select>

        <label className="block text-gray-700 font-semibold mb-2">Permissão *</label>
        <select
          value={permissao}
          onChange={(e) => setPermissao(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        >
          {permissoesDisponiveis.map((permissaoOption) => (
            <option key={permissaoOption} value={permissaoOption}>
              {permissaoOption}
            </option>
          ))}
        </select>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Salvar Usuário
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncluirUsuarioModal;
