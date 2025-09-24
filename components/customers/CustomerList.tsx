// Customer list component with search and filtering
"use client"
import { DataTable, type Column } from "../ui/data-table"
import { Button } from "../ui/button"
import { PageHeader } from "../ui/page-header"
import { EmptyState } from "../ui/empty-state"
import { LoadingSpinner } from "../ui/loading-spinner"
import { Plus, Users } from "lucide-react"
import { useCustomers } from "../../hooks/useCustomers"
import type { Customer } from "../../types"

interface CustomerListProps {
  onCreateCustomer?: () => void
  onViewCustomer?: (customer: Customer) => void
}

export function CustomerList({ onCreateCustomer, onViewCustomer }: CustomerListProps) {
  const { customers, loading, error } = useCustomers()

  const columns: Column<Customer>[] = [
    {
      key: "first_name",
      header: "Name",
      sortable: true,
      render: (_, customer) => `${customer.first_name} ${customer.last_name}`,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "phone",
      header: "Phone",
      sortable: true,
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
        <p className="text-red-600">Error loading customers: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Manage your customer database"
        actions={
          <Button onClick={onCreateCustomer}>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        }
      />

      {customers.length === 0 ? (
        <EmptyState
          title="No customers found"
          description="Get started by adding your first customer"
          icon={<Users className="h-12 w-12" />}
          action={{
            label: "Add Customer",
            onClick: onCreateCustomer || (() => {}),
          }}
        />
      ) : (
        <DataTable
          data={customers}
          columns={columns}
          searchable
          searchPlaceholder="Search customers..."
          onRowClick={onViewCustomer}
        />
      )}
    </div>
  )
}
