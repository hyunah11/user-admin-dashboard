import express, { Request, Response } from 'express'
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

// 1. 사용자 목록 조회 API ====
app.get('/users', async (req: Request, res: Response) => {
  try {
    const query = new URLSearchParams(req.query as any).toString()
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
  console.log('userId:', userId)
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

// 3. 사용자 정보 수정 API ====
app.post('/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id
  const body = await req.body

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
  console.log(`==== Express 서버 실행 중: http://localhost:${PORT}`)
})
