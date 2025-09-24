"use client"

import React from "react"
import { useNavigate } from "react-router-dom"
import { SignUpForm } from "../components/auth/SignUpForm"
import { useAuth } from "../contexts/AuthContext"

export default function SignUpPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  console.log("[v0] SignUpPage rendered, user:", user?.email || "No user")

  React.useEffect(() => {
    if (user) {
      console.log("[v0] User already authenticated, redirecting to dashboard")
      navigate("/dashboard", { replace: true })
    }
  }, [user, navigate])

  const handleSignUpSuccess = () => {
    console.log("[v0] Signup successful, showing success message")
    alert("Account created! Please check your email to confirm your account before signing in.")
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">IV RELIFE</h1>
          <p className="text-gray-600 mt-2">Create Account</p>
        </div>
        <SignUpForm onSuccess={handleSignUpSuccess} />
      </div>
    </div>
  )
}
