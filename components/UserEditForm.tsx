'use client'

import { useState } from 'react'
import { User } from '@/types/user'
import { useUpdateUserMutation } from '@/hooks/useUpdateUserMutation'

type Props = {
  user: User
  onClose: () => void
}

export default function UserEditForm({ user, onClose }: Props) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    job_rank: user.job_rank,
    position: user.position,
    active: user.active,
  })

  const { mutate, isPending } = useUpdateUserMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'active' ? value === 'true' : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ id: user.id, data: form }, { onSuccess: onClose })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="mr-2">이름</label>
        <input name="name" value={form.name} onChange={handleChange} className="border px-2" />
      </div>
      <div>
        <label className="mr-2">이메일</label>
        <input name="email" value={form.email} onChange={handleChange} className="border px-2" />
      </div>
      <div>
        <label className="mr-2">직급</label>
        <input name="job_rank" value={form.job_rank} onChange={handleChange} className="border px-2" />
      </div>
      <div>
        <label className="mr-2">직책</label>
        <input name="position" value={form.position} onChange={handleChange} className="border px-2" />
      </div>
      <div>
        <label className="mr-2">활성 상태</label>
        <select name="active" value={String(form.active)} onChange={handleChange} className="border px-2">
          <option value="true">활성</option>
          <option value="false">비활성</option>
        </select>
      </div>
      <div className="text-right space-x-2">
        <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-1 rounded">
          저장
        </button>
        <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-1 rounded">
          취소
        </button>
      </div>
    </form>
  )
}
