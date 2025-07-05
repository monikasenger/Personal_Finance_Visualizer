"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import TransactionForm from "./TransactionForm"
import { FaList, FaClock } from "react-icons/fa"

export default function TransactionList({ showAll = false }) {
  const [transactions, setTransactions] = useState([])
  const [editingTxn, setEditingTxn] = useState(null)
  const [successMsg, setSuccessMsg] = useState("")

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions")
      const data = await res.json()
      const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
      setTransactions(showAll ? sorted : sorted.slice(0, 3))
    } catch (error) {
      console.error("Failed to fetch transactions", error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [showAll])

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return

    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to delete")

      alert(data.message || "Deleted successfully")
      setTransactions((prev) => prev.filter((txn) => txn._id !== id))
    } catch (err) {
      alert("Delete error: " + err.message)
    }
  }

  const handleEdit = (txn) => {
    setEditingTxn(txn)
  }

  const handleUpdate = (updatedTxn) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updatedTxn._id ? updatedTxn : t))
    )
    setEditingTxn(null)
    setSuccessMsg("✅ Transaction updated successfully!")

    setTimeout(() => setSuccessMsg(""), 3000)
  }

  return (
    <div className="mt-10 max-w-3xl mx-auto px-4">
      {/* Heading with icon */}
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 tracking-tight flex items-center justify-center gap-2">
        {showAll ? (
          <>
            <FaList className="text-indigo-500" /> All Transactions
          </>
        ) : (
          <>
            <FaClock className="text-indigo-500" /> Latest Transactions
          </>
        )}
      </h2>

      {/* Edit Form */}
      {editingTxn && (
        <div className="mb-10 bg-indigo-50 rounded-lg p-6 shadow border">
          <TransactionForm initialData={editingTxn} onUpdate={handleUpdate} />
        </div>
      )}

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 text-green-600 text-sm font-medium text-center bg-green-50 border border-green-200 rounded px-4 py-2">
          {successMsg}
        </div>
      )}

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 italic">No transactions found.</p>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {transactions.map((txn) => (
              <motion.div
                key={txn._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white border-l-4 border-indigo-500 shadow-md hover:shadow-lg transition duration-300">
                  <CardContent className="py-5 px-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-base text-gray-500 font-medium mb-1">{txn.category}</p>
                        <p className="text-lg font-semibold text-gray-800">{txn.description}</p>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <p className="text-xl font-bold text-indigo-600">₹{txn.amount}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(txn.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {showAll && (
                      <div className="flex gap-6 mt-4 justify-end">
                        <button
                          onClick={() => handleEdit(txn)}
                          className="text-blue-600 hover:underline font-medium text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(txn._id)}
                          className="text-red-600 hover:underline font-medium text-sm"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* View All Link */}
      {!showAll && (
        <div className="text-center mt-10">
          <Link href="/transactions" className="text-indigo-600 hover:underline font-semibold text-sm">
            View All →
          </Link>
        </div>
      )}
    </div>
  )
}
