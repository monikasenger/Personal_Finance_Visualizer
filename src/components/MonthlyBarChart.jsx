"use client"
import { useEffect, useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts"

export default function MonthlyBarChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions")
      const txns = await res.json()

      const monthly = {}
      txns.forEach((txn) => {
        const date = new Date(txn.date)
        const month = date.toLocaleString("default", { month: "short", year: "numeric" })
        if (!monthly[month]) monthly[month] = 0
        monthly[month] += Number(txn.amount)
      })

      const chartData = Object.entries(monthly).map(([month, amount]) => ({
        month,
        amount,
      }))

      setData(chartData)
    }

    fetchTransactions()
  }, [])

  return (
    <div className="w-full h-[360px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-xl shadow-md border border-gray-200 mt-10">
      <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-6">
        📅 Monthly Expenses Overview
      </h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#4B5563" }}
            tickMargin={10}
            interval={0}
          />
          <YAxis tick={{ fontSize: 12, fill: "#4B5563" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
            }}
          />
          <Bar
            dataKey="amount"
            fill="#8B5CF6"
            radius={[8, 8, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
