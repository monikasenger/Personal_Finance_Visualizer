"use client"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function BudgetChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const txnRes = await fetch("/api/transactions")
      const transactions = await txnRes.json()

      const budgetRes = await fetch("/api/budgets")
      const budgets = await budgetRes.json()

      const spending = {}
      transactions.forEach((txn) => {
        const cat = txn.category || "Other"
        if (!spending[cat]) spending[cat] = 0
        spending[cat] += Number(txn.amount)
      })

      const combined = budgets.map((b) => ({
        category: b.category,
        budget: Number(b.limit),
        spent: spending[b.category] || 0,
      }))

      setData(combined)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto h-[400px] mt-10 px-6 py-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        💰 Budget vs Actual Spending
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="category" stroke="#4b5563" />
          <YAxis stroke="#4b5563" />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #d1d5db" }}
            cursor={{ fill: "#f3f4f6" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="budget" fill="#10B981" name="Budget" radius={[4, 4, 0, 0]} />
          <Bar dataKey="spent" fill="#EF4444" name="Spent" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
