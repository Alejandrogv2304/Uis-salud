export interface User {
  id: string
  name: string
  email: string
  phone: string
  cedula: string
  birthDate: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Simulación de base de datos en localStorage
export const authService = {
  register: (userData: Omit<User, "id" | "createdAt">): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]")

        // Verificar si el email ya existe
        if (users.find((u: User) => u.email === userData.email)) {
          reject(new Error("El correo electrónico ya está registrado"))
          return
        }

        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date(),
        }

        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        resolve(newUser)
      }, 500)
    })
  },

  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const user = users.find((u: User) => u.email === email)

        if (!user) {
          reject(new Error("Usuario no encontrado"))
          return
        }

        // En una app real, verificarías la contraseña hasheada
        localStorage.setItem("currentUser", JSON.stringify(user))
        resolve(user)
      }, 500)
    })
  },

  logout: (): void => {
    localStorage.removeItem("currentUser")
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("currentUser")
    return userStr ? JSON.parse(userStr) : null
  },

  updateUser: (userData: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = authService.getCurrentUser()
        if (!currentUser) {
          reject(new Error("Usuario no autenticado"))
          return
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u: User) => u.id === currentUser.id)

        if (userIndex === -1) {
          reject(new Error("Usuario no encontrado"))
          return
        }

        const updatedUser = { ...users[userIndex], ...userData }
        users[userIndex] = updatedUser

        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        resolve(updatedUser)
      }, 500)
    })
  },
}
