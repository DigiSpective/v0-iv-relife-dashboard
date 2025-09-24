"use client"

console.log("[v0] Dashboard component loading - Phase 3 with authentication")

import { useAuth } from "../contexts/AuthContext"
import { Button } from "./ui/button"
import { LogOut, User } from "lucide-react"

const Dashboard = () => {
  const { user, signOut } = useAuth()

  console.log("[v0] Dashboard component rendering - authenticated user:", user?.email || "No user")

  const handleSignOut = async () => {
    console.log("[v0] Dashboard: User signing out")
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">IV ReLife Dashboard</h1>
            <p className="text-sm text-gray-600">Phase 3: Authentication Integration Complete</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IV ReLife Dashboard</h1>
          <p className="text-lg text-gray-600">Phase 2: Basic Component Structure Complete</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Claims Management</h3>
            <p className="text-gray-600">Ready for Phase 3 integration</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Customer Portal</h3>
            <p className="text-gray-600">Ready for Phase 3 integration</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Product Catalog</h3>
            <p className="text-gray-600">Ready for Phase 3 integration</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Retailer Network</h3>
            <p className="text-gray-600">Ready for Phase 3 integration</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Shipping & Logistics</h3>
            <p className="text-gray-600">Ready for Phase 3 integration</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">System Settings</h3>
            <p className="text-gray-600">Ready for Phase 3 integration</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Phase 3 Complete: Authentication integration with Supabase, protected routes, and user session management
          </div>
        </div>
      </div>
    </div>
  )
}

console.log("[v0] Dashboard component defined - Phase 3 with authentication")

export default Dashboard
