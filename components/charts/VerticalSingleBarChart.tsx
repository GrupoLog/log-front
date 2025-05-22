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
import { getMostUsedVehiclesFunction } from "@/services/APIService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const options = {
  responsive: true,

  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Quantidade de viagens',
      },
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      title: {
        display: true,
        text: 'Placa do veículo',
      },
    },
  },
};

export default function SingleBarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const veiculos = await getMostUsedVehiclesFunction();

        veiculos.sort((a, b) => b.qtd_viagens - a.qtd_viagens);

        const labels = veiculos.map(v => v.placa);
        const dataValues = veiculos.map(v => v.qtd_viagens);

        const data = {
          labels,
          datasets: [
            {
              label: 'Quantidade de Viagens',
              data: dataValues,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Erro ao buscar veículos mais utilizados:', error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Carregando gráfico...</p>;

  return <Bar options={options} data={chartData} />;
}
