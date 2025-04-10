import React, { useState } from "react";
import { Client } from "../../types/Client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddedClient: (client: Client) => void;
}

const ClientRegisterModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAddedClient,
}) => {
  const [form, setForm] = useState<Client>({
    cpf: "",
    nome: "",
    sobrenome: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("Status da resposta:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro do servidor:", errorText);
        throw new Error("Resposta não ok.");
      }

      const savedClient = await response.json();
      onAddedClient(savedClient);
      onClose();
      setForm({
        cpf: "",
        nome: "",
        sobrenome: "",
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
      });
    } catch (error) {
      console.error("Erro no catch do modal:", error);
      alert("Caiu no catch do modal.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-md dark:bg-gray-700">
        <div className="flex items-center justify-between border-b pb-3 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Adicionar Cliente
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                CPF
              </label>
              <input
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Nome
              </label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Sobrenome
              </label>
              <input
                name="sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Cidade
              </label>
              <input
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Rua
              </label>
              <input
                name="rua"
                value={form.rua}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Bairro
              </label>
              <input
                name="bairro"
                value={form.bairro}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Número
              </label>
              <input
                name="numero"
                value={form.numero}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm text-white hover:bg-blue-800"
          >
            Salvar cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientRegisterModal;
