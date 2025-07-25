// app/(auth)/register/page.tsx
'use client'
import { RegisterForm } from './form'
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (userData: { name: string; email: string; password: string }) => {
    try {
      await register(userData) // Tu función de registro que crea un usuario con role="user"
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      throw error // El formulario manejará el error
    }
  }

  const handleGoogleRegister = () => {
    // Lógica para registro con Google
    console.log('Google registration')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <RegisterForm onSubmit={handleSubmit} onGoogleRegister={handleGoogleRegister} />
    </div>
  )
}