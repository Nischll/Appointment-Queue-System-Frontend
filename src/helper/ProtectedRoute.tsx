import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/components/ContextApi/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  // const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // function extractPaths(modules: any[]): string[] {
  //   const paths: string[] = [];

  //   for (const mod of modules) {
  //     if (mod.path) paths.push(mod.path);
  //     if (mod.moduleList?.length) {
  //       paths.push(...extractPaths(mod.moduleList));
  //     }
  //   }

  //   return paths;
  // }

  // const frontendAllowedPaths = [
  //   "dashboard-details/:type",
  //   "permission/:id",
  //   "history/:id",
  //   "refund/:id",
  // ];

  // const allowedPaths = [
  //   ...extractPaths(moduleList || []),
  //   ...frontendAllowedPaths,
  // ];

  // // Allow "/" and "/unauthorized" always
  // if (location.pathname === "/" || location.pathname === "/unauthorized") {
  //   return <>{children}</>;
  // }

  // const isAllowed = allowedPaths.some((pattern) =>
  //   matchPath({ path: pattern, end: false }, location.pathname)
  // );

  // if (!isAllowed) {
  //   console.warn("Unauthorized access to:", location.pathname);
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
