import type { Meta, StoryObj } from '@storybook/react'
import UserDetailModal from '@/components/UserDetailModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const meta: Meta<typeof UserDetailModal> = {
  title: 'Components/UserDetailModal',
  component: UserDetailModal,
  parameters: {
    layout: 'centered',
  },
}

export default meta

const queryClient = new QueryClient()

export const Default: StoryObj<typeof UserDetailModal> = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <UserDetailModal userId="plawless18277" onClose={() => alert('닫기 클릭됨')} />
    </QueryClientProvider>
  ),
}
