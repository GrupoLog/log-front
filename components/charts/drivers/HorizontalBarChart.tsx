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
import { getMostFrequentDestinationFunction } from '@/services/APIService'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HorizontalBarChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getMostFrequentDestinationFunction();

            const motoristas = data.map(d => d.nome);

            // Pega todos os destinos únicos
            const destinosUnicos = [
                ...new Set(data.flatMap(d => d.destinos.map(dest => dest.destino))),
            ];

            // Define cores aleatórias ou fixas
            const cores = [
                'rgba(100, 149, 237, 0.6)',  // azul suave
                'rgba(144, 238, 144, 0.6)',  // verde claro
                'rgba(255, 182, 193, 0.6)',  // rosa claro
                'rgba(255, 222, 173, 0.6)',  // bege amarelado
                'rgba(221, 160, 221, 0.6)',  // lavanda
                'rgba(176, 224, 230, 0.6)',  // azul gelo
            ];


            // Monta datasets
            const datasets = destinosUnicos.map((destino, i) => ({
                label: destino,
                data: data.map(motorista =>
                    motorista.destinos.find(d => d.destino === destino)?.totalViagens || 0
                ),
                backgroundColor: cores[i % cores.length],
            }));

            setChartData({
                labels: motoristas,
                datasets,
            });
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
                text: 'Destinos mais Frequentes por Motoristas',
            },
        },
        scales: {
            x: {
                ticks: {
                    precision: 0, // Mostra apenas inteiros
                },
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    if (!chartData) return <p>Carregando gráfico...</p>;

    return <Bar options={options} data={chartData} />;
}