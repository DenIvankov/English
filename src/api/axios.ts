import axios from "axios"
import { authStore } from "../store/authStore"

export const axiosInstance = axios.create({
    baseURL: "http://155.212.161.245:3000"
})

axiosInstance.interceptors.request.use((config) => {
    const token = authStore.getState().access_token

    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // если сервер вернул 401 — разлогиниваем пользователя
            console.log("Логаут")
            authStore.getState().logout()
        }

        return Promise.reject(error)
    }
)