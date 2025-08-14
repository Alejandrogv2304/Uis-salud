"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Stethoscope } from "lucide-react"
import type { User } from "@/lib/auth"

interface AuthPageProps {
  onAuthSuccess: () => void
  onLogin: (email: string, password: string) => Promise<User>
  onRegister: (userData: Omit<User, "id" | "createdAt">) => Promise<User>
}

export default function AuthPage({ onAuthSuccess, onLogin, onRegister }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)

  const handleLogin = async (user: User) => {
    onAuthSuccess()
  }

  const handleRegister = async (user: User) => {
    onAuthSuccess()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="h-12 w-12 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-green-800">Sistema de Citas Médicas</h1>
              <p className="text-green-600">Universidad Industrial de Santander - UIS</p>
            </div>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setIsLogin(false)} authLogin={onLogin} />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setIsLogin(true)}
              authRegister={onRegister}
            />
          )}
        </div>
      </div>
    </div>
  )
}
