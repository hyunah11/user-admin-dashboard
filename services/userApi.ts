import axios from 'axios'

const api = axios.create({
  baseURL: process.env.PUBLIC_API_BASE_URL,
  headers: {
    Authorization: process.env.AUTH_KEY ?? '',
  },
})

export default api