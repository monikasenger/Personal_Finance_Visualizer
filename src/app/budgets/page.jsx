"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then((data) => setBudgets(data))
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">📊 Budgets</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets set yet.</p>
      ) : (
        <ul className="space-y-3">
          {budgets.map((b) => (
            <li key={b._id} className="border p-4 rounded-lg shadow-sm bg-white">
              <p className="font-medium text-gray-700">Category: <span className="text-indigo-600">{b.category}</span></p>
              <p className="text-gray-600">Limit: ₹{b.limit}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
