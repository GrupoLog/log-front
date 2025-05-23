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
import { getTripsCountByDriverFunction } from '@/services/APIService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function VerticalBarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const dados = await getTripsCountByDriverFunction();

        const labels = dados.map(item => item.nomeMotorista);
        const valores = dados.map(item => item.totalViagens);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total de Viagens',
              data: valores,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erro ao buscar dados de motoristas:', error);
      }
    }

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Total de Viagens por Motorista',
      },
    },
    scales: {
      y: {
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
