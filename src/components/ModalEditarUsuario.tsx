import React, { useState } from "react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  permissao: string;
}

interface EditarUsuarioModalProps {
  usuario: Usuario;
  onClose: () => void;
  onSave: (updatedUsuario: Usuario) => boolean; // Retorna booleano indicando sucesso ou falha
}

const cargosDisponiveis = ["Gerente", "Analista", "Desenvolvedor", "Tester"];
const permissoesDisponiveis = ["Administrador", "Usuário", "Cliente"];

const EditarUsuarioModal: React.FC<EditarUsuarioModalProps> = ({
  usuario,
  onClose,
  onSave,
}) => {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [cargo, setCargo] = useState(usuario.cargo);
  const [permissao, setPermissao] = useState(usuario.permissao);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndSave = () => {
    setErrorMessage(null); // Limpa mensagens de erro anteriores

    // Validações de campos obrigatórios e formato de email
    if (nome.trim() === "" || email.trim() === "") {
      setErrorMessage("Os campos Nome e Email são obrigatórios.");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErrorMessage("Insira um email válido.");
      return;
    }

    // Chama a função de salvamento e captura erros
    const isSaved = onSave({
      ...usuario,
      nome,
      email,
      cargo,
      permissao,
    });

    if (!isSaved) {
      return; // Não fecha o modal
    }

    onClose(); // Fecha o modal somente se não houver erros
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Alterar Usuário</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Campo de entrada do nome do usuário */}
        <label className="block text-gray-700 font-semibold mb-2">Nome do Usuário *</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Campo de entrada do email do usuário */}
        <label className="block text-gray-700 font-semibold mb-2">Email do Usuário *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {/* Campo de seleção do cargo */}
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

        {/* Campo de seleção da permissão */}
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
            onClick={validateAndSave}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuarioModal;
