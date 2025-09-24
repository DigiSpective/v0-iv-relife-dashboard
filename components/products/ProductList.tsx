// Product list component with category filtering
"use client"

import { useState } from "react"
import { DataTable, type Column } from "../ui/data-table"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { PageHeader } from "../ui/page-header"
import { EmptyState } from "../ui/empty-state"
import { LoadingSpinner } from "../ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus, Package } from "lucide-react"
import { useProducts } from "../../hooks/useProducts"
import type { Product, ProductCategory } from "../../types"

interface ProductListProps {
  onCreateProduct?: () => void
  onViewProduct?: (product: Product) => void
}

export function ProductList({ onCreateProduct, onViewProduct }: ProductListProps) {
  const { products, loading, error } = useProducts()
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">("all")

  const filteredProducts =
    categoryFilter === "all" ? products : products.filter((product) => product.category === categoryFilter)

  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "Product Name",
      sortable: true,
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "brand",
      header: "Brand",
      sortable: true,
    },
    {
      key: "sku",
      header: "SKU",
      sortable: true,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (value, product) => `${product.currency} ${value.toFixed(2)}`,
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
        <p className="text-red-600">Error loading products: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog"
        actions={
          <Button onClick={onCreateProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        }
      />

      <div className="flex items-center space-x-4">
        <Select value={categoryFilter} onValueChange={(value: any) => setCategoryFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="appliances">Appliances</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description={
            categoryFilter === "all"
              ? "Get started by adding your first product"
              : `No ${categoryFilter} products found`
          }
          icon={<Package className="h-12 w-12" />}
          action={
            categoryFilter === "all"
              ? {
                  label: "Add Product",
                  onClick: onCreateProduct || (() => {}),
                }
              : undefined
          }
        />
      ) : (
        <DataTable
          data={filteredProducts}
          columns={columns}
          searchable
          searchPlaceholder="Search products..."
          onRowClick={onViewProduct}
        />
      )}
    </div>
  )
}
