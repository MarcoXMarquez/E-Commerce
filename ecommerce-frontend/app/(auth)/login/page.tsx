'use client';
import { LoginForm } from './form'; // Ajusta la ruta según tu estructura
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      router.push('/'); // Redirige al dashboard/home después de login
    } catch (error) {
      // El error ya se maneja en el contexto/auth
      throw error; // LoginForm manejará el error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoginForm 
        onFormSubmit={handleLogin} 
        onGoogleLogin={() => console.log('Google OAuth')} 
      />
    </div>
  );
}
