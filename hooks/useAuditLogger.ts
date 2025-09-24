"use client"

// Audit logging hooks
import { useCallback } from "react"
import type { AuditLog } from "../types"

export function useAuditLogger() {
  const logAction = useCallback(
    async (action: string, resourceType: string, resourceId?: string, details?: Record<string, any>) => {
      try {
        // Mock audit logging - replace with actual implementation
        const auditLog: Omit<AuditLog, "id" | "created_at"> = {
          user_id: "1", // Get from auth context
          action,
          resource_type: resourceType,
          resource_id: resourceId,
          details,
          ip_address: "127.0.0.1",
          user_agent: navigator.userAgent,
        }

        console.log("Audit Log:", auditLog)

        // In real implementation, send to API
        // await createAuditLog(auditLog);
      } catch (error) {
        console.error("Failed to log audit action:", error)
      }
    },
    [],
  )

  return { logAction }
}

export function useSettingsAuditLogger() {
  const { logAction } = useAuditLogger()

  const logSettingsChange = useCallback(
    async (settingKey: string, oldValue: any, newValue: any) => {
      await logAction("settings_update", "system_setting", settingKey, {
        old_value: oldValue,
        new_value: newValue,
      })
    },
    [logAction],
  )

  return { logSettingsChange }
}
