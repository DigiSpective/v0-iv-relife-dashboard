// Claims list component with status filtering
"use client"

import { useState } from "react"
import { DataTable, type Column } from "../ui/data-table"
import { Button } from "../ui/button"
import { StatusBadge } from "../ui/status-badge"
import { PageHeader } from "../ui/page-header"
import { EmptyState } from "../ui/empty-state"
import { LoadingSpinner } from "../ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus, FileText } from "lucide-react"
import { useClaims } from "../../hooks/useClaims"
import type { Claim, ClaimStatus } from "../../types"

interface ClaimsListProps {
  onCreateClaim?: () => void
  onViewClaim?: (claim: Claim) => void
}

export function ClaimsList({ onCreateClaim, onViewClaim }: ClaimsListProps) {
  const { claims, loading, error } = useClaims()
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "all">("all")

  const filteredClaims = statusFilter === "all" ? claims : claims.filter((claim) => claim.status === statusFilter)

  const columns: Column<Claim>[] = [
    {
      key: "id",
      header: "Claim ID",
      sortable: true,
      render: (value) => `#${value}`,
    },
    {
      key: "description",
      header: "Description",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (value, claim) => (value ? `${claim.currency} ${value.toFixed(2)}` : "-"),
    },
    {
      key: "created_at",
      header: "Created",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading claims: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Claims"
        description="Manage customer claims and warranties"
        actions={
          <Button onClick={onCreateClaim}>
            <Plus className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        }
      />

      <div className="flex items-center space-x-4">
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Claims</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredClaims.length === 0 ? (
        <EmptyState
          title="No claims found"
          description={statusFilter === "all" ? "No claims have been submitted yet" : `No ${statusFilter} claims found`}
          icon={<FileText className="h-12 w-12" />}
          action={
            statusFilter === "all"
              ? {
                  label: "Create Claim",
                  onClick: onCreateClaim || (() => {}),
                }
              : undefined
          }
        />
      ) : (
        <DataTable
          data={filteredClaims}
          columns={columns}
          searchable
          searchPlaceholder="Search claims..."
          onRowClick={onViewClaim}
        />
      )}
    </div>
  )
}
