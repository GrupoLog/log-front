'use client';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getPaymentMethodsFunction } from '@/services/APIService';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const dados = await getPaymentMethodsFunction();

                const labels = dados.map(item =>
                    item.forma_pagamento.charAt(0).toUpperCase() + item.forma_pagamento.slice(1)
                );

                const valores = dados.map(item => item.receita_total);

                const backgroundColors = [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ].slice(0, labels.length);

                const borderColors = backgroundColors.map(c => c.replace('0.6', '1'));

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Receita por Forma de Pagamento (R$)',
                            data: valores,
                            backgroundColor: backgroundColors,
                            borderColor: borderColors,
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (err) {
                console.error('Erro ao buscar dados de pagamento:', err);
            }
        }

        fetchData();
    }, []);

    if (!chartData) return <p>Carregando gráfico...</p>;

    return <Pie data={chartData} />;
}
