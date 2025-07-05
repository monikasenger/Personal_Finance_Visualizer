import mongoose from "mongoose"

let isConnected = false

const connectDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "finance-app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log("✅ MongoDB Connected")
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error)
  }
}

export default connectDB
