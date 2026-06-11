import {
  useState,
} from "react"

import {
  useNavigate,
} from "react-router-dom"

import {
  useAuth,
} from "@/context/AuthContext"

import {
  Button,
} from "@/components/ui/button"

import {
  Input,
} from "@/components/ui/input"

const Login = () => {
  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)

      await login(email, password)

      navigate("/dashboard")
    } catch (error) {
      console.error(error)

      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-950 rounded-3xl p-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold">
            LensenticAI
          </h1>

          <p className="text-zinc-400 mt-2">
            Enter the cinematic studio.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <Button
          className="w-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Authenticating..."
            : "Login"}
        </Button>
      </div>
    </div>
  )
}

export default Login