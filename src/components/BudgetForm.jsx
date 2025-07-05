"use client"
import { useState } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"

export default function BudgetForm({ onAdd }) {
  const [form, setForm] = useState({ category: "Food", limit: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.limit) {
      setError("Please enter a budget limit")
      return
    }

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setForm({ category: "Food", limit: "" })
      setError("")
      onAdd?.(data)
    } catch (err) {
      setError("Error: " + err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-10 max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 rounded-xl shadow-md border border-indigo-100"
    >
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
        📊 Set Monthly Budget
      </h2>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">Select Category</Label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none rounded-lg px-4 py-2 bg-white"
        >
          <option value="Food">🍔 Food</option>
          <option value="Utilities">💡 Utilities</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Health">💊 Health</option>
          <option value="Travel">✈️ Travel</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Rent">🏠 Rent</option>
          <option value="Education">📚 Education</option>
          <option value="Savings">💰 Savings</option>
          <option value="Other">🔖 Other</option>
        </select>
      </div>

      <div>
        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
          Budget Limit (₹)
        </Label>
        <Input
          type="number"
          name="limit"
          value={form.limit}
          onChange={handleChange}
          placeholder="e.g. 3000"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center font-medium">{error}</p>
      )}

      <div className="text-center pt-2">
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg shadow-md transition duration-200"
        >
          ✅ Save Budget
        </Button>
      </div>
    </form>
  )
}
