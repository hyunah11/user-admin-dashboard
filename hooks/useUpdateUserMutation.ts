import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/user'

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Omit<User, 'id' | 'seq_no'> }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('수정 실패')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      queryClient.invalidateQueries({ queryKey: ['user'] }) // 상세도 같이
    },
  })
}
