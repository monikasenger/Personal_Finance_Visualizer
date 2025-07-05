import * as React from "react"

export function Card({ children, className }) {
  return <div className={`rounded-lg border bg-white p-4 shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>
}

export function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

export function CardContent({ children }) {
  return <div>{children}</div>
}
