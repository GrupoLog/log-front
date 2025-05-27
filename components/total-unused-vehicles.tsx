import { getUnusedVehiclesCountFunction } from '@/services/APIService';
import { useEffect, useState } from 'react';

function TotalUnusedVehiclesComponent() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUnusedVehiclesCountFunction();
        setTotal(data.totalVeiculosNaoUtilizados); // json nao retorna um objeto, retorna o valor direto
      } catch (error) {
        console.error('Erro ao buscar veíuclos ociosos:', error);
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

export default TotalUnusedVehiclesComponent;
