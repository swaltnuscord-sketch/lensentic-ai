import {
  Navigate,
} from "react-router-dom"

import {
  useAuth,
} from "@/context/AuthContext"

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { token, loading } =
    useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Initializing LensenticAI...
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute