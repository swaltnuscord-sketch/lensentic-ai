import { useAuth } from "../../context/auth/AuthContext";

export default function AuthGate({ children }: any) {
  const auth = useAuth();

  if (!auth?.token) {
    return <div>Please login to enter LensenticAI Studio</div>;
  }

  return children;
}