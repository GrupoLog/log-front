import React, { useState, useEffect } from "react";
import { Product } from "../../types/Product";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onUpdatedProduct: (updated: Product) => void;
}

const ProductEditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  product,
  onUpdatedProduct,
}) => {
  const [form, setForm] = useState<Product>(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/produtos/${product.idProduto}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Erro response ao atualizar produto.");

      const updatedProduct = await response.json();
      onUpdatedProduct(updatedProduct);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar produto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-md dark:bg-gray-700">
        <div className="flex items-center justify-between border-b pb-3 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Editar Produto
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
                ID Produto
              </label>
              <input
                name="idProduto"
                type="number"
                value={form.idProduto}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
                disabled
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Peso
              </label>
              <input
                name="peso"
                type="number"
                value={form.peso}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Data de Validade
              </label>
              <input
                name="dataValidade"
                type="date"
                value={form.dataValidade}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Descrição
              </label>
              <input
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm text-white hover:bg-green-700"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
