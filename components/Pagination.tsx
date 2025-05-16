'use client'

type Props = {
  pageIndex: number
  pageSize: number
  totalCount: number
  onChangePage: (newPage: number) => void
  onChangePageSize: (newSize: number) => void
}

export default function Pagination({ pageIndex, pageSize, totalCount, onChangePage, onChangePageSize }: Props) {
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="space-x-2">
        <button
          disabled={pageIndex <= 1}
          onClick={() => onChangePage(pageIndex - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="mx-2">
          {pageIndex} / {totalPages}
        </span>
        <button
          disabled={pageIndex >= totalPages}
          onClick={() => onChangePage(pageIndex + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
      <div className="space-x-2">
        <label>페이지 크기:</label>
        <select
          value={pageSize}
          onChange={(e) => onChangePageSize(Number(e.target.value))}
          className="border px-2"
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}