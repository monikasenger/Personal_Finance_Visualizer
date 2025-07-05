import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  category: String,
})

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)
