"use client"

// Order management hooks
import { useState, useEffect, useCallback } from "react"
import type { OrderStatus } from "../types"
import { mockOrders } from "../lib/mock-data"

interface Order {
  id: string
  customer_id: string
  status: OrderStatus
  total: number
  currency: string
  created_at: string
  updated_at: string
}

export function useOrders(customerId?: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const filteredOrders = customerId ? mockOrders.filter((o) => o.customer_id === customerId) : mockOrders
        setOrders(filteredOrders)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [customerId])

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status, updated_at: new Date().toISOString() } : order,
        ),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update order status")
    }
  }, [])

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
  }
}

export function useOrder(id: string) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const foundOrder = mockOrders.find((o) => o.id === id)
        setOrder(foundOrder || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch order")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  return { order, loading, error }
}
