export interface Appointment {
  id: string
  userId: string
  name: string
  phone: string
  email: string
  date: string
  time: string
  specialty: string
  notes: string
  createdAt: Date
}

export const appointmentService = {
  getUserAppointments: (userId: string): Appointment[] => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    return appointments.filter((appointment: Appointment) => appointment.userId === userId)
  },

  createAppointment: (
    userId: string,
    appointmentData: Omit<Appointment, "id" | "userId" | "createdAt">,
  ): Appointment => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")

    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      userId,
      createdAt: new Date(),
    }

    appointments.push(newAppointment)
    localStorage.setItem("appointments", JSON.stringify(appointments))

    return newAppointment
  },

  deleteAppointment: (appointmentId: string, userId: string): boolean => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    const filteredAppointments = appointments.filter(
      (appointment: Appointment) => !(appointment.id === appointmentId && appointment.userId === userId),
    )

    localStorage.setItem("appointments", JSON.stringify(filteredAppointments))
    return filteredAppointments.length < appointments.length
  },

  updateAppointment: (appointmentId: string, userId: string, updateData: Partial<Appointment>): Appointment | null => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    const appointmentIndex = appointments.findIndex(
      (appointment: Appointment) => appointment.id === appointmentId && appointment.userId === userId,
    )

    if (appointmentIndex === -1) return null

    appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...updateData }
    localStorage.setItem("appointments", JSON.stringify(appointments))

    return appointments[appointmentIndex]
  },
}
