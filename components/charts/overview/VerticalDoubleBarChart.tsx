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
import { getMonthlyServicesCountFunction } from "@/services/APIService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: {
      display: true,
      text: 'Quantidade de serviços por mês',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: 'Quantidade' },
      ticks: { stepSize: 1 },
    },
    x: {
      title: { display: true, text: 'Mês' },
    },
  },
};

const mesesNomes = [
  '', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function DoubleBarChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const registros = await getMonthlyServicesCountFunction();

        // Agrupar por mês
        const dadosPorMes: Record<number, { Entrega: number; Transporte: number }> = {};

        for (const item of registros) {
          const mes = item.mes;
          const tipo = item.tipo_servico;
          const quantidade = item.quantidade;

          if (!dadosPorMes[mes]) {
            dadosPorMes[mes] = { Entrega: 0, Transporte: 0 };
          }

          dadosPorMes[mes][tipo] = quantidade;
        }

        const mesesOrdenados = Object.keys(dadosPorMes).map(Number).sort((a, b) => a - b);

        const labels = mesesOrdenados.map(m => mesesNomes[m]);
        const entregaData = mesesOrdenados.map(m => dadosPorMes[m].Entrega || 0);
        const transporteData = mesesOrdenados.map(m => dadosPorMes[m].Transporte || 0);

        const data = {
          labels,
          datasets: [
            {
              label: 'Entrega',
              data: entregaData,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
            {
              label: 'Transporte',
              data: transporteData,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Erro ao buscar dados de serviços:', error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Carregando gráfico...</p>;

  return <Bar options={options} data={chartData} />;
}
