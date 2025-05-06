"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    shipments: 65,
    revenue: 4000,
  },
  {
    name: "Feb",
    shipments: 59,
    revenue: 3800,
  },
  {
    name: "Mar",
    shipments: 80,
    revenue: 5200,
  },
  {
    name: "Apr",
    shipments: 81,
    revenue: 5100,
  },
  {
    name: "May",
    shipments: 56,
    revenue: 3600,
  },
  {
    name: "Jun",
    shipments: 55,
    revenue: 3500,
  },
  {
    name: "Jul",
    shipments: 40,
    revenue: 2400,
  },
  {
    name: "Aug",
    shipments: 70,
    revenue: 4300,
  },
  {
    name: "Sep",
    shipments: 90,
    revenue: 5800,
  },
  {
    name: "Oct",
    shipments: 110,
    revenue: 7000,
  },
  {
    name: "Nov",
    shipments: 120,
    revenue: 7800,
  },
  {
    name: "Dec",
    shipments: 130,
    revenue: 8500,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="shipments" fill="#8884d8" name="Shipments" />
        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
