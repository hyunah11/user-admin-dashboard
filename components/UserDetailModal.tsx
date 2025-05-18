'use client'

import { useEffect } from 'react'
import { useUserDetailQuery } from '@/hooks/useUserDetailQuery'
import { toast } from 'react-toastify'
import { Box, Button, Modal, Typography } from '@mui/material'

interface Props {
  userId: string
  onClose: () => void
}

export default function UserDetailModal({ userId, onClose }: Props) {

  const queryResult = useUserDetailQuery(userId)

  const isStorybook = process.env.STORYBOOK === 'true'
  const user = isStorybook
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

  const isLoading = isStorybook ? false : queryResult.isLoading
  const isError = isStorybook ? false : queryResult.isError
  const isSuccess = isStorybook ? true : queryResult.isSuccess

  // 사용자 상세 조회 API - 응답 지연
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isSuccess && !isError) {
        toast.error('서버 응답이 지연되고 있어요. 다시 시도해주세요.')
        onClose()
      }
    }, 3000)

    return () => clearTimeout(timeout)
  }, [isSuccess, isError, onClose])

  // 사용자 상세 조회 API - 에러 발생
  useEffect(() => {
    if (isError) {
      toast.error('사용자 정보를 불러올 수 없습니다.')
      onClose()
    }
  }, [isError, onClose])

  if (isLoading || isError || !user) return null

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="h6" mb={3}>
          🔎 사용자 상세 정보
        </Typography>

        <Box display="flex" flexDirection="column" gap={1.5}>
          {[
            ['ID', user.id],
            ['이름', user.name],
            ['이메일', user.email],
            ['직급', user.job_rank],
            ['직책', user.position],
            ['IP 주소', user.ip_address],
            ['가입일', user.join_date],
            ['활성화', user.active ? 'Y' : 'N'],
          ].map(([label, value]) => (
            <Box key={label} display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                {label}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {value}
              </Typography>
            </Box>
          ))}
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
