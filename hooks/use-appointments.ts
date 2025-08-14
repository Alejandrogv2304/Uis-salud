"use client"

import { useState, useEffect } from "react"
import { appointmentService, type Appointment } from "@/lib/appointments"

export function useAppointments(userId: string | null) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (userId) {
      loadAppointments(userId)
    } else {
      setAppointments([])
    }
  }, [userId])

  const loadAppointments = (id: string) => {
    setIsLoading(true)
    try {
      const userAppointments = appointmentService.getUserAppointments(id)
      setAppointments(userAppointments)
    } catch (error) {
      console.error("Error loading appointments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createAppointment = (appointmentData: Omit<Appointment, "id" | "userId" | "createdAt">): Appointment => {
    if (!userId) throw new Error("User not authenticated")

    const newAppointment = appointmentService.createAppointment(userId, appointmentData)
    setAppointments((prev) => [...prev, newAppointment])
    return newAppointment
  }

  const deleteAppointment = (appointmentId: string): boolean => {
    if (!userId) return false

    const success = appointmentService.deleteAppointment(appointmentId, userId)
    if (success) {
      setAppointments((prev) => prev.filter((appointment) => appointment.id !== appointmentId))
    }
    return success
  }

  const updateAppointment = (appointmentId: string, updateData: Partial<Appointment>): Appointment | null => {
    if (!userId) return null

    const updatedAppointment = appointmentService.updateAppointment(appointmentId, userId, updateData)
    if (updatedAppointment) {
      setAppointments((prev) =>
        prev.map((appointment) => (appointment.id === appointmentId ? updatedAppointment : appointment)),
      )
    }
    return updatedAppointment
  }

  return {
    appointments,
    isLoading,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    refreshAppointments: () => userId && loadAppointments(userId),
  }
}
