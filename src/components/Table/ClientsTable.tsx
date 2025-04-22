import axios from "axios";
import { useEffect, useState } from "react";
import DotsDropdown from "../DropdownMenu/DotsDropdown";
import ClientRegisterModal from "../Modal/ClientRegisterModal";
import type { Client } from "../../types/Client";
import ClientEditModal from "../Modal/ClientEditModal";

function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openEditModal = (client: Client) => {
    setClientToEdit(client);
    setEditModalOpen(true);
  };

  const handleAddedClient = (newClient: Client) => {
    setClients((prev) => [...prev, newClient]);
  };

  const handleDelete = async (cpf: string) => {
    const confirmed = window.confirm("Tem certeza que deseja deletar?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/clientes/${cpf}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      alert("Item deletado com sucesso!");
      setClients((prev) => prev.filter((c) => c.cpf !== cpf));
    } catch (err) {
      alert("Erro ao deletar");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/clientes")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Erro ao buscar clientes:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Lista de Clientes</h2>
        <div className="space-x-3">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Adicionar Cliente
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4">CPF</th>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Sobrenome</th>
              <th className="px-6 py-4">Rua</th>
              <th className="px-6 py-4">Bairro</th>
              <th className="px-6 py-4">Número</th>
              <th className="px-6 py-4">Cidade</th>
              <th className="px-6 py-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{client.cpf}</td>
                <td className="px-6 py-4">{client.nome}</td>
                <td className="px-6 py-4">{client.sobrenome}</td>
                <td className="px-6 py-4">{client.rua}</td>
                <td className="px-6 py-4">{client.bairro}</td>
                <td className="px-6 py-4">{client.numero}</td>
                <td className="px-6 py-4">{client.cidade}</td>
                <td className="px-6 py-4">
                  <DotsDropdown
                    onEdit={() => openEditModal(client)}
                    onDelete={() => handleDelete(client.cpf)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ClientRegisterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddedClient={handleAddedClient}
      />

      {clientToEdit && (
        <ClientEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          client={clientToEdit}
          onUpdatedClient={(updated) => {
            setClients((prev) =>
              prev.map((c) => (c.cpf === updated.cpf ? updated : c))
            );
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default ClientsTable;
