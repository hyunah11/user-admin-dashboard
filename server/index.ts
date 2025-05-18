import express, { Request, Response } from 'express'
import querystring from 'querystring'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: '.env.server' })

const app = express()
const PORT = 8000
//ex. http://localhost:8000/users?page_index=1&page_size=10

const BASE_URL = process.env.API_BASE_URL
const AUTH_KEY = process.env.AUTH_KEY

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}))

app.use(express.json())


const allowedGetQueryKeys = ['page_index', 'page_size', 'id', 'name', 'email', 'active'] as const
type AllowedGetQueryKey = (typeof allowedGetQueryKeys)[number]

// 1. 사용자 목록 조회 API ====
app.get('/users', async (req: Request, res: Response) => {
  try {
    //const query = new URLSearchParams(req.query as any).toString()
    const filteredQuery: Record<string, string> = {}
    for (const key of allowedGetQueryKeys) {
      const value = req.query[key]
      if (typeof value === 'string') {
        filteredQuery[key] = value
      }
    }

    const query = querystring.stringify(filteredQuery)

    console.log('사용자 목록 조회 API 요청 - 쿼리:', query)

    const url = `${BASE_URL}/users?${query}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (err) {
    console.error('API 호출 실패:', err)
    res.status(500).json({ error: '서버 오류' })
  }
})


// 2. 사용자 상세 조회 API ====
app.get('/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id
  console.log('사용자 상세 조회 API 요청 - userId:', userId)
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()
    const user = result.data
    res.status(response.status).json(user)
  
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


const allowedUpdateFields = [ 'name','job_rank', 'position', 'email', 'ip_address','active','join_date' ] as const;
type AllowedUpdateField = (typeof allowedUpdateFields)[number];

// 3. 사용자 정보 수정 API ====
app.post('/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id
  const body = req.body

  const filteredBody: Record<AllowedUpdateField, any> = {} as any;
  for (const key of allowedUpdateFields) {
    if (key in body) {
      filteredBody[key] = body[key];
    } 
  }

  console.log('사용자 정보 수정 API 요청 :', { userId, filteredBody });

  if (Object.keys(filteredBody).length !== allowedUpdateFields.length) {
    res.status(400).json({ error: '필수 필드가 누락되었거나 잘못된 형식입니다.' });
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredBody),
    })

    const result = await response.json()
    res.status(response.status).json(result)
  } catch (err) {
    console.error('수정 실패:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


// 4. 사용자 정보 삭제 API ====
app.delete('/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()
    res.status(response.status).json(result)
  } catch (error) {
    console.error('사용자 삭제 실패:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.listen(PORT, () => {
  console.log(`======== Express 서버 실행 중: http://localhost:${PORT} ========`)
})
