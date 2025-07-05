"use client"
import { useEffect, useState } from "react"
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts"

const COLORS = [
  "#6366F1", "#10B981", "#F59E0B", "#EF4444",
  "#8B5CF6", "#F472B6", "#14B8A6", "#0EA5E9", "#22C55E"
]

export default function CategoryPieChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions")
      const txns = await res.json()

      const categoryMap = {}
      txns.forEach((txn) => {
        const cat = txn.category || "Other"
        if (!categoryMap[cat]) categoryMap[cat] = 0
        categoryMap[cat] += Number(txn.amount)
      })

      const chartData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
      setData(chartData)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-[350px] bg-gradient-to-br from-white via-indigo-50 to-purple-50 p-6 rounded-xl shadow-md border border-indigo-100 mt-10">
      <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-6">
        📊 Category-wise Expenses
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={40}
            paddingAngle={4}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: "8px", backgroundColor: "#fff", borderColor: "#ccc" }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ marginTop: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
