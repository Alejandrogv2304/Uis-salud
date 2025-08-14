"use client"

import { ProfileForm } from "@/components/profile/profile-form"
import { Stethoscope, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const { user, updateUser, isLoading } = useAuth()
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Solo redirigir si no está cargando, no hay usuario y no se está actualizando
    if (!isLoading && !user && !isUpdating) {
      router.push("/auth")
    }
  }, [user, router, isLoading, isUpdating])

  const handleUserUpdate = async (userData: Partial<typeof user>) => {
    setIsUpdating(true)
    try {
      await updateUser(userData)
    } finally {
      setIsUpdating(false)
    }
  }

  // Mostrar loading si está cargando inicialmente
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario después de cargar, no mostrar nada (se redirigirá)
  if (!user) {
    return null
  }

  const handleBack = () => {
    router.push("/")
  }

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
            <button
              onClick={handleBack}
              className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
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

          <ProfileForm user={user} onUserUpdate={handleUserUpdate} />
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
