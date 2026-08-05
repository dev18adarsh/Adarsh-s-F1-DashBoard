import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://api.jolpi.ca/ergast/f1',
  headers: { Accept: 'application/json' },
  timeout: 15_000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      axios.isAxiosError(error) && error.response
        ? `Request failed with status ${error.response.status}`
        : 'Unable to reach the F1 data service. Check your connection and try again.'
    return Promise.reject(new Error(message))
  },
)
