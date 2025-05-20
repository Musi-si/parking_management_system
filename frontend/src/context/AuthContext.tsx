import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'
import { User, AuthState } from '../types'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<string>
  register: (names: string, email: string, password: string, role: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null, isAuthenticated: false, isLoading: false, error: null,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (token && storedUser) {
      setState(prev => ({...prev, user: JSON.parse(storedUser), isAuthenticated: true, isLoading: false}))
    } else {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<string> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await authApi.login(email, password)
      const { token } = response
      
      localStorage.setItem('token', token)

      const data = await authApi.getProfile()
      localStorage.setItem('user', JSON.stringify(data))
      
      setState({user: data, isAuthenticated: true, isLoading: false, error: null})
      return data.role
    } catch (error: any) {
      setState(prev => ({...prev, isLoading: false, error: error.response?.data?.message || 'Login failed'}))
      throw error
    }
  }

  const register = async (names: string, email: string, password: string, role: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      await authApi.register(names, email, password, role)
      setState(prev => ({ ...prev, isLoading: false, error: null }))
    } catch (error: any) {
      setState(prev => ({
        ...prev, isLoading: false, error: error.response?.data?.message || 'Registration failed'
      }))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setState({ user: null, isAuthenticated: false, isLoading: false, error: null })
  }

  return (
    <AuthContext.Provider value={{user: state.user, isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading, error: state.error, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}