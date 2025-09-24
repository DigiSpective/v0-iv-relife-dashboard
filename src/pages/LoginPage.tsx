"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { LoginForm } from "../components/auth/LoginForm"
import { useAuth } from "../contexts/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  console.log("[v0] LoginPage rendered, user:", user?.email || "No user")

  React.useEffect(() => {
    if (user) {
      console.log("[v0] User already authenticated, redirecting to dashboard")
      navigate("/dashboard", { replace: true })
    }
  }, [user, navigate])

  const handleLoginSuccess = () => {
    console.log("[v0] Login successful, navigating to dashboard")
    navigate("/dashboard", { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">IV RELIFE</h1>
          <p className="text-gray-600 mt-2">Dashboard Login</p>
        </div>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  )
}
