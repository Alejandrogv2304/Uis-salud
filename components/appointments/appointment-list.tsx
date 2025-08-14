"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Phone, Mail, Trash2 } from "lucide-react"
import { appointmentService, type Appointment } from "@/lib/appointments"

interface AppointmentListProps {
  appointments: Appointment[]
  onAppointmentDeleted: (appointmentId: string) => void
}

export function AppointmentList({ appointments, onAppointmentDeleted }: AppointmentListProps) {
  const handleDeleteAppointment = (appointmentId: string, userId: string) => {
    if (confirm("¿Está seguro de que desea eliminar esta cita?")) {
      const success = appointmentService.deleteAppointment(appointmentId, userId)
      if (success) {
        onAppointmentDeleted(appointmentId)
      }
    }
  }

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Mis Citas Agendadas ({appointments.length})
        </CardTitle>
        <CardDescription>Lista de todas tus citas médicas programadas</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-green-300" />
            <p>No tienes citas agendadas</p>
            <p className="text-sm">Las citas aparecerán aquí una vez agendadas</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border border-green-200 rounded-lg p-4 bg-green-50/50">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-800">{appointment.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      {appointment.phone}
                    </div>
                    {appointment.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {appointment.email}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-green-600" />
                        {new Date(appointment.date).toLocaleDateString("es-CO")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        {appointment.time}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {appointment.specialty}
                      </span>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Observaciones:</strong> {appointment.notes}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAppointment(appointment.id, appointment.userId)}
                    className="ml-4 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
