"use client"
import TransactionList from "../../components/TransactionList"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"

export default function AllTransactionsPage() {
  const router = useRouter()

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={() => router.push("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Transaction List */}
      <TransactionList showAll={true} />
    </div>
  )
}
