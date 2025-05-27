'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { getFleetDistributionFunction } from '@/services/APIService';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [chartData, setChartData] = useState<ChartData<'pie', number[], string> | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getFleetDistributionFunction(); // <- usa sua função real

        const labels = data.map(item => item.tipoVeiculo);
        const values = data.map(item => item.percentagem);

        const backgroundColors = [
          'rgba(54, 162, 235, 0.6)', // Moto
          'rgba(255, 99, 132, 0.6)', // Van
        ];

        const borderColors = backgroundColors.map(c => c.replace('0.6', '1'));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Distribuição da Frota',
              data: values,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderColor: borderColors.slice(0, labels.length),
              borderWidth: 1,
            }
          ]
        });
      } catch (error) {
        console.error('Erro ao carregar dados da frota:', error);
      }
    }

    loadData();
  }, []);

  if (!chartData) return <p>Carregando gráfico...</p>;

  return (
    <div className="max-w-sm mx-auto">
      <Pie data={chartData} />
    </div>
  );
}
