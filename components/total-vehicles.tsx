import { getTotalVehiclesCountFunction } from '@/services/APIService';
import { useEffect, useState } from 'react';

function TotalVehiclesComponent() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTotalVehiclesCountFunction();
        setTotal(data.totalVeiculos); // json nao retorna um objeto, retorna o valor direto
      } catch (error) {
        console.error('Erro ao buscar contagem de veíuclos:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="text-2xl font-bold">
      {total !== null ? `${total}` : 'Carregando...'}
    </div>
  );
}

export default TotalVehiclesComponent;
