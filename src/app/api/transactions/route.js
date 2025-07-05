
import Transaction from "../../../models/Transaction"
import connectDB from "../../../lib/mongodb"


import { NextResponse } from "next/server"

// GET all transactions
export async function GET() {
  try {
    await connectDB()
    const transactions = await Transaction.find()
    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST a new transaction
export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    const transaction = await Transaction.create(body)
    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  await connectDB()
  const { id } = params

  try {
    await Transaction.findByIdAndDelete(id)
    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}