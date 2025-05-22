'use client';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getRevenueByPaymentMethodFunction } from "@/services/APIService"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function HorizontalBarChart() {
  const [chartData, setChartData] = useState(null);

  const options = {
    indexAxis: 'y' as const, // transforma em barras horizontais
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Receita por Forma de Pagamento' },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const pagamentos = await getRevenueByPaymentMethodFunction();

        // Ordenação opcional por receita decrescente
        pagamentos.sort((a, b) => b.receita - a.receita);

        const labels = pagamentos.map(p =>
          p.forma_pagamento.charAt(0).toUpperCase() + p.forma_pagamento.slice(1)
        );

        const valores = pagamentos.map(p => p.receita);

        const data = {
          labels,
          datasets: [
            {
              label: 'Receita (R$)',
              data: valores,
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Erro ao buscar dados de pagamento:', error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Carregando gráfico...</p>;

  return <Bar data={chartData} options={options} />;
}
