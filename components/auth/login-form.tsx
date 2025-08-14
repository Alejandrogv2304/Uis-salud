"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, LogIn } from "lucide-react"
import type { User } from "@/lib/auth"

interface LoginFormProps {
  onLogin: (user: User) => void
  onSwitchToRegister: () => void
  authLogin: (email: string, password: string) => Promise<User>
}

export function LoginForm({ onLogin, onSwitchToRegister, authLogin }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await authLogin(formData.email, formData.password)
      onLogin(user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800 flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Iniciar Sesión
        </CardTitle>
        <CardDescription>Ingrese sus credenciales para acceder</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div>
            <Label htmlFor="email" className="text-green-700">
              Correo Electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="correo@ejemplo.com"
                className="pl-10 border-green-200 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-green-700">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                className="pl-10 border-green-200 focus:border-green-500"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-green-600 hover:text-green-700 text-sm underline"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
