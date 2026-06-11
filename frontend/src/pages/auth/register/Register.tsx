import { useState } from "react";
import { register } from "../../../services/auth/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await register(email, password);
    alert("Account created. Please login.");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="p-6 rounded-xl bg-zinc-900 w-[400px]">
        <h1 className="text-2xl mb-4">Create LensenticAI Account</h1>

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
          onClick={handleRegister}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}