'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!loading && adminOnly && user?.role !== 'admin') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user || (adminOnly && user.role !== 'admin')) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}