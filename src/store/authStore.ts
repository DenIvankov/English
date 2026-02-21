
import { useNavigate } from "react-router"
import { axiosInstance } from "../api/axios"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthStoreType = {
    access_token: string | null
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null,
    login: (login: string, password: string) => Promise<void>
    logout: () => void,
    registration: (email: string, password: string) => Promise<void>
}

export const authStore = create<AuthStoreType>()(

    persist(
        set => ({
            access_token: null,
            isAuthenticated: false,
            isLoading: true,
            error: null,
            registration: async (email, password) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await axiosInstance.post('/auth/register', { email: email, password: password })
                    set({ access_token: response.data.access_token, isAuthenticated: true, isLoading: false })
                    console.log(response.data)
                    console.log("LOGIN DATA:", email, password)


                }
                catch (error: any) {
                    set({ error: error.message, isLoading: false })

                    console.log("я словил ошибку")
                    console.log("STATUS:", error.response?.status)
                    console.log("ERROR DATA:", error.response?.data)
                    throw error;
                }
            },
            login: async (login, password) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await axiosInstance.post('/auth/login', { email: login, password: password })
                    set({ access_token: response.data.access_token, isAuthenticated: true, isLoading: false })
                    console.log(response.data)
                    console.log("LOGIN DATA:", login, password)
                }
                catch (error: any) {
                    set({ error: error.message, isLoading: false })
                    console.log("я словил ошибку")
                    console.log("STATUS:", error.response?.status)
                    console.log("ERROR DATA:", error.response?.data)
                    throw error;
                }
            },
            logout: async () => {
                set({
                    access_token: null,
                    isAuthenticated: false

                })

            },
        }),
        {
            name: 'dataAuth',
            partialize: state => ({
                access_token: state.access_token,
            }),
        }
    )
)