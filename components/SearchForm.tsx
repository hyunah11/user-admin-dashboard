'use client'

import { useState } from 'react'

type SearchParams = {
  id?: string
  name?: string
  email?: string
  active?: boolean
}

type Props = {
  onSearch: (params: SearchParams) => void
}

export default function SearchForm({ onSearch }: Props) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [active, setActive] = useState<'all' | 'true' | 'false'>('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query: SearchParams = {}

    if (id.trim()) query.id = id.trim()
    if (name.trim()) query.name = name.trim()
    if (email.trim()) query.email = email.trim()
    if (active !== 'all') query.active = active === 'true'

    onSearch(query)
  }

  const handleReset = () => {
    setId('')
    setName('')
    setEmail('')
    setActive('all')
    onSearch({})
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded space-y-3 w-fit">
    <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
            <label className="w-16">ID</label>
            <input value={id} onChange={(e) => setId(e.target.value)} className="border px-2 py-1" />
        </div>

        <div className="flex items-center gap-2">
            <label className="w-16">이름</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="border px-2 py-1" />
        </div>

        <div className="flex items-center gap-2">
            <label className="w-16">이메일</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1" />
        </div>

        <div className="flex items-center gap-2">
            <label className="w-16">활성상태</label>
            <select value={active} onChange={(e) => setActive(e.target.value as any)} className="border px-2 py-1">
                <option value="all">전체</option>
                <option value="true">활성</option>
                <option value="false">비활성</option>
            </select>
        </div>
    </div>
    
    <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">조회</button>
        <button type="button" onClick={handleReset} className="bg-gray-300 px-4 py-1 rounded">초기화</button>
    </div>
    </form>
  )
}