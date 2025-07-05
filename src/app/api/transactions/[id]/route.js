import connectDB from "../../../../lib/mongodb"
import Transaction from "../../../../models/Transaction"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const { id } = params

    const deleted = await Transaction.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Transaction deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function PUT(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const updatedData = await request.json()

    const updated = await Transaction.findByIdAndUpdate(id, updatedData, { new: true })

    if (!updated) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
