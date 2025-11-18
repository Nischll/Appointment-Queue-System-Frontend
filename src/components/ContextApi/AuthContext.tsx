// context/AuthContext.tsx
import {
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "@/utility/authService";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: (_token: string, _refreshToken: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  const login = (token: string, refreshToken: string) => {
    setToken(token);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
