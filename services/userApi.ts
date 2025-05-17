import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_AUTH_KEY ?? '',
  },
})

export default api