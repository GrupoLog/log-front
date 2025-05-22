import { getMediumTicketFunction } from '@/services/APIService';
import { useEffect, useState } from 'react';

function MediumTicketComponent() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMediumTicketFunction();
        setTotal(data.ticket_medio); // json nao retorna um objeto, retorna o valor direto
      } catch (error) {
        console.error('Erro ao buscar faturamento:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="text-2xl font-bold">
      {total !== null ? `R$${total}` : 'Carregando...'}
    </div>
  );
}

export default MediumTicketComponent;
