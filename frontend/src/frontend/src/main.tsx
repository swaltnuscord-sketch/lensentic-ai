import React from "react"

import ReactDOM from "react-dom/client"

import "./index.css"

import AppRouter from "./router/AppRouter"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure"
import {
  AuthProvider,
} from "./context/AuthContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(
  document.getElementById("root")!,
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </InternetIdentityProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)