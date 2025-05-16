import { useQuery } from '@tanstack/react-query'
import { User } from '@/types/user'

type Response = {
  data: User
}

export const useUserDetailQuery = (id: string, enabled = true) => {
  return useQuery<Response>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`)
      if (!res.ok) throw new Error('사용자 조회 실패')
      return res.json()
    },
    enabled: !!id && enabled, // id가 있을 때만 요청
  })
}
