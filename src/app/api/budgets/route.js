
import connectDB from "../../../lib/mongodb"
import Budget from "../../../models/Budget"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const budgets = await Budget.find()
  return NextResponse.json(budgets)
}

export async function POST(req) {
  await connectDB()
  const { category, limit } = await req.json()
  const existing = await Budget.findOne({ category })

  if (existing) {
    existing.limit = limit
    await existing.save()
    return NextResponse.json(existing)
  }

  const budget = new Budget({ category, limit })
  await budget.save()
  return NextResponse.json(budget)
}
