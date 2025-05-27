import { getThirdPartyVehiclesPercentageFunction } from '@/services/APIService';
import { useEffect, useState } from 'react';

function ThirdPartyPercentageComponent() {
    const [total, setTotal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getThirdPartyVehiclesPercentageFunction();
                setTotal(data.percentagemTerceirizados); // json nao retorna um objeto, retorna o valor direto
            } catch (error) {
                console.error('Erro ao buscar veíuclos terceirizados:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="text-2xl font-bold">
            {total !== null ? `${Number(total).toFixed(2)}` : 'Carregando...'} %
        </div>
    );
}

export default ThirdPartyPercentageComponent;
