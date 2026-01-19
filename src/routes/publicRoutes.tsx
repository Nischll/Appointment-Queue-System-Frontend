import UnProtectedRoute from "@/helper/UnProtectedRoute";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Login = lazy(() => import("../core/public/Login/Login"));
const Signup = lazy(() => import("../core/public/Signup"));

const Loader = () => <div>Loading...</div>;

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <UnProtectedRoute>
          <Login />
        </UnProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loader />}>
        <UnProtectedRoute>
          <Signup />
        </UnProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
