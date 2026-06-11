import { useState } from "react";
import { login } from "../../../services/auth/api";
import { useAuth } from "../../../context/auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const handleLogin = async () => {
    const res = await login(email, password);

    auth?.loginUser(res.access_token, res.user);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="p-6 rounded-xl bg-zinc-900 w-[400px]">
        <h1 className="text-2xl mb-4">LensenticAI Login</h1>

        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 text-black"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-white text-black p-2"
          onClick={handleLogin}
        >
          Enter Studio
        </button>
      </div>
    </div>
  );
}