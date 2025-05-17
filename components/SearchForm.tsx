'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    active: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    params.set('page_index', '1') // 검색 시 항상 1페이지부터 시작
    params.set('page_size', searchParams.get('page_size') || '10')

    if (form.id) params.set('id', form.id)
    if (form.name) params.set('name', form.name)
    if (form.email) params.set('email', form.email)
    if (form.active) params.set('active', form.active)

    router.push(`/?${params.toString()}`)
  }

  const handleReset = () => {
    setForm({ id: '', name: '', email: '', active: '' })
    router.push('/?page_index=1&page_size=10')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4 items-end">
      <input
        type="text"
        name="id"
        value={form.id}
        onChange={handleChange}
        placeholder="ID"
        className="border p-1 rounded"
      />
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
        className="border p-1 rounded"
      />
      <input
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-1 rounded"
      />
      <select
        name="active"
        value={form.active}
        onChange={handleChange}
        className="border p-1 rounded"
      >
        <option value="">전체</option>
        <option value="true">활성</option>
        <option value="false">비활성</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        검색
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
      >
        초기화
      </button>
    </form>
  )
}