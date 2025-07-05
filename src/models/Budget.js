import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  limit: {
    type: Number,
    required: true,
  },
})

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema)
