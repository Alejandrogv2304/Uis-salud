"use client"

import { ProfileForm } from "@/components/profile/profile-form"
import { Stethoscope } from "lucide-react"
import type { User } from "@/lib/auth"

interface ProfilePageProps {
  user: User
  onUserUpdate: (user: User) => void
  onBack: () => void
}

export default function ProfilePage({ user, onUserUpdate, onBack }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Sistema de Citas Médicas</h1>
                <p className="text-green-100">Universidad Industrial de Santander - UIS</p>
              </div>
            </div>
            <button onClick={onBack} className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors">
              Volver al Inicio
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-green-800 mb-2">Bienvenido, {user.name}</h2>
            <p className="text-gray-600">Gestiona tu información personal y revisa tus datos de contacto</p>
          </div>

          <ProfileForm user={user} onUserUpdate={onUserUpdate} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-100">© 2024 Universidad Industrial de Santander - UIS</p>
          <p className="text-sm text-green-200 mt-1">Sistema de Agendamiento de Citas Médicas</p>
        </div>
      </footer>
    </div>
  )
}
