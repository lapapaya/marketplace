import useSignup from '@framework/auth/use-signup'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export interface User {
  id: string
  first_name: string
  last_name: string
  name: string
  email: string
  phone_number?: string
  company_id: string
  created_at: Date
  updated_at: Date
  status: 'status_enabled' | 'status_disabled' | 'status_invited'
  avatar_url?: string
  role: 'role_admin' | 'role_associate' | 'role_rider' | 'role_mechanic'
  metadata: {
    menuCollapsed: boolean
    compactTickets: boolean
    homeMapOpen: boolean
    darkMode: 'dark' | 'light'
    title: string
  }
  supplier_id?: string
  public_resource: boolean
  organization_id?: string
}

export const useMe = () => {
  const user = useQuery<User>(['/users/current'])

  const signup = useSignup()

  useEffect(() => {
    if (user.data) {
      signup({
        email: user.data.email,
        firstName: user.data.first_name,
        lastName: user.data.last_name,
        password: user.data.id,
      })
    }
  }, [user.data])

  return user
}
