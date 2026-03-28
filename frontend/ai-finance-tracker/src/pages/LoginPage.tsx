import { useState } from 'react'
import { useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    if (!isLoaded) return

    setLoading(true)
    setError('')

    try {
      // Attempt sign in — Clerk handles credential verification
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        // Set the active session in Clerk
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard')
      } else {
        // Needs further verification (e.g. MFA) — handle if needed
        console.log('Sign-in needs more steps:', result.status)
      }
    } catch (err: any) {
      // Clerk error objects have a .errors array
      setError(err.errors?.[0]?.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign in</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading || !isLoaded}>
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}