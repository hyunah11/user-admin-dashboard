import { NextRequest, NextResponse } from 'next/server'
import allUsers from '@/mock/users.json'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { params } = await context

  const user = allUsers.find((u) => u.id === params.id)

  if (!user) {
    return NextResponse.json(
      { meta: { status: 404, message: '사용자 없음' } },
      { status: 404 }
    )
  }

  return NextResponse.json({
    meta: { status: 200, message: 'success' },
    data: user,
  })
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = await context
  const body = await request.json()

  console.log(`[MOCK] 사용자 ${params.id} 정보 수정 - TEMP:`, body)

  return NextResponse.json({
    meta: { status: 200, message: '수정 완료' },
    data: { ...body, id: params.id },
  })
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = await context
  console.log(`[MOCK] 사용자 ${params.id} 삭제 요청 - TEMP`)

  return NextResponse.json({
    meta: { status: 200, message: '삭제 완료' },
  })
}
