import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  
  function setUser(newUser: User | null) {
    user.value = newUser
    isAuthenticated.value = !!newUser
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout
  }
})