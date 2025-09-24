"use client"

// Toast notification hook
import { useState, useCallback } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  duration?: number
}

export interface ToastState {
  toasts: Toast[]
}

let toastCount = 0

export function useToast() {
  const [state, setState] = useState<ToastState>({ toasts: [] })

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = (++toastCount).toString()
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }

    setState((prevState) => ({
      toasts: [...prevState.toasts, newToast],
    }))

    // Auto remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        setState((prevState) => ({
          toasts: prevState.toasts.filter((t) => t.id !== id),
        }))
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setState((prevState) => ({
      toasts: prevState.toasts.filter((t) => t.id !== id),
    }))
  }, [])

  const removeAllToasts = useCallback(() => {
    setState({ toasts: [] })
  }, [])

  return {
    toasts: state.toasts,
    toast: addToast,
    removeToast,
    removeAllToasts,
  }
}

// Export toast function for convenience
export const toast = (toast: Omit<Toast, "id">) => {
  // This is a simplified version - in a real app you'd want a global toast provider
  console.log("Toast:", toast)
}
