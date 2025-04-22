import axios from "axios";
import { useEffect, useState } from "react";
import type { Vehicle } from "../../types/Vehicle";

function VehiclesTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/veiculos")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Erro ao buscar veículos:", error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Lista de Veículos</h2>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
        <table className="w-full text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4">Chassi</th>
              <th className="px-6 py-4">Proprietário</th>
              <th className="px-6 py-4">Placa</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{vehicle.chassi}</td>
                <td className="px-6 py-4">{vehicle.proprietario}</td>
                <td className="px-6 py-4">{vehicle.placa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehiclesTable;
