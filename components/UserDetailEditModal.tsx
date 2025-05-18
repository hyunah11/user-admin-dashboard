'use client'

import { useEffect, useState, useMemo } from 'react'
import { useUserDetailQuery } from '@/hooks/useUserDetailQuery'
import { useUpdateUserMutation } from '@/hooks/useUpdateUserMutation'
import { User } from '@/types/user'
import { toast } from 'react-toastify'
import { Box, Button, Modal, TextField, Select, Typography, MenuItem } from '@mui/material'

interface Props {
  userId: string
  onClose: () => void
}

export default function UserDetailEditModal({ userId, onClose }: Props) {

  const [editedUser, setEditedUser] = useState<Partial<User>>({})

  const queryResult = useUserDetailQuery(userId)

  const isStorybook = process.env.STORYBOOK === 'true'

  const user = useMemo(() => {
  return isStorybook
    ? {
        id: 'storybook-user',
        name: '스토리북',
        email: 'storybook@example.com',
        job_rank: '과장',
        position: '팀장',
        active: true,
        ip_address: '127.0.0.1',
        join_date: '2025-05-18',
      }
    : queryResult.data
}, [isStorybook, queryResult.data])

  const isLoading = isStorybook ? false : queryResult.isLoading
  const isError = isStorybook ? false : queryResult.isError
  const isSuccess = isStorybook ? true : queryResult.isSuccess

  // 사용자 상세 조회 API 선행 - 응답 지연
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isSuccess && !isError) {
        toast.error('서버 응답이 지연되고 있어요. 다시 시도해주세요.')
        onClose()
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isSuccess, isError, onClose])

  // 사용자 상세 조회 API 선행 - 에러 발생
  useEffect(() => {
    if (isError) {
      toast.error('사용자 정보를 불러올 수 없습니다.')
      onClose()
    }
  }, [isError, onClose])

  // 사용자 상세 조회 API 선행 - 로딩 완료
  useEffect(() => {
    if (user?.id) {
      console.log('user 로딩 완료:', user)
      setEditedUser({
        id: user.id,
        name: user.name,
        email: user.email,
        job_rank: user.job_rank,
        position: user.position,
        active: user.active,
        ip_address: user.ip_address,
        join_date: user.join_date,
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (!editedUser) return
    setEditedUser((prev) => ({
      ...prev,
      [name]: name === 'active' ? value === 'true' : value,
    }))
  }

  // ==== 사용자 정보 수정 ====
  const { mutate: updateUser, isPending } = useUpdateUserMutation(() => {
    toast.success('수정 완료!')
    onClose()
  })

  // 수정 버튼 클릭 시
  const handleSave = () => {
    if (!editedUser) {
      toast.error('수정할 사용자 정보가 없습니다.')
      return
    }
    updateUser(editedUser as User)
  }

  if (isLoading) return null
  if (isError || !editedUser) return null

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 380,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          📝 사용자 수정
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="ID"
            value={editedUser.id || ''}
            disabled
            fullWidth
            size="small"
          />

          <TextField
            label="이름"
            name="name"
            value={editedUser.name || ''}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            label="이메일"
            name="email"
            value={editedUser.email || ''}
            onChange={handleChange}
            fullWidth
            size="small"
            type="email"
            error={!editedUser.email?.includes('@')}
          />

          <TextField
            label="직급"
            name="job_rank"
            value={editedUser.job_rank || ''}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            label="직책"
            name="position"
            value={editedUser.position || ''}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            label="IP 주소"
            name="ip_address"
            value={editedUser.ip_address || ''}
            onChange={handleChange}
            fullWidth
            size="small"
          />

          <TextField
            label="가입일"
            name="join_date"
            value={editedUser.join_date || ''}
            onChange={handleChange}
            fullWidth
            size="small"
            type="date"
          />

          <Select
            label="활성화"
            name="active"
            value={String(Number(editedUser.active))}
            onChange={(e) => {
              setEditedUser((prev) => ({
                ...prev,
                active: e.target.value === '1',
              }))
            }}
            fullWidth
            size="small"
          >
            <MenuItem value="1">활성</MenuItem>
            <MenuItem value="0">비활성</MenuItem>
          </Select>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
          <Button onClick={onClose} variant="outlined">
            닫기
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isPending}
          >
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
