"use client"

// Settings management hooks
import { useState, useEffect, useCallback } from "react"
import type { SystemSetting } from "../types"

export function useSettings() {
  const [settings, setSettings] = useState<SystemSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        // Mock data - replace with actual API call
        const mockSettings: SystemSetting[] = [
          {
            id: "1",
            key: "company_name",
            value: "IV RELIFE",
            description: "Company name displayed in the dashboard",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            key: "default_currency",
            value: "USD",
            description: "Default currency for transactions",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]
        setSettings(mockSettings)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch settings")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSetting = useCallback(async (key: string, value: string) => {
    try {
      setSettings((prev) =>
        prev.map((setting) =>
          setting.key === key ? { ...setting, value, updated_at: new Date().toISOString() } : setting,
        ),
      )
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update setting")
    }
  }, [])

  const getSetting = useCallback(
    (key: string) => {
      return settings.find((setting) => setting.key === key)?.value
    },
    [settings],
  )

  return {
    settings,
    loading,
    error,
    updateSetting,
    getSetting,
  }
}
