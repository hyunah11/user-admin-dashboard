'use client'

import { useSearchParams, useRouter  } from 'next/navigation'
import { useState, useMemo } from 'react'
import { User } from '@/types/user'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Table,TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'

import { useUserListQuery } from '@/hooks/useUserListQuery'
import { useDeleteUserMutation } from '@/hooks/useDeleteUserMutation'
import SearchForm from '@/components/SearchForm'
import Pagination from '@/components/Pagination'
import UserDetailEditModal from '@/components/UserDetailEditModal'
import UserDetailModal from '@/components/UserDetailModal'

export default function Home() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);     // 상세 보기
  const [editTargetUserId, setEditTargetUserId] = useState<string | null>(null); // 수정

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
      <h1 className="text-2xl font-bold mb-4">User Admin Dashboard</h1>
      <br />

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
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>IDX</TableCell>
              <TableCell>사용자ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>직급</TableCell>
              <TableCell>직책</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>활성 상태</TableCell>
              <TableCell>상세</TableCell>
              <TableCell>수정</TableCell>
              <TableCell>삭제 ⚠️</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.data.result_list.map((user: any, index: number) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.job_rank}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{Number(user.active) === 1 ? 'Y' : 'N'}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  onClick={() => setSelectedUserId(user.id)}
                >
                  상세보기
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => setEditTargetUserId(user.id)}
                >
                  수정
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(user.id)} 
                >
                  삭제
                </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        </TableContainer>

       <Pagination
          pageIndex={Number(queryParams.page_index)}
          pageSize={Number(queryParams.page_size)}
          totalCount={data?.data?.total_count || 0}
        />

        </>
      )}

      {selectedUserId && (
        <UserDetailModal 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)} 
        />
      )}

      {editTargetUserId && (
        <UserDetailEditModal
          userId={editTargetUserId}
          onClose={() => setEditTargetUserId(null)}
        />
      )}
    </div>
  )
}