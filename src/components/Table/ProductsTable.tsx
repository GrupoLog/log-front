import axios from "axios";
import { useEffect, useState } from "react";
import DotsDropdown from "../DropdownMenu/DotsDropdown";
import ProductRegisterModal from "../Modal/ProductRegisterModal";
import ProductEditModal from "../Modal/ProductEditModal";
import type { Product } from "../../types/Product";

function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setEditModalOpen(true);
  };

  const handleAddedProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleDelete = async (idProduto: number) => {
    const confirmed = window.confirm("Tem certeza que deseja deletar?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:8080/produtos/${idProduto}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      alert("Produto deletado com sucesso!");
      setProducts((prev) => prev.filter((p) => p.idProduto !== idProduto));
    } catch (err) {
      alert("Erro ao deletar produto");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/produtos")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Lista de Produtos</h2>
        <div className="space-x-3">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Adicionar Produto
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4">ID Produto</th>
              <th className="px-6 py-4">Peso</th>
              <th className="px-6 py-4">Data de Validade</th>
              <th className="px-6 py-4">Descrição</th>
              <th className="px-6 py-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{product.idProduto}</td>
                <td className="px-6 py-4">{product.peso}</td>
                <td className="px-6 py-4">{product.dataValidade}</td>
                <td className="px-6 py-4">{product.descricao}</td>
                <td className="px-6 py-4">
                  <DotsDropdown
                    onEdit={() => openEditModal(product)}
                    onDelete={() => handleDelete(product.idProduto)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductRegisterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddedProduct={handleAddedProduct}
      />

      {productToEdit && (
        <ProductEditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={productToEdit}
          onUpdatedProduct={(updated) => {
            setProducts((prev) =>
              prev.map((p) => (p.idProduto === updated.idProduto ? updated : p))
            );
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default ProductsTable;
