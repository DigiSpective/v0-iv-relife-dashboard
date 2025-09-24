"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { createClient } from "../lib/supabase/client"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  console.log("[v0] AuthProvider initialized")

  useEffect(() => {
    const getSession = async () => {
      console.log("[v0] Getting initial session")
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.error("[v0] Error getting session:", error)
      } else {
        console.log("[v0] Initial session:", session?.user?.email || "No session")
        setSession(session)
        setUser(session?.user ?? null)
      }
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event, session?.user?.email || "No user")
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    console.log("[v0] Attempting sign in for:", email)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error("[v0] Sign in error:", error.message)
    } else {
      console.log("[v0] Sign in successful")
    }
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    console.log("[v0] Attempting sign up for:", email)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })
    if (error) {
      console.error("[v0] Sign up error:", error.message)
    } else {
      console.log("[v0] Sign up successful - check email for confirmation")
    }
    return { error }
  }

  const signOut = async () => {
    console.log("[v0] Signing out")
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
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
