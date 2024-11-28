import React, { useState } from "react";

interface Cliente {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}

interface ModalIncluirClienteProps {
  onClose: () => void;
  onSave: (cliente: Cliente) => void;
}

const ModalIncluirCliente: React.FC<ModalIncluirClienteProps> = ({ onClose, onSave }) => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");

  const formatarCNPJ = (valor: string) => {
    const cnpj = valor.replace(/\D/g, "").slice(0, 14);
    return cnpj
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,4})/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  };

  const formatarTelefone = (valor: string) => {
    const telefone = valor.replace(/\D/g, "").slice(0, 11);
    return telefone
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  };

  const handleSave = () => {
    if (!nome || !email || !telefone || !endereco || !cnpj) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Insira um email válido.");
      return;
    }
    if (!/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/\d{4}-\d{2}$/.test(cnpj)) {
      alert("Insira um CNPJ válido no formato 00.000.000/0000-00.");
      return;
    }
    if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone)) {
      alert("Insira um telefone válido no formato (XX) XXXXX-XXXX.");
      return;
    }
    onSave({ nome, email, telefone, endereco, cnpj });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-customYellow mb-4">Incluir Cliente</h2>

        <label className="block text-gray-700 font-semibold mb-2">Nome *</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">Telefone *</label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
          placeholder="(XX) XXXXX-XXXX"
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">Endereço *</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
        />

        <label className="block text-gray-700 font-semibold mb-2">CNPJ *</label>
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
          placeholder="00.000.000/0000-00"
          className="w-full p-2 mb-4 border rounded-md"
        />

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
            Salvar Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalIncluirCliente;
