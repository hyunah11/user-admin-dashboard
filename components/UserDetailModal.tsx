'use client'

import { useEffect, useState } from 'react'
import { useUserDetailQuery } from '@/hooks/useUserDetailQuery'
import { useUpdateUserMutation } from '@/hooks/useUpdateUserMutation'
import { User } from '@/types/user'
import { toast } from 'react-toastify'

interface Props {
  userId: string
  onClose: () => void
}

export default function UserDetailModal({ userId, onClose }: Props) {
  const { data: user, isLoading, isError, isSuccess } = useUserDetailQuery(userId)
  const [editedUser, setEditedUser] = useState<Partial<User>>({})

  // 사용자 상세 조회 API - 응답 지연
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isSuccess && !isError) {
        toast.error('서버 응답이 지연되고 있어요. 다시 시도해주세요.')
        onClose()
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isSuccess, isError])

  // 사용자 상세 조회 API -에러 발생
  useEffect(() => {
    if (isError) {
      toast.error('사용자 정보를 불러올 수 없습니다.')
      onClose()
    }
  }, [isError])

  // 사용자 상세 조회 API - 로딩 완료
  useEffect(() => {
    if (user?.id) {
      console.log('user 로딩 완료:', user)
      setEditedUser({
        id: user.id,
        name: user.name,
        email: user.email,
        job_rank: user.job_rank,
        position: user.position,
        active: user.active,
        ip_address: user.ip_address,
        join_date: user.join_date,
      })
    }
  }, [user?.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (!editedUser) return
    setEditedUser((prev) => ({
      ...prev,
      [name]: name === 'active' ? value === 'true' : value,
    }))
  }

  // ==== 사용자 정보 수정 ====
  const { mutate: updateUser, isPending } = useUpdateUserMutation(() => {
    toast.success('수정 완료!')
    onClose()
  })

  // 수정 버튼 클릭 시
  const handleSave = () => {
    if (!editedUser) {
      toast.error('수정할 사용자 정보가 없습니다.')
      return
    }
    updateUser(editedUser as User)
  }

  if (isLoading) return null
  if (isError || !editedUser) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow min-w-[400px]">
        <h2 className="text-xl font-semibold mb-4">사용자 상세 및 수정</h2>

        <div className="space-y-3">
          <div className="flex gap-2 items-center">
            <label className="w-20">ID</label>
            <input disabled className="border px-2 py-1 w-full bg-gray-100" 
                   value={editedUser.id || ''} />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">이름</label>
            <input
              name="name"
              value={editedUser.name || ''}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">이메일</label>
            <input
              name="email"
              value={editedUser.email || ''}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">직급</label>
            <input
              name="job_rank"
              value={editedUser.job_rank || ''}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">직책</label>
            <input
              name="position"
              value={editedUser.position || ''}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">IP 주소</label>
            <input
            name="ip_address"
            value={editedUser.ip_address || ''}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">가입일</label>
            <input
            name="join_date"
            value={editedUser.join_date || ''}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="w-20">활성화</label>
            <select
              name="active"
              value={String(editedUser.active)}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            >
              <option value="true">활성</option>
              <option value="false">비활성</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">닫기</button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            {isPending ? '저장 중...' : '저장'}
           </button>
        </div>
      </div>
    </div>
  )
}
