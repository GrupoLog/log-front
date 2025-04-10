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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex w-full items-center justify-between pr-4 pb-2 pl-4">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none"
        >
          Adicionar cliente
        </button>

        <button
          type="button"
          className="rounded-2xl bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
        >
          Deletar cliente
        </button>

        <ClientRegisterModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddedClient={handleAddedClient}
        />
      </div>

      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              CPF
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Sobrenome
            </th>
            <th scope="col" className="px-6 py-3">
              Rua
            </th>
            <th scope="col" className="px-6 py-3">
              Bairro
            </th>
            <th scope="col" className="px-6 py-3">
              Número
            </th>
            <th scope="col" className="px-6 py-3">
              Cidade
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {client.cpf}
              </th>
              <td className="px-6 py-4">{client.nome}</td>
              <td className="px-6 py-4">{client.sobrenome}</td>
              <td className="px-6 py-4">{client.rua}</td>
              <td className="px-6 py-4">{client.bairro}</td>
              <td className="px-6 py-4">{client.numero}</td>
              <td className="px-6 py-4">{client.cidade}</td>
              <td className="px-6 py-4 text-left">
                <DotsDropdown
                  onEdit={() => openEditModal(client)}
                  onDelete={() => handleDelete(client.cpf)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clientToEdit && (
        <ClientEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          client={clientToEdit}
          onUpdatedClient={(updated) => {
            setClients((prev) =>
              prev.map((c) => (c.cpf === updated.cpf ? updated : c)),
            );
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default ClientsTable;
