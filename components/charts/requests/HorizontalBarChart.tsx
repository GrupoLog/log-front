'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getTopClientsFunction } from '@/services/APIService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HorizontalBarClientesChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const dados = await getTopClientsFunction();
                const labels = dados.map(item => item.nome);
                const valores = dados.map(item => item.total_solicitacoes);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total de Solicitações do Cliente',
                            data: valores,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

        fetchData();
    }, []);

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: {
                display: true,
                text: 'Solicitações por Cliente',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
            },
        },
    };

    if (!chartData) return <p>Carregando gráfico...</p>;

    return <Bar data={chartData} options={options} />;
}
