import UnProtectedRoute from "@/helper/UnProtectedRoute";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Login = lazy(() => import("../core/public/Login/Login"));
const Signup = lazy(() => import("../core/public/Signup"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense>
        <UnProtectedRoute>
          <Login />
        </UnProtectedRoute>
      </Suspense>
    ),
    errorElement: (
      <>
        <div>Error</div>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense>
        <UnProtectedRoute>
          <Signup />
        </UnProtectedRoute>
      </Suspense>
    ),
    errorElement: (
      <>
        <div>Error</div>
      </>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
