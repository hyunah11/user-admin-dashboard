import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/user'

export const useUpdateUserMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (user: User) => {
      const res = await fetch(`/users/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })

      if (!res.ok) {
        const error = await res.text()
        throw new Error(`수정 실패: ${error}`)
      }

      return res.json()
    },
    onSuccess: (_, user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })         // 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ['user', user.id] }) // 상세 정보 갱신
      onSuccess?.()
    },
    onError: (err: any) => {
      console.error(err)
    },
  })
}

// MOCK API를 사용

// export const useUpdateUserMutation = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ id, data }: { id: string; data: Omit<User, 'id' | 'seq_no'> }) => {
//       const res = await fetch(`/api/users/${id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       })
//       if (!res.ok) throw new Error('수정 실패')
//       return res.json()
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users'])
//       queryClient.invalidateQueries({ queryKey: ['user'] }) // 상세도 같이
//     },
//   })
// }
