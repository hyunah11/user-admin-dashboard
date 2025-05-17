// express 서버 사용없이 nextjs router api를 사용할 때 (디밸롭 후 사용하지 않습니다)

// ==== USER FETCH API ====
export async function fetchFromServer(endpoint: string, options: RequestInit = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const authKey = process.env.NEXT_PUBLIC_AUTH_KEY

    const res = await fetch(`${baseUrl}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authKey}`,
        ...(options.headers || {}),
        },
        ...options,
    })

    if (!res.ok) {
        console.error('API Error:', res.status)
        throw new Error(`API 호출 실패: ${res.status}`)
    }

    return res.json()
 }

// ==== USER UPDATE API ====
export async function updateUser(id: string, payload: any) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const authKey = process.env.NEXT_PUBLIC_AUTH_KEY

  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authKey}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('사용자 수정 실패')
  }

  return res.json()
}
