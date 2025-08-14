"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Phone, CreditCard, Calendar, MapPin, UserPlus } from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface RegisterFormProps {
  onRegister: (user: UserType) => void
  onSwitchToLogin: () => void
  authRegister: (userData: Omit<UserType, "id" | "createdAt">) => Promise<UserType>
}

export function RegisterForm({ onRegister, onSwitchToLogin, authRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    cedula: "",
    birthDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    try {
      const { confirmPassword, password, ...userData } = formData
      const user = await authRegister(userData)
      onRegister(user)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800 flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Registro de Usuario
        </CardTitle>
        <CardDescription>Complete sus datos para crear una cuenta</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-green-700">
                Nombre Completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nombre completo"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cedula" className="text-green-700">
                Cédula *
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="cedula"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange("cedula", e.target.value)}
                  placeholder="Número de cédula"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-green-700">
                Correo Electrónico *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-green-700">
                Teléfono *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="3001234567"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password" className="text-green-700">
                Contraseña *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-green-700">
                Confirmar Contraseña *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDate" className="text-green-700">
                Fecha de Nacimiento *
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-green-700">
                Dirección *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Dirección completa"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact" className="text-green-700">
                Contacto de Emergencia *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="Nombre del contacto"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyPhone" className="text-green-700">
                Teléfono de Emergencia *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  placeholder="3001234567"
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Crear Cuenta"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-green-600 hover:text-green-700 text-sm underline"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
