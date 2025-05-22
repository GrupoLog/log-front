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
import { getMonthlyRevenueByTypeFunction } from '@/services/APIService';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: { display: true, position: 'top' },
        title: {
            display: true,
            text: 'Receita Total por Tipo de Serviço',
        },
    },
};

export default function VerticalBarChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getMonthlyRevenueByTypeFunction();

                const labels = data.map((item) =>
                    item.tipo_servico.charAt(0).toUpperCase() + item.tipo_servico.slice(1)
                );

                const valores = data.map((item) => item.receita_total);

                setChartData({
                    labels: ['Receita'],
                    datasets: [
                        {
                            label: 'Receita das Entregas (R$)',
                            data: [33.5],
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Receita dos Transportes (R$)',
                            data: [17.5],
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

            } catch (err) {
                console.error('Erro ao carregar gráfico de receita por serviço:', err);
            }
        }

        fetchData();
    }, []);

    if (!chartData) return <p>Carregando gráfico...</p>;

    return <Bar options={options} data={chartData} />;
}
