'use client'

import { useSearchParams, useRouter } from 'next/navigation'

type Props = {
  pageIndex: number
  pageSize: number
  totalCount: number
  onChangePage: (newPage: number) => void
  onChangePageSize: (newSize: number) => void
}

export default function Pagination({ pageIndex, pageSize, totalCount, onChangePage, onChangePageSize }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalCount / pageSize)
  if (totalPages <= 0) return null

  const setParams = (nextPage: number, nextSize?: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page_index', nextPage.toString())
    if (nextSize) params.set('page_size', nextSize.toString())
    router.push(`/?${params.toString()}`)
  }

  // 페이지 번호 범위 계산 (10개씩 표시)
  const getVisiblePages = () => {
    const range = 10
    const start = Math.max(1, pageIndex - range)
    const end = Math.min(totalPages, pageIndex + range)
    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
      <div className="flex items-center gap-1">
        <button
          disabled={pageIndex <= 1}
          onClick={() => setParams(pageIndex - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => setParams(page)}
            className={`px-3 py-1 border rounded ${
              page === pageIndex ? 'bg-blue-600 text-white' : ''
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={pageIndex >= totalPages}
          onClick={() => setParams(pageIndex + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="page-size">페이지 크기:</label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => setParams(1, parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}