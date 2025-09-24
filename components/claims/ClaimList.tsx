"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import type { Claim, ClaimStatus } from "@/types"
import { useClaims } from "@/hooks/useClaims"

interface ClaimListProps {
  retailerId?: string
  onClaimSelect?: (claim: Claim) => void
}

export function ClaimList({ retailerId, onClaimSelect }: ClaimListProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "all">("all")
  const { data: claims, isLoading, error } = useClaims(retailerId)

  const filteredClaims = claims?.filter((claim) => {
    const matchesSearch =
      claim.description.toLowerCase().includes(search.toLowerCase()) ||
      claim.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "denied":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const columns = [
    {
      header: "Claim ID",
      accessorKey: "id",
      cell: ({ row }: any) => <span className="font-mono text-sm">{row.original.id.slice(0, 8)}...</span>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }: any) => <span className="max-w-xs truncate">{row.original.description}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => <Badge className={getStatusColor(row.original.status)}>{row.original.status}</Badge>,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }: any) => (
        <span>{row.original.amount ? `${row.original.currency} ${row.original.amount}` : "-"}</span>
      ),
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: ({ row }: any) => (
        <span className="text-sm text-muted-foreground">{new Date(row.original.created_at).toLocaleDateString()}</span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: any) => (
        <Button variant="outline" size="sm" onClick={() => onClaimSelect?.(row.original)}>
          View
        </Button>
      ),
    },
  ]

  if (isLoading) {
    return <div>Loading claims...</div>
  }

  if (error) {
    return <div>Error loading claims: {error.message}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claims</CardTitle>
        <div className="flex gap-4">
          <Input
            placeholder="Search claims..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ClaimStatus | "all")}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={filteredClaims || []} />
      </CardContent>
    </Card>
  )
}
