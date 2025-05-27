'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getDriversCountByTypeFunction } from '@/services/APIService';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartTipoMotorista() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const dados = await getDriversCountByTypeFunction();

        const labels = dados.map(d => d.tipoMotorista);
        const dataValues = dados.map(d => d.totalMotoristas);

        const backgroundColors = [
          'rgba(75, 192, 192, 0.6)', // Fixo
          'rgba(255, 159, 64, 0.6)', // Terceirizado
        ];

        const borderColors = backgroundColors.map(c => c.replace('0.6', '1'));

        const data = {
          labels,
          datasets: [
            {
              label: 'Motoristas',
              data: dataValues,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderColor: borderColors.slice(0, labels.length),
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Erro ao buscar dados dos motoristas:', error);
      }
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Carregando gráfico...</p>;

  return (
    <div className="max-w-md mx-auto">
      <Pie data={chartData} />
    </div>
  );
}
