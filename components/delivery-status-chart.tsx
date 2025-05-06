"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "Delivered", value: 540, color: "#4ade80" },
  { name: "In Transit", value: 342, color: "#60a5fa" },
  { name: "Processing", value: 270, color: "#f97316" },
  { name: "Delayed", value: 92, color: "#f43f5e" },
  { name: "Cancelled", value: 40, color: "#a1a1aa" },
]

export function DeliveryStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
