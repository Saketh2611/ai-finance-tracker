import { useUser, UserButton } from '@clerk/clerk-react'

export default function Dashboard() {
  const { user, isLoaded } = useUser()  // full Clerk user object

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>Clerk ID: {user.id}</p>

      {/* Pre-built avatar + dropdown: sign out, profile, etc. */}
      <UserButton afterSignOutUrl="/login" />
    </div>
  )
}

// Available Clerk hooks summary:
// useAuth()  → { isSignedIn, isLoaded, userId, getToken }
// useUser()  → { user, isLoaded } — full profile, avatar, emails
// useClerk() → { signOut, openSignIn, openUserProfile, ... }
// useSession() → { session } — session metadata