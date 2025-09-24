"use client"

import type React from "react"
import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth" // Assuming useAuth is defined in this file
import { useLocation, useNavigate } from "react-router-dom" // Assuming react-router-dom is used for navigation

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true, redirectTo = "/login" }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    console.log("[v0] AuthGuard checking auth state:", { user: !!user, loading, requireAuth })

    if (!loading) {
      if (requireAuth && !user) {
        console.log("[v0] Redirecting to login, no user found")
        navigate(`${redirectTo}?redirect=${encodeURIComponent(location.pathname)}`)
      } else if (!requireAuth && user) {
        // If user is authenticated and trying to access auth pages, redirect to dashboard
        const authPages = ["/login", "/register", "/reset-password"]
        if (authPages.includes(location.pathname)) {
          console.log("[v0] Redirecting authenticated user to dashboard")
          navigate("/dashboard")
        }
      }
    }
  }, [user, loading, requireAuth, redirectTo, location.pathname, navigate])

  return <>{children}</>
}
