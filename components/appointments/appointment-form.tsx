"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"
import { appointmentService, type Appointment } from "@/lib/appointments"
import type { User } from "@/lib/auth"

interface AppointmentFormProps {
  user: User
  onAppointmentCreated: (appointment: Appointment) => void
}

export function AppointmentForm({ user, onAppointmentCreated }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    specialty: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const specialties = [
    "Medicina General",
    "Cardiología",
    "Dermatología",
    "Ginecología",
    "Neurología",
    "Pediatría",
    "Psicología",
    "Traumatología",
  ]

  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.date || !formData.time || !formData.specialty) {
      alert("Por favor complete todos los campos obligatorios")
      setIsLoading(false)
      return
    }

    try {
      const newAppointment = appointmentService.createAppointment(user.id, {
        name: user.name,
        phone: user.phone,
        email: user.email,
        ...formData,
      })

      onAppointmentCreated(newAppointment)
      setFormData({
        date: "",
        time: "",
        specialty: "",
        notes: "",
      })

      alert("Cita agendada exitosamente")
    } catch (error) {
      alert("Error al agendar la cita")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Agendar Nueva Cita
        </CardTitle>
        <CardDescription>
          Agendando cita para: <strong>{user.name}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-green-700">
                Fecha *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="border-green-200 focus:border-green-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-green-700">
                Hora *
              </Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder="Seleccione hora" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="specialty" className="text-green-700">
              Especialidad *
            </Label>
            <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue placeholder="Seleccione especialidad" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes" className="text-green-700">
              Observaciones
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Describa brevemente el motivo de la consulta..."
              className="border-green-200 focus:border-green-500"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
            {isLoading ? "Agendando..." : "Agendar Cita"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
