"use client"

import { Button } from "@/components/ui/button"
import { User, Calendar, LogOut, Stethoscope } from "lucide-react"
import type { User as UserType } from "@/lib/auth"

interface NavigationProps {
  user: UserType
  currentView: "appointments" | "profile"
  onViewChange: (view: "appointments" | "profile") => void
  onLogout: () => void
}

export function Navigation({ user, currentView, onViewChange, onLogout }: NavigationProps) {
  return (
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

          <div className="flex items-center gap-4">
            <span className="text-green-100 hidden md:block">Bienvenido, {user.name}</span>

            <nav className="flex items-center gap-2">
              <Button
                variant={currentView === "appointments" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onViewChange("appointments")}
                className={
                  currentView === "appointments"
                    ? "bg-white text-green-600 hover:bg-gray-100"
                    : "text-white hover:bg-green-700"
                }
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Mis Citas</span>
              </Button>

              <Button
                variant={currentView === "profile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onViewChange("profile")}
                className={
                  currentView === "profile"
                    ? "bg-white text-green-600 hover:bg-gray-100"
                    : "text-white hover:bg-green-700"
                }
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Mi Perfil</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-white hover:bg-red-600 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
