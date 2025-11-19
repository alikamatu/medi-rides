import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';

export const useRoleNavigation = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const getDashboardPath = (role: string): string => {
    const paths: { [key: string]: string } = {
      ADMIN: '/dashboard',
      DRIVER: '/driver/dashboard',
      DISPATCHER: '/dispatcher/dashboard',
      CUSTOMER: '/customer-dashboard',
    };
    
    return paths[role] || '/dashboard';
  };

  const redirectToRoleDashboard = () => {
    if (user?.role) {
      router.push(getDashboardPath(user.role));
    }
  };

  const requireRole = (allowedRoles: string[]) => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
      return false;
    }
    return true;
  };

  return {
    getDashboardPath,
    redirectToRoleDashboard,
    requireRole,
  };
};