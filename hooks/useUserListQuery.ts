import { useQuery } from '@tanstack/react-query'
//import api from '@/services/userApi'
//import { fetchFromServer } from '@/utils/api'

export const useUserListQuery = (params: any) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async () => {
      const query = new URLSearchParams(params).toString()
      if (!query) {
        throw new Error('유효하지 않은 사용자 목록 요청입니다.')
      }
      
      const res = await fetch(`/users?${query}`, {
        method: 'GET',
      })

      if (!res.ok) {
        console.error('목록 조회 실패:', res.status)
        throw new Error(`목록 조회 실패: ${res.status}`)
      }

      return res.json()

      //express 서버 사용없이 nextjs router api를 사용할 때
      //return fetchFromServer(`/users?${query}`)
    },
  })
}

// MOCK API를 사용

// export const useUserListQuery = (params: Params) => {
//   return useQuery({
//     queryKey: ['users', params],
//     queryFn: async () => {
//       const query = new URLSearchParams()
//       Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined) {
//           query.append(key, String(value))
//         }
//       })
//       const res = await fetch(`/api/users?${query.toString()}`)
//       return res.json()
//     },
//   })
// }
