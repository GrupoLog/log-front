'use client';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
    getTripsCountByTypeFunction,
    getAvailableYearsFunction,
} from "@/services/APIService";
import { ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const [chartData, setChartData] = useState<ChartData<'pie', number[], string> | null>(null);
    const [years, setYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    useEffect(() => {
        async function fetchYearsAndData() {
            try {
                const availableYears = await getAvailableYearsFunction();
                setYears(availableYears);

                const latest = Math.max(...availableYears);
                setSelectedYear(latest);

                const viagens = await getTripsCountByTypeFunction(latest);
                updateChartData(viagens);
            } catch (error) {
                console.error('Erro ao buscar anos ou dados:', error);
            }
        }

        fetchYearsAndData();
    }, []);

    const handleYearChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(e.target.value);
        setSelectedYear(year);

        try {
            const viagens = await getTripsCountByTypeFunction(year);
            updateChartData(viagens);
        } catch (error) {
            console.error('Erro ao buscar dados de viagens:', error);
        }
    };

    function updateChartData(viagens: any[]) {
        const labels = viagens.map(v => {
            const tipo = v.tipo_veiculo;
            return tipo.charAt(0).toUpperCase() + tipo.slice(1); // capitalize
        });

        const dataValues = viagens.map(v => v.qtd_viagens);

        const backgroundColors = [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
        ];

        const borderColors = backgroundColors.map(color => color.replace('0.6', '1'));

        const data = {
            labels,
            datasets: [
                {
                    label: 'Quantidade de viagens',
                    data: dataValues,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderColor: borderColors.slice(0, labels.length),
                    borderWidth: 1,
                },
            ],
        };

        setChartData(data);
    }

    if (!chartData || selectedYear === null) return <p>Carregando gráfico...</p>;

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <select
                    id="ano"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <Pie data={chartData} />
        </div>
    );
}
