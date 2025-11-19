'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRoleNavigation } from '@/hooks/useRoleNavigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [],
  redirectTo = '/auth'
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { requireRole } = useRoleNavigation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = redirectTo;
      return;
    }

    if (!isLoading && isAuthenticated && allowedRoles.length > 0 && user) {
      if (!requireRole(allowedRoles)) {
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, requireRole, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B6]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;