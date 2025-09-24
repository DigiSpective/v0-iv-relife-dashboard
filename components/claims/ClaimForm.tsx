"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateClaim } from "@/hooks/useClaims"
import { useCustomers } from "@/hooks/useCustomers"
import { useProducts } from "@/hooks/useProducts"

interface ClaimFormProps {
  retailerId: string
  onSuccess?: () => void
}

export function ClaimForm({ retailerId, onSuccess }: ClaimFormProps) {
  const [formData, setFormData] = useState({
    customer_id: "",
    product_id: "",
    description: "",
    amount: "",
    currency: "USD",
  })

  const createClaim = useCreateClaim()
  const { data: customers } = useCustomers(retailerId)
  const { data: products } = useProducts(retailerId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createClaim.mutateAsync({
        retailer_id: retailerId,
        customer_id: formData.customer_id,
        product_id: formData.product_id || undefined,
        description: formData.description,
        amount: formData.amount ? Number.parseFloat(formData.amount) : undefined,
        currency: formData.currency,
        status: "pending",
      })

      setFormData({
        customer_id: "",
        product_id: "",
        description: "",
        amount: "",
        currency: "USD",
      })

      onSuccess?.()
    } catch (error) {
      console.error("Failed to create claim:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Claim</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Select
              value={formData.customer_id}
              onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers?.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.first_name} {customer.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product (Optional)</Label>
            <Select
              value={formData.product_id}
              onValueChange={(value) => setFormData({ ...formData, product_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - {product.sku}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the claim..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (Optional)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={createClaim.isPending}>
            {createClaim.isPending ? "Creating..." : "Create Claim"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
