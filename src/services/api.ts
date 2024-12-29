import type { LoginCredentials, RegisterCredentials, User } from '../types/auth'

const API_URL = 'http://remote.raug-info.ch:8083/api'

export const authApi = {
  async login(credentials: LoginCredentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const data = await response.json()
      localStorage.setItem('token', data.token)
      return data.user
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  async register(credentials: RegisterCredentials) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const data = await response.json()
      return data.user
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },
}