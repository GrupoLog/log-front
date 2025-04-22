import axios from "axios";
import { useEffect, useState } from "react";
import DotsDropdown from "../DropdownMenu/DotsDropdown";
import type { Solicitacao } from "../../types/Solicitacao";

function SolicitacoesTable() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja deletar?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/solicitacoes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      alert("Solicitação deletada com sucesso!");
      setSolicitacoes((prev) => prev.filter((s) => s.id_solicitacao !== id));
    } catch (err) {
      alert("Erro ao deletar");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/solicitacoes")
      .then((response) => {
        console.log("Solicitações:", response.data); // 👈 Adicione isso
        setSolicitacoes(response.data);
      })
      .catch((error) => console.error("Erro ao buscar solicitações:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Lista de Solicitações</h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Pagamento</th>
              <th className="px-6 py-4">Valor</th>
              <th className="px-6 py-4">Produto ID</th>
              <th className="px-6 py-4">CPF Cliente</th>
              <th className="px-6 py-4">Serviço ID</th>
              <th className="px-6 py-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((solicitacao) => (
              <tr
                key={solicitacao.id_solicitacao}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{solicitacao.id_solicitacao}</td>
                <td className="px-6 py-4">{new Date(solicitacao.data_solicitacao).toLocaleDateString()}</td>
                <td className="px-6 py-4">{solicitacao.formna_pagamento}</td>
                <td className="px-6 py-4">R$ {solicitacao.valor_pagamento.toFixed(2)}</td>
                <td className="px-6 py-4">{solicitacao.id_produto}</td>
                <td className="px-6 py-4">{solicitacao.clientes_cpf}</td>
                <td className="px-6 py-4">{solicitacao.id_servico}</td>
                <td className="px-6 py-4">
                  <DotsDropdown
                    onEdit={() => alert("Editar ainda não implementado")}
                    onDelete={() => handleDelete(solicitacao.id_solicitacao)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SolicitacoesTable;
