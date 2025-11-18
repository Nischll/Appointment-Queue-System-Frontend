import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from '@/components/ContextApi/AuthContext';

interface UnProtectedRouteProps {
  children: ReactNode;
}

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UnProtectedRoute;
