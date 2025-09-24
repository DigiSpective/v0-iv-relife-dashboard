"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { User, AuthSession, AuthError } from "../types"

interface AuthState {
  user: User | null
  session: AuthSession | null
  loading: boolean
  error: AuthError | null
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ user: User; session: AuthSession }>
  logout: () => Promise<void>
  hasRole: (role: string) => boolean
  canAccessRetailer: (retailerId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          setState((prev) => ({ ...prev, loading: false, error: { message: error.message } }))
          return
        }

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || session.user.email || "",
            role: session.user.user_metadata?.role || "user",
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at,
          }

          const authSession: AuthSession = {
            user,
            expires_at: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : "",
            last_activity: new Date().toISOString(),
          }

          setState({
            user,
            session: authSession,
            loading: false,
            error: null,
          })
        } else {
          setState((prev) => ({ ...prev, loading: false }))
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: { message: error instanceof Error ? error.message : "Failed to get session" },
        }))
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.name || session.user.email || "",
          role: session.user.user_metadata?.role || "user",
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        }

        const authSession: AuthSession = {
          user,
          expires_at: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : "",
          last_activity: new Date().toISOString(),
        }

        setState({
          user,
          session: authSession,
          loading: false,
          error: null,
        })
      } else {
        setState({
          user: null,
          session: null,
          loading: false,
          error: null,
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        const authError: AuthError = { message: error.message }
        setState((prev) => ({ ...prev, loading: false, error: authError }))
        throw authError
      }

      if (data.user && data.session) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.name || data.user.email || "",
          role: data.user.user_metadata?.role || "user",
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
        }

        const session: AuthSession = {
          user,
          expires_at: data.session.expires_at ? new Date(data.session.expires_at * 1000).toISOString() : "",
          last_activity: new Date().toISOString(),
        }

        return { user, session }
      }

      throw new Error("Login failed")
    } catch (error) {
      const authError: AuthError = {
        message: error instanceof Error ? error.message : "Login failed",
      }
      setState((prev) => ({ ...prev, loading: false, error: authError }))
      throw authError
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setState({
      user: null,
      session: null,
      loading: false,
      error: null,
    })
  }

  const hasRole = (role: string) => {
    return state.user?.role === role
  }

  const canAccessRetailer = (retailerId: string) => {
    if (state.user?.role === "admin") return true
    return state.user?.retailer_id === retailerId
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    hasRole,
    canAccessRetailer,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useCurrentUser() {
  const { user } = useAuth()
  return user
}

export function useRole() {
  const { user } = useAuth()
  return user?.role || null
}

export function useAuthStatus() {
  const { user, loading } = useAuth()
  return {
    isAuthenticated: !!user,
    isLoading: loading,
  }
}
