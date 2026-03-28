import { SignUp } from '@clerk/clerk-react'

export default function SignupPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
      <SignUp
        routing="path"          // use /signup path-based routing
        path="/signup"
        signInUrl="/login"   // link to your login page
        afterSignUpUrl="/dashboard"  // redirect after signup
      />
    </div>
  )
}

// Similarly for signup:
// import { SignUp } from '@clerk/clerk-react'
// <SignUp routing="path" path="/signup" signInUrl="/login" afterSignUpUrl="/dashboard" />