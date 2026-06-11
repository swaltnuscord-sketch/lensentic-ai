import api from "./axios"

export const registerUser = async (
  email: string,
  password: string,
) => {
  const response = await api.post(
    "/api/auth/register",
    {
      email,
      password,
    },
  )

  return response.data
}

export const loginUser = async (
  email: string,
  password: string,
) => {
  const response = await api.post(
    "/api/auth/login",
    {
      email,
      password,
    },
  )

  return response.data
}