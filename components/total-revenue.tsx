import { getTotalRevenueFunction } from '@/services/APIService';
import { useEffect, useState } from 'react';

function RevenueComponent() {
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTotalRevenueFunction();
        setRevenue(data); // json nao retorna um objeto, retorna o valor direto
      } catch (error) {
        console.error('Erro ao buscar faturamento:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="text-2xl font-bold">
      {revenue !== null ? `R$${revenue}` : 'Carregando...'}
    </div>
  );
}

export default RevenueComponent;
