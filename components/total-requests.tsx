import { getTotalRequestsFunction } from '@/services/APIService';
import { useEffect, useState } from 'react';

function TotalRequestsComponent() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTotalRequestsFunction();
        setTotal(data.total_requests); // json nao retorna um objeto, retorna o valor direto
      } catch (error) {
        console.error('Erro ao buscar faturamento:', error);
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

export default TotalRequestsComponent;
