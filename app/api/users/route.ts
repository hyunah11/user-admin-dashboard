import { NextRequest, NextResponse } from 'next/server'
import allUsers from '@/mock/users.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const pageIndex = parseInt(searchParams.get('page_index') || '1', 10)
  const pageSize = parseInt(searchParams.get('page_size') || '10', 10)
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const activeParam = searchParams.get('active')

  // 1. 전체 필터 적용
  let filtered = allUsers.filter((user) => {
    return (
      (!id || user.id.includes(id)) &&
      (!name || user.name.includes(name)) &&
      (!email || user.email.includes(email)) &&
      (activeParam === null || String(user.active) === activeParam)
    )
  })

  const totalCount = filtered.length

  // 2. 페이징 처리
  const start = (pageIndex - 1) * pageSize
  const end = start + pageSize
  const paginated = filtered.slice(start, end)

  return NextResponse.json({
    meta: {
      status: 200,
      message: 'success',
    },
    data: {
      page_index: pageIndex,
      page_size: pageSize,
      total_count: totalCount,
      result_list: paginated,
    },
  })
}
