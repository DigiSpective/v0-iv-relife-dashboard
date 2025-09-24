// Dashboard statistics overview
"use client"
import { StatsCard } from "../ui/stats-card"
import { Users, Package, FileText, DollarSign } from "lucide-react"
import { useCustomers } from "../../hooks/useCustomers"
import { useProducts } from "../../hooks/useProducts"
import { useClaims } from "../../hooks/useClaims"

export function DashboardStats() {
  const { customers } = useCustomers()
  const { products } = useProducts()
  const { claims } = useClaims()

  const totalRevenue = 125000 // Mock data
  const pendingClaims = claims.filter((claim) => claim.status === "pending").length

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Customers"
        value={customers.length}
        icon={<Users className="h-4 w-4" />}
        change={{ value: 12, type: "increase" }}
      />
      <StatsCard
        title="Total Products"
        value={products.length}
        icon={<Package className="h-4 w-4" />}
        change={{ value: 5, type: "increase" }}
      />
      <StatsCard
        title="Pending Claims"
        value={pendingClaims}
        icon={<FileText className="h-4 w-4" />}
        change={{ value: 8, type: "decrease" }}
      />
      <StatsCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4" />}
        change={{ value: 15, type: "increase" }}
      />
    </div>
  )
}
