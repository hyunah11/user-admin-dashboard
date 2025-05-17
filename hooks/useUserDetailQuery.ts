import { useQuery } from '@tanstack/react-query'
import { User } from '@/types/user'

export const useUserDetailQuery = (id: string) => {
  return useQuery<User>({
    queryKey: ['user', id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error('유효하지 않은 사용자 ID입니다.')

      const res = await fetch(`/users/${id}`)

      if (!res.ok) {
        console.error('사용자 상세 조회 실패:', res.status)
        throw new Error(`사용자 상세 조회 실패: ${res.status}`)
      }

      const data = await res.json()

      if (!data?.id) {
        throw new Error(`사용자 정보를 찾을 수 없습니다. (id: ${id})`)
      }

      return data
    }
  })
}

// MOCK API를 사용

// export const useUserDetailQuery = (id: string, enabled = true) => {
//   return useQuery<Response>({
//     queryKey: ['user', id],
//     queryFn: async () => {
//       const res = await fetch(`/api/users/${id}`)
//       if (!res.ok) throw new Error('사용자 조회 실패')
//       return res.json()
//     },
//     enabled: !!id && enabled, // id가 있을 때만 요청
//   })
// }
