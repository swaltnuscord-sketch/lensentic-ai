import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: any;
  token: string | null;
  loginUser: (token: string, user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const loginUser = (jwt: string, userData: any) => {
    setToken(jwt);
    setUser(userData);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}