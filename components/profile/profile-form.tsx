"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, CreditCard, Calendar, MapPin, Save, Edit } from "lucide-react"
import { authService, type User as UserType } from "@/lib/auth"

interface ProfileFormProps {
  user: UserType
  onUserUpdate: (user: UserType) => void
}

export function ProfileForm({ user, onUserUpdate }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    cedula: user.cedula,
    birthDate: user.birthDate,
    address: user.address,
    emergencyContact: user.emergencyContact,
    emergencyPhone: user.emergencyPhone,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const updatedUser = await authService.updateUser(formData)
      onUserUpdate(updatedUser)
      setIsEditing(false)
      setSuccess("Perfil actualizado exitosamente")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar perfil")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      cedula: user.cedula,
      birthDate: user.birthDate,
      address: user.address,
      emergencyContact: user.emergencyContact,
      emergencyPhone: user.emergencyPhone,
    })
    setIsEditing(false)
    setError("")
    setSuccess("")
  }

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <User className="h-5 w-5" />
              Mi Perfil
            </CardTitle>
            <CardDescription>Información personal y de contacto</CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-green-700">
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cedula" className="text-green-700">
                Cédula
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="cedula"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange("cedula", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-green-700">
                Teléfono
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDate" className="text-green-700">
                Fecha de Nacimiento
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address" className="text-green-700">
                Dirección
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact" className="text-green-700">
                Contacto de Emergencia
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyPhone" className="text-green-700">
                Teléfono de Emergencia
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancelar
              </Button>
            </div>
          )}
        </form>

        {!isEditing && (
          <div className="mt-6 pt-6 border-t border-green-200">
            <div className="text-sm text-gray-600">
              <p>
                <strong>Miembro desde:</strong> {new Date(user.createdAt).toLocaleDateString("es-CO")}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
