"use client"
import { useState, useEffect } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"

export default function TransactionForm({ onAdd, onUpdate, initialData = null }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: "Food",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialData) {
      setForm({
        description: initialData.description,
        amount: initialData.amount,
        date: initialData.date.slice(0, 10),
        category: initialData.category || "Food",
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.description || !form.amount || !form.date) {
      setError("⚠️ Please fill all fields")
      return
    }

    try {
      const method = initialData ? "PUT" : "POST"
      const url = initialData ? `/api/transactions/${initialData._id}` : "/api/transactions"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setForm({ description: "", amount: "", date: "", category: "Food" })
      setError("")
      initialData ? onUpdate?.(data) : onAdd?.(data)
    } catch (err) {
      setError("❌ Error: " + err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-10 max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6 tracking-tight">
        {initialData ? "✏️ Edit Transaction" : "➕ Add Transaction"}
      </h2>

      {/* Description */}
      <div className="space-y-1">
        <Label className="text-gray-700 font-medium">Description</Label>
        <Input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. Grocery shopping"
          className="focus:ring-2 focus:ring-indigo-400 rounded-md"
        />
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <Label className="text-gray-700 font-medium">Amount (₹)</Label>
        <Input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="e.g. 1500"
          className="focus:ring-2 focus:ring-indigo-400 rounded-md"
        />
      </div>

      {/* Date */}
      <div className="space-y-1">
        <Label className="text-gray-700 font-medium">Date</Label>
        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="focus:ring-2 focus:ring-indigo-400 rounded-md"
        />
      </div>

      {/* Category */}
      <div className="space-y-1">
        <Label className="text-gray-700 font-medium">Category</Label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
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

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 text-center font-medium">{error}</p>
      )}

      {/* Submit */}
      <div className="text-center">
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md"
        >
          {initialData ? "✅ Update Transaction" : "➕ Add Transaction"}
        </Button>
      </div>
    </form>
  )
}
