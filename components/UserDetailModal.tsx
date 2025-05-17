'use client'

import { useEffect, useState } from 'react'
import { useUserDetailQuery } from '@/hooks/useUserDetailQuery'
import { User } from '@/types/user'
import { toast } from 'react-toastify'
import { Box, Button, Modal, Typography, Divider } from '@mui/material'

interface Props {
  userId: string
  onClose: () => void
}

export default function UserDetailModal({ userId, onClose }: Props) {
  //const { data: user, isLoading, isError, isSuccess } = useUserDetailQuery(userId)
  const [editedUser, setEditedUser] = useState<Partial<User>>({})

  const isStorybook = process.env.STORYBOOK === 'true'
  const { data: user, isLoading, isError, isSuccess } = isStorybook
    ? {
        data: {
          id: 'storybook-user',
          name: '스토리북',
          email: 'storybook@example.com',
          job_rank: '과장',
          position: '팀장',
          active: true,
          ip_address: '127.0.0.1',
          join_date: '2025-05-18',
        },
        isLoading: false,
        isError: false,
        isSuccess: true,
      }
    : useUserDetailQuery(userId)

  // 사용자 상세 조회 API - 응답 지연
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isSuccess && !isError) {
        toast.error('서버 응답이 지연되고 있어요. 다시 시도해주세요.')
        onClose()
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isSuccess, isError])

  // 사용자 상세 조회 API - 에러 발생
  useEffect(() => {
    if (isError) {
      toast.error('사용자 정보를 불러올 수 없습니다.')
      onClose()
    }
  }, [isError])

  // 사용자 상세 조회 API - 로딩 완료
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
  }, [user?.id])

  if (isLoading || isError || !user) return null

  const displayField = (label: string, value?: string | boolean) => (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {String(value ?? '-')}
      </Typography>
      <Divider sx={{ my: 1 }} />
    </Box>
  )

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '80vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={3}>
          🔎 사용자 상세 정보
        </Typography>

        <Box display="flex" flexDirection="column" gap={1}>
          {displayField('ID', user.id)}
          {displayField('이름', user.name)}
          {displayField('이메일', user.email)}
          {displayField('직급', user.job_rank)}
          {displayField('직책', user.position)}
          {displayField('IP 주소', user.ip_address)}
          {displayField('가입일', user.join_date)}
          {displayField('활성화', user.active ? 'Y' : 'N')}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button onClick={onClose} variant="outlined">
            닫기
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
