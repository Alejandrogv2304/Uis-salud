"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useAppointments } from "@/hooks/use-appointments"
import AuthPage from "@/app/auth/page"
import ProfilePage from "@/app/profile/page"
import { AppointmentForm } from "@/components/appointments/appointment-form"
import { AppointmentList } from "@/components/appointments/appointment-list"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

type CurrentView = "appointments" | "profile"

export default function MedicalAppointments() {
  const [currentView, setCurrentView] = useState<CurrentView>("appointments")
  const { user, isLoading, login, register, logout, updateUser } = useAuth()
  const { appointments, createAppointment, deleteAppointment } = useAppointments(user?.id || null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <AuthPage
        onAuthSuccess={() => {
          // User state is managed by useAuth hook
          setCurrentView("appointments")
        }}
        onLogin={login}
        onRegister={register}
      />
    )
  }

  if (currentView === "profile") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <Navigation user={user} currentView={currentView} onViewChange={setCurrentView} onLogout={logout} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Mi Perfil</h2>
              <p className="text-gray-600">Gestiona tu información personal y revisa tus datos de contacto</p>
            </div>
            <ProfilePage user={user} onUserUpdate={updateUser} onBack={() => setCurrentView("appointments")} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Navigation user={user} currentView={currentView} onViewChange={setCurrentView} onLogout={logout} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Mis Citas Médicas</h2>
          <p className="text-gray-600">Agenda y gestiona tus citas médicas de forma fácil y rápida</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <AppointmentForm
            user={user}
            onAppointmentCreated={(appointment) => {
              createAppointment({
                name: appointment.name,
                phone: appointment.phone,
                email: appointment.email,
                date: appointment.date,
                time: appointment.time,
                specialty: appointment.specialty,
                notes: appointment.notes,
              })
            }}
          />

          <AppointmentList appointments={appointments} onAppointmentDeleted={deleteAppointment} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
