# User Admin Dashboard

React + Next.js + Express 기반의 사용자 관리 대시보드입니다.
- 사용자 목록 조회 / 조건 검색 / 상세보기 모달 / 페이지네이션 기능
- 사용자 수정 (상세보기 모달에서 가능) / 삭제 기능
- Express 프록시 서버 연동
- Toast 메시지 및 react-loading-skeleton 로딩 상태 처리

### 접속 주소

- 클라이언트: `http://localhost:3000`


## 환경 변수 설정

### `.env.local`
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### `.env.local`
```bash
API_BASE_URL=https://...
AUTH_KEY=YOUR_AUTH_KEY
```

## 설치 및 실행

```bash
git clone https://github.com/hyunah11/user-admin-dashboard.git
npm install
npm run dev:all
```

## 주요 폴더 구조

```bash
user-admin-dashboard/
├── app/
│   ├── page.tsx             # 사용자 목록 페이지
│   └── api/users/           # Next.js API Routes (사용 X)
├── components/              # UI 컴포넌트
├── hooks/                   # React Query 관련 훅
├── mock/                    # 사용자 mock 데이터 users.json
├── types/                   # 타입 정의
├── server/                  # Express 백엔드 서버
│   └── index.ts             # 프록시 및 REST 핸들링
├── .env.local
├── .env.server
├── package.json
├── README.md
```

<br> 
<br> 

## API 명세
### 📚 GET /users
- 사용자 리스트 조회
- **Query Parameters**:

| 이름         | 필수 | 타입     | 설명           |
|--------------|------|----------|----------------|
| page_index   | ✅   | number   | 페이지 번호     |
| page_size    | ✅   | number   | 페이지 당 개수  |
| id           | ✖️   | string   | 사용자 ID       |
| name         | ✖️   | string   | 사용자명        |
| email        | ✖️   | string   | 이메일 주소     |
| active       | ✖️   | boolean  | 활성 상태 (true/false) |

- **Response**

```json
{
  "meta": {
    "status": 200,
    "message": "success"
  },
  "data": {
    "page_index": 1,
    "page_size": 10,
    "total_count": 3,
    "result_list": [
      {
        "seq_no": "1",
        "id": "user1",
        "name": "김예시",
        "email": "hyunah@example.com",
        "job_rank": "과장",
        "position": "개발팀",
        "active": true
      }
    ]
  }
}
```

<br> 

### 📚 GET /users/:id
- 특정 사용자 상세 조회
- **Path Parameters**:

| 이름 | 필수 | 타입   | 설명        |
|------|------|--------|-------------|
| id   | ✅   | string | 사용자 ID   |

- **Response**
```json
{
  "id": "user1",
  "name": "가나다",
  "email": "yeyeye@example.com",
  "job_rank": "대리",
  "position": "기획팀",
  "ip_address": "127.0.0.1",
  "join_date": "2025-04-01",
  "active": true
}
```

<br> 

### ✏️ POST /users/:id
- 특정 사용자 정보 수정
- **Path Parameters**:

| 이름 | 필수 | 타입   | 설명      |
|------|------|--------|-----------|
| id   | ✅   | string | 사용자 ID |

- **Response**
```json
{
  "meta": {
    "status": 200,
    "message": "사용자 수정 완료"
  }
}
```

<br> 

### ❌ DELETE /users/:id
- 특정 사용자 정보 삭제
- **Path Parameters**:

| 이름 | 필수 | 타입   | 설명      |
|------|------|--------|-----------|
| id   | ✅   | string | 사용자 ID |

- **Response**
```json
{
  "meta": {
    "status": 200,
    "message": "삭제 완료"
  }
}
```