import type { Meta, StoryObj } from '@storybook/react'
import UserDetailEditModal from '@/components/UserDetailEditModal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const meta: Meta<typeof UserDetailEditModal> = {
  title: 'Components/UserDetailEditModal',
  component: UserDetailEditModal,
  parameters: {
    layout: 'centered',
  },
}

export default meta

const queryClient = new QueryClient()

export const Default: StoryObj<typeof UserDetailEditModal> = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <UserDetailEditModal userId="test" onClose={() => alert('닫기 클릭됨')} />
    </QueryClientProvider>
  ),
}
