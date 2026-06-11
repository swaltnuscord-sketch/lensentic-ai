import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  loginUser,
  registerUser,
} from "@/services/auth"

import {
  getToken,
  removeToken,
  setToken,
} from "@/services/token"

interface AuthContextType {
  user: any
  token: string | null
  loading: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<void>
  register: (
    email: string,
    password: string,
  ) => Promise<void>
  logout: () => void
}

const AuthContext =
  createContext<AuthContextType | null>(
    null,
  )

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] =
    useState<any>(null)

  const [token, setTokenState] =
    useState<string | null>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const existingToken = getToken()

    if (existingToken) {
      setTokenState(existingToken)
    }

    setLoading(false)
  }, [])

  const login = async (
    email: string,
    password: string,
  ) => {
    const data = await loginUser(
      email,
      password,
    )

    setToken(data.access_token)

    setTokenState(data.access_token)

    setUser(data.user)
  }

  const register = async (
    email: string,
    password: string,
  ) => {
    const data = await registerUser(
      email,
      password,
    )

    setToken(data.access_token)

    setTokenState(data.access_token)

    setUser(data.user)
  }

  const logout = () => {
    removeToken()

    setTokenState(null)

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider",
    )
  }

  return context
}