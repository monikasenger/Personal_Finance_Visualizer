import DashboardCards from "../components/DashboardCards"
import MonthlyBarChart from "../components/MonthlyBarChart"
import CategoryPieChart from "../components/CategoryPieChart"
import BudgetChart from "../components/BudgetChart"
import BudgetForm from "../components/BudgetForm"
import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"

export default function HomePage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight mb-2">
          Personal Finance Visualizer
        </h1>
        <p className="text-gray-500 text-sm">Track your expenses, set budgets, and stay in control.</p>
      </div>

      {/* Dashboard Summary Cards */}
      <section>
        <DashboardCards />
      </section>

      {/* Charts */}
      <section className="grid md:grid-cols-2 gap-8">
        <MonthlyBarChart />
        <CategoryPieChart />
      </section>

      {/* Budget vs Actual */}
      <section>
        <BudgetChart />
      </section>

      {/* Forms stacked vertically */}
      <section className="flex flex-col space-y-10">
        <div className="scale-105">
          <BudgetForm />
        </div>
        <div className="scale-105">
          <TransactionForm />
        </div>
      </section>

      {/* Latest Transactions */}
      <section>
        <TransactionList />
      </section>
    </div>
  )
}
