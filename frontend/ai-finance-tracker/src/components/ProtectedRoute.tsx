import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth()

  // Wait for Clerk to determine auth state
  if (!isLoaded) return <div>Loading...</div>

  // Not signed in → redirect to login
  if (!isSignedIn) return <Navigate to="/login" replace />

  return children
}