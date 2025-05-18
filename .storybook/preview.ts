import type { Preview } from '@storybook/react'
import mockRouter from 'next-router-mock'

// Enable App Router usage
const mockedRouter = {
  ...mockRouter,
  push: async () => Promise.resolve(true),
  replace: async () => Promise.resolve(true),
  prefetch: async () => Promise.resolve(),
  route: '/',
  pathname: '/',
}

// @ts-ignore - Mock router for Next.js App Router
mockRouter.useRouter = () => mockedRouter

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview