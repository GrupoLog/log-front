'use client';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getMonthlyRequestsCountFunction } from '@/services/APIService';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Evolução mensal das solicitações realizadas' },
    },
};

export default function LineChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getMonthlyRequestsCountFunction();

                const labels = data.map((item) =>
                    new Date(item.mes).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'short',
                    })
                );

                const valores = data.map((item) => item.qtd_solicitacoes);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Solicitações',
                            data: valores,
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.3,
                        },
                    ],
                });
            } catch (err) {
                console.error('Erro ao carregar dados do gráfico de linhas', err);
            }
        }

        fetchData();
    }, []);

    if (!chartData) return <p>Carregando gráfico...</p>;

    return <Line options={options} data={chartData} />;
}
