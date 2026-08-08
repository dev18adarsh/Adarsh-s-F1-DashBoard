import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_OPENF1_BASE_URL ?? 'https://api.openf1.org/v1'

export const openf1Client = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
  timeout: 15_000,
  paramsSerializer: { indexes: null },
})

openf1Client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      axios.isAxiosError(error) && error.response
        ? `OpenF1 request failed with status ${error.response.status}`
        : 'Unable to reach the OpenF1 data service. Check your connection and try again.'
    return Promise.reject(new Error(message))
  },
)
