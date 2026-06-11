import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import App from "@/App"

import Login from "@/pages/auth/Login"

import Register from "@/pages/auth/Register"

import DashboardApp from "@/pages/dashboard/src/frontend/src/App"

import ProtectedRoute from "./ProtectedRoute"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<App />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter