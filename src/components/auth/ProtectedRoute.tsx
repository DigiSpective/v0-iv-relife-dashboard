"use client"

import type React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  console.log("[v0] ProtectedRoute check - loading:", loading, "user:", user?.email || "No user")

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    console.log("[v0] No user found, redirecting to login")
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
