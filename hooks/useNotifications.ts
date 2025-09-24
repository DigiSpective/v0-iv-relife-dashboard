"use client"

// Notifications management hooks
import { useState, useEffect, useCallback } from "react"
import type { UserNotification } from "../types"

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<UserNotification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const mockNotifications: UserNotification[] = [
          {
            id: "1",
            user_id: userId || "1",
            type: "claim_update",
            title: "Claim Status Updated",
            message: "Your claim #1234 has been approved",
            read: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            user_id: userId || "1",
            type: "order_shipped",
            title: "Order Shipped",
            message: "Your order #5678 has been shipped",
            read: true,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
          },
        ]
        setNotifications(mockNotifications)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch notifications")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [userId])

  const markAsRead = useCallback(async (id: string) => {
    try {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, read: true, updated_at: new Date().toISOString() } : notification,
        ),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to mark notification as read")
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
          updated_at: new Date().toISOString(),
        })),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to mark all notifications as read")
    }
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    unreadCount,
  }
}
