'use client'

import { useState } from 'react'
import { useUserDetailQuery } from '@/hooks/useUserDetailQuery'
import UserEditForm from './UserEditForm'

type Props = {
  userId: string
  onClose: () => void
}

export default function UserDetailModal({ userId, onClose }: Props) {
  const { data, isLoading } = useUserDetailQuery(userId)
  const [editing, setEditing] = useState(false)

  if (!userId) return null
  if (isLoading) return <div className="p-4">로딩 중...</div>

  const user = data?.data
  if (!user) return <div className="p-4">사용자 정보 없음</div>

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px] space-y-2">
        <h2 className="text-xl font-bold">사용자 상세</h2>
        {editing ? (
          <UserEditForm user={user} onClose={() => setEditing(false)} />
        ) : (
          <>
            <div><strong>사용자ID:</strong> {user.id}</div>
            <div><strong>이름:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>직급:</strong> {user.job_rank}</div>
            <div><strong>직책:</strong> {user.position}</div>
            <div><strong>활성 상태:</strong> {user.active ? 'Y' : 'N'}</div>
            <div className="mt-4 text-right space-x-2">
              <button
                onClick={() => setEditing(true)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                수정
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                닫기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
