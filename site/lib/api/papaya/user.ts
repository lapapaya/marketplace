import { useQuery } from '@tanstack/react-query'

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
  return useQuery<User>(['/users/current'])
}
