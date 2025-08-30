import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: string
  updatedAt: string
  status?: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  metadata?: any
  createdAt: string
  updatedAt: string
}

export interface Session {
  id: string
  userId: string
  expiresAt: string
  createdAt: string
  updatedAt: string
}

// API functions
const fetchUsers = async (): Promise<{ users: User[] }> => {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

const fetchOrganizations = async (): Promise<{ organizations: Organization[] }> => {
  const response = await fetch('/api/organizations')
  if (!response.ok) {
    throw new Error('Failed to fetch organizations')
  }
  return response.json()
}

const fetchSessions = async (): Promise<{ sessions: Session[] }> => {
  const response = await fetch('/api/sessions')
  if (!response.ok) {
    throw new Error('Failed to fetch sessions')
  }
  return response.json()
}

// Seeding mutations
const seedUsers = async ({ count }: { count: number }) => {
  const response = await fetch('/api/seed/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  })
  if (!response.ok) {
    throw new Error('Failed to seed users')
  }
  return response.json()
}

const seedInvitations = async ({ count }: { count: number }) => {
  const response = await fetch('/api/seed/invitations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  })
  if (!response.ok) {
    throw new Error('Failed to seed invitations')
  }
  return response.json()
}

const seedOrganizations = async ({ count }: { count: number }) => {
  const response = await fetch('/api/seed/organizations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  })
  if (!response.ok) {
    throw new Error('Failed to seed organizations')
  }
  return response.json()
}

const seedTeams = async ({ count }: { count: number }) => {
  const response = await fetch('/api/seed/teams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  })
  if (!response.ok) {
    throw new Error('Failed to seed teams')
  }
  return response.json()
}

const seedSessions = async ({ count }: { count: number }) => {
  const response = await fetch('/api/seed/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  })
  if (!response.ok) {
    throw new Error('Failed to seed sessions')
  }
  return response.json()
}

const seedAccounts = async ({ count }: { count: number }) => {
  const response = await fetch('/api/seed/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count })
  })
  if (!response.ok) {
    throw new Error('Failed to seed accounts')
  }
  return response.json()
}

// Hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: fetchOrganizations,
  })
}

export const useSessions = () => {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  })
}

// Seeding hooks with automatic refetch
export const useSeedUsers = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: seedUsers,
    onSuccess: () => {
      // Invalidate and refetch users data
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useSeedInvitations = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: seedInvitations,
    onSuccess: () => {
      // Invalidate and refetch users data (invitations might affect users)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useSeedOrganizations = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: seedOrganizations,
    onSuccess: () => {
      // Invalidate and refetch organizations data
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
    },
  })
}

export const useSeedTeams = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: seedTeams,
    onSuccess: () => {
      // Invalidate and refetch organizations data (teams are part of organizations)
      queryClient.invalidateQueries({ queryKey: ['organizations'] })
    },
  })
}

export const useSeedSessions = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: seedSessions,
    onSuccess: () => {
      // Invalidate and refetch sessions data
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}

export const useSeedAccounts = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: seedAccounts,
    onSuccess: () => {
      // Invalidate and refetch sessions data (accounts might affect sessions)
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}
