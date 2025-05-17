'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { TablePagination } from '@mui/material'

type Props = {
  pageIndex: number
  pageSize: number
  totalCount: number
}

export default function Pagination({ pageIndex, pageSize, totalCount }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 0) return null

  const handlePageChange = (_: unknown, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page_index', (newPage + 1).toString()) // TablePagination은 0-based
    router.push(`/?${params.toString()}`)
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page_size', newSize.toString())
    params.set('page_index', '1') // 페이지 크기 바뀌면 첫 페이지로
    router.push(`/?${params.toString()}`)
  }

  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={pageIndex - 1} // MUI는 0-based
      onPageChange={handlePageChange}
      rowsPerPage={pageSize}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={[10, 30, 50]}
      sx={{
            '& .MuiTablePagination-toolbar': {
            fontSize: '1.3rem',
            },
            '& .MuiTablePagination-selectLabel': {
            color: '#1976d2',
            },
            '& .MuiTablePagination-selectIcon': {
            color: '#1976d2',
            },
            '& .MuiTablePagination-displayedRows': {
            color: '#1976d2',
            },
        }}
    />
  )
}