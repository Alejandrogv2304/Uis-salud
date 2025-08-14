"use client"

import { useState, useEffect } from "react"
import { authService, type User } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const existingUser = authService.getCurrentUser()
    setUser(existingUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    const authenticatedUser = await authService.login(email, password)
    setUser(authenticatedUser)
    return authenticatedUser
  }

  const register = async (userData: Omit<User, "id" | "createdAt">): Promise<User> => {
    const newUser = await authService.register(userData)
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateUser = async (userData: Partial<User>): Promise<User> => {
    const updatedUser = await authService.updateUser(userData)
    setUser(updatedUser)
    return updatedUser
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  }
}
