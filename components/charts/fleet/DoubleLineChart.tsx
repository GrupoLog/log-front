'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getVehicleUsageByMonthFunction } from '@/services/APIService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DoubleLineChart() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getVehicleUsageByMonthFunction();

      // Extrair anos únicos
      const anosUnicos = [...new Set(data.map((item: any) => item.ano))].sort();
      setYears(anosUnicos);
      const ultimoAno = anosUnicos[anosUnicos.length - 1];
      setSelectedYear(ultimoAno);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;

    async function fetchChartData() {
      const data = await getVehicleUsageByMonthFunction();

      // Filtrar pelo ano
      const dadosFiltrados = data.filter((d: any) => d.ano === selectedYear);

      // Pega todos os meses do ano
      const mesesOrdenados = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];

      // Cria arrays de 12 posições com valores zerados
      const motos = Array(12).fill(0);
      const vans = Array(12).fill(0);

      dadosFiltrados.forEach((item: any) => {
        const idx = item.mes - 1;
        if (item.tipoVeiculo === 'Moto') motos[idx] = item.quantidadeViagens;
        if (item.tipoVeiculo === 'Van') vans[idx] = item.quantidadeViagens;
      });

      setChartData({
        labels: mesesOrdenados,
        datasets: [
          {
            label: 'Motos',
            data: motos,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0,
          },
          {
            label: 'Vans',
            data: vans,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0,
          },
        ],
      });
    }

    fetchChartData();
  }, [selectedYear]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: `Viagens por Mês (${selectedYear})`,
      },
    },
    scales: {
      y: {
        ticks: {
          precision: 0,
          beginAtZero: true,
        },
      },
    },
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="space-y-4">
      
      <select
        value={selectedYear ?? ''}
        onChange={handleYearChange}
        className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
      >
        {years.map((ano) => (
          <option key={ano} value={ano}>
            {ano}
          </option>
        ))}
      </select>

      {chartData ? (
        <Line options={options} data={chartData} />
      ) : (
        <p>Carregando gráfico...</p>
      )}
    </div>
  );
}
