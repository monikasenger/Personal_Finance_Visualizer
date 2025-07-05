# 💰 Personal Finance Visualizer

A modern full-stack web application to **track personal expenses**, manage budgets, and gain real-time financial insights through clean UI and visual dashboards.

🚀 **Live URL:** [Personal Finance Visualizer](https://personal-finance-visualizer-roan-sigma.vercel.app/)  

---

## ✨ Features

- ➕ Add, Edit, and Delete transactions
- 📅 Track transactions with amount, date, and description
- 📊 Monthly expenses bar chart for visual analysis
- 🗂️ Predefined categories for expense classification
- 🍕 Category-wise Pie Chart to understand spending distribution
- 📋 Dashboard with:
  - 💸 Total Expenses
  - 📂 Category Breakdown
  - 🕒 Recent Transactions
- 🎯 Set monthly budgets for each category
- 📉 Budget vs Actual comparison with insights
- ⚠️ Form validation and user-friendly error messages
- 📱 Fully responsive UI using `shadcn/ui` and Tailwind CSS

---

## 💻 Tech Stack

| Technology     | Description                      |
|----------------|----------------------------------|
| **Frontend**   | Next.js (App Router), React.js   |
| **UI Design**  | Tailwind CSS, shadcn/ui          |
| **Charts**     | Recharts (Pie & Bar)             |
| **Database**   | MongoDB + Mongoose               |
| **Backend**    | Next.js API Routes               |
| **Deployment** | Vercel                           |

---

## 🚀 Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/monikasenger/Personal-Finance-Visualizer.git
cd Personal-Finance-Visualizer

# 2. Install dependencies
npm install

# 3. Create .env.local and add your MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# 4. Run the development server
npm run dev
