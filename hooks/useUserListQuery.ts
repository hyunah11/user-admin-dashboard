import { useQuery } from '@tanstack/react-query'
import api from '@/services/userApi'

type Params = {
  page_index: number
  page_size: number
  id?: string
  name?: string
  email?: string
  active?: boolean
}

export const useUserListQuery = (params: Params) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const query = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          query.append(key, String(value))
        }
      })
      const res = await fetch(`/api/users?${query.toString()}`)
      return res.json()
    },
  })
}
