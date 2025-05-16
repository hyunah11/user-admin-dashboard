'use client'

import { useState } from 'react'
import { useUserListQuery } from '@/hooks/useUserListQuery'
import { useDeleteUserMutation } from '@/hooks/useDeleteUserMutation'
import SearchForm from '@/components/SearchForm'
import UserDetailModal from '@/components/UserDetailModal'
import Pagination from '@/components/Pagination'
import { User } from '@/types/user'

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    page_index: 1,
    page_size: 10,
  })

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const { data, isLoading, isError } = useUserListQuery(searchParams)

  const deleteMutation = useDeleteUserMutation()

  const handleSearch = (params: Partial<User>) => {
    setSearchParams({
      ...searchParams,
      ...params,
      page_index: 1, // 검색 시 첫 페이지로
    })
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({ ...prev, page_index: newPage }))
  }

  const handlePageSizeChange = (newSize: number) => {
    setSearchParams({ ...searchParams, page_index: 1, page_size: newSize })
  }

  const handleDelete = (id: string) => {
  if (confirm(`정말 삭제하시겠습니까?`)) {
    deleteMutation.mutate(id)
  }
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">사용자 조회</h1>

      <SearchForm onSearch={handleSearch} />

      {isLoading && <p>로딩 중...</p>}
      {isError && <p>에러 발생</p>}

      {!isLoading && data && (
        <>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">사용자ID</th>
              <th className="border px-2 py-1">이름</th>
              <th className="border px-2 py-1">이메일</th>
              <th className="border px-2 py-1">직급</th>
              <th className="border px-2 py-1">활성 상태</th>
              <th className="border px-2 py-1">상세</th>
            </tr>
          </thead>
          <tbody>
            {data.data.result_list.map((user) => (
              <tr key={user.id}>
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.job_rank}</td>
                <td className="border px-2 py-1">{user.active ? 'Y' : 'N'}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => setSelectedUserId(user.id)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    상세보기
                  </button>
                </td>
                <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 underline hover:text-red-700"
                    >
                      삭제
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>

          <Pagination
            pageIndex={searchParams.page_index}
            pageSize={searchParams.page_size}
            totalCount={data.data.total_count}
            onChangePage={handlePageChange}
            onChangePageSize={handlePageSizeChange}
          />
        </>
      )}

      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  )
}