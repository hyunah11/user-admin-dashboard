'use client'

import { useSearchParams, useRouter  } from 'next/navigation'
import { useState, useMemo } from 'react'
import { User } from '@/types/user'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useUserListQuery } from '@/hooks/useUserListQuery'
import { useDeleteUserMutation } from '@/hooks/useDeleteUserMutation'
import SearchForm from '@/components/SearchForm'
import Pagination from '@/components/Pagination'
import UserDetailModal from '@/components/UserDetailModal'

export default function Home() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })

    if (!params.page_index) params.page_index = '1'
    if (!params.page_size) params.page_size = '10'

    return params
  }, [searchParams])

  const { data, isLoading, isError } = useUserListQuery(queryParams)

  const deleteMutation = useDeleteUserMutation()

  const handleDelete = (id: string) => {
    if (confirm(`정말 삭제하시겠습니까?`)) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Admin</h1>

      <SearchForm />

      {isLoading && (
        <div className="space-y-2 mt-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex space-x-2">
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={120} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={80} />
            </div>
          ))}
        </div>
      )}
      {isError && <p>에러 발생</p>}

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">IDX</th>
              <th className="border px-2 py-1">사용자ID</th>
              <th className="border px-2 py-1">이름</th>
              <th className="border px-2 py-1">직급</th>
              <th className="border px-2 py-1">직책</th>
              <th className="border px-2 py-1">이메일</th>            
              <th className="border px-2 py-1">활성 상태</th>
              <th className="border px-2 py-1">상세 보기</th>
              <th className="border px-2 py-1">삭제</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.result_list?.map((user: any, index: number) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.job_rank}</td>
              <td className="p-2 border">{user.position}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                {Number(user.active) === 1 ? 'Y' : 'N'}
              </td>
              <td className="p-2 border">
                <button className="text-blue-600 underline"
                  onClick={() => setSelectedUserId(user.id)}
                >
                  보기
                </button>
              </td>
              <td className="p-2 border">
                  <button className="text-red-600 underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    삭제
                  </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>

       <Pagination
          pageIndex={Number(queryParams.page_index)}
          pageSize={Number(queryParams.page_size)}
          totalCount={data?.data?.total_count || 0}
          onChangePage={(newPage) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('page_index', newPage.toString())
            router.push(`/?${params.toString()}`)
          }}
          onChangePageSize={(newSize) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('page_size', newSize.toString())
            params.set('page_index', '1') // 페이지 크기 바뀌면 첫 페이지로
            router.push(`/?${params.toString()}`)
          }}
      />

        </>
      )}

      {selectedUserId && (
        <UserDetailModal userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}
    </div>
  )
}