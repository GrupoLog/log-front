import axios from "axios";
import { useEffect, useState } from "react";
import DotsDropdown from "../DropdownMenu/DotsDropdown";
import PhoneRegisterModal from "../Modal/PhoneRegisterModal";
import PhoneEditModal from "../Modal/PhoneEditModal";
import type { Phone } from "../../types/Phone";

function PhonesTable() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [phoneToEdit, setPhoneToEdit] = useState<Phone | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openEditModal = (phone: Phone) => {
    setPhoneToEdit(phone);
    setEditModalOpen(true);
  };

  const handleAddedPhone = (newPhone: Phone) => {
    setPhones((prev) => [...prev, newPhone]);
  };

  const handleDelete = async (clientesCpf: string) => {
    const confirmed = window.confirm("Tem certeza que deseja deletar?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/telefones/${clientesCpf}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      alert("Telefone deletado com sucesso!");
      setPhones((prev) => prev.filter((p) => p.clientesCpf !== clientesCpf));
    } catch (err) {
      alert("Erro ao deletar telefone");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/telefones")
      .then((response) => setPhones(response.data))
      .catch((error) => console.error("Erro ao buscar telefones:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Lista de Telefones</h2>
        <div className="space-x-3">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Adicionar Telefone
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4">Telefone</th>
              <th className="px-6 py-4">CPF do Cliente</th>
              <th className="px-6 py-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone, index) => (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{phone.telefone}</td>
                <td className="px-6 py-4">{phone.clientesCpf}</td>
                <td className="px-6 py-4">
                  <DotsDropdown
                    onEdit={() => openEditModal(phone)}
                    onDelete={() => handleDelete(phone.clientesCpf)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PhoneRegisterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddedPhone={handleAddedPhone}
      />

      {phoneToEdit && (
        <PhoneEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          phone={phoneToEdit}
          onUpdatedPhone={(updated) => {
            setPhones((prev) =>
              prev.map((p) => (p.clientesCpf === updated.clientesCpf ? updated : p))
            );
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default PhonesTable;
