# User Admin Dashboard

React + Next.js 기반의 사용자 관리 대시보드입니다.
- 사용자 목록 조회 / 조건 검색 / 상세보기 모달 / 페이지네이션
- 사용자 수정 / 삭제

## 환경 변수 .env.local 설정

```bash
PUBLIC_API_BASE_URL=https://...
AUTH_KEY=Bearer 
```

## 설치 및 실행

```bash
git clone https://github.com/hyunah11/user-admin-dashboard.git
npm install
npm run dev
```

## 주요 폴더 구조

```bash
user-admin-dashboard/
├── app/
│   ├── page.tsx             # 사용자 목록 페이지
│   └── api/users/           # Next.js API Routes
├── components/              # UI 컴포넌트
├── hooks/                   # React Query 관련 훅
├── mock/                    # users.json
├── types/                   # 타입 정의
```


## API 명세
GET /api/users
- 사용자 리스트

GET /api/users/:id
- 사용자 상세 조회

POST /api/users/:id
- 사용자 정보 수정

DELETE /api/users/:id
- 사용자 정보 삭제
