import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const toastId = toast.loading('삭제 중입니다...') // 로딩 토스트 먼저
      try {
        const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('삭제 실패')

        toast.update(toastId, {
          render: '삭제되었습니다',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        })

        return res.json()
      } catch (err) {
        toast.update(toastId, {
          render: '삭제 실패 했습니다',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        })
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
