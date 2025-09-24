// Statistics card component
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  icon?: React.ReactNode
  description?: string
}

export function StatsCard({ title, value, change, icon, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</div>
        {change && (
          <p className={`text-xs ${change.type === "increase" ? "text-green-600" : "text-red-600"}`}>
            {change.type === "increase" ? "+" : "-"}
            {Math.abs(change.value)}% from last month
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
