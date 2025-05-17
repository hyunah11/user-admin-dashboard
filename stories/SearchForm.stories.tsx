import type { Meta, StoryObj } from '@storybook/react'
import SearchForm from '@/components/SearchForm'

const meta: Meta<typeof SearchForm> = {
  title: 'Components/SearchForm',
  component: SearchForm,
}
export default meta

type Story = StoryObj<typeof SearchForm>

export const Default: Story = {
  render: () => <SearchForm />,
}
