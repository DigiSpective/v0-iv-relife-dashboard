"use client"

// Customer management hooks
import { useState, useEffect, useCallback } from "react"
import type { Customer } from "../types"
import { mockCustomers } from "../lib/mock-data"

export function useCustomers(retailerId?: string) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const filteredCustomers = retailerId ? mockCustomers.filter((c) => c.retailer_id === retailerId) : mockCustomers
        setCustomers(filteredCustomers)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch customers")
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [retailerId])

  const createCustomer = useCallback(async (customerData: Omit<Customer, "id" | "created_at" | "updated_at">) => {
    try {
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setCustomers((prev) => [...prev, newCustomer])
      return newCustomer
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to create customer")
    }
  }, [])

  const updateCustomer = useCallback(async (id: string, updates: Partial<Customer>) => {
    try {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === id ? { ...customer, ...updates, updated_at: new Date().toISOString() } : customer,
        ),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update customer")
    }
  }, [])

  const deleteCustomer = useCallback(async (id: string) => {
    try {
      setCustomers((prev) => prev.filter((customer) => customer.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete customer")
    }
  }, [])

  return {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
}

export function useCustomer(id: string) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const foundCustomer = mockCustomers.find((c) => c.id === id)
        setCustomer(foundCustomer || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch customer")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCustomer()
    }
  }, [id])

  return { customer, loading, error }
}

export function useCustomerStats(retailerId?: string) {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    newCustomersThisMonth: 0,
    activeCustomers: 0,
    averageOrderValue: 0,
    customerGrowthRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const calculateStats = async () => {
      try {
        setLoading(true)

        // Filter customers by retailer if specified
        const filteredCustomers = retailerId ? mockCustomers.filter((c) => c.retailer_id === retailerId) : mockCustomers

        // Calculate current month start
        const now = new Date()
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

        // Calculate statistics
        const totalCustomers = filteredCustomers.length

        const newCustomersThisMonth = filteredCustomers.filter(
          (customer) => new Date(customer.created_at) >= currentMonthStart,
        ).length

        const newCustomersLastMonth = filteredCustomers.filter((customer) => {
          const createdAt = new Date(customer.created_at)
          return createdAt >= lastMonthStart && createdAt < currentMonthStart
        }).length

        // Assume customers with recent activity are active (within last 30 days)
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        const activeCustomers = filteredCustomers.filter(
          (customer) => new Date(customer.updated_at) >= thirtyDaysAgo,
        ).length

        // Mock average order value calculation
        const averageOrderValue = 125.5 // This would come from actual order data

        // Calculate growth rate
        const customerGrowthRate =
          newCustomersLastMonth > 0
            ? ((newCustomersThisMonth - newCustomersLastMonth) / newCustomersLastMonth) * 100
            : newCustomersThisMonth > 0
              ? 100
              : 0

        setStats({
          totalCustomers,
          newCustomersThisMonth,
          activeCustomers,
          averageOrderValue,
          customerGrowthRate,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to calculate customer stats")
      } finally {
        setLoading(false)
      }
    }

    calculateStats()
  }, [retailerId])

  return { stats, loading, error }
}
