"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function DashboardCards() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions")
        const data = await res.json()
        setTransactions(data)
      } catch (error) {
        console.error("Error fetching transactions", error)
      }
    }

    fetchTransactions()
  }, [])

  const totalExpenses = transactions.reduce((acc, txn) => acc + Number(txn.amount), 0)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const latest = sortedTransactions[0] || null
  const uniqueCategories = [...new Set(transactions.map(txn => txn.category || "Other"))]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4">
      
      {/* Total Expenses */}
      <Card className="shadow-md border border-gray-200 bg-gradient-to-r from-red-100 to-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Total Transactions */}
      <Card className="shadow-md border border-gray-200 bg-gradient-to-r from-indigo-100 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-indigo-700">Total Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-indigo-600">{transactions.length}</p>
        </CardContent>
      </Card>

      {/* Unique Categories */}
      <Card className="shadow-md border border-gray-200 bg-gradient-to-r from-green-100 to-green-50">
        <CardHeader>
          <CardTitle className="text-green-700">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">{uniqueCategories.length}</p>
        </CardContent>
      </Card>

      {/* Recent Transaction */}
      <Card className="shadow-md border border-gray-200 bg-gradient-to-r from-yellow-100 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-700">Recent Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          {latest ? (
            <div className="space-y-1 text-sm text-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                  {latest.category}
                </span>
                <span className="text-gray-500">
                  {new Date(latest.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                ₹{latest.amount}
              </p>
              <p className="text-gray-700">{latest.description}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
